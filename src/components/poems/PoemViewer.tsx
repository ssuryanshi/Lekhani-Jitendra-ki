'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Copy, Check } from 'lucide-react';
import { type Post } from '@/types';
import { getSessionId } from '@/lib/utils';

interface HeartBurst {
  id: number;
  x: number;
  y: number;
}

export default function PoemViewer({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [hearts, setHearts] = useState<HeartBurst[]>([]);
  const [copied, setCopied] = useState(false);
  const lastTapRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked_${post.id}`) === '1');
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

  const spawnHeart = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 900);
  };

  const handleDoubleTap = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 320) {
        const rect = containerRef.current?.getBoundingClientRect();
        spawnHeart(e.clientX - (rect?.left ?? 0), e.clientY - (rect?.top ?? 0));
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

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 320) {
        const rect = containerRef.current?.getBoundingClientRect();
        const touch = e.changedTouches[0];
        spawnHeart(touch.clientX - (rect?.left ?? 0), touch.clientY - (rect?.top ?? 0));
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\n— Dr. Jitendra Kumar`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.slice(0, 200),
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const lines = post.content.split('\n');

  return (
    <div className="space-y-6">
      {/* Double-tap hint */}
      <p className="font-serif text-xs text-ivory-200/25 text-center tracking-widest uppercase">
        Double tap to like · दोहरा स्पर्श करें
      </p>

      {/* Poem body */}
      <div
        ref={containerRef}
        onClick={handleDoubleTap}
        onTouchEnd={handleTouch}
        className="relative glass-card rounded-2xl p-8 sm:p-12 cursor-pointer select-none"
      >
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent rounded-t-2xl" />

        {/* Floating hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute pointer-events-none z-20"
              style={{ left: heart.x, top: heart.y }}
              initial={{ scale: 0, opacity: 1, x: '-50%', y: '-50%' }}
              animate={{ scale: 2, opacity: 0, y: '-200%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Heart className="w-12 h-12 fill-rose-400 text-rose-400 drop-shadow-lg" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Lines */}
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`poem-line font-hindi text-lg sm:text-xl leading-[1.95] ${
                line.trim() === ''
                  ? 'h-5'
                  : 'text-ivory-100/90'
              }`}
            >
              {line || '\u00A0'}
            </div>
          ))}
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent rounded-b-2xl" />
      </div>

      {/* Actions row */}
      <div className="flex items-center justify-between px-2">
        {/* Like */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            if (!liked) {
              setLiked(true); setLikeCount(c => c + 1);
              localStorage.setItem(`liked_${post.id}`, '1');
              persistLike('like');
            } else {
              setLiked(false); setLikeCount(c => Math.max(0, c - 1));
              localStorage.removeItem(`liked_${post.id}`);
              persistLike('unlike');
            }
          }}
          className="flex items-center gap-2 group transition-colors duration-200"
        >
          <motion.div animate={{ scale: liked ? [1, 1.5, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart
              size={20}
              className={liked ? 'fill-rose-400 text-rose-400' : 'text-ivory-200/40 group-hover:text-rose-400 transition-colors'}
            />
          </motion.div>
          <span className={`font-serif text-sm ${liked ? 'text-rose-400' : 'text-ivory-200/40'}`}>
            {likeCount} {liked ? 'पसंद' : 'पसंद करें'}
          </span>
        </motion.button>

        {/* Share + Copy */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2 rounded-full text-ivory-200/35 hover:text-gold-400 hover:bg-gold-700/10 transition-all"
            title="Copy poem"
          >
            {copied ? <Check size={17} className="text-green-400" /> : <Copy size={17} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full text-ivory-200/35 hover:text-gold-400 hover:bg-gold-700/10 transition-all"
            title="Share"
          >
            <Share2 size={17} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
