export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-cyan/50">
          Loading
        </div>
        <div className="mt-4 flex gap-1 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full animate-pulse"
              style={{
                backgroundColor: ["#4338FF", "#00F5FF", "#45FFB2", "#7C4DFF"][i],
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
