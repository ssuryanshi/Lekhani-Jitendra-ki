'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, EyeOff, Heart } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PostRow {
  id: string;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
  likes_count: number;
}

export default function AdminPostList({ posts }: { posts: PostRow[] }) {
  const [list, setList] = useState(posts);

  const togglePublish = async (id: string, current: boolean) => {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !current }),
    });
    if (res.ok) {
      setList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
      );
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('क्या आप इस रचना को हटाना चाहते हैं? / Delete this post?')) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  if (list.length === 0) {
    return (
      <div className="text-center py-16 glass-card rounded-2xl">
        <p className="font-hindi text-ivory-200/40 text-lg">अभी कोई रचना नहीं है।</p>
        <Link href="/admin/new" className="font-serif text-gold-400/60 text-sm mt-2 inline-block hover:text-gold-300">
          पहली रचना लिखें →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {list.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="glass-card rounded-xl px-6 py-4 flex items-center gap-4"
        >
          {/* Status dot */}
          <div className={`w-2 h-2 rounded-full shrink-0 ${post.published ? 'bg-green-400' : 'bg-ivory-200/20'}`} />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-hindi text-ivory-100 text-base truncate">{post.title}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="category-badge text-[10px] py-0.5 px-2">
                {post.category === 'padya' ? 'पद्य' : 'गद्य'}
              </span>
              <span className="font-serif text-xs text-ivory-200/30">
                {formatDate(post.created_at, 'en')}
              </span>
              <span className="flex items-center gap-1 font-serif text-xs text-ivory-200/25">
                <Heart size={10} /> {post.likes_count}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => togglePublish(post.id, post.published)}
              title={post.published ? 'Unpublish' : 'Publish'}
              className="p-2 rounded-lg text-ivory-200/35 hover:text-gold-400 hover:bg-gold-700/10 transition-all"
            >
              {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <Link
              href={`/admin/edit/${post.id}`}
              className="p-2 rounded-lg text-ivory-200/35 hover:text-gold-400 hover:bg-gold-700/10 transition-all"
            >
              <Edit size={16} />
            </Link>
            <button
              onClick={() => deletePost(post.id)}
              className="p-2 rounded-lg text-ivory-200/35 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
