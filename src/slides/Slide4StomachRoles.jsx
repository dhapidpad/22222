import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide4StomachRoles v4 — 100% Custom Multi-Layer SVG (Mascot Kawaii + Mặt Cắt Giải Phẫu 5 Vùng + 4 Vai Trò Sinh Học) */

const ROLES = [
  {
    id: 'store', n: '01', short: 'Kho chứa', svg: 'storeRole', color: '#0284C7', part: 'fundus',
    stat: '50→1.500', unit: 'ml', label: 'Dung tích co giãn thích nghi',
    desc: 'Co nhỏ chỉ 50 ml khi đói nhưng giãn nở êm ái tới 1,5–2 lít khi ăn no nhờ phản xạ giãn tiếp nhận ở đáy vị & thân vị.',
    tag: 'Giãn cơ thích nghi',
  },
  {
    id: 'churn', n: '02', short: 'Cối xay', svg: 'churnRole', color: '#EA580C', part: 'antrum',
    stat: '3', unit: 'sóng/phút', label: 'Nhịp co bóp nhu động hang vị',
    desc: '3 lớp cơ trơn (dọc, vòng, chéo) phối hợp nghiền nhào thức ăn thô thành hỗn hợp vị trấp (chyme) mịn dưới 2 mm.',
    tag: 'Nhào trộn cơ học',
  },
  {
    id: 'acid', n: '03', short: 'Lò sinh hóa', svg: 'acidRole', color: '#D97706', part: 'corpus',
    stat: '1.5–3.5', unit: 'pH', label: 'Dịch vị HCl + Enzym Pepsin',
    desc: 'Tế bào viền và tế bào chính tiết 2–2,5 lít dịch vị/ngày, hoạt hóa Pepsin cắt nhỏ chuỗi Protein và tiết yếu tố nội hấp thu B12.',
    tag: 'Tiêu hóa hóa học',
  },
  {
    id: 'defense', n: '04', short: 'Lá chắn', svg: 'defenseRole', color: '#0D9488', part: 'pylorus',
    stat: '>99', unit: '%', label: 'Mầm bệnh bị tiêu diệt & kiểm soát',
    desc: 'Môi trường axit mạnh tiêu diệt hầu hết vi khuẩn xâm nhập theo thức ăn; van môn vị đóng mở chuẩn xác đẩy từng đợt nhỏ xuống tá tràng.',
    tag: 'Miễn dịch & Điều tiết',
  },
];

const HOTSPOTS = [
  { id: 'cardia', label: 'Tâm vị', role: 0, x: 146, y: 78, note: 'Cửa ngõ nối thực quản, ngăn trào ngược' },
  { id: 'fundus', label: 'Đáy vị', role: 0, x: 222, y: 72, note: 'Phình cao chứa khí & dự trữ thức ăn' },
  { id: 'corpus', label: 'Thân vị', role: 2, x: 244, y: 162, note: 'Tập trung tuyến vị tiết HCl & Pepsinogen' },
  { id: 'antrum', label: 'Hang vị', role: 1, x: 192, y: 244, note: 'Cơ dày co bóp nghiền nhỏ thức ăn' },
  { id: 'pylorus', label: 'Môn vị', role: 3, x: 112, y: 226, note: 'Van cơ vòng điều tiết xuống tá tràng' },
];

function playSfx(kind = 'tick') {
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
    if (kind === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.14);
      g.gain.setValueAtTime(0.08, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (kind === 'whoosh') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.16);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(1380, now + 0.05);
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.065);
    }
  } catch { /* ignore */ }
}

