import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* Slide7UlcerPrevention v4 — 100% Custom Multi-Layer SVG (4 Khiên Bảo Vệ Dạ Dày + Đĩa Dinh Dưỡng + Đồng Hồ Sinh Học 24h) */

const SHIELDS = [
  {
    id: 1,
    svg: 'shieldHp',
    color: '#14B8A6',
    title: 'Khiên ① Sạch nguồn H. pylori',
    badge: 'Cắt đứt lây truyền',
    desc: 'Ăn chín uống sôi, dùng bát đũa gắp riêng, rửa tay xà phòng 6 bước trước ăn; tuân thủ đủ phác đồ kháng sinh diệt HP của bác sĩ.',
  },
  {
    id: 2,
    svg: 'shieldMed',
    color: '#0EA5E9',
    title: 'Khiên ② Dùng thuốc an toàn',
    badge: 'Bảo vệ niêm mạc',
    desc: 'Không tự ý lạm dụng thuốc giảm đau NSAID hoặc Corticoid kéo dài; luôn uống sau ăn no và dùng kèm thuốc bảo vệ dạ dày khi có chỉ định.',
  },
  {
    id: 3,
    svg: 'shieldDiet',
    color: '#F59E0B',
    title: 'Khiên ③ Ăn uống khoa học',
    badge: 'Thức ăn mềm dịu',
    desc: 'Ăn đúng giờ, nhai kỹ, không bỏ bữa; ưu tiên món luộc hấp chín mềm (cháo yến mạch, rau củ hấp); tránh đồ cay chua gắt, rượu bia.',
  },
  {
    id: 4,
    svg: 'shieldLife',
    color: '#8B5CF6',
    title: 'Khiên ④ Sống lành mạnh',
    badge: 'Cân bằng thần kinh',
    desc: 'Bỏ thuốc lá hoàn toàn, ngủ đủ 7–8 giờ trước 23h, không nằm ngay sau ăn; giải tỏa stress bằng hít thở sâu, đi bộ, yoga.',
  },
];

