import LotusIcon from '@/components/ui/LotusIcon';

export default function Loading() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <LotusIcon className="w-10 h-10 text-gold-600/30 mb-5 animate-pulse" />
        <div className="h-10 w-48 bg-forest-800/50 rounded-lg animate-pulse mb-3" />
        <div className="h-3 w-24 bg-forest-800/30 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    </div>
  );
}
