import Link from 'next/link';
import { Facebook, Linkedin } from 'lucide-react';
import LotusIcon from '@/components/ui/LotusIcon';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold-700/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Ornament */}
        <div className="flex justify-center mb-8">
          <LotusIcon className="w-10 h-10 text-gold-600/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="font-hindi text-gold-300 text-xl mb-0.5">लेखनी जितेंद्र की</h3>
            <p className="font-serif text-xs text-ivory-200/30 tracking-widest mb-3">
              lekhanijitendraki.in
            </p>
            <p className="font-hindi text-ivory-200/50 text-sm leading-relaxed">
              डॉ. जितेंद्र कुमार<br />
              मेरठ, उत्तर प्रदेश · साहित्य प्रेमी
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-gold-400 text-sm uppercase tracking-widest mb-4">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: 'होम — Home' },
                { href: '/kavitayen', label: 'कविताएँ — Poems' },
                { href: '/about', label: 'परिचय — About' },
                { href: '/search', label: 'खोज — Search' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-hindi text-ivory-200/50 hover:text-gold-300 transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-gold-400 text-sm uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ivory-200/50 hover:text-gold-300 transition-colors group"
              >
                <div className="p-2 rounded-full border border-gold-700/20 group-hover:border-gold-500/40 transition-colors">
                  <Facebook size={16} />
                </div>
                <span className="font-serif text-sm">Facebook</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ivory-200/50 hover:text-gold-300 transition-colors group"
              >
                <div className="p-2 rounded-full border border-gold-700/20 group-hover:border-gold-500/40 transition-colors">
                  <Linkedin size={16} />
                </div>
                <span className="font-serif text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gold-700/10 text-center">
          <p className="font-serif text-ivory-200/25 text-xs tracking-wide">
            © {new Date().getFullYear()} लेखनी जितेंद्र की · lekhanijitendraki.in · Crafted with love
          </p>
        </div>
      </div>
    </footer>
  );
}
