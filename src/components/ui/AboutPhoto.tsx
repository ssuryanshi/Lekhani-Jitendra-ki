'use client';

import { useState } from 'react';

export default function AboutPhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-gold-500/30">
      {!imgError ? (
        <img
          src="/about-photo.jpg"
          alt="Dr. Jitendra Kumar"
          className="w-full h-full object-cover object-top"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-forest-800/60">
          <span className="font-hindi text-4xl text-gold-400/60">जि.कु.</span>
        </div>
      )}
    </div>
  );
}
