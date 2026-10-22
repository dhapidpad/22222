import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sfx from '../../audio/sfx';

export function CuteDetailedStomach({
  activePart = 'corpus',
  onSelectPart,
  isChurning = false,
  fedFood = null, // 'protein' | 'fiber' | 'water'
  viewMode = 'cute', // 'cute' | 'cross-section'
  size = 270
}) {
  const [internalHover, setInternalHover] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [activeFoodAnim, setActiveFoodAnim] = useState(null);

  const currentPart = internalHover || activePart;

  // Auto blink every 4.2 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  // Food animation
  useEffect(() => {
    if (fedFood) {
      setActiveFoodAnim(fedFood);
      sfx.pop();
      const timer = setTimeout(() => {
        setActiveFoodAnim(null);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [fedFood]);

  const parts = [
    { id: 'cardia', num: '1', name: 'Tâm vị (Cardia)', role: 'Van đón thức ăn', desc: 'Cơ thắt dưới thực quản ngăn trào ngược axit', x: 145, y: 68, color: '#0284C7' },
    { id: 'fundus', num: '2', name: 'Đáy vị (Fundus)', role: 'Túi vòm sinh lý', desc: 'Chứa bóng hơi sinh lý và trữ thức ăn chưa tiêu hóa', x: 236, y: 64, color: '#0D9488' },
    { id: 'corpus', num: '3', name: 'Thân vị (Corpus)', role: 'Lò phản ứng', desc: 'Tiết dịch vị HCl & Pepsinogen phân cắt Protein', x: 238, y: 155, color: '#EA580C' },
    { id: 'antrum', num: '4', name: 'Hang vị (Antrum)', role: 'Cối xay cơ học', desc: 'Thành cơ dày co bóp cực mạnh nghiền nhuyễn thức ăn', x: 135, y: 228, color: '#D97706' },
    { id: 'pylorus', num: '5', name: 'Môn vị (Pylorus)', role: 'Van xả một chiều', desc: 'Điều tiết từng lượng nhỏ nhũ chấp xuống tá tràng', x: 82, y: 202, color: '#E11D48' }
  ];

  const handlePartClick = (id) => {
    sfx.tick();
    if (onSelectPart) onSelectPart(id);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 350 300"
        width={size}
        height={size * 0.86}
        className="overflow-visible filter drop-shadow-xl"
      >
        <defs>
          {/* Main Stomach Skin 3D Gradient */}
          <radialGradient id="cuteStomach3D" cx="42%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFAAA6" />
            <stop offset="42%" stopColor="#FF7A6E" />
            <stop offset="85%" stopColor="#FA5252" />
            <stop offset="100%" stopColor="#E03131" />
          </radialGradient>

          {/* Cross section inner tissue gradient */}
          <linearGradient id="tissueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8787" />
            <stop offset="50%" stopColor="#F06595" />
            <stop offset="100%" stopColor="#C2255C" />
          </linearGradient>

          {/* Inner Chyme liquid gradient */}
          <linearGradient id="chymeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" stopOpacity="0.88" />
            <stop offset="50%" stopColor="#FFD43B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FAB005" stopOpacity="0.98" />
          </linearGradient>

          {/* Glowing Mint Mucus Shield Gradient */}
          <linearGradient id="mucusGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20C997" />
            <stop offset="50%" stopColor="#38D9A9" />
            <stop offset="100%" stopColor="#63E6BE" />
          </linearGradient>

          {/* Radial Blush for Cute Cheeks */}
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF1E56" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FF1E56" stopOpacity="0" />
          </radialGradient>

          {/* Specular Highlight Gloss */}
          <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>

          {/* Stomach Inner Clip Path */}
          <clipPath id="stomachClip">
            <path d="M 148 78 C 215 78 280 108 278 174 C 275 240 212 278 140 260 C 98 250 90 215 116 198 C 144 178 162 152 148 118 C 144 102 136 88 128 78 Z" />
          </clipPath>
        </defs>

        {/* 1. Thực quản dẫn vào (Esophagus) */}
        <g>
          <path
            d="M 132 15 L 158 15 C 158 45 156 65 152 78 L 128 75 C 132 60 132 38 132 15 Z"
            fill="url(#tissueGrad)"
            stroke="#C2255C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M 133 32 Q 145 37 157 32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
          <path d="M 132 50 Q 144 55 155 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.65" />
        </g>

        {/* 2. Tá tràng thoát ra (Duodenum Exit) */}
        <g>
          <path
            d="M 98 205 C 75 200 52 225 58 252 C 64 275 92 284 125 284"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 98 205 C 75 200 52 225 58 252 C 64 275 92 284 125 284"
            fill="none"
            stroke="#FAB005"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </g>

        {/* 3. LỚP KHIÊN BẢO VỆ MUCIN PHÁT SÁNG (Mint Mucus Shield) */}
        <motion.path
          d="M 148 76 C 220 75 292 105 289 175 C 286 246 220 287 140 269 C 94 259 84 218 114 197 C 145 177 166 149 150 115 C 146 100 138 85 130 76 Z"
          fill="none"
          stroke="url(#mucusGlow)"
          strokeWidth={viewMode === 'cross-section' ? 12 : 9}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeWidth: isChurning ? [9, 13, 9] : [8, 10.5, 8],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 4. THÂN DẠ DÀY CHÍNH (Cute Chubby 3D Organic Body) */}
        <motion.g
          animate={{
            scale: isChurning ? [1, 1.035, 0.98, 1] : [1, 1.012, 1],
            rotate: isChurning ? [0, 1.6, -1.6, 0] : [0, 0.3, 0]
          }}
          transition={{
            duration: isChurning ? 1.1 : 3.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transformOrigin: '190px 170px' }}
        >
          {/* Main Body Path */}
          <path
            d="M 148 78 C 215 78 280 108 278 174 C 275 240 212 278 140 260 C 98 250 90 215 116 198 C 144 178 162 152 148 118 C 144 102 136 88 128 78 Z"
            fill={viewMode === 'cross-section' ? 'url(#tissueGrad)' : 'url(#cuteStomach3D)'}
            stroke="#D90429"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* 3D Glossy Light Reflection */}
          <path
            d="M 170 85 C 220 86 265 110 268 150 C 255 118 215 98 170 94 Z"
            fill="url(#glossGrad)"
          />
          <ellipse cx="250" cy="138" rx="12" ry="26" fill="url(#glossGrad)" transform="rotate(25 250 138)" />

          {/* Rugae mucosal folds */}
          <g opacity={viewMode === 'cross-section' ? 0.65 : 0.25}>
            <path d="M 235 105 Q 248 135 240 170" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 215 95 Q 225 130 218 165" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 195 95 Q 202 125 195 155" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>

          {/* 5. VỊ CHẤP LỎNG & BỌT AXIT BÊN TRONG */}
          <g clipPath="url(#stomachClip)">
            {/* Gastric Liquid */}
            <motion.path
              d="M 80 220 Q 150 195 210 220 T 300 210 L 300 300 L 80 300 Z"
              fill="url(#chymeGrad)"
              opacity="0.9"
              animate={{
                d: [
                  "M 80 218 Q 150 195 210 220 T 300 208 L 300 300 L 80 300 Z",
                  "M 80 226 Q 150 208 210 215 T 300 218 L 300 300 L 80 300 Z",
                  "M 80 218 Q 150 195 210 220 T 300 208 L 300 300 L 80 300 Z"
                ]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glowing Ions & Food */}
            <g>
              <motion.g
                animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <text x="135" y="248" fontSize="10" fontWeight="bold" fill="#D90429">H⁺</text>
                <text x="240" y="240" fontSize="10" fontWeight="bold" fill="#D90429">Cl⁻</text>
                <text x="180" y="260" fontSize="9" fontWeight="extrabold" fill="#2B8A3E">Pepsin</text>
              </motion.g>

              {/* Digested Food Chunks */}
              <motion.g
                animate={{
                  y: isChurning ? [0, -18, 5, 0] : [0, -6, 0],
                  x: isChurning ? [0, 8, -6, 0] : [0, 3, 0],
                  rotate: isChurning ? [0, 35, -35, 0] : 0
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <rect x="155" y="244" width="8" height="8" rx="2" fill="#FF6B4A" stroke="#FFF" strokeWidth="0.8" />
                <circle cx="195" cy="249" r="4.8" fill="#40C057" stroke="#FFF" strokeWidth="0.8" />
                <ellipse cx="230" cy="246" rx="5.5" ry="3.5" fill="#FCC419" stroke="#FFF" strokeWidth="0.8" />
              </motion.g>

              {/* Bubbles */}
              <motion.circle cx="145" cy="235" r="2.5" fill="#FFFFFF" opacity="0.8" animate={{ y: [-2, -22], opacity: [0.8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
              <motion.circle cx="180" cy="226" r="3" fill="#FFFFFF" opacity="0.8" animate={{ y: [-2, -26], opacity: [0.8, 0] }} transition={{ duration: 1.6, delay: 0.3, repeat: Infinity }} />
              <motion.circle cx="215" cy="232" r="2.8" fill="#FFFFFF" opacity="0.8" animate={{ y: [-2, -24], opacity: [0.8, 0] }} transition={{ duration: 1.8, delay: 0.6, repeat: Infinity }} />
            </g>
          </g>

          {/* 6. THỨC ĂN RƠI XUỐNG (Falling food simulation) */}
          <AnimatePresence>
            {activeFoodAnim && (
              <motion.g
                initial={{ y: 0, opacity: 0, scale: 0.8 }}
                animate={{ y: [0, 35, 100, 150], opacity: [0, 1, 1, 0], scale: [0.9, 1.1, 1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: 'easeIn' }}
              >
                {activeFoodAnim === 'protein' && (
                  <g transform="translate(142, 20)">
                    <rect width="16" height="13" rx="3" fill="#E03131" stroke="#FFF" strokeWidth="1" />
                    <text x="3" y="10" fontSize="8.5" fill="#FFF" fontWeight="bold">🥩</text>
                  </g>
                )}
                {activeFoodAnim === 'fiber' && (
                  <g transform="translate(142, 20)">
                    <circle cx="8" cy="8" r="7" fill="#2F9E44" stroke="#FFF" strokeWidth="1" />
                    <text x="2" y="11" fontSize="8.5" fill="#FFF">🥦</text>
                  </g>
                )}
                {activeFoodAnim === 'water' && (
                  <g transform="translate(142, 20)">
                    <circle cx="8" cy="8" r="7" fill="#1C7ED6" stroke="#FFF" strokeWidth="1" />
                    <text x="2" y="11" fontSize="8.5" fill="#FFF">💧</text>
                  </g>
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* 7. KHUÔN MẶT CUTE KAWAII - HOÀN TOÀN KHÔNG BỊ CHE BỞI NHÃN */}
          {viewMode === 'cute' ? (
            <g transform="translate(186, 148)">
              {/* Doctor Headband Mirror */}
              <g transform="translate(0, -60)">
                <path d="M -30 4 Q 0 -2 30 4" stroke="#FFFFFF" strokeWidth="2.5" fill="none" opacity="0.8" />
                <circle cx="0" cy="0" r="10" fill="#E7F5FF" stroke="#339AF0" strokeWidth="2" />
                <circle cx="-2.5" cy="-2.5" r="3" fill="#FFFFFF" />
                <circle cx="0" cy="0" r="4" fill="#20C997" />
              </g>

              {/* Left Blushing Cheek */}
              <circle cx="-30" cy="8" r="10" fill="url(#blushGrad)" />
              {/* Right Blushing Cheek */}
              <circle cx="30" cy="8" r="10" fill="url(#blushGrad)" />

              {/* Left Eye */}
              <motion.g
                transform="translate(-18, -2)"
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.12 }}
              >
                <ellipse cx="0" cy="0" rx="6.5" ry="8" fill="#1A1B1E" />
                <circle cx="-2" cy="-3" r="2.8" fill="#FFFFFF" />
                <circle cx="2.2" cy="2.5" r="1.4" fill="#FFFFFF" />
              </motion.g>

              {/* Right Eye */}
              <motion.g
                transform="translate(18, -2)"
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.12 }}
              >
                <ellipse cx="0" cy="0" rx="6.5" ry="8" fill="#1A1B1E" />
                <circle cx="-2" cy="-3" r="2.8" fill="#FFFFFF" />
                <circle cx="2.2" cy="2.5" r="1.4" fill="#FFFFFF" />
              </motion.g>

              {/* Cute Smiling Mouth with Pink Tongue */}
              <g transform="translate(0, 10)">
                <path d="M -8 0 Q 0 14 8 0 Z" fill="#5C0011" stroke="#5C0011" strokeWidth="1" />
                <path d="M -5 4 Q 0 13 5 4 Z" fill="#FF8787" />
              </g>

              {/* Cute Waving Paws */}
              <motion.path
                d="M -52 14 C -62 10 -70 20 -60 26 C -52 30 -46 20 -46 16 Z"
                fill="#FFAAA6"
                stroke="#D90429"
                strokeWidth="2.2"
                animate={{ rotate: [-6, 14, -6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '-49px 16px' }}
              />
              <motion.path
                d="M 60 16 C 70 14 76 24 68 30 C 60 34 54 24 54 20 Z"
                fill="#FFAAA6"
                stroke="#D90429"
                strokeWidth="2.2"
                animate={{ rotate: [6, -14, 6] }}
                transition={{ duration: 1.6, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '57px 20px' }}
              />
            </g>
          ) : (
            /* Cross-Section Anatomy Card */
            <g transform="translate(140, 115)">
              <rect x="0" y="0" width="112" height="40" rx="10" fill="rgba(0, 0, 0, 0.55)" stroke="#63E6BE" strokeWidth="1.5" />
              <text x="10" y="15" fontSize="9.5" fontWeight="bold" fill="#63E6BE">🔬 3 LỚP CƠ ĐẶC BIỆT:</text>
              <text x="10" y="26" fontSize="8.5" fill="#FFF">• Cơ dọc (ngoài) • Cơ vòng (giữa)</text>
              <text x="10" y="36" fontSize="8.5" fill="#FFD43B">• Cơ chéo (trong cùng)</text>
            </g>
          )}
        </motion.g>

        {/* 8. CÁC ĐIỂM CHẠM GIẢI PHẪU TƯƠNG TÁC GỌN GÀNG (Clean Hotspot Pins, Not Blocking Face) */}
        {parts.map((p) => {
          const isActive = currentPart === p.id;
          return (
            <g
              key={p.id}
              className="cursor-pointer group"
              onClick={() => handlePartClick(p.id)}
              onMouseEnter={() => setInternalHover(p.id)}
              onMouseLeave={() => setInternalHover(null)}
            >
              {/* Pulsing ring */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 14 : 9}
                fill={p.color}
                fillOpacity={isActive ? 0.35 : 0.2}
                stroke={p.color}
                strokeWidth={isActive ? 2 : 1.2}
                animate={{ scale: isActive ? [1, 1.35, 1] : [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />

              {/* Pin button with number */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 8 : 6.5}
                fill={isActive ? p.color : '#FFFFFF'}
                stroke={p.color}
                strokeWidth="2"
                className="filter drop-shadow"
              />
              <text
                x={p.x}
                y={p.y + 3}
                textAnchor="middle"
                fontSize={isActive ? "9" : "8"}
                fontWeight="900"
                fill={isActive ? '#FFFFFF' : p.color}
              >
                {p.num}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Dynamic Anatomy Inspector Pill directly under stomach */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPart}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-sm text-center max-w-xs w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-black text-[#12343B]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: parts.find(p => p.id === currentPart)?.color || '#1FBFA8' }} />
            <span>{parts.find(p => p.id === currentPart)?.name}</span>
          </div>
          <span
            className="text-[9.5px] font-black px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${parts.find(p => p.id === currentPart)?.color}18`,
              color: parts.find(p => p.id === currentPart)?.color
            }}
          >
            {parts.find(p => p.id === currentPart)?.role}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CuteDetailedStomach;
