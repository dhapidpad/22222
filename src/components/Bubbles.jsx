import React from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

export function Bubbles() {
  const reducedMotion = useReducedMotion();

  const bubbles = [
    { size: 14, left: '12%', duration: 12, delay: 0 },
    { size: 22, left: '28%', duration: 16, delay: 3 },
    { size: 10, left: '46%', duration: 11, delay: 1 },
    { size: 18, left: '68%', duration: 15, delay: 5 },
    { size: 12, left: '84%', duration: 13, delay: 2 },
    { size: 16, left: '92%', duration: 14, delay: 4 },
  ];

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#1FBFA8]/25 bg-white/20 backdrop-blur-[2px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: -30
          }}
          animate={{
            y: [-30, -1150],
            x: [0, 15, -15, 0],
            opacity: [0, 0.6, 0.7, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}

export default Bubbles;
