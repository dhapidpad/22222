import React from 'react';
import { motion } from 'framer-motion';

export function Stomach({
  state = 'normal', // 'normal' | 'thin' | 'ulcer'
  size = 280,
  className = '',
  showFace = false
}) {
  const isUlcer = state === 'ulcer';
  const isThin = state === 'thin';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 320"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="stomachColorNormal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA07A" />
            <stop offset="100%" stopColor="#FF7043" />
          </linearGradient>

          <linearGradient id="stomachColorUlcer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A5B" />
            <stop offset="100%" stopColor="#D84315" />
          </linearGradient>

          <radialGradient id="ulcerSpot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4B5F" />
            <stop offset="60%" stopColor="#C9184A" />
            <stop offset="100%" stopColor="#FF8A5B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Esophagus junction */}
        <path d="M 148 40 L 168 40 L 166 85 L 146 85 Z" fill="#88D4F7" stroke="#3BB8F0" strokeWidth="2" />

        {/* Main Stomach Body */}
        <motion.path
          d="M 152 82 C 210 85 260 115 260 180 C 260 250 200 278 125 265 C 80 255 75 220 115 200 C 145 185 170 160 160 120 C 158 100 152 85 152 82 Z"
          fill={isUlcer ? 'url(#stomachColorUlcer)' : 'url(#stomachColorNormal)'}
          stroke={isUlcer ? '#D84315' : '#FF7043'}
          strokeWidth="3.5"
          animate={{
            scale: isUlcer ? [1, 1.03, 1] : [1, 1.015, 1],
          }}
          transition={{
            duration: isUlcer ? 1.4 : 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Protective Mucus Layer Outline */}
        <path
          d="M 156 90 C 205 93 248 120 248 178 C 248 238 195 265 130 252 C 92 244 88 215 120 198 C 148 183 162 155 156 122"
          fill="none"
          stroke="#1FBFA8"
          strokeWidth={isThin || isUlcer ? 2.5 : 8}
          strokeDasharray={isThin || isUlcer ? "6 6" : "none"}
          strokeLinecap="round"
          opacity={isUlcer ? 0.35 : isThin ? 0.5 : 0.85}
        />

        {/* Duodenum exit */}
        <path d="M 125 265 C 105 265 95 285 105 305" fill="none" stroke="#FFD166" strokeWidth="12" strokeLinecap="round" />

        {/* Ulcer Crater Spot */}
        {isUlcer && (
          <motion.g
            animate={{ scale: [0.95, 1.15, 0.95] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            transform="translate(195, 190)"
          >
            <circle cx="0" cy="0" r="22" fill="url(#ulcerSpot)" />
            <circle cx="0" cy="0" r="10" fill="#EF4B5F" />
            <circle cx="0" cy="0" r="4" fill="#800020" />
            {/* Warning rays */}
            <line x1="-28" y1="0" x2="-22" y2="0" stroke="#EF4B5F" strokeWidth="2.5" />
            <line x1="22" y1="0" x2="28" y2="0" stroke="#EF4B5F" strokeWidth="2.5" />
            <line x1="0" y1="-28" x2="0" y2="-22" stroke="#EF4B5F" strokeWidth="2.5" />
            <line x1="0" y1="22" x2="0" y2="28" stroke="#EF4B5F" strokeWidth="2.5" />
          </motion.g>
        )}

        {/* Optional Cute Face for presentation */}
        {showFace && (
          <g transform="translate(180, 160)">
            {isUlcer ? (
              // Pained Expression
              <>
                <line x1="-15" y1="-5" x2="-5" y2="0" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="5" y1="0" x2="15" y2="-5" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M -8 15 Q 0 8 8 15" fill="none" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="18" cy="18" r="3" fill="#3BB8F0" />
              </>
            ) : (
              // Happy Expression
              <>
                <circle cx="-10" cy="-2" r="3.5" fill="#12343B" />
                <circle cx="10" cy="-2" r="3.5" fill="#12343B" />
                <path d="M -8 8 Q 0 16 8 8" fill="none" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="-16" cy="6" r="4" fill="#FF8FA3" opacity="0.6" />
                <circle cx="16" cy="6" r="4" fill="#FF8FA3" opacity="0.6" />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

export default Stomach;
