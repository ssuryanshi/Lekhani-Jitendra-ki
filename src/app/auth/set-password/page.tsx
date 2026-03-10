'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import LotusIcon from '@/components/ui/LotusIcon';

export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए।');
      return;
    }
    if (password !== confirm) {
      setError('दोनों पासवर्ड एक समान नहीं हैं।');
      return;
    }
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError('पासवर्ड सेट नहीं हो सका। कृपया पुनः प्रयास करें।');
      setLoading(false);
      return;
    }

    router.push('/admin');
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
          <h1 className="font-hindi text-2xl text-ivory-100 mb-1">पासवर्ड बनाएं</h1>
          <p className="font-serif text-sm text-ivory-200/40 tracking-widest">Set your password</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-hindi text-xs text-gold-500/60 mb-2 block">
                नया पासवर्ड
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="कम से कम 6 अक्षर"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="font-hindi text-xs text-gold-500/60 mb-2 block">
                पासवर्ड दोबारा लिखें
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="पासवर्ड दोहराएं"
                className="admin-input"
                required
              />
            </div>

            {error && <p className="font-hindi text-rose-400/80 text-sm">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-full bg-gold-600/25 border border-gold-500/40 text-gold-200 font-hindi text-base hover:bg-gold-600/35 transition-all duration-200 disabled:opacity-40"
            >
              {loading ? 'सहेजा जा रहा है...' : 'पासवर्ड सेट करें और आगे बढ़ें'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
