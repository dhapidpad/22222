import React from 'react';
import { motion } from 'framer-motion';

export function HPylori({ size = 120, className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        animate={{
          rotate: [-4, 6, -4],
          y: [-3, 4, -3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="overflow-visible drop-shadow-md"
      >
        <defs>
          <linearGradient id="hpColor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48BB78" />
            <stop offset="100%" stopColor="#2F855A" />
          </linearGradient>
        </defs>

        {/* Flagella (Lông roi xoắn ở một đầu) */}
        <motion.g
          animate={{
            skewY: [-8, 8, -8]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <path d="M 40 95 C 20 105, 10 120, 15 135" fill="none" stroke="#2F855A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 35 90 C 15 90, 5 105, 8 120" fill="none" stroke="#2F855A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 45 100 C 30 115, 25 135, 30 145" fill="none" stroke="#2F855A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50 102 C 40 125, 45 140, 55 150" fill="none" stroke="#2F855A" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Helical / Spiral Bacterial Body (Thân xoắn) */}
        <path
          d="M 40 95 C 65 80, 75 95, 95 70 C 115 45, 110 30, 130 25 C 140 22, 148 30, 142 40 C 125 65, 115 50, 95 75 C 75 100, 80 115, 55 110 C 45 108, 38 102, 40 95 Z"
          fill="url(#hpColor)"
          stroke="#1C4B33"
          strokeWidth="3"
        />

        {/* Eyes (Mischievous look) */}
        <circle cx="125" cy="36" r="4.5" fill="#FFFFFF" />
        <circle cx="127" cy="36" r="2.5" fill="#12343B" />
        <circle cx="112" cy="48" r="4" fill="#FFFFFF" />
        <circle cx="114" cy="48" r="2" fill="#12343B" />

        {/* Slanted mischievous eyebrow */}
        <line x1="120" y1="30" x2="132" y2="33" stroke="#12343B" strokeWidth="2" strokeLinecap="round" />

        {/* Urease enzyme clouds around bacteria */}
        <circle cx="145" cy="18" r="3" fill="#FFD166" opacity="0.75" />
        <circle cx="100" cy="35" r="2.5" fill="#FFD166" opacity="0.75" />
        <circle cx="85" cy="60" r="3" fill="#FFD166" opacity="0.75" />
      </motion.svg>
    </div>
  );
}

export default HPylori;