/* ─── Hệ thống Vector SVG Chi Tiết Cao cho Vai trò & Thức ăn (64x64) ─── */
function RoleSvg({ name, size = 28, color = 'currentColor', className = '' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', className, 'aria-hidden': true };
  switch (name) {
    case 'storeRole':
      return (
        <svg {...p}>
          <rect x="6" y="6" width="52" height="52" rx="16" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          {/* Bình chứa dạ dày co giãn có thước đo ml */}
          <path d="M26 13V20C26 23 43 23 46 34C49 45 39 53 28 52C18 51 14 44 15 36C16 31 22 29 24 25C26 22 26 18 26 13Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2.8" />
          <path d="M32 29H40M32 35H42M32 41H38" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M12 22L18 27M52 22L46 27" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'churnRole':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="26" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3" />
          {/* 3 vòng xoáy cơ trơn nghiền thức ăn */}
          <path d="M32 12A20 20 0 0 1 51 26" stroke="#EA580C" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M52 17V27H42" stroke="#EA580C" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 52A20 20 0 0 1 13 38" stroke="#F97316" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M12 47V37H22" stroke="#F97316" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="8" fill="#F59E0B" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="23" cy="26" r="3.2" fill="#10B981" />
          <circle cx="41" cy="38" r="3.2" fill="#EF4444" />
        </svg>
      );
    case 'acidRole':
      return (
        <svg {...p}>
          <rect x="6" y="6" width="52" height="52" rx="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          {/* Bình phản ứng HCl + Pepsin */}
          <path d="M24 12H40M27 12V23L14 45C12 48.5 14.5 53 18.5 53H45.5C49.5 53 52 48.5 50 45L37 23V12" fill="#fff" stroke="#B45309" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 37H46L49.5 44.5C51 47.2 49 50.5 46 50.5H18C15 50.5 13 47.2 14.5 44.5L18 37Z" fill="#F59E0B" />
          <circle cx="25" cy="44" r="3" fill="#FEF08A" />
          <circle cx="33" cy="42" r="2.5" fill="#fff" />
          <circle cx="40" cy="45" r="3" fill="#FEF08A" />
          <text x="32" y="33" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#9A3412">HCl</text>
        </svg>
      );
    case 'defenseRole':
      return (
        <svg {...p}>
          <path d="M32 6L55 16V32.5C55 47 45 56.5 32 60.5C19 56.5 9 47 9 32.5V16L32 6Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M32 12L49 19.5V32C49 43 41.5 50.5 32 54C22.5 50.5 15 43 15 32V19.5L32 12Z" fill="#14B8A6" />
          <path d="M22.5 33L29 39.5L42.5 26" stroke="#fff" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    /* Thức ăn nạp thử */
    case 'protein':
      return (
        <svg {...p}>
          {/* Miếng thịt giàu đạm (Steak) vân cẩm thạch */}
          <path d="M12 30C12 18 23 12 37 14C49 16 55 25 53 37C51 48 40 54 26 52C15 50 12 41 12 30Z" fill="#E11D48" stroke="#881337" strokeWidth="3.2" />
          <path d="M16 28C16 19 25 15 36 17C46 19 51 26 49 35C47 44 38 48 27 46C18 44 16 36 16 28Z" fill="#FB7185" />
          <circle cx="28" cy="29" r="5.5" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M36 23L43 30M34 36L44 38" stroke="#FFF1F2" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'fiber':
      return (
        <svg {...p}>
          {/* Bông cải xanh giàu chất xơ */}
          <path d="M27 35L25 51H39L37 35" fill="#86EFAC" stroke="#15803D" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="21" cy="27" r="10" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <circle cx="43" cy="27" r="10" fill="#16A34A" stroke="#15803D" strokeWidth="3" />
          <circle cx="32" cy="20" r="12" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
          <path d="M26 15C29 12.5 33 12.5 36 14" stroke="#DCFCE7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'water':
      return (
        <svg {...p}>
          <path d="M32 7C32 7 13 28 13 41C13 51.5 21.5 58 32 58C42.5 58 51 51.5 51 41C51 28 32 7 32 7Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3.5" />
          <path d="M22 38C22 31 26 24 29 20" stroke="#fff" strokeOpacity=".85" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="44" r="3.5" fill="#E0F2FE" />
        </svg>
      );

    /* UI Icons */
    case 'utensils':
      return (
        <svg {...p}>
          <path d="M18 10V28M12 10V22C12 26 15 28 18 28C21 28 24 26 24 22V10M18 28V54" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
          <path d="M44 10C38 10 35 16 35 25V36H44V54" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'rotate':
      return (
        <svg {...p}>
          <path d="M50 32A18 18 0 1 1 44 18.5L51 24" stroke={color} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52 12V24.5H39.5" stroke={color} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...p}>
          <path d="M6 32C6 32 16 16 32 16C48 16 58 32 58 32C58 32 48 48 32 48C16 48 6 32 6 32Z" stroke={color} strokeWidth="4.8" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="8" fill={color} />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...p}>
          <path d="M32 4L38.5 23.5L58 30L38.5 36.5L32 56L25.5 36.5L6 30L25.5 23.5L32 4Z" fill={color} />
        </svg>
      );
    case 'arrowRight':
      return (
        <svg {...p}>
          <path d="M14 32H50M36 18L50 32L36 46" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Component SVG Dạ Dày Chi Tiết 2 Chế Độ: Mascot Kawaii & Mặt Cắt Giải Phẫu ─── */
function DetailedStomachStage({ size = 290, activePart, onSelectPart, isChurning, fedFood, viewMode }) {
  const bodyPath = 'M132 22 C132 12 148 12 148 22 V56 C148 74 222 62 256 118 C290 174 252 266 172 272 C104 276 58 242 62 192 C65 158 92 146 114 132 C132 120 132 94 132 56 Z';

  return (
    <svg viewBox="0 0 320 310" width={size} height={size * 0.96} className="overflow-visible select-none">
      <defs>
        <radialGradient id="cuteStomGrad" cx="36%" cy="28%" r="76%">
          <stop offset="0%" stopColor="#FFD5C8" />
          <stop offset="60%" stopColor="#FF8A75" />
          <stop offset="100%" stopColor="#E04F3E" />
        </radialGradient>
        <linearGradient id="crossWallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="lumenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FECDD3" />
        </linearGradient>
        <clipPath id="stomLumenClip">
          <path d={bodyPath} />
        </clipPath>
      </defs>

      {/* Bóng đổ dưới sàn */}
      <ellipse cx="168" cy="292" rx="78" ry="8" fill="#12343B" opacity=".12" />

      {/* Vòng bảo vệ chất nhầy 0.2mm */}
      <path
        d={bodyPath}
        transform="translate(-10 -10) scale(1.065)"
        fill="none"
        stroke="#2DD4BF"
        strokeWidth="5"
        strokeDasharray="14 6"
        strokeLinecap="round"
        opacity=".75"
      />

      {/* Thân chính co bóp */}
      <motion.g
        animate={
          isChurning
            ? { scaleX: [1, 1.08, 0.93, 1.06, 1], scaleY: [1, 0.93, 1.07, 0.95, 1], rotate: [0, -3, 3, -2, 0] }
            : { scale: [1, 1.028, 1] }
        }
        transition={{ duration: isChurning ? 0.75 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '168px 165px' }}
      >
        {viewMode === 'cute' ? (
          /* ─── CHẾ ĐỘ 1: MASCOT KAWAII 3D ─── */
          <g>
            {/* Tay chân dễ thương */}
            <ellipse cx="136" cy="276" rx="18" ry="10" fill="#E04F3E" stroke="#fff" strokeWidth="2.5" />
            <ellipse cx="196" cy="276" rx="18" ry="10" fill="#E04F3E" stroke="#fff" strokeWidth="2.5" />
            <motion.ellipse
              cx="52" cy="192" rx="12" ry="22" fill="#FF8A75" stroke="#fff" strokeWidth="2.5"
              animate={{ rotate: isChurning ? [0, -45, 20, -45, 0] : [0, -24, 0] }}
              transition={{ duration: isChurning ? 0.5 : 1.3, repeat: Infinity }}
              style={{ transformOrigin: '64px 176px' }}
            />
            <motion.ellipse
              cx="274" cy="182" rx="12" ry="22" fill="#FF8A75" stroke="#fff" strokeWidth="2.5"
              animate={{ rotate: isChurning ? [0, 45, -20, 45, 0] : [0, 24, 0] }}
              transition={{ duration: isChurning ? 0.5 : 1.3, repeat: Infinity, delay: 0.2 }}
              style={{ transformOrigin: '262px 166px' }}
            />

            <path d={bodyPath} fill="url(#cuteStomGrad)" stroke="#fff" strokeWidth="4" />

            {/* Dịch vị & thức ăn bên trong lòng dạ dày */}
            <g clipPath="url(#stomLumenClip)">
              <motion.path
                d="M20 218 Q80 204 140 218 T260 218 T360 218 V290 H20 Z"
                fill={fedFood === 'water' ? '#38BDF8' : '#FDE047'}
                opacity={fedFood === 'water' ? 0.45 : 0.35}
                animate={{ x: [-40, 0, -40] }}
                transition={{ duration: isChurning ? 0.9 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Thức ăn vừa nạp rơi vào và được nghiền */}
              {fedFood && (
                <motion.g
                  initial={{ y: -90, opacity: 0 }}
                  animate={{ y: [0, 8, 0], rotate: isChurning ? [0, 180, 360] : [0, 12, -12, 0], opacity: 1 }}
                  transition={{ duration: isChurning ? 1.1 : 2.2, repeat: Infinity }}
                >
                  <g transform="translate(148 198)">
                    <RoleSvg name={fedFood} size={38} />
                  </g>
                </motion.g>
              )}
              {[[108, 245, 0], [165, 252, 0.6], [212, 238, 1.2]].map(([x, y, d]) => (
                <motion.circle
                  key={x} cx={x} cy={y} r="5" fill="#fff"
                  animate={{ cy: [y, y - 48], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: d }}
                />
              ))}
            </g>

            {/* Vệt sáng 3D & Khuôn mặt Kawaii */}
            <path d="M90 162 C95 140 112 130 132 124" stroke="#fff" strokeOpacity=".6" strokeWidth="8" strokeLinecap="round" fill="none" />
            <ellipse cx="122" cy="186" rx="12" ry="7" fill="#F43F5E" opacity=".48" />
            <ellipse cx="206" cy="186" rx="12" ry="7" fill="#F43F5E" opacity=".48" />
            {[142, 186].map((x) => (
              <g key={x}>
                <circle cx={x} cy="170" r="11.5" fill="#12343B" />
                <circle cx={x - 3.5} cy="166" r="4.2" fill="#fff" />
                <circle cx={x + 3.5} cy="173.5" r="2.2" fill="#fff" />
              </g>
            ))}
            <path d="M132 150 Q142 142 152 150 M176 150 Q186 142 196 150" stroke="#12343B" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M148 190 Q164 214 180 190 Z" fill="#7F1D1D" />
            <ellipse cx="164" cy="201" rx="7.5" ry="4.8" fill="#FB7185" />
          </g>
        ) : (
          /* ─── CHẾ ĐỘ 2: MẶT CẮT GIẢI PHẪU 3 LỚP CƠ & NẾP GẤP NIÊM MẠC (RUGAE) ─── */
          <g>
            {/* Thành cơ dạ dày 3 lớp */}
            <path d={bodyPath} fill="url(#crossWallGrad)" stroke="#881337" strokeWidth="4" />
            <path d={bodyPath} transform="translate(8 8) scale(0.94)" fill="url(#lumenGrad)" stroke="#F43F5E" strokeWidth="3" />

            {/* Các nếp gấp dọc niêm mạc (Gastric Rugae) */}
            <g clipPath="url(#stomLumenClip)" opacity=".65">
              <path d="M150 65 C185 85 215 135 205 210 C198 245 155 258 115 245" stroke="#FB7185" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M172 72 C212 95 238 145 225 215 C215 252 168 265 125 255" stroke="#F43F5E" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M195 85 C232 110 252 155 240 218" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Hồ dịch vị HCl + Pepsin ở đáy & hang vị */}
              <motion.path
                d="M20 205 Q85 194 150 205 T280 205 V285 H20 Z"
                fill="#FBBF24"
                opacity=".55"
                animate={{ x: [-30, 0, -30] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x="172" y="242" textAnchor="middle" fontSize="11" fontWeight="900" fill="#9A3412">
                DỊCH VỊ HCl + PEPSIN (pH 1.5–3.5)
              </text>
            </g>
          </g>
        )}
      </motion.g>

      {/* 5 ĐIỂM GIẢI PHẪU TƯƠNG TÁC (Tâm vị · Đáy vị · Thân vị · Hang vị · Môn vị) */}
      {HOTSPOTS.map((h) => {
        const on = activePart === h.id;
        return (
          <g
            key={h.id}
            onClick={() => onSelectPart(h.id)}
            className="cursor-pointer"
          >
            {on && (
              <motion.circle
                cx={h.x}
                cy={h.y}
                r="18"
                fill="#14B8A6"
                opacity=".35"
                animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <circle
              cx={h.x}
              cy={h.y}
              r={on ? 9 : 6.5}
              fill={on ? '#14B8A6' : '#fff'}
              stroke="#12343B"
              strokeWidth="2.5"
            />
            {on && (
              <g transform={`translate(${h.x} ${h.y - 22})`}>
                <rect x="-34" y="-14" width="68" height="20" rx="10" fill="#12343B" />
                <text x="0" y="-1" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
                  {h.label}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Slide4StomachRoles({ onSelectSlide = () => {} }) {
  const [selectedRole, setSelectedRole] = useState(2);
  const [activePart, setActivePart] = useState('corpus');
  const [isChurning, setIsChurning] = useState(false);
  const [fedFood, setFedFood] = useState(null);
  const [viewMode, setViewMode] = useState('cute');

  const role = ROLES[selectedRole];
  const activeHotspot = HOTSPOTS.find((h) => h.id === activePart) || HOTSPOTS[2];

  const chooseRole = useCallback((i) => {
    setSelectedRole(i);
    setActivePart(ROLES[i].part);
  }, []);

  const toggleChurn = useCallback(() => {
    playSfx('pop');
    setIsChurning(true);
    setTimeout(() => setIsChurning(false), 3600);
  }, []);

  const feedFoodItem = useCallback((type) => {
    setFedFood(type);
    playSfx('tick');
    if (type === 'protein') chooseRole(2);
    else if (type === 'fiber') chooseRole(1);
    else if (type === 'water') chooseRole(0);
  }, [chooseRole]);

  const handleSelectHotspot = useCallback((partId) => {
    playSfx('tick');
    setActivePart(partId);
    const h = HOTSPOTS.find((x) => x.id === partId);
    if (h) setSelectedRole(h.role);
  }, []);

  return (
    <div className="w-full h-full flex flex-col px-3 md:px-8 py-2.5 gap-2.5 select-none overflow-hidden bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#FFFBEB] rounded-3xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#14B8A6] tracking-widest uppercase">
            SLIDE 04 • SINH LÝ TIÊU HÓA DẠ DÀY
          </span>
          <h2 className="font-heading font-black text-2xl md:text-4xl text-[#12343B] leading-tight">
            4 Vai Trò Cốt Lõi Của Dạ Dày
          </h2>
        </div>

        {/* Thanh tương tác Thử nạp thức ăn & Co bóp */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-md">
          <span className="pl-2.5 pr-1 text-[11px] font-extrabold text-[#5B7B80] flex items-center gap-1">
            <RoleSvg name="utensils" size={14} color="#5B7B80" />
            Thử nạp:
          </span>
          {[
            { k: 'protein', t: 'Đạm', c: 'bg-rose-50 text-rose-700 border-rose-200' },
            { k: 'fiber', t: 'Chất xơ', c: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { k: 'water', t: 'Nước', c: 'bg-sky-50 text-sky-700 border-sky-200' },
          ].map((f) => (
            <button
              key={f.k}
              onClick={() => feedFoodItem(f.k)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border transition flex items-center gap-1.5 hover:-translate-y-0.5 ${f.c} ${
                fedFood === f.k ? 'ring-2 ring-offset-1 ring-[#14B8A6]' : ''
              }`}
            >
              <RoleSvg name={f.k} size={16} />
              <span>{f.t}</span>
            </button>
          ))}

          <div className="h-4 w-px bg-slate-200 mx-0.5" />

          <button
            onClick={toggleChurn}
            className={`px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 transition ${
              isChurning
                ? 'bg-gradient-to-r from-[#FF8A5B] to-[#EF4B5F] text-white shadow-lg'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span className={isChurning ? 'animate-spin inline-flex' : 'inline-flex'}>
              <RoleSvg name="rotate" size={13} color={isChurning ? '#fff' : '#92400E'} />
            </span>
            <span>{isChurning ? 'Đang co bóp' : 'Co bóp'}</span>
          </button>

          <button
            onClick={() => {
              playSfx('tick');
              setViewMode(viewMode === 'cute' ? 'cross-section' : 'cute');
            }}
            className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#12343B] text-white flex items-center gap-1.5 hover:bg-[#1c4a53] transition"
          >
            <RoleSvg name="eye" size={14} color="#fff" />
            <span>{viewMode === 'cute' ? 'Xem Mặt cắt' : 'Xem Mascot'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* LEFT: Sân khấu Dạ dày SVG tương tác */}
        <div className="col-span-12 lg:col-span-5 relative rounded-[30px] bg-white/85 backdrop-blur-md border-2 border-white shadow-xl overflow-hidden flex flex-col items-center justify-between p-3">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] rounded-full blur-3xl pointer-events-none"
            animate={{ backgroundColor: `${role.color}38` }}
            transition={{ duration: 0.6 }}
          />

          {/* 5 Điểm giải phẫu dạ dày */}
          <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-1.5">
            <RoleSvg name="sparkle" size={14} color="#14B8A6" />
            {HOTSPOTS.map((h) => {
              const on = activePart === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => handleSelectHotspot(h.id)}
                  className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold border transition"
                  style={{
                    background: on ? role.color : 'rgba(255,255,255,0.9)',
                    color: on ? '#fff' : '#5B7B80',
                    borderColor: on ? role.color : '#E2E8F0',
                    boxShadow: on ? `0 6px 14px ${role.color}45` : 'none',
                  }}
                >
                  {h.label}
                </button>
              );
            })}
          </div>

          <div className="relative z-10 my-auto">
            <DetailedStomachStage
              size={275}
              activePart={activePart}
              onSelectPart={handleSelectHotspot}
              isChurning={isChurning}
              fedFood={fedFood}
              viewMode={viewMode}
            />
          </div>

          <div className="relative z-10 px-3 py-1 rounded-full bg-slate-100/90 text-[11px] font-bold text-[#12343B]">
            <span className="font-black" style={{ color: role.color }}>{activeHotspot.label}:</span> {activeHotspot.note}
          </div>
        </div>

        {/* RIGHT: Thẻ thông số & 4 vai trò */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 min-h-0">
          {/* Thẻ chính: Con số khổng lồ + Watermark SVG */}
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="relative flex-1 overflow-hidden rounded-[30px] p-6 text-white shadow-2xl flex flex-col justify-center"
              style={{ background: `linear-gradient(135deg, ${role.color}, ${role.color}CC 68%, #12343B)` }}
            >
              <div className="absolute -right-6 -top-6 opacity-20 pointer-events-none">
                <RoleSvg name={role.svg} size={180} />
              </div>
              <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-11 h-11 rounded-2xl bg-white/95 flex items-center justify-center shadow-md">
                    <RoleSvg name={role.svg} size={32} />
                  </span>
                  <span className="text-xs font-black px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/25">
                    {role.tag}
                  </span>
                </div>

                <div className="flex items-baseline gap-2.5">
                  <span
                    className="font-heading font-black leading-none tracking-tight"
                    style={{ fontSize: 'clamp(48px, 7.2vw, 84px)' }}
                  >
                    {role.stat}
                  </span>
                  <span className="text-xl font-extrabold opacity-95">{role.unit}</span>
                </div>
                <div className="text-sm font-extrabold opacity-90 mt-1 uppercase tracking-wider">{role.label}</div>

                <div className="h-px w-full bg-white/30 my-3" />
                <p className="text-sm md:text-base font-semibold leading-relaxed max-w-xl">{role.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 4 Nút chọn vai trò bằng Vector SVG */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {ROLES.map((r, i) => {
              const on = selectedRole === i;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    playSfx('tick');
                    chooseRole(i);
                  }}
                  className="relative p-3 rounded-2xl text-left transition-all border-2"
                  style={{
                    background: on ? '#fff' : 'rgba(255,255,255,0.78)',
                    borderColor: on ? r.color : '#fff',
                    boxShadow: on ? `0 10px 22px ${r.color}35` : '0 2px 6px rgba(0,0,0,0.05)',
                    transform: on ? 'translateY(-3px)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <RoleSvg name={r.svg} size={32} />
                    <span className="font-heading font-black text-sm" style={{ color: on ? r.color : '#94A3B8' }}>
                      {r.n}
                    </span>
                  </div>
                  <div className="font-heading font-extrabold text-xs md:text-[13px] text-[#12343B] mt-1.5">{r.short}</div>
                  <div
                    className="absolute left-3 right-3 bottom-1.5 h-1 rounded-full transition-all"
                    style={{ background: on ? r.color : 'transparent' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Banner Hàng rào niêm mạc */}
          <div className="p-3 pl-4 rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-[#EAF6FD] to-[#FFF3DC] border-2 border-white shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[#12343B]">
              <RoleSvg name="defenseRole" size={34} />
              <div className="leading-tight">
                <div className="text-xs font-black">Lớp nhầy 0.2 mm + Bicarbonat giữ dạ dày không tự tiêu hủy</div>
                <div className="text-[11px] font-semibold text-[#5B7B80]">Tế bào biểu mô niêm mạc tái tạo mới hoàn toàn sau mỗi 3–5 ngày</div>
              </div>
            </div>
            <button
              onClick={() => {
                playSfx('whoosh');
                onSelectSlide(5);
              }}
              className="group flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white font-black text-xs shadow-lg shrink-0 hover:-translate-y-0.5 transition"
            >
              <span>Xem 6 bệnh dạ dày</span>
              <span className="group-hover:translate-x-1 transition-transform">
                <RoleSvg name="arrowRight" size={14} color="#fff" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-[11px] text-[#5B7B80] font-bold">
        Chu trình hoàn hảo: Tiếp nhận thức ăn thô → Nghiền cơ học & Phân giải đạm → Đẩy vị trấp mịn xuống tá tràng hấp thu
      </div>
    </div>
  );
}

export default Slide4StomachRoles;