import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminPostList from '@/components/admin/AdminPostList';
import LotusIcon from '@/components/ui/LotusIcon';
import { PenLine, LogOut } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, category, published, created_at, likes_count')
    .order('created_at', { ascending: false });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <LotusIcon className="w-7 h-7 text-gold-600/50" />
          <div>
            <h1 className="font-hindi text-2xl text-ivory-100">प्रबंधन</h1>
            <p className="font-serif text-xs text-ivory-200/35 uppercase tracking-widest">Admin Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-600/20 border border-gold-500/40 text-gold-200 font-hindi text-sm hover:bg-gold-600/30 transition-all duration-200"
          >
            <PenLine size={14} />
            नई रचना
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-rose-500/20 text-ivory-200/40 hover:text-rose-400 hover:border-rose-500/40 font-serif text-sm transition-all duration-200">
              <LogOut size={14} />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'कुल रचनाएँ', labelEn: 'Total Posts', value: posts?.length ?? 0 },
          { label: 'प्रकाशित', labelEn: 'Published', value: posts?.filter(p => p.published).length ?? 0 },
          { label: 'ड्राफ़्ट', labelEn: 'Drafts', value: posts?.filter(p => !p.published).length ?? 0 },
        ].map((s) => (
          <div key={s.labelEn} className="glass-card rounded-xl p-5 text-center">
            <div className="font-display text-3xl text-gold-300 mb-1">{s.value}</div>
            <div className="font-hindi text-xs text-ivory-200/50">{s.label}</div>
            <div className="font-serif text-[10px] text-ivory-200/30 uppercase tracking-widest">{s.labelEn}</div>
          </div>
        ))}
      </div>

      {/* Post list */}
      <AdminPostList posts={posts ?? []} />
    </div>
  );
}
