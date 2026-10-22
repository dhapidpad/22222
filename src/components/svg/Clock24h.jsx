import React from 'react';
import { motion } from 'framer-motion';

export function Clock24h({ size = 160, className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="overflow-visible drop-shadow-md">
        {/* Clock Face */}
        <circle cx="100" cy="100" r="92" fill="#FFFFFF" stroke="#1FBFA8" strokeWidth="3" />
        <circle cx="100" cy="100" r="82" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1" />

        {/* Meal Time Wedges */}
        {/* Sáng: 7:00 */}
        <g transform="translate(100, 100)">
          <line x1="0" y1="0" x2="-45" y2="-45" stroke="#FF8A5B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-45" cy="-45" r="7" fill="#FF8A5B" />
          <text x="-65" y="-55" fontSize="8" fontWeight="bold" fill="#C2410C">7:00 Sáng</text>
        </g>

        {/* Trưa: 11:30 */}
        <g transform="translate(100, 100)">
          <line x1="0" y1="0" x2="-10" y2="-65" stroke="#FFD166" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-10" cy="-65" r="7" fill="#FFD166" />
          <text x="-10" y="-76" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#B45309">11:30 Trưa</text>
        </g>

        {/* Xế: 15:30 */}
        <g transform="translate(100, 100)">
          <line x1="0" y1="0" x2="60" y2="10" stroke="#3BB8F0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="10" r="7" fill="#3BB8F0" />
          <text x="70" y="14" fontSize="8" fontWeight="bold" fill="#0369A1">15:30 Xế nhẹ</text>
        </g>

        {/* Tối: 18:30 (trước ngủ 3h) */}
        <g transform="translate(100, 100)">
          <line x1="0" y1="0" x2="45" y2="45" stroke="#1FBFA8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="45" r="7" fill="#1FBFA8" />
          <text x="55" y="60" fontSize="8" fontWeight="bold" fill="#047857">18:30 Tối</text>
        </g>

        {/* Center Pivot with gentle rotation */}
        <circle cx="100" cy="100" r="6" fill="#12343B" />
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="35"
          stroke="#EF4B5F"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        />
      </svg>
      <span className="text-[11px] font-bold text-[#12343B] mt-1.5">Nhịp sinh học 4 cữ ăn</span>
    </div>
  );
}

export default Clock24h;
