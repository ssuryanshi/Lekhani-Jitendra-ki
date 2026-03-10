'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import LotusIcon from '@/components/ui/LotusIcon';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden lotus-bg">
      {/* Deep radial backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-900/80 to-forest-950 pointer-events-none" />

      {/* Decorative rings */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border border-gold-700/10 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full border border-gold-700/8 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Lotus bloom */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <LotusIcon className="w-16 h-16 text-gold-500/70" animated />
        </motion.div>

        {/* Site name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-hindi text-base tracking-wide text-gold-500/70 mb-2"
        >
          लेखनी जितेंद्र की
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-serif text-[10px] uppercase tracking-[0.35em] text-gold-600/40 mb-6"
        >
          साहित्य · संवेदना · सृजन
        </motion.p>

        {/* Main name — JLF style bold serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="block font-hindi text-5xl sm:text-7xl md:text-8xl leading-tight text-ivory-100 mb-2">
            डॉ. जितेंद्र
          </span>
          <span className="block font-hindi text-5xl sm:text-7xl md:text-8xl leading-tight gold-shimmer-text">
            कुमार
          </span>
        </motion.h1>

        {/* English subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="font-display italic text-xl sm:text-2xl text-gold-400/50 mt-4 tracking-wide"
        >
          Dr. Jitendra Kumar
        </motion.p>

        {/* Divider ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="ornament-divider my-8 max-w-xs mx-auto text-gold-600/50"
        >
          <span className="text-gold-500/70 text-xl">✦</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="font-hindi text-lg sm:text-xl text-ivory-200/55 leading-relaxed max-w-xl mx-auto"
        >
          मेरठ से, हृदय की गहराइयों से उठती कविताएँ —<br />
          जहाँ शब्द भावनाओं का रूप धारण करते हैं।
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link
            href="/kavitayen"
            className="group relative px-8 py-3.5 rounded-full overflow-hidden border border-gold-500/50 text-gold-200 font-hindi text-base transition-all duration-300 hover:border-gold-400 hover:text-gold-100"
          >
            <span className="absolute inset-0 bg-gold-600/0 group-hover:bg-gold-600/15 transition-colors duration-300" />
            <span className="relative">कविताएँ पढ़ें</span>
            <span className="relative font-serif text-xs ml-2 opacity-60 uppercase tracking-widest">
              Read Poems
            </span>
          </Link>

          <Link
            href="/about"
            className="px-8 py-3.5 rounded-full border border-forest-400/20 text-ivory-200/50 font-serif text-sm tracking-widest uppercase hover:text-ivory-200/80 hover:border-forest-400/40 transition-all duration-300"
          >
            About
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-serif text-xs uppercase tracking-widest text-ivory-200/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