function playSfx() {
  try {
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    if (!playSfx.ctx) playSfx.ctx = new AC();
    const ctx = playSfx.ctx;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(1180, now + 0.065);
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch { /* ignore */ }
}

/* ─── Bộ Minh Họa Vector SVG Đa Lớp Cho 4 Khiên & Món Ăn Thực Dưỡng (64x64) ─── */
function PreventionSvg({ name, size = 38 }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'shieldHp':
      return (
        <svg {...p}>
          <path d="M32 6L54 15V31.5C54 45.5 44.5 55 32 59C19.5 55 10 45.5 10 31.5V15L32 6Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M32 12L48 18.5V31C48 41.5 41 49 32 52.5C23 49 16 41.5 16 31V18.5L32 12Z" fill="#14B8A6" />
          <path d="M22.5 32.5L29 39L42 25.5" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'shieldMed':
      return (
        <svg {...p}>
          <path d="M32 6L54 15V31.5C54 45.5 44.5 55 32 59C19.5 55 10 45.5 10 31.5V15L32 6Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.2" strokeLinejoin="round" />
          <g transform="rotate(-30 32 32)">
            <rect x="17" y="24" width="30" height="16" rx="8" fill="#fff" stroke="#0369A1" strokeWidth="2.8" />
            <path d="M32 24H39A8 8 0 0 1 39 40H32V24Z" fill="#0EA5E9" />
          </g>
        </svg>
      );
    case 'shieldDiet':
      return (
        <svg {...p}>
          <path d="M32 6L54 15V31.5C54 45.5 44.5 55 32 59C19.5 55 10 45.5 10 31.5V15L32 6Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M18 31H46C46 41 40 47 32 47C24 47 18 41 18 31Z" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
          <ellipse cx="32" cy="31" rx="14" ry="4.5" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
          <path d="M26 22C26 19 29 18 29 15M36 22C36 19 39 18 39 15" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'shieldLife':
      return (
        <svg {...p}>
          <path d="M32 6L54 15V31.5C54 45.5 44.5 55 32 59C19.5 55 10 45.5 10 31.5V15L32 6Z" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M32 47C32 47 18 37.5 18 27C18 21.8 22.2 18 27 18C29.8 18 32 19.8 32 22C32 19.8 34.2 18 37 18C41.8 18 46 21.8 46 27C46 37.5 32 47 32 47Z" fill="#8B5CF6" stroke="#fff" strokeWidth="2.2" />
        </svg>
      );

    /* Minh họa Bát cháo yến mạch chuối hoa quả (Thay thế ảnh lỗi đường dẫn) */
    case 'oatmealBowlArt':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="60" height="60" rx="16" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          <path d="M22 14C22 10.5 25 9.5 25 6M32 12C32 8.5 35 7.5 35 4M42 14C42 10.5 45 9.5 45 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="32" cy="27" rx="22" ry="8.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          {/* Lát chuối vàng, dâu tây & việt quất */}
          <circle cx="23" cy="26" r="4.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="31" cy="25" r="4.5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="40" cy="27" r="4" fill="#EF4444" />
          <circle cx="27" cy="29.5" r="2.5" fill="#3B82F6" />
          <circle cx="35" cy="29" r="2.5" fill="#3B82F6" />
          <path d="M10 27C10 42 19 52 32 52C45 52 54 42 54 27H10Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="2.8" />
          <path d="M17 34C19 41 24 46 30 47.5" stroke="#99F6E4" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    /* Minh họa Đĩa rau củ hấp thanh đạm (Thay thế ảnh lỗi đường dẫn) */
    case 'steamedVeggiesArt':
      return (
        <svg {...p}>
          <rect x="2" y="2" width="60" height="60" rx="16" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
          <ellipse cx="32" cy="46" rx="23" ry="8" fill="#fff" stroke="#10B981" strokeWidth="2.5" />
          {/* Bông cải xanh, cà rốt & bí đỏ hấp */}
          <circle cx="23" cy="31" r="9" fill="#22C55E" stroke="#15803D" strokeWidth="2.4" />
          <circle cx="33" cy="26" r="10.5" fill="#4ADE80" stroke="#15803D" strokeWidth="2.4" />
          <circle cx="42" cy="33" r="8" fill="#16A34A" stroke="#15803D" strokeWidth="2.4" />
          <circle cx="26" cy="41" r="4.5" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" />
          <circle cx="37" cy="42" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.8" />
        </svg>
      );
    case 'bulb':
      return (
        <svg {...p}>
          <circle cx="32" cy="26" r="16" fill="#FDE047" stroke="#D97706" strokeWidth="3.5" />
          <path d="M24 45H40M26 52H38" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Đĩa Dinh Dưỡng Cân Bằng & Đồng Hồ Sinh Học 24h (SVG 96x96) ─── */
function HealthyPlateSvg({ size = 94 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="50" r="45" fill="#fff" stroke="#14B8A6" strokeWidth="4" />
      <circle cx="50" cy="50" r="36" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="2" />
      {/* 1/2 Đĩa: Rau xanh & trái cây mềm */}
      <path d="M50 14 A36 36 0 0 0 50 86 Z" fill="#34D399" fillOpacity=".35" />
      {/* 1/4 Đĩa: Tinh bột mềm dễ tiêu */}
      <path d="M50 14 A36 36 0 0 1 86 50 H50 Z" fill="#FBBF24" fillOpacity=".4" />
      {/* 1/4 Đĩa: Đạm nạc (cá, ức gà, đậu hũ) */}
      <path d="M86 50 A36 36 0 0 1 50 86 V50 Z" fill="#FB7185" fillOpacity=".38" />
      <line x1="50" y1="14" x2="50" y2="86" stroke="#fff" strokeWidth="3" />
      <line x1="50" y1="50" x2="86" y2="50" stroke="#fff" strokeWidth="3" />
      <text x="31" y="53" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#065F46">Rau mềm</text>
      <text x="65" y="38" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#92400E">Cháo/Cơm</text>
      <text x="65" y="67" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#9F1239">Đạm nạc</text>
    </svg>
  );
}

function Clock24hSvg({ size = 94 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="50" r="45" fill="#fff" stroke="#0EA5E9" strokeWidth="4" />
      <circle cx="50" cy="50" r="37" fill="#F0F9FF" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="16"
          x2="50"
          y2={deg % 90 === 0 ? '22' : '19'}
          stroke="#0284C7"
          strokeWidth={deg % 90 === 0 ? '3' : '1.8'}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <path d="M50 50 L50 27 M50 50 L68 58" stroke="#0F2E35" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4.5" fill="#14B8A6" />
      <rect x="22" y="70" width="56" height="15" rx="7.5" fill="#0284C7" />
      <text x="50" y="80.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff">
        ĐÚNG GIỜ • NGỦ &lt;23H
      </text>
    </svg>
  );
}

/* ─── Nhân Vật Dạ Dày Khỏe Mạnh Được Bao Bọc Bởi 4 Khiên ─── */
function ProtectedStomachSvg({ shieldCount = 4 }) {
  const ratio = shieldCount / 4;
  const body = 'M84 8Q84 0 94 0H104Q114 0 114 10V40C114 56 160 56 178 96C196 138 160 190 110 188C66 186 36 160 38 124C40 100 58 90 74 82C86 76 84 60 84 44Z';

  return (
    <svg viewBox="0 -28 220 238" width={185} height={198} className="overflow-visible select-none">
      <defs>
        <radialGradient id="s7StomGrad" cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FFD1C7" />
          <stop offset="68%" stopColor="#FF8573" />
          <stop offset="100%" stopColor="#E05344" />
        </radialGradient>
      </defs>

      <ellipse cx="108" cy="202" rx="54" ry="5.5" fill="#12343B" opacity=".12" />

      {/* Hào quang bảo vệ tỉ lệ theo số khiên bật */}
      <motion.path
        d={body}
        transform="translate(-9 -9) scale(1.085)"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${ratio * 18} ${(1 - ratio) * 18 + 2}`}
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Vương miện vàng khi bật đủ 4 khiên */}
        {shieldCount === 4 && (
          <g transform="translate(99 2)">
            <path d="M-18 0L-20 -20L-9 -11L0 -25L9 -11L20 -20L18 0Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="0" cy="-25" r="3" fill="#F43F5E" />
            <circle cx="-20" cy="-20" r="2.5" fill="#14B8A6" />
            <circle cx="20" cy="-20" r="2.5" fill="#0EA5E9" />
          </g>
        )}

        <ellipse cx="86" cy="192" rx="14" ry="8" fill="#FF8573" stroke="#fff" strokeWidth="2" />
        <ellipse cx="130" cy="192" rx="14" ry="8" fill="#FF8573" stroke="#fff" strokeWidth="2" />
        <ellipse cx="34" cy="130" rx="10" ry="17" fill="#FF8573" stroke="#fff" strokeWidth="2" />
        <ellipse cx="186" cy="130" rx="10" ry="17" fill="#FF8573" stroke="#fff" strokeWidth="2" />

        <path d={body} fill="url(#s7StomGrad)" stroke="#fff" strokeWidth="3.5" />
        <path d="M58 112C61 96 72 90 85 86" stroke="#fff" strokeOpacity=".58" strokeWidth="6.5" strokeLinecap="round" fill="none" />

        <ellipse cx="79" cy="136" rx="9.5" ry="5.5" fill="#F43F5E" opacity=".48" />
        <ellipse cx="139" cy="136" rx="9.5" ry="5.5" fill="#F43F5E" opacity=".48" />
        {[94, 124].map((x) => (
          <g key={x}>
            <circle cx={x} cy="124" r="9.2" fill="#12343B" />
            <circle cx={x - 3} cy="120.5" r="3.5" fill="#fff" />
            <circle cx={x + 3} cy="127" r="1.8" fill="#fff" />
          </g>
        ))}
        <path d="M86 108Q94 102 102 108M116 108Q124 102 132 108" stroke="#12343B" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M95 140Q109 162 123 140Z" fill="#7F1D1D" />
        <ellipse cx="109" cy="150" rx="6.2" ry="4" fill="#FB7185" />
      </motion.g>
    </svg>
  );
}

export function Slide7UlcerPrevention() {
  const [activeShields, setActiveShields] = useState([1, 2, 3, 4]);

  const toggleShield = useCallback((id) => {
    playSfx();
    setActiveShields((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((s) => s !== id) : prev;
      }
      return [...prev, id];
    });
  }, []);

  const pct = activeShields.length * 25;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-10 py-2.5 gap-2 select-none bg-gradient-to-br from-[#ECFDF5] via-[#F8FAFC] to-[#FFFBEB] rounded-3xl overflow-hidden">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#0D9488] tracking-widest uppercase">
            SLIDE 07 • CHIẾN LƯỢC DỰ PHÒNG & CHĂM SÓC DẠ DÀY
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B]">
            4 Khiên Bảo Vệ Niêm Mạc Dạ Dày Toàn Diện
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-semibold max-w-md md:text-right">
          Chủ động cắt đứt nguồn lây H. pylori, dùng thuốc chuẩn y khoa, ăn mềm đúng bữa và giữ tinh thần thư thái.
        </p>
      </div>

      {/* Main Content Area: 4 Shields + Center Stomach + Food/Clock SVGs */}
      <div className="grid grid-cols-12 gap-4 items-center flex-1 my-0.5 min-h-0">
        {/* Left 2 Shields (Col 1-4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-2.5">
          {SHIELDS.slice(0, 2).map((s) => {
            const isActive = activeShields.includes(s.id);
            return (
              <motion.div
                key={s.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleShield(s.id)}
                className={`p-3.5 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex items-start gap-3 ${
                  isActive
                    ? 'bg-white shadow-lg border-[#14B8A6]'
                    : 'bg-white/65 hover:bg-white/90 border-white opacity-70'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  <PreventionSvg name={s.svg} size={40} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-heading font-extrabold text-xs md:text-sm text-[#12343B]">
                      {s.title}
                    </span>
                    <span
                      className="text-[9.5px] font-black px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${s.color}18`, color: s.color }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#5B7B80] font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Thẻ Minh họa SVG 1: Cháo yến mạch hoa quả mềm dịu */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-white shadow-sm">
            <div className="shrink-0">
              <PreventionSvg name="oatmealBowlArt" size={52} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#12343B]">Cháo yến mạch chuối chín mềm</div>
              <div className="text-[11px] font-semibold text-[#5B7B80]">Giàu chất xơ hòa tan Beta-glucan giúp bao phủ và làm dịu niêm mạc</div>
            </div>
          </div>
        </div>

        {/* Center: Nhân Vật Dạ Dày + Thanh Mức Độ Bảo Vệ + Đĩa Ăn / Đồng Hồ 24h */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center">
          <ProtectedStomachSvg shieldCount={activeShields.length} />

          <div className="w-full max-w-xs mt-1 p-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-white text-center shadow-md">
            <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
              <span className="text-[#12343B]">Chỉ số bảo vệ niêm mạc:</span>
              <span className="text-[#0D9488] font-black text-base">{pct}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] rounded-full"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[10.5px] font-semibold text-[#5B7B80] mt-1 block">
              Chạm vào 4 thẻ khiên hai bên để bật/tắt từng lớp bảo vệ
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2.5">
            <HealthyPlateSvg size={94} />
            <Clock24hSvg size={94} />
          </div>
        </div>

        {/* Right 2 Shields (Col 9-12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-2.5">
          {SHIELDS.slice(2, 4).map((s) => {
            const isActive = activeShields.includes(s.id);
            return (
              <motion.div
                key={s.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleShield(s.id)}
                className={`p-3.5 rounded-3xl cursor-pointer transition-all duration-300 border-2 flex items-start gap-3 ${
                  isActive
                    ? 'bg-white shadow-lg border-[#14B8A6]'
                    : 'bg-white/65 hover:bg-white/90 border-white opacity-70'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  <PreventionSvg name={s.svg} size={40} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-heading font-extrabold text-xs md:text-sm text-[#12343B]">
                      {s.title}
                    </span>
                    <span
                      className="text-[9.5px] font-black px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${s.color}18`, color: s.color }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#5B7B80] font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Thẻ Minh họa SVG 2: Rau củ hấp thanh đạm */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-white shadow-sm">
            <div className="shrink-0">
              <PreventionSvg name="steamedVeggiesArt" size={52} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-[#12343B]">Rau củ hấp thanh đạm ít dầu mỡ</div>
              <div className="text-[11px] font-semibold text-[#5B7B80]">Giàu Vitamin U, Sulforaphane & Flavonoid hỗ trợ lành vết trợt loét</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Advice Box */}
      <div className="w-full p-2.5 px-4 rounded-2xl bg-[#E3F7F2] border border-[#14B8A6]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#0F766E] font-bold shadow-sm">
        <div className="flex items-center gap-2.5">
          <PreventionSvg name="bulb" size={20} />
          <span>
            <strong>Nguyên tắc điều trị chuẩn:</strong> Giảm đau rát không đồng nghĩa ổ loét đã liền sẹo — cần uống đủ liệu trình thuốc ức chế axit (PPI) và kháng sinh tiệt trừ H. pylori theo đơn bác sĩ!
          </span>
        </div>
        <span className="text-[11px] font-extrabold opacity-85 whitespace-nowrap">
          Nguồn: MSD Manual / Bộ Y tế
        </span>
      </div>
    </div>
  );
}

export default Slide7UlcerPrevention;