'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'होम', labelEn: 'Home' },
  { href: '/kavitayen', label: 'कविताएँ', labelEn: 'Poems' },
  { href: '/about', label: 'परिचय', labelEn: 'About' },
  { href: '/search', label: 'खोज', labelEn: 'Search' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-950/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-gold-700/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-hindi text-gold-300 text-lg tracking-wide group-hover:text-gold-200 transition-colors">
            लेखनी जितेंद्र की
          </span>
          <span className="font-serif text-gold-600 text-xs tracking-widest uppercase">
            lekhanijitendraki.in
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center group transition-colors duration-200 ${
                  active ? 'text-gold-300' : 'text-ivory-200/70 hover:text-gold-300'
                }`}
              >
                <span className="font-hindi text-sm">{link.label}</span>
                <span className="font-serif text-[10px] tracking-widest text-current opacity-60 uppercase">
                  {link.labelEn}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search icon desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 rounded-full text-ivory-200/60 hover:text-gold-300 hover:bg-gold-700/10 transition-all duration-200"
          >
            <Search size={18} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ivory-200/70 hover:text-gold-300 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-forest-950/98 backdrop-blur-md border-t border-gold-700/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 py-2 border-b border-gold-700/10 last:border-0 ${
                    pathname === link.href ? 'text-gold-300' : 'text-ivory-200/70'
                  }`}
                >
                  <span className="font-hindi text-base">{link.label}</span>
                  <span className="font-serif text-xs text-current opacity-50 uppercase tracking-widest">
                    {link.labelEn}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
