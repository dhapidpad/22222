import React from 'react';
import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

export function Blobs() {
  const reducedMotion = useReducedMotion();

  const blobs = [
    { color: '#1FBFA8', size: 550, top: '-10%', left: '-5%', opacity: 0.16, duration: 18, delay: 0 },
    { color: '#3BB8F0', size: 600, top: '45%', right: '-8%', opacity: 0.14, duration: 22, delay: 2 },
    { color: '#FF8A5B', size: 450, bottom: '-10%', left: '30%', opacity: 0.12, duration: 20, delay: 4 },
    { color: '#FFD166', size: 380, top: '15%', left: '60%', opacity: 0.10, duration: 16, delay: 1 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full filter blur-[70px]"
          style={{
            backgroundColor: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            opacity: blob.opacity,
            transform: 'translateZ(0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, 25, -20, 0],
                  y: [0, -30, 15, 0],
                  scale: [1, 1.05, 0.96, 1]
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay
          }}
        />
      ))}
    </div>
  );
}

export default Blobs;