'use client';

import { motion } from 'framer-motion';
import { type Category } from '@/types';

interface CategoryToggleProps {
  value: Category | 'all';
  onChange: (val: Category | 'all') => void;
}

const options: { value: Category | 'all'; label: string; labelEn: string }[] = [
  { value: 'all', label: 'सभी', labelEn: 'All' },
  { value: 'padya', label: 'पद्य', labelEn: 'Padya' },
  { value: 'gadya', label: 'गद्य', labelEn: 'Gadya' },
];

export default function CategoryToggle({ value, onChange }: CategoryToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center gap-1 p-1 rounded-full bg-forest-900/60 border border-gold-700/25">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className="relative px-5 py-2 rounded-full transition-colors duration-200 z-10 cursor-pointer"
            >
              {active && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-gold-600/25 border border-gold-500/40 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative flex flex-col items-center leading-tight">
                <span
                  className={`font-hindi text-sm transition-colors duration-200 ${
                    active ? 'text-gold-200' : 'text-ivory-200/50 hover:text-ivory-200/80'
                  }`}
                >
                  {opt.label}
                </span>
                <span
                  className={`font-serif text-[9px] uppercase tracking-widest transition-colors duration-200 ${
                    active ? 'text-gold-400' : 'text-ivory-200/30'
                  }`}
                >
                  {opt.labelEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
