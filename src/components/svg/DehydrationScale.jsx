import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Droplets,
  Hand,
  Brain,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Heart,
  ChevronRight,
  Flame,
  Stethoscope
} from 'lucide-react';
import sfx from '../../audio/sfx';

export function DehydrationScale({ className = '' }) {
  const [level, setLevel] = useState(1); // 1 = Không mất nước, 2 = Có mất nước, 3 = Mất nước nặng

  const levels = {
    1: {
      num: 1,
      name: 'MỨC 1 · KHÔNG MẤT NƯỚC',
      subName: 'Dưới 5% trọng lượng cơ thể',
      protocol: 'Phác đồ A · Bù dịch Oresol tại nhà',
      protocolDesc: 'Cho uống Oresol (50–100ml sau mỗi lần đi ngoài), tiếp tục cho ăn/bú bình thường.',
      color: '#1FBFA8',
      lightBg: '#E3F7F2',
      borderGrad: 'from-[#1FBFA8] to-[#3BB8F0]',
      waterPercent: 95,
      waterY: 65, // Y coordinate of water line inside body
      eyes: {
        title: 'Mắt bình thường, sáng khỏe',
        desc: 'Mắt tinh anh, không trũng; có nước mắt tự nhiên khi khóc.'
      },
      thirst: {
        title: 'Uống nước bình thường',
        desc: 'Không khát quá mức, uống từng ngụm khoan thai.'
      },
      skin: {
        title: 'Nếp véo da: Phẳng ngay (< 2 giây)',
        desc: 'Độ đàn hồi turgor da rất tốt, phẳng lại tức thì.'
      },
      mind: {
        title: 'Tỉnh táo, linh hoạt, chơi ngoan',
        desc: 'Tiếp xúc hoàn toàn bình thường, không bứt rứt.'
      }
    },
    2: {
      num: 2,
      name: 'MỨC 2 · CÓ MẤT NƯỚC',
      subName: 'Mất 5% – 10% trọng lượng cơ thể',
      protocol: 'Phác đồ B · Bù Oresol tại Trạm Y tế',
      protocolDesc: 'Bù Oresol tích cực trong 4 giờ đầu (75ml × cân nặng kg), theo dõi sát sao.',
      color: '#FF8A5B',
      lightBg: '#FFF2EB',
      borderGrad: 'from-[#FFD166] to-[#FF8A5B]',
      waterPercent: 65,
      waterY: 155, // Y coordinate drops to abdomen
      eyes: {
        title: 'Mắt trũng sâu, quầng thâm rõ',
        desc: 'Hốc mắt hõm vào, khô rát; khóc ít hoặc không có nước mắt.'
      },
      thirst: {
        title: 'Khát nước dữ dội, uống vồ vập',
        desc: 'Háo hức đòi uống, với lấy cốc nước uống liên tục.'
      },
      skin: {
        title: 'Nếp véo da: Mất chậm (≤ 2 giây)',
        desc: 'Thành bụng phẳng lại từ từ, độ đàn hồi mô giảm sút.'
      },
      mind: {
        title: 'Bứt rứt, vật vã, quấy khóc',
        desc: 'Kích thích, cáu kỉnh, không nằm yên, khó dỗ.'
      }
    },
    3: {
      num: 3,
      name: 'MỨC 3 · MẤT NƯỚC NẶNG',
      subName: 'Mất > 10% trọng lượng (Báo động đỏ)',
      protocol: 'Phác đồ C · CẤP CỨU 115 TRUYỀN DỊCH TĨNH MẠCH',
      protocolDesc: 'Thiết lập ngay đường truyền tĩnh mạch Ringer Lactate (100ml/kg), chống sốc kiệt nước.',
      color: '#EF4B5F',
      lightBg: '#FFE9EC',
      borderGrad: 'from-[#EF4B5F] to-[#C2410C]',
      waterPercent: 30,
      waterY: 225, // Y coordinate drops to pelvis/legs
      eyes: {
        title: 'Mắt rất trũng sâu, khô khốc',
        desc: 'Mí mắt sụp lờ đờ, nhãn cầu thụt sâu, tuyệt đối không có nước mắt.'
      },
      thirst: {
        title: 'Không thể uống được / Uống rất kém',
        desc: 'Mất phản xạ nuốt do hôn mê hoặc nôn tất cả mọi thứ.'
      },
      skin: {
        title: 'Nếp véo da: Mất rất chậm (> 2 giây)',
        desc: 'Nếp gấp da nhô cao nhăn nheo, trên 2 giây mới phẳng lại.'
      },
      mind: {
        title: 'Li bì, hôn mê khó đánh thức',
        desc: 'Thờ ơ với xung quanh, đầu chi lạnh ngắt, mạch nhanh nhỏ, tụt huyết áp.'
      }
    }
  };

  const cur = levels[level];

  return (
    <div
      className={`w-full h-full p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between ${className}`}
    >
      {/* 1. Header: 3 Segmented Level Selectors */}
      <div className="grid grid-cols-3 gap-2 mb-2.5 shrink-0">
        {[1, 2, 3].map((lvl) => {
          const isSelected = level === lvl;
          const info = levels[lvl];
          return (
            <button
              key={lvl}
              onClick={() => {
                sfx.tick();
                setLevel(lvl);
              }}
              className={`p-2.5 rounded-2xl text-left transition-all border relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'text-white shadow-md border-transparent scale-101'
                  : 'bg-slate-50/80 hover:bg-slate-100 text-[#12343B] border-slate-200/70'
              }`}
              style={{
                backgroundColor: isSelected ? info.color : undefined
              }}
            >
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#5B7B80]'
                  }`}
                >
                  MỨC {lvl}
                </span>
                {lvl === 3 && (
                  <span className="text-[10px] animate-pulse">🚨</span>
                )}
              </div>
              <div className="font-heading font-extrabold text-xs truncate">
                {lvl === 1 ? 'Không mất nước' : lvl === 2 ? 'Có mất nước' : 'Mất nước nặng'}
              </div>
              <div
                className={`text-[9.5px] truncate font-semibold mt-0.5 ${
                  isSelected ? 'text-white/90' : 'text-[#64748B]'
                }`}
              >
                {lvl === 1 ? 'Phác đồ A (Tại nhà)' : lvl === 2 ? 'Phác đồ B (Trạm Y tế)' : 'Phác đồ C (Cấp cứu 115)'}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Middle Main Section: Detailed Anatomical Body Fluid Model + Clinical Assessment Cards */}
      <div className="grid grid-cols-12 gap-3.5 items-center flex-1 min-h-0 my-1">
        {/* Left Column: Anatomical Silhouette & Internal Fluid Waves (Col 1-5) */}
        <div className="col-span-5 flex flex-col items-center justify-center relative h-full max-h-[310px]">
          {/* Fluid Volume Badge */}
          <div className="w-full flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] font-extrabold text-[#5B7B80] uppercase tracking-wider">
              Nước nội tại cơ thể
            </span>
            <span
              className="text-xs font-heading font-black px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${cur.color}20`, color: cur.color }}
            >
              {cur.waterPercent}%
            </span>
          </div>

          {/* SVG Anatomical Human Body Silhouette */}
          <div className="relative w-full flex items-center justify-center flex-1 min-h-0">
            <svg
              viewBox="0 0 200 270"
              className="h-full max-h-[250px] w-auto overflow-visible filter drop-shadow-md"
            >
              <defs>
                {/* Master Silhouette Clip Path (Đường viền giải phẫu cơ thể người chi tiết) */}
                <clipPath id="humanSilhouetteClip">
                  <path
                    d="
                      M 100 12
                      C 114 12, 124 23, 124 38
                      C 124 50, 118 58, 110 63
                      C 112 68, 118 72, 128 75
                      C 142 79, 158 88, 158 105
                      C 158 122, 150 148, 145 160
                      C 140 172, 134 172, 130 170
                      C 128 160, 132 125, 128 112
                      C 126 122, 126 150, 128 178
                      C 130 196, 134 220, 132 258
                      C 131 262, 118 262, 116 258
                      C 114 230, 110 200, 102 188
                      C 98 200, 94 230, 92 258
                      C 90 262, 77 262, 76 258
                      C 74 220, 78 196, 80 178
                      C 82 150, 82 122, 80 112
                      C 76 125, 80 160, 78 170
                      C 74 172, 68 172, 63 160
                      C 58 148, 50 122, 50 105
                      C 50 88, 66 79, 80 75
                      C 90 72, 96 68, 98 63
                      C 90 58, 84 50, 84 38
                      C 84 23, 94 12, 100 12
                      Z
                    "
                  />
                </clipPath>

                {/* Level 1 Fluid Gradient (Xanh ngọc mát lành) */}
                <linearGradient id="fluidGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity="0.95" />
                </linearGradient>

                {/* Level 2 Fluid Gradient (Hổ phách báo động) */}
                <linearGradient id="fluidGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F97316" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#C2410C" stopOpacity="0.95" />
                </linearGradient>

                {/* Level 3 Fluid Gradient (Đỏ cấp cứu kiệt nước) */}
                <linearGradient id="fluidGrad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F87171" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#DC2626" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#991B1B" stopOpacity="0.95" />
                </linearGradient>

                {/* Shading filter */}
                <filter id="bodyShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Background Body Base Silhouette (Bóng mờ giải phẫu cơ thể) */}
              <path
                d="
                  M 100 12
                  C 114 12, 124 23, 124 38
                  C 124 50, 118 58, 110 63
                  C 112 68, 118 72, 128 75
                  C 142 79, 158 88, 158 105
                  C 158 122, 150 148, 145 160
                  C 140 172, 134 172, 130 170
                  C 128 160, 132 125, 128 112
                  C 126 122, 126 150, 128 178
                  C 130 196, 134 220, 132 258
                  C 131 262, 118 262, 116 258
                  C 114 230, 110 200, 102 188
                  C 98 200, 94 230, 92 258
                  C 90 262, 77 262, 76 258
                  C 74 220, 78 196, 80 178
                  C 82 150, 82 122, 80 112
                  C 76 125, 80 160, 78 170
                  C 74 172, 68 172, 63 160
                  C 58 148, 50 122, 50 105
                  C 50 88, 66 79, 80 75
                  C 90 72, 96 68, 98 63
                  C 90 58, 84 50, 84 38
                  C 84 23, 94 12, 100 12
                  Z
                "
                fill="#F1F5F9"
                stroke={cur.color}
                strokeWidth="2.5"
                filter="url(#bodyShadow)"
              />

              {/* Internal Fluid Level (Mực nước sinh học dâng hạ theo % nước) */}
              <g clipPath="url(#humanSilhouetteClip)">
                {/* Base Fluid Level Box */}
                <motion.rect
                  x="0"
                  y={cur.waterY}
                  width="200"
                  height="270"
                  fill={`url(#${level === 1 ? 'fluidGrad1' : level === 2 ? 'fluidGrad2' : 'fluidGrad3'})`}
                  initial={false}
                  animate={{ y: cur.waterY }}
                  transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                />

                {/* Animated Wave Surface */}
                <motion.path
                  d="M 0 0 Q 35 -6 70 0 T 140 0 T 210 0 V 20 H 0 Z"
                  fill={level === 1 ? '#67E8F9' : level === 2 ? '#FDE68A' : '#FCA5A5'}
                  opacity="0.45"
                  initial={false}
                  animate={{
                    y: cur.waterY,
                    x: [0, -70, 0]
                  }}
                  transition={{
                    y: { type: 'spring', stiffness: 50, damping: 15 },
                    x: { repeat: Infinity, duration: 4, ease: 'linear' }
                  }}
                />

                {/* Floating Electrolyte Ions (Hạt điện giải Na+, K+, Cl- lơ lửng) */}
                {level === 1 && (
                  <g opacity="0.8">
                    <circle cx="85" cy="110" r="3" fill="#FFFFFF" />
                    <circle cx="115" cy="135" r="2.5" fill="#FFFFFF" />
                    <circle cx="95" cy="160" r="3.5" fill="#FFFFFF" />
                    <circle cx="108" cy="190" r="2.5" fill="#FFFFFF" />
                    <text x="85" y="112" fontSize="5" fontWeight="bold" fill="#0F766E" textAnchor="middle">Na⁺</text>
                    <text x="115" y="137" fontSize="5" fontWeight="bold" fill="#0F766E" textAnchor="middle">K⁺</text>
                    <text x="95" y="162" fontSize="5" fontWeight="bold" fill="#0F766E" textAnchor="middle">Cl⁻</text>
                  </g>
                )}

                {level === 2 && (
                  <g opacity="0.6">
                    <circle cx="90" cy="180" r="3" fill="#FFFFFF" />
                    <circle cx="112" cy="205" r="2.5" fill="#FFFFFF" />
                    <text x="90" y="182" fontSize="5" fontWeight="bold" fill="#C2410C" textAnchor="middle">Na⁺</text>
                  </g>
                )}

                {/* Level 3 Dry Dehydrated Indicator */}
                {level === 3 && (
                  <g opacity="0.7">
                    <text x="100" y="140" fontSize="8" fontWeight="bold" fill="#DC2626" textAnchor="middle">
                      KIỆT DỊCH
                    </text>
                    <line x1="75" y1="150" x2="125" y2="150" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 2" />
                  </g>
                )}
              </g>

              {/* Heart Pulse Icon at Chest */}
              <g transform="translate(108, 95)">
                <circle cx="0" cy="0" r="8" fill="#FFFFFF" stroke={cur.color} strokeWidth="1.5" />
                <Heart
                  size={10}
                  className={`-translate-x-1.2 -translate-y-1.2 ${
                    level === 1 ? 'text-[#1FBFA8]' : level === 2 ? 'text-[#FF8A5B] animate-pulse' : 'text-[#EF4B5F] animate-ping'
                  }`}
                  style={{ color: cur.color }}
                />
              </g>

              {/* Detailed Facial Features (Biểu cảm khuôn mặt theo cấp độ) */}
              {level === 1 && (
                <g>
                  {/* Bright healthy eyes */}
                  <ellipse cx="94" cy="35" rx="2.5" ry="3" fill="#0F172A" />
                  <circle cx="95" cy="34" r="0.8" fill="#FFFFFF" />
                  <ellipse cx="106" cy="35" rx="2.5" ry="3" fill="#0F172A" />
                  <circle cx="107" cy="34" r="0.8" fill="#FFFFFF" />
                  {/* Subtle Smile */}
                  <path d="M 96 44 Q 100 48 104 44" fill="none" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
                  {/* Hydrated rosy cheeks */}
                  <circle cx="90" cy="40" r="2.5" fill="#FDA4AF" opacity="0.6" />
                  <circle cx="110" cy="40" r="2.5" fill="#FDA4AF" opacity="0.6" />
                </g>
              )}

              {level === 2 && (
                <g>
                  {/* Sunken eyes with dark orbits */}
                  <circle cx="94" cy="35" r="4.5" fill="#FED7AA" opacity="0.6" />
                  <ellipse cx="94" cy="35" rx="2" ry="2" fill="#0F172A" />
                  <circle cx="106" cy="35" r="4.5" fill="#FED7AA" opacity="0.6" />
                  <ellipse cx="106" cy="35" rx="2" ry="2" fill="#0F172A" />
                  {/* Irritable tight lips */}
                  <line x1="96" y1="45" x2="104" y2="45" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
                </g>
              )}

              {level === 3 && (
                <g>
                  {/* Deeply sunken hollow eyes */}
                  <ellipse cx="94" cy="35" rx="5.5" ry="4" fill="#FECDD3" opacity="0.8" />
                  <line x1="91" y1="35" x2="97" y2="35" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="106" cy="35" rx="5.5" ry="4" fill="#FECDD3" opacity="0.8" />
                  <line x1="103" y1="35" x2="109" y2="35" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                  {/* Dry drooping parched mouth */}
                  <path d="M 95 47 Q 100 43 105 47" fill="none" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              )}

              {/* Skin Pinch HUD Magnifier Callout (Kính lúp soi chi tiết nếp véo da bụng) */}
              <g transform="translate(42, 145)">
                {/* Pointer Line */}
                <line x1="50" y1="0" x2="15" y2="0" stroke={cur.color} strokeWidth="1.5" strokeDasharray="2 2" />
                {/* HUD Lens Circle */}
                <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke={cur.color} strokeWidth="2.5" filter="url(#bodyShadow)" />
                <circle cx="0" cy="0" r="19" fill={cur.lightBg} opacity="0.5" />
                
                {/* Hand Pinch Icon */}
                <g transform="translate(0, -3)">
                  <path
                    d={
                      level === 1
                        ? "M -8 3 Q 0 0 8 3" // Skin flat
                        : level === 2
                        ? "M -8 5 Q 0 -4 8 5" // Skin peaked moderately
                        : "M -8 7 Q 0 -9 8 7" // Skin severely tented
                    }
                    fill="none"
                    stroke={cur.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <text x="0" y="14" fontSize="7.5" fontWeight="900" fill={cur.color} textAnchor="middle">
                    {level === 3 ? '> 2 giây' : level === 2 ? '≈ 2 giây' : '< 2 giây'}
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Volume Measurement Scale Indicator Bar */}
          <div className="w-full flex items-center gap-1.5 px-3 mt-1">
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200/60">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    level === 1
                      ? 'linear-gradient(to right, #14B8A6, #38BDF8)'
                      : level === 2
                      ? 'linear-gradient(to right, #F59E0B, #FF8A5B)'
                      : 'linear-gradient(to right, #EF4444, #991B1B)'
                }}
                initial={false}
                animate={{ width: `${cur.waterPercent}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: 4 Clinical Assessment Cards (Col 6-12) */}
        <div className="col-span-7 flex flex-col justify-between h-full space-y-1.5">
          {/* 1. Mắt & Tuyến lệ */}
          <div className="p-2.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:bg-white hover:shadow-xs transition-all flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${cur.color}15`, color: cur.color }}
            >
              <Eye size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-[11px] text-[#12343B]">
                  1. Mắt &amp; Tuyến lệ:
                </span>
                <span
                  className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md"
                  style={{ backgroundColor: `${cur.color}18`, color: cur.color }}
                >
                  {level === 1 ? 'Bình thường' : level === 2 ? 'Trũng rõ' : 'Rất trũng / Khô'}
                </span>
              </div>
              <p className="text-[11px] text-[#334155] font-semibold mt-0.5">
                {cur.eyes.title}
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight">
                {cur.eyes.desc}
              </p>
            </div>
          </div>

          {/* 2. Cơn khát & Phản xạ uống */}
          <div className="p-2.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:bg-white hover:shadow-xs transition-all flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${cur.color}15`, color: cur.color }}
            >
              <Droplets size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-[11px] text-[#12343B]">
                  2. Cơn khát &amp; Khả năng uống:
                </span>
                <span
                  className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md"
                  style={{ backgroundColor: `${cur.color}18`, color: cur.color }}
                >
                  {level === 1 ? 'Bình thường' : level === 2 ? 'Khát vồ vập' : 'Không uống được'}
                </span>
              </div>
              <p className="text-[11px] text-[#334155] font-semibold mt-0.5">
                {cur.thirst.title}
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight">
                {cur.thirst.desc}
              </p>
            </div>
          </div>

          {/* 3. Nếp véo da bụng (Skin Pinch) */}
          <div className="p-2.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:bg-white hover:shadow-xs transition-all flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${cur.color}15`, color: cur.color }}
            >
              <Hand size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-[11px] text-[#12343B]">
                  3. Nếp véo da (Skin Pinch Test):
                </span>
                <span
                  className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md"
                  style={{ backgroundColor: `${cur.color}18`, color: cur.color }}
                >
                  {level === 1 ? '< 2 giây' : level === 2 ? '≈ 2 giây' : '> 2 giây (Cờ đỏ)'}
                </span>
              </div>
              <p className="text-[11px] text-[#334155] font-semibold mt-0.5">
                {cur.skin.title}
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight">
                {cur.skin.desc}
              </p>
            </div>
          </div>

          {/* 4. Tri giác & Toàn thân */}
          <div className="p-2.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:bg-white hover:shadow-xs transition-all flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${cur.color}15`, color: cur.color }}
            >
              <Brain size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading font-extrabold text-[11px] text-[#12343B]">
                  4. Tri giác &amp; Trạng thái thần kinh:
                </span>
                <span
                  className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md"
                  style={{ backgroundColor: `${cur.color}18`, color: cur.color }}
                >
                  {level === 1 ? 'Tỉnh táo' : level === 2 ? 'Bứt rứt' : 'Li bì / Hôn mê'}
                </span>
              </div>
              <p className="text-[11px] text-[#334155] font-semibold mt-0.5">
                {cur.mind.title}
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight">
                {cur.mind.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Treatment Protocol Banner (Phác đồ xử trí chuẩn của Bộ Y tế & WHO) */}
      <div
        className="w-full p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs shrink-0 mt-2 shadow-2xs"
        style={{
          backgroundColor: `${cur.color}12`,
          borderColor: `${cur.color}35`
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0 shadow-2xs"
            style={{ backgroundColor: cur.color }}
          >
            {level === 1 ? 'A' : level === 2 ? 'B' : 'C'}
          </div>
          <div className="min-w-0">
            <div className="font-heading font-extrabold text-xs" style={{ color: cur.color }}>
              {cur.protocol}
            </div>
            <div className="text-[10.5px] text-[#475569] font-medium truncate">
              {cur.protocolDesc}
            </div>
          </div>
        </div>

        <span
          className="text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 hidden sm:inline"
          style={{ backgroundColor: `${cur.color}20`, color: cur.color }}
        >
          {level === 1 ? 'Nhẹ' : level === 2 ? 'Trung bình' : 'Khẩn cấp'}
        </span>
      </div>
    </div>
  );
}

export default DehydrationScale;