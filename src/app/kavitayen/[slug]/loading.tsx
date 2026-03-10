export default function Loading() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="h-4 w-24 bg-forest-800/40 rounded animate-pulse mb-10" />
      <div className="h-3 w-32 bg-forest-800/30 rounded animate-pulse mb-6" />
      <div className="h-12 w-3/4 bg-forest-800/50 rounded-lg animate-pulse mb-4" />
      <div className="h-px w-full bg-forest-800/30 mb-10" />
      <div className="glass-card rounded-2xl p-8 sm:p-12 space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-5 bg-forest-800/40 rounded animate-pulse"
            style={{ width: `${60 + Math.random() * 35}%`, animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
