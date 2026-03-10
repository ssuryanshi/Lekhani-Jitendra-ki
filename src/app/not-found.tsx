import Link from 'next/link';
import LotusIcon from '@/components/ui/LotusIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <LotusIcon className="w-14 h-14 text-gold-600/30 mx-auto mb-8" />

        <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold-500/40 mb-4">
          404
        </p>
        <h1 className="font-hindi text-3xl text-ivory-100/70 mb-3">
          यह पृष्ठ नहीं मिला
        </h1>
        <p className="font-serif italic text-gold-400/40 text-lg mb-2">
          Page not found
        </p>
        <p className="font-hindi text-ivory-200/35 text-sm leading-relaxed mb-10">
          शायद यह रचना यहाँ नहीं है, या पता बदल गया है।
        </p>

        <div className="ornament-divider mb-10 text-gold-700/25 max-w-[160px] mx-auto">
          <span className="text-gold-600/30 text-lg">✦</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gold-500/30 text-gold-300/70 hover:text-gold-200 hover:border-gold-400/50 font-hindi text-base transition-all duration-300"
        >
          ← मुखपृष्ठ पर जाएँ
        </Link>
      </div>
    </div>
  );
}
