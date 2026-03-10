'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import LotusIcon from '@/components/ui/LotusIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError('लॉगिन नहीं हो सका। ईमेल या पासवर्ड गलत है।');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <LotusIcon className="w-12 h-12 text-gold-500/60 mb-4" animated />
          <h1 className="font-hindi text-2xl text-ivory-100 mb-1">प्रवेश करें</h1>
          <p className="font-serif text-sm text-ivory-200/40 uppercase tracking-widest">Login</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60 mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="font-serif text-xs uppercase tracking-widest text-gold-500/60 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="admin-input"
                required
              />
            </div>

            {error && (
              <p className="font-hindi text-rose-400/80 text-sm">{error}</p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-full bg-gold-600/25 border border-gold-500/40 text-gold-200 font-hindi text-base hover:bg-gold-600/35 transition-all duration-200 disabled:opacity-40"
            >
              {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
