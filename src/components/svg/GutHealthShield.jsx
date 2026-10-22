import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sfx from '../../audio/sfx';

export function GutHealthShield({ className = '', onPledgeClick = null }) {
  const [activeNode, setActiveNode] = useState(null);
  const [pulseCount, setPulseCount] = useState(0);

  const defenseNodes = [
    {
      id: 'handwash',
      name: 'Rửa tay 6 bước',
      icon: '🧼',
      detail: 'Tối thiểu 30s với xà phòng diệt 99% vi khuẩn, virus.',
      color: '#1FBFA8',
      angle: -45, // Top-right
      cx: 260,
      cy: 65
    },
    {
      id: 'food',
      name: 'Ăn chín uống sôi',
      icon: '🍲',
      detail: 'Nấu chín kỹ, tách biệt dao thớt sống chín, đậy lồng bàn.',
      color: '#FF8A5B',
      angle: 45, // Bottom-right
      cx: 265,
      cy: 215
    },
    {
      id: 'ors',
      name: 'Bù nước Oresol',
      icon: '💧',
      detail: 'Pha chuẩn tỷ lệ (245 mOsm/L), uống từng ngụm nhỏ.',
      color: '#3BB8F0',
      angle: 135, // Bottom-left
      cx: 55,
      cy: 215
    },
    {
      id: 'meds',
      name: 'Dùng thuốc đúng',
      icon: '💊',
      detail: 'Không tự ý uống NSAID bừa bãi hay loperamide khi tiêu chảy.',
      color: '#FFD166',
      angle: -135, // Top-left
      cx: 60,
      cy: 65
    }
  ];

  const handleShieldClick = () => {
    sfx.pop();
    setPulseCount((prev) => prev + 1);
    if (onPledgeClick) onPledgeClick();
  };

  const activeNodeData = defenseNodes.find((n) => n.id === activeNode);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 280"
        width="100%"
        height="100%"
        className="max-w-[320px] max-h-[260px] overflow-visible filter drop-shadow-xl"
      >
        <defs>
          {/* Shield Outer Gold-Emerald Gradient */}
          <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD166" />
            <stop offset="35%" stopColor="#1FBFA8" />
            <stop offset="70%" stopColor="#3BB8F0" />
            <stop offset="100%" stopColor="#FF8A5B" />
          </linearGradient>

          {/* Shield Inner Radiant Gradient */}
          <radialGradient id="shieldInnerGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#E3F7F2" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#C9F2E7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B3EBE0" stopOpacity="0.95" />
          </radialGradient>

          {/* Stomach Healthy Gradient */}
          <radialGradient id="healthyStomachGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFAAA6" />
            <stop offset="50%" stopColor="#FF7A6E" />
            <stop offset="100%" stopColor="#FA5252" />
          </radialGradient>

          {/* Intestine Soft Pink Gradient */}
          <linearGradient id="healthyGutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC2D1" />
            <stop offset="50%" stopColor="#FF8FA3" />
            <stop offset="100%" stopColor="#FF4D6D" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="softShieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Pulsing Aura Rings */}
        <motion.circle
          cx="160"
          cy="140"
          r="105"
          fill="none"
          stroke="#1FBFA8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.circle
          cx="160"
          cy="140"
          r="125"
          fill="none"
          stroke="#3BB8F0"
          strokeWidth="1"
          strokeDasharray="6 6"
          opacity="0.3"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />

        {/* Connecting Energy Lines to 4 Defense Satellites */}
        {defenseNodes.map((n) => (
          <line
            key={`line-${n.id}`}
            x1="160"
            y1="140"
            x2={n.cx}
            y2={n.cy}
            stroke={n.color}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeOpacity={activeNode === n.id ? 0.9 : 0.4}
          />
        ))}

        {/* ================================================= */}
        {/* CENTRAL MASTER SHIELD PATH */}
        {/* ================================================= */}
        <g
          className="cursor-pointer"
          onClick={handleShieldClick}
          whilehover={{ scale: 1.03 }}
        >
          {/* Shield Base Shape */}
          <motion.path
            d="M 160 30 
               C 215 30, 245 45, 245 95 
               C 245 160, 195 210, 160 235 
               C 125 210, 75 160, 75 95 
               C 75 45, 105 30, 160 30 Z"
            fill="url(#shieldInnerGlow)"
            stroke="url(#shieldBorderGrad)"
            strokeWidth="4"
            filter="drop-shadow(0px 8px 16px rgba(31,191,168,0.25))"
            animate={{
              scale: [1, 1.015, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Shield Inner Rim Contour */}
          <path
            d="M 160 40 
               C 205 40, 232 52, 232 98 
               C 232 153, 190 197, 160 220 
               C 130 197, 88 153, 88 98 
               C 88 52, 115 40, 160 40 Z"
            fill="none"
            stroke="#1FBFA8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Healthy Anatomical Organs Inside Shield */}
          <g transform="translate(160, 125) scale(0.65)">
            {/* Esophagus Tube */}
            <path
              d="M -6 -80 L -6 -45 Q -6 -35 8 -25 L 8 -80 Z"
              fill="#FFD2C9"
              stroke="#FA5252"
              strokeWidth="2"
            />

            {/* Stomach Body (J-shaped organ) */}
            <motion.path
              d="M 8 -40 
                 C 35 -40, 60 -20, 60 15 
                 C 60 55, 30 75, -5 75 
                 C -35 75, -50 50, -45 25 
                 C -40 5, -25 -10, -5 -15 
                 C 0 -18, -6 -35, 8 -40 Z"
              fill="url(#healthyStomachGrad)"
              stroke="#E03131"
              strokeWidth="3.5"
              animate={{
                scale: [1, 1.04, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Stomach Cute Shiny Highlights */}
            <ellipse cx="28" cy="0" rx="14" ry="7" fill="#FFFFFF" opacity="0.45" transform="rotate(-25, 28, 0)" />
            <ellipse cx="-15" cy="40" rx="8" ry="4" fill="#FFFFFF" opacity="0.35" transform="rotate(20, -15, 40)" />

            {/* Stomach Happy Face */}
            <circle cx="5" cy="18" r="3" fill="#12343B" />
            <circle cx="25" cy="18" r="3" fill="#12343B" />
            <path
              d="M 10 26 Q 15 32 20 26"
              fill="none"
              stroke="#12343B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Pink Cheeks */}
            <ellipse cx="0" cy="23" rx="4" ry="2.5" fill="#FA5252" opacity="0.5" />
            <ellipse cx="30" cy="23" rx="4" ry="2.5" fill="#FA5252" opacity="0.5" />

            {/* Duodenum / Small Intestine loop below */}
            <path
              d="M -30 65 
                 Q -50 85 -20 100 
                 Q 15 110 5 85"
              fill="none"
              stroke="url(#healthyGutGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M -15 95 
                 Q 20 115 35 90"
              fill="none"
              stroke="url(#healthyGutGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>

          {/* Golden Ribbon Banner at bottom of shield */}
          <g transform="translate(160, 225)">
            <path
              d="M -75 -4 L -65 -14 L 65 -14 L 75 -4 L 60 10 L -60 10 Z"
              fill="#FFD166"
              stroke="#D4A017"
              strokeWidth="1.5"
              filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.12))"
            />
            <text
              x="0"
              y="2"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              fill="#12343B"
              letterSpacing="0.5"
            >
              ★ GUT CARE MASTER ★
            </text>
          </g>
        </g>

        {/* ================================================= */}
        {/* 4 DEFENSE ORBITAL NODES */}
        {/* ================================================= */}
        {defenseNodes.map((node) => {
          const isHovered = activeNode === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onMouseEnter={() => {
                sfx.tick();
                setActiveNode(node.id);
              }}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => {
                sfx.pop();
                setActiveNode(activeNode === node.id ? null : node.id);
              }}
            >
              {/* Outer Glow Halo */}
              {isHovered && (
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="24"
                  fill={node.color}
                  opacity="0.25"
                  filter="url(#softShieldGlow)"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r="18"
                fill="#FFFFFF"
                stroke={node.color}
                strokeWidth={isHovered ? 3 : 2}
                filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.1))"
              />

              {/* Node Icon */}
              <text
                x={node.cx}
                y={node.cy + 5}
                textAnchor="middle"
                fontSize="14"
              >
                {node.icon}
              </text>

              {/* Node Label Text */}
              <text
                x={node.cx}
                y={node.cy > 140 ? node.cy + 25 : node.cy - 22}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="bold"
                fill="#12343B"
                className="pointer-events-none"
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Interactive Callout when hovering or clicking a node */}
      <div className="h-10 mt-1 flex items-center justify-center text-center px-2">
        {activeNodeData ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1.5 rounded-full bg-white/95 border shadow-md flex items-center gap-2 text-xs"
            style={{ borderColor: activeNodeData.color }}
          >
            <span className="text-sm">{activeNodeData.icon}</span>
            <span className="font-bold text-[#12343B]">{activeNodeData.name}:</span>
            <span className="text-[#5B7B80] font-medium">{activeNodeData.detail}</span>
          </motion.div>
        ) : (
          <div className="text-[11px] font-semibold text-[#5B7B80] flex items-center gap-1.5">
            <span>🛡️</span>
            <span>Rê chuột vào 4 lá chắn hoặc nhấp vào Khiên để kích hoạt năng lượng bảo vệ!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GutHealthShield;
