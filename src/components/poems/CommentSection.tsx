'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { type Comment } from '@/types';
import { formatDate } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('कृपया नाम और टिप्पणी दोनों भरें।');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, author_name: name.trim(), content: content.trim() }),
      });
      const newComment: Comment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('टिप्पणी नहीं हो सकी। कृपया पुनः प्रयास करें।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle size={18} className="text-gold-500/60" />
        <h3 className="font-display text-xl text-ivory-100">
          टिप्पणियाँ
        </h3>
        <span className="font-serif text-xs text-ivory-200/30 uppercase tracking-widest">
          Comments
        </span>
        <span className="ml-auto font-serif text-sm text-gold-500/50">
          {comments.length}
        </span>
      </div>

      {/* Comments list */}
      <div className="space-y-5 mb-10">
        <AnimatePresence initial={false}>
          {comments.length === 0 ? (
            <p className="font-hindi text-ivory-200/35 text-center py-6">
              पहली टिप्पणी लिखें...
            </p>
          ) : (
            comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-medium text-gold-300/80 text-sm">
                    {comment.author_name}
                  </span>
                  <span className="font-serif text-xs text-ivory-200/25">
                    {formatDate(comment.created_at, 'en')}
                  </span>
                </div>
                <p className="font-hindi text-ivory-200/70 text-base leading-relaxed">
                  {comment.content}
                </p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Comment form */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="font-hindi text-ivory-100/80 text-base mb-5">
          अपनी टिप्पणी लिखें
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="आपका नाम — Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="admin-input"
            maxLength={60}
          />
          <textarea
            placeholder="आपके विचार... Your thoughts"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="admin-input resize-none"
            maxLength={1000}
          />

          {error && (
            <p className="font-hindi text-rose-400/80 text-sm">{error}</p>
          )}
          {success && (
            <p className="font-hindi text-green-400/80 text-sm">
              टिप्पणी सफलतापूर्वक जमा हो गई। ✓
            </p>
          )}

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-600/20 border border-gold-500/40 text-gold-200 font-hindi text-sm hover:bg-gold-600/30 transition-all duration-200 disabled:opacity-40"
          >
            <Send size={14} />
            {submitting ? 'जमा हो रहा है...' : 'टिप्पणी करें'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
