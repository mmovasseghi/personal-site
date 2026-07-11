const A4_W = 595.28;
const A4_H = 841.89;

export function cloneWithInlineStyles(node: HTMLElement): HTMLElement {
  const clone = node.cloneNode(false) as HTMLElement;
  const computed = window.getComputedStyle(node);

  let css = "";
  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i];
    css += `${prop}:${computed.getPropertyValue(prop)};`;
  }
  clone.setAttribute("style", css);

  for (const child of node.childNodes) {
    if (child instanceof HTMLElement) {
      clone.appendChild(cloneWithInlineStyles(child));
    } else {
      clone.appendChild(child.cloneNode(true));
    }
  }

  return clone;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function captureElementAsJpeg(
  element: HTMLElement,
  scale = 2
): Promise<{ data: string; width: number; height: number }> {
  const width = Math.ceil(element.getBoundingClientRect().width);
  const height = Math.ceil(element.scrollHeight);
  const clone = cloneWithInlineStyles(element);

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;min-height:${height}px;background:#060b14;direction:rtl;color:#e8eaed;">
${serialized}
</div>
</foreignObject>
</svg>`;

  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const img = await loadImage(url);

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.scale(scale, scale);
  ctx.fillStyle = "#060b14";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.93);
  return {
    data: dataUrl.split(",")[1] ?? "",
    width: canvas.width,
    height: canvas.height,
  };
}

function concatBytes(parts: (string | Uint8Array)[]): Uint8Array {
  const total = parts.reduce(
    (n, p) => n + (typeof p === "string" ? new TextEncoder().encode(p).length : p.length),
    0
  );
  const out = new Uint8Array(total);
  let offset = 0;
  const enc = new TextEncoder();
  for (const part of parts) {
    const chunk = typeof part === "string" ? enc.encode(part) : part;
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function currentLength(chunks: (string | Uint8Array)[]): number {
  return chunks.reduce(
    (n, c) => n + (typeof c === "string" ? new TextEncoder().encode(c).length : c.length),
    0
  );
}

export function buildPdfFromJpeg(
  jpegBase64: string,
  imgWidthPx: number,
  imgHeightPx: number,
  marginPt = 36
): Blob {
  const contentW = A4_W - marginPt * 2;
  const contentH = A4_H - marginPt * 2;
  const scale = contentW / imgWidthPx;
  const scaledH = imgHeightPx * scale;
  const pageCount = Math.max(1, Math.ceil(scaledH / contentH));

  const imgBinary = atob(jpegBase64);
  const imgBytes = new Uint8Array(imgBinary.length);
  for (let i = 0; i < imgBinary.length; i++) imgBytes[i] = imgBinary.charCodeAt(i);

  const chunks: (string | Uint8Array)[] = ["%PDF-1.4\n"];
  const offsets: Record<number, number> = {};
  const pageIds: number[] = [];
  let objNum = 3;

  const addObj = (id: number, parts: (string | Uint8Array)[]) => {
    offsets[id] = currentLength(chunks);
    for (const part of parts) chunks.push(part);
  };

  for (let p = 0; p < pageCount; p++) {
    const pageId = objNum++;
    const imgId = objNum++;
    const contentId = objNum++;
    pageIds.push(pageId);

    const visibleH = Math.min(contentH, scaledH - p * contentH);
    const ty = marginPt + contentH - visibleH;
    const cm = `${scale.toFixed(4)} 0 0 ${scale.toFixed(4)} ${marginPt.toFixed(2)} ${ty.toFixed(2)}`;

    addObj(pageId, [
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W} ${A4_H}] ` +
        `/Resources << /XObject << /I${p} ${imgId} 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`,
    ]);

    addObj(imgId, [
      `${imgId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidthPx} /Height ${imgHeightPx} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`,
      imgBytes,
      "\nendstream\nendobj\n",
    ]);

    const stream = `q\n${cm} cm\n/I${p} Do\nQ`;
    addObj(contentId, [
      `${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
    ]);
  }

  const maxId = objNum - 1;

  addObj(1, ["1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"]);
  addObj(2, [
    `2 0 obj\n<< /Type /Pages /Kids [${pageIds.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageCount} >>\nendobj\n`,
  ]);

  const body = concatBytes(chunks);
  let xrefTable = `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= maxId; i++) {
    xrefTable += `${String(offsets[i] ?? 0).padStart(10, "0")} 00000 n \n`;
  }
  const trailer = `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${body.length}\n%%EOF`;
  const trailerBytes = new TextEncoder().encode(xrefTable + trailer);
  const pdfBytes = new Uint8Array(body.length + trailerBytes.length);
  pdfBytes.set(body, 0);
  pdfBytes.set(trailerBytes, body.length);
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printElement(element: HTMLElement): boolean {
  const win = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");
  if (!win) return false;

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  win.document.write(`<!DOCTYPE html><html lang="fa" dir="rtl"><head>
<meta charset="utf-8"><title>رزومه</title>
<style>${styles}
@page { size: A4; margin: 12mm; }
body { background: #060b14; color: #e8eaed; margin: 0; padding: 0; }
.resume-dossier { box-shadow: none !important; border: 1px solid rgba(59,130,246,0.3); }
[data-resume-export-hide] { display: none !important; }
</style></head><body>${element.outerHTML}</body></html>`);
  win.document.close();
  win.focus();

  const doPrint = () => {
    win.print();
    win.onafterprint = () => win.close();
  };

  if (win.document.readyState === "complete") {
    setTimeout(doPrint, 150);
  } else {
    win.addEventListener("load", () => setTimeout(doPrint, 150));
  }
  return true;
}
