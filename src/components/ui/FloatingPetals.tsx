'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(212,137,28,0.45)',
      'rgba(196,120,138,0.35)',
      'rgba(242,216,157,0.35)',
      'rgba(229,165,53,0.35)',
    ];
    const generated = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 9 + Math.random() * 9,
      size: 7 + Math.random() * 9,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            width: petal.size,
            height: petal.size,
            animationName: 'petalDrift',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          <svg viewBox="0 0 20 30" fill={petal.color} style={{ width: '100%', height: '100%' }}>
            <ellipse cx="10" cy="15" rx="7" ry="13" />
          </svg>
        </div>
      ))}
    </div>
  );
}
