'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';

import { type Post } from '@/types';
import { formatDate, getExcerpt, getSessionId } from '@/lib/utils';

interface PoemCardProps {
  post: Post;
  index?: number;
}

interface HeartBurst {
  id: number;
  x: number;
  y: number;
}

export default function PoemCard({ post, index = 0 }: PoemCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [hearts, setHearts] = useState<HeartBurst[]>([]);
  const lastTapRef = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = `liked_${post.id}`;
    setLiked(localStorage.getItem(key) === '1');
  }, [post.id]);

  const persistLike = useCallback(async (action: 'like' | 'unlike') => {
    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id, session_id: getSessionId(), action }),
      });
    } catch {}
  }, [post.id]);

  const handleDoubleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        const rect = cardRef.current?.getBoundingClientRect();
        let x: number, y: number;
        if ('touches' in e && e.touches.length > 0) {
          x = e.touches[0].clientX - (rect?.left ?? 0);
          y = e.touches[0].clientY - (rect?.top ?? 0);
        } else if ('clientX' in e) {
          x = e.clientX - (rect?.left ?? 0);
          y = e.clientY - (rect?.top ?? 0);
        } else {
          x = 50; y = 50;
        }
        const newHeart = { id: now, x, y };
        setHearts((prev) => [...prev, newHeart]);
        setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 900);
        if (!liked) {
          setLiked(true);
          setLikeCount((c) => c + 1);
          localStorage.setItem(`liked_${post.id}`, '1');
          persistLike('like');
        }
      }
      lastTapRef.current = now;
    },
    [liked, post.id, persistLike]
  );

  const handleLikeButton = useCallback(() => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      localStorage.setItem(`liked_${post.id}`, '1');
      persistLike('like');
    } else {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      localStorage.removeItem(`liked_${post.id}`);
      persistLike('unlike');
    }
  }, [liked, post.id, persistLike]);

  const firstImage = post.media_urls?.find((url) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(url)
  );
  const excerpt = getExcerpt(post.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="poem-card glass-card rounded-2xl overflow-hidden group"
    >
      {/* Gold top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      {/* Image */}
      {firstImage && (
        <div className="relative h-52 overflow-hidden">
          <Image
            src={firstImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
          {/* Category badge overlay */}
          <div className="absolute top-3 left-4">
            <span className="category-badge">
              {post.category === 'padya' ? 'पद्य' : 'गद्य'}
            </span>
          </div>
        </div>
      )}

      {/* Content — double tap zone */}
      <div
        ref={cardRef}
        className="relative p-6 cursor-pointer select-none"
        onClick={handleDoubleTap}
        onTouchStart={handleDoubleTap}
      >
        {/* Double-tap hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute pointer-events-none z-20"
              style={{ left: heart.x, top: heart.y }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Heart className="w-10 h-10 fill-rose-400 text-rose-400" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Category (if no image) */}
        {!firstImage && (
          <span className="category-badge inline-block mb-3">
            {post.category === 'padya' ? 'पद्य' : 'गद्य'}
          </span>
        )}

        {/* Title */}
        <h2 className="font-hindi text-xl text-ivory-100 mb-3 leading-snug group-hover:text-gold-200 transition-colors duration-200">
          {post.title}
        </h2>

        {/* Ornamental line */}
        <div className="ornament-divider mb-3 text-gold-700/40">
          <span className="text-gold-600 text-lg">❧</span>
        </div>

        {/* Excerpt */}
        <p className="font-hindi text-ivory-200/65 text-sm leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gold-700/15">
          <div className="flex items-center gap-1.5 text-ivory-200/35 text-xs font-serif">
            <Calendar size={11} />
            <span>{formatDate(post.created_at)}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Like button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => { e.stopPropagation(); handleLikeButton(); }}
              className="flex items-center gap-1.5 text-xs font-serif transition-colors duration-200"
            >
              <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}>
                <Heart
                  size={15}
                  className={liked ? 'fill-rose-400 text-rose-400' : 'text-ivory-200/40 hover:text-rose-400'}
                />
              </motion.div>
              <span className={liked ? 'text-rose-400' : 'text-ivory-200/40'}>{likeCount}</span>
            </motion.button>

            {/* Read more */}
            <Link
              href={`/kavitayen/${post.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="font-serif text-xs text-gold-400/70 hover:text-gold-300 transition-colors duration-200 tracking-wide uppercase"
            >
              पढ़ें →
            </Link>
          </div>
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </motion.article>
  );
}
