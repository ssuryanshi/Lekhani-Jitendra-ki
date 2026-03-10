import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import PoemViewer from '@/components/poems/PoemViewer';
import CommentSection from '@/components/poems/CommentSection';
import LotusIcon from '@/components/ui/LotusIcon';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'कविता नहीं मिली' };

  return {
    title: `${post.title} — Dr. Jitendra Kumar`,
    description: post.content.slice(0, 150),
  };
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post.id)
    .order('created_at', { ascending: true });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href="/kavitayen"
        className="inline-flex items-center gap-2 text-gold-500/60 hover:text-gold-400 font-serif text-sm uppercase tracking-widest transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        वापस जाएँ
      </Link>

      {/* Category + date */}
      <div className="flex items-center gap-4 mb-6">
        <span className="category-badge">
          {post.category === 'padya' ? 'पद्य — Padya' : 'गद्य — Gadya'}
        </span>
        <span className="font-serif text-xs text-ivory-200/30">
          {formatDate(post.created_at)}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-hindi text-4xl sm:text-5xl text-ivory-100 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Ornament */}
      <div className="ornament-divider mb-10 max-w-xs text-gold-600/40">
        <LotusIcon className="w-5 h-5 text-gold-600/50" />
      </div>

      {/* Media */}
      {post.media_urls?.length > 0 && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          {post.media_urls.map((url: string, i: number) => {
            const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(url);
            if (isVideo) {
              return (
                <video
                  key={i}
                  src={url}
                  controls
                  className="w-full rounded-2xl max-h-[500px] object-cover"
                />
              );
            }
            return (
              <img
                key={i}
                src={url}
                alt={`${post.title} — media ${i + 1}`}
                className="w-full rounded-2xl max-h-[500px] object-cover"
              />
            );
          })}
        </div>
      )}

      {/* Poem viewer with like */}
      <PoemViewer post={post} />

      {/* Divider */}
      <div className="ornament-divider my-14 text-gold-600/30">
        <span className="text-gold-500/40 text-xl">✦</span>
      </div>

      {/* Comments */}
      <CommentSection postId={post.id} initialComments={comments ?? []} />
    </div>
  );
}
