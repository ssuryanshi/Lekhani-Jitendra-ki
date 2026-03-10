import Hero from "@/components/layout/Hero";
import PoemCard from "@/components/poems/PoemCard";
import LotusIcon from "@/components/ui/LotusIcon";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { type Post } from "@/types";

async function getLatestPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <>
      <Hero />

      {/* Latest poems section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Section header — JLF editorial style */}
        <div className="flex flex-col items-center mb-14">
          <LotusIcon className="w-8 h-8 text-gold-600/50 mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl text-ivory-100 text-center mb-2">
            ताज़ी रचनाएँ
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold-500/50 mb-6">
            Latest Works
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <LotusIcon className="w-12 h-12 text-gold-600/20 mx-auto mb-4" />
            <p className="font-hindi text-ivory-200/40 text-lg">
              जल्द ही कविताएँ यहाँ उपलब्ध होंगी...
            </p>
            <p className="font-serif text-ivory-200/25 text-sm mt-2">
              Poems coming soon
            </p>
          </div>
        ) : (
          <>
            {posts[0] && (
              <div className="mb-8">
                <FeaturedPost post={posts[0]} />
              </div>
            )}

            {posts.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts.slice(1).map((post, i) => (
                  <PoemCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}

            <div className="text-center">
              <Link
                href="/kavitayen"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold-500/35 text-gold-300/80 hover:text-gold-200 hover:border-gold-400/60 font-hindi text-base transition-all duration-300 hover:bg-gold-600/8"
              >
                सभी कविताएँ देखें
                <span className="font-serif text-xs tracking-widest opacity-60">View All →</span>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Quote section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/40 via-forest-800/30 to-forest-900/40" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="ornament-divider mb-8 text-gold-600/40 max-w-xs mx-auto">
            <span className="text-2xl text-gold-500/50">&ldquo;</span>
          </div>
          <blockquote className="font-hindi text-2xl sm:text-3xl text-ivory-100/80 leading-relaxed mb-6">
            शब्द वही जो दिल को छू जाएँ,<br />
            कविता वही जो आत्मा को जगाएँ।
          </blockquote>
          <p className="font-display italic text-gold-400/60 text-sm">
            — Dr. Jitendra Kumar
          </p>
        </div>
      </section>
    </>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/kavitayen/${post.slug}`} className="group block">
      <div className="relative glass-card rounded-2xl overflow-hidden flex flex-col lg:flex-row min-h-[320px] hover:shadow-2xl hover:shadow-black/40 transition-shadow duration-500">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="category-badge">
                {post.category === 'padya' ? 'पद्य' : 'गद्य'}
              </span>
              <span className="font-serif text-xs text-gold-500/50 uppercase tracking-widest">
                Featured
              </span>
            </div>
            <h2 className="font-hindi text-3xl sm:text-4xl text-ivory-100 mb-4 leading-tight group-hover:text-gold-200 transition-colors duration-300">
              {post.title}
            </h2>
            <div className="ornament-divider mb-5 text-gold-700/30 max-w-[120px]">
              <span className="text-gold-600/50">❧</span>
            </div>
            <p className="font-hindi text-ivory-200/55 text-base leading-relaxed line-clamp-4">
              {post.content.split('\n').filter((l: string) => l.trim()).slice(0, 4).join('\n')}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <span className="font-serif text-sm text-gold-400/60 uppercase tracking-widest group-hover:text-gold-300 transition-colors">
              पूरी कविता पढ़ें →
            </span>
          </div>
        </div>

        {post.media_urls?.length > 0 && (
          <div className="lg:w-[380px] relative min-h-[240px] overflow-hidden">
            <img
              src={post.media_urls[0]}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/60 to-transparent lg:block hidden" />
          </div>
        )}
      </div>
    </Link>
  );
}
