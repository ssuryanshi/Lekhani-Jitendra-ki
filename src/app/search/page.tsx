'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { type Post } from '@/types';
import { formatDate, getExcerpt } from '@/lib/utils';
import LotusIcon from '@/components/ui/LotusIcon';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const clear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <LotusIcon className="w-10 h-10 text-gold-600/50 mb-5" />
        <h1 className="font-display text-4xl sm:text-5xl text-ivory-100 text-center mb-2">
          खोज
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold-500/50">
          Search
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-10">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-500/50">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="कोई शब्द, पंक्ति या शीर्षक खोजें... Search any word or title"
          className="w-full bg-forest-900/60 border border-gold-700/25 text-ivory-100 placeholder-ivory-200/30 font-hindi text-base rounded-full pl-14 pr-12 py-4 focus:outline-none focus:border-gold-500/50 focus:shadow-lg transition-all duration-200"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ivory-200/30 hover:text-ivory-200/60 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Hint text */}
      {!searched && !loading && (
        <div className="text-center py-12">
          <p className="font-hindi text-ivory-200/30 text-lg">
            किसी शब्द से खोजें — कविता के शीर्षक या पंक्तियों में
          </p>
          <p className="font-serif text-ivory-200/20 text-sm mt-2">
            Search by any word — in titles or poem lines
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card rounded-xl h-24 animate-pulse" />
          ))}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {!loading && searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-serif text-sm text-gold-500/50 mb-6 uppercase tracking-widest">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>

            {results.length === 0 ? (
              <div className="text-center py-12">
                <LotusIcon className="w-10 h-10 text-gold-600/20 mx-auto mb-4" />
                <p className="font-hindi text-ivory-200/40 text-lg">
                  कोई परिणाम नहीं मिला।
                </p>
                <p className="font-serif text-ivory-200/25 text-sm mt-1">No results found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/kavitayen/${post.slug}`} className="block group">
                      <div className="glass-card rounded-xl p-6 hover:border-gold-500/30 transition-all duration-200">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <span className="category-badge inline-block mr-3">
                              {post.category === 'padya' ? 'पद्य' : 'गद्य'}
                            </span>
                            <h3 className="inline font-hindi text-lg text-ivory-100 group-hover:text-gold-200 transition-colors">
                              {post.title}
                            </h3>
                          </div>
                          <span className="font-serif text-xs text-ivory-200/25 shrink-0">
                            {formatDate(post.created_at, 'en')}
                          </span>
                        </div>
                        <p className="font-hindi text-ivory-200/50 text-sm leading-relaxed line-clamp-2">
                          {getExcerpt(post.content, 180)}
                        </p>
                        <span className="inline-block mt-3 font-serif text-xs text-gold-400/50 uppercase tracking-widest group-hover:text-gold-300 transition-colors">
                          पढ़ें →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
