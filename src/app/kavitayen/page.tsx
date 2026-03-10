'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import PoemCard from '@/components/poems/PoemCard';
import CategoryToggle from '@/components/ui/CategoryToggle';
import LotusIcon from '@/components/ui/LotusIcon';
import { type Post, type Category } from '@/types';

export default function KavitayenPage() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 9;

  const fetchPosts = useCallback(async (cat: Category | 'all', pageNum: number, replace = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: PAGE_SIZE.toString(),
        ...(cat !== 'all' && { category: cat }),
      });
      const res = await fetch(`/api/posts?${params}`);
      const data: Post[] = await res.json();
      setPosts((prev) => replace ? data : [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(0);
    fetchPosts(category, 0, true);
  }, [category, fetchPosts]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category, nextPage);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <LotusIcon className="w-10 h-10 text-gold-600/50 mb-5" />
        <h1 className="font-display text-4xl sm:text-5xl text-ivory-100 text-center mb-2">
          रचनाएँ
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold-500/50 mb-8">
          Literary Works
        </p>

        {/* Category toggle */}
        <CategoryToggle value={category} onChange={setCategory} />
      </div>

      {/* Grid */}
      {loading && posts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <LotusIcon className="w-12 h-12 text-gold-600/20 mx-auto mb-4" />
          <p className="font-hindi text-ivory-200/40 text-lg">
            इस श्रेणी में अभी कोई रचना नहीं है।
          </p>
        </div>
      ) : (
        <>
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post, i) => (
              <PoemCard key={post.id} post={post} index={i % PAGE_SIZE} />
            ))}
          </motion.div>

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3.5 rounded-full border border-gold-500/35 text-gold-300/80 hover:text-gold-200 hover:border-gold-400/60 font-hindi text-base transition-all duration-300 hover:bg-gold-600/8 disabled:opacity-40"
              >
                {loading ? 'लोड हो रहा है...' : 'और पढ़ें'}
                <span className="font-serif text-xs ml-2 tracking-widest opacity-60">
                  {loading ? '' : 'Load More'}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
