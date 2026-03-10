'use client';

import { motion } from 'framer-motion';

interface LotusIconProps {
  className?: string;
  animated?: boolean;
}

export default function LotusIcon({ className = '', animated = false }: LotusIconProps) {
  if (animated) {
    return (
      <motion.svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className={className}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <circle cx="50" cy="55" r="8" />
        <ellipse cx="50" cy="35" rx="8" ry="22" opacity="0.9" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(45 50 55)" opacity="0.8" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(90 50 55)" opacity="0.9" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(135 50 55)" opacity="0.8" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(180 50 55)" opacity="0.7" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(225 50 55)" opacity="0.8" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(270 50 55)" opacity="0.7" />
        <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(315 50 55)" opacity="0.8" />
      </motion.svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <circle cx="50" cy="55" r="8" />
      <ellipse cx="50" cy="35" rx="8" ry="22" opacity="0.9" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(45 50 55)" opacity="0.8" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(90 50 55)" opacity="0.9" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(135 50 55)" opacity="0.8" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(180 50 55)" opacity="0.7" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(225 50 55)" opacity="0.8" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(270 50 55)" opacity="0.7" />
      <ellipse cx="50" cy="35" rx="8" ry="22" transform="rotate(315 50 55)" opacity="0.8" />
    </svg>
  );
}
