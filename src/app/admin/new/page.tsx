import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import LotusIcon from '@/components/ui/LotusIcon';
import Link from 'next/link';

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gold-500/60 hover:text-gold-400 font-serif text-sm uppercase tracking-widest transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-10">
        <LotusIcon className="w-7 h-7 text-gold-600/50" />
        <div>
          <h1 className="font-hindi text-2xl text-ivory-100">नई रचना</h1>
          <p className="font-serif text-xs text-ivory-200/35 uppercase tracking-widest">New Post</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <PostEditor />
      </div>
    </div>
  );
}
