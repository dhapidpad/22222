import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide5StomachDiseases v4 — 100% Full Custom Multi-Layer SVG (Bản đồ Định khu 6 Bệnh lý Dạ dày 3D + Kính Nội Soi Mô Học) */

const DISEASES = [
  {
    id: 'dis-acute',
    num: '1',
    name: 'Viêm dạ dày cấp tính',
    severity: 'Phổ biến nhất • Cấp tính',
    levelBadge: 'TRỌNG TÂM 1',
    zone: 'Thân vị & Hang vị',
    color: '#EA580C',
    damage: 'Niêm mạc xung huyết đỏ rực, phù nề và trợt nông đột ngột sau dùng NSAID, rượu bia hoặc đồ cay nóng.',
    symptom: 'Đau rát quặn thượng vị, buồn nôn, đầy chướng cồn cào sau ăn.',
    focus: true,
    slideTarget: 6,
  },
  {
    id: 'dis-gerd',
    num: '2',
    name: 'Trào ngược GERD',
    severity: 'Rất phổ biến • Dễ tái phát',
    levelBadge: 'TRỌNG TÂM 2',
    zone: 'Tâm vị & Thực quản dưới',
    color: '#0284C7',
    damage: 'Cơ thắt thực quản dưới (LES) giãn bất thường, dịch vị HCl + Pepsin trào ngược gây bỏng rát thực quản.',
    symptom: 'Ợ nóng sau xương ức, ợ chua, đắng miệng, ho khan, khàn giọng.',
    focus: true,
    slideTarget: 7,
  },
  {
    id: 'dis-ulcer',
    num: '3',
    name: 'Loét dạ dày – tá tràng',
    severity: 'Mạn tính • Ăn sâu cơ niêm',
    levelBadge: 'MẠN TÍNH',
    zone: 'Bờ cong nhỏ & Hành tá tràng',
    color: '#EF4444',
    damage: 'Ổ khuyết mất chất ăn sâu qua lớp cơ niêm (thủ phạm chính: xoắn khuẩn H. pylori & thuốc NSAID).',
    symptom: 'Đau âm ỉ hoặc rát bỏng có chu kỳ lúc đói hoặc sau ăn 2–3 giờ.',
    focus: false,
  },
  {
    id: 'dis-bleed',
    num: '4',
    name: 'Xuất huyết tiêu hóa',
    severity: 'Biến chứng cấp cứu nội khoa',
    levelBadge: 'NGUY CẤP',
    zone: 'Mạch máu dưới niêm mạc',
    color: '#B91C1C',
    damage: 'Ổ viêm loét ăn thủng thành mạch máu dưới niêm mạc gây chảy máu ồ ạt vào lòng dạ dày.',
    symptom: 'Nôn ra máu đỏ tươi hoặc dịch bã cà phê, đi ngoài phân đen hôi tanh.',
    focus: false,
  },
  {
    id: 'dis-pyloric',
    num: '5',
    name: 'Hẹp môn vị',
    severity: 'Biến chứng ứ trệ cơ học',
    levelBadge: 'Ứ TRỆ',
    zone: 'Ống & Cơ thắt môn vị',
    color: '#D97706',
    damage: 'Ổ loét vùng hang – môn vị tái đi tái lại tạo mô xơ sẹo co kéo làm chít hẹp đường xuống tá tràng.',
    symptom: 'Đầy tức nặng bụng, nôn ra thức ăn cũ từ hôm trước, suy kiệt mất nước.',
    focus: false,
  },
  {
    id: 'dis-cancer',
    num: '6',
    name: 'Ung thư dạ dày',
    severity: 'Khối u ác tính biểu mô',
    levelBadge: 'ÁC TÍNH',
    zone: 'Hang môn vị & Bờ cong nhỏ',
    color: '#475569',
    damage: 'Biến đổi tế bào biểu mô qua chuỗi viêm teo mạn tính → dị sản ruột → loạn sản → u ác tính xâm lấn.',
    symptom: 'Giai đoạn đầu mơ hồ; muộn gây sút cân nhanh, chán ăn, thiếu máu.',
    focus: false,
  },
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
    if (kind === 'whoosh') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.16);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(1380, now + 0.055);
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.065);
    }
  } catch { /* ignore */ }
}

/* ─── Bộ Minh Họa Vector SVG Đa Lớp Cho 6 Bệnh Lý & UI (64x64) ─── */
function DiseaseIconSvg({ id, size = 36, color = '#EA580C' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (id) {
    case 'dis-acute':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFEDD5" stroke="#FB923C" strokeWidth="2.5" />
          {/* Ngọn lửa viêm cấp + bề mặt niêm mạc sưng đỏ */}
          <path d="M12 48 Q32 40 52 48 V54 H12 V48 Z" fill="#EF4444" />
          <path d="M33 10C35 20 25 25 28 33C30.5 29 34.5 27 36 23C43.5 30 48 37.5 48 44.5C48 52 41 56 32 56C23 56 16 50 16 42C16 32 24 22 33 10Z" fill="#EA580C" stroke="#9A3412" strokeWidth="2.2" />
          <path d="M32 31C36.5 35.5 40 40 40 45.5C40 50 36.5 53 32 53C27.5 53 24 50 24 45.5C24 40 27.5 35.5 32 31Z" fill="#FBBF24" />
          <circle cx="32" cy="47" r="4" fill="#FEF08A" />
        </svg>
      );
    case 'dis-gerd':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          {/* Ống thực quản & luồng axit trào ngược */}
          <path d="M23 8V32M41 8V32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 44 Q32 36 50 44 V54 H14 V44 Z" fill="#F97316" />
          <path d="M32 46V14M23 22L32 13L41 22" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="36" r="3" fill="#FDE047" />
          <circle cx="38" cy="31" r="2.5" fill="#FB923C" />
        </svg>
      );
    case 'dis-ulcer':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEE2E2" stroke="#F87171" strokeWidth="2.5" />
          {/* Hố loét sâu xuyên qua lớp cơ niêm */}
          <path d="M8 34 H21 C24 34 25 49 32 49 C39 49 40 34 43 34 H56 V54 H8 V34 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="2.8" strokeLinejoin="round" />
          <ellipse cx="32" cy="48" rx="7" ry="3.5" fill="#7F1D1D" />
          {/* Giọt axit HCl ăn mòn */}
          <path d="M32 10C32 10 23 21 23 27.5A9 9 0 0 0 41 27.5C41 21 32 10 32 10Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.2" />
          <text x="32" y="30.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff">HCl</text>
        </svg>
      );
    case 'dis-bleed':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2.5" />
          {/* Mạch máu vỡ & giọt máu cấp cứu */}
          <path d="M10 47 Q24 40 32 47 T54 47" stroke="#881337" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M32 10C32 10 17 27 17 38C17 46.5 23.8 53 32 53C40.2 53 47 46.5 47 38C47 27 32 10 32 10Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.8" />
          <path d="M23 35C23 29 26.5 24 29.5 20" stroke="#FCA5A5" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 32V42M27 37H37" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'dis-pyloric':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
          {/* Ống môn vị bị mô xơ sẹo thắt hẹp như đồng hồ cát */}
          <path d="M10 18 C22 18 26 28 32 28 C38 28 42 18 54 18" stroke="#B45309" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M10 46 C22 46 26 36 32 36 C38 36 42 46 54 46" stroke="#B45309" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="19" cy="32" r="5" fill="#F59E0B" />
          <circle cx="12" cy="28" r="3.5" fill="#D97706" />
          <circle cx="13" cy="37" r="3.5" fill="#EA580C" />
          <path d="M32 12V23M32 52V41" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'dis-cancer':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.5" />
          {/* Cụm tế bào u ác tính & vòng ngắm tầm soát */}
          <circle cx="27" cy="35" r="9" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="38" cy="31" r="10.5" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="34" cy="42" r="8" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="38" cy="31" r="3.5" fill="#EF4444" />
          <circle cx="27" cy="35" r="2.5" fill="#F97316" />
          <circle cx="33" cy="35" r="21" stroke="#EF4444" strokeWidth="2" strokeDasharray="5 4" />
        </svg>
      );
    case 'damageTag':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="24" fill="#FEE2E2" />
          <path d="M34 10L16 34H31L27 54L48 29H33L34 10Z" fill="#E11D48" />
        </svg>
      );
    case 'symptomTag':
      return (
        <svg {...p}>
          <path d="M32 8L58 53H6L32 8Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="4" strokeLinejoin="round" />
          <path d="M32 24V37M32 45H32.1" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      );
    case 'arrowRight':
      return (
        <svg {...p}>
          <path d="M14 32H50M36 18L50 32L36 46" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bulb':
      return (
        <svg {...p}>
          <circle cx="32" cy="26" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="3.5" />
          <path d="M24 44H40M26 51H38" stroke="#CA8A04" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Bản Đồ Giải Phẫu Định Khu 6 Bệnh Lý Dạ Dày 3D (SVG 330x300) ─── */
function InteractivePathologyMap({ selectedDisease, onSelectDisease }) {
  const stomPath = 'M140 24 C140 12 158 12 158 24 V62 C158 80 236 68 272 126 C306 182 266 270 182 276 C112 280 64 244 68 192 C71 156 98 144 122 130 C140 118 140 92 140 62 Z';

  // Tọa độ giải phẫu chính xác của 6 bệnh lý trên dạ dày
  const PINS = [
    { id: 'dis-gerd', n: '2', label: 'GERD (Tâm vị)', x: 149, y: 54, color: '#0284C7' },
    { id: 'dis-acute', n: '1', label: 'Viêm cấp (Thân vị)', x: 224, y: 148, color: '#EA580C' },
    { id: 'dis-ulcer', n: '3', label: 'Ổ loét (Bờ cong nhỏ)', x: 142, y: 142, color: '#EF4444' },
    { id: 'dis-bleed', n: '4', label: 'Xuất huyết (Mạch máu)', x: 238, y: 206, color: '#B91C1C' },
    { id: 'dis-cancer', n: '6', label: 'U ác tính (Hang vị)', x: 174, y: 238, color: '#475569' },
    { id: 'dis-pyloric', n: '5', label: 'Hẹp môn vị', x: 92, y: 196, color: '#D97706' },
  ];

  return (
    <svg viewBox="0 0 340 295" className="w-full max-w-[305px] h-auto overflow-visible select-none">
      <defs>
        <radialGradient id="pathStomWall" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="55%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#BE123C" />
        </radialGradient>
        <linearGradient id="pathLumen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FFE4E6" />
        </linearGradient>
        <clipPath id="pathLumenClip">
          <path d={stomPath} />
        </clipPath>
      </defs>

      {/* Ống tá tràng đầu ra bên trái */}
      <path
        d="M72 192 C42 192 32 216 38 244 C42 264 62 272 84 268"
        stroke="#FDBA74"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M72 192 C42 192 32 216 38 244 C42 264 62 272 84 268"
        stroke="#FEF3C7"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Thành ngoài & Lòng dạ dày */}
      <path d={stomPath} fill="url(#pathStomWall)" stroke="#9F1239" strokeWidth="3.5" />
      <path d={stomPath} transform="translate(7 7) scale(0.95)" fill="url(#pathLumen)" stroke="#FDA4AF" strokeWidth="2" />

      {/* Mô phỏng tổn thương động bên trong lòng dạ dày theo bệnh đang chọn */}
      <g clipPath="url(#pathLumenClip)">
        {/* Nếp gấp niêm mạc nền */}
        <path d="M162 78 C202 102 228 152 214 222 C202 254 158 264 118 248" stroke="#FECDD3" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M188 86 C228 112 252 162 238 228" stroke="#FECDD3" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Hồ dịch vị axit ở đáy */}
        <motion.path
          d="M30 222 Q95 212 160 222 T290 222 V290 H30 Z"
          fill="#FBBF24"
          opacity=".48"
          animate={{ x: [-25, 0, -25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 1. Viêm cấp: đám xung huyết lan tỏa ở thân & hang vị */}
        {selectedDisease === 'dis-acute' && (
          <motion.g animate={{ opacity: [0.65, 1, 0.65], scale: [0.96, 1.04, 0.96] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ transformOrigin: '220px 155px' }}>
            <circle cx="222" cy="150" r="38" fill="#EF4444" opacity=".32" />
            <circle cx="222" cy="150" r="22" fill="#EA580C" opacity=".55" />
            <circle cx="195" cy="185" r="18" fill="#EF4444" opacity=".45" />
          </motion.g>
        )}

        {/* 2. Trào ngược GERD: luồng axit bắn ngược lên thực quản */}
        {selectedDisease === 'dis-gerd' && (
          <g>
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={149 + (i - 1) * 4}
                r={6 - i}
                fill="#F97316"
                animate={{ cy: [115, 20], opacity: [0.95, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.32 }}
              />
            ))}
            <path d="M149 115 V30" stroke="#EF4444" strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" />
          </g>
        )}

        {/* 3. Loét dạ dày: miệng núi lửa khoét sâu ở bờ cong nhỏ */}
        {selectedDisease === 'dis-ulcer' && (
          <g>
            <motion.circle cx="142" cy="142" r="24" fill="#EF4444" opacity=".35" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <circle cx="142" cy="142" r="13" fill="#881337" stroke="#FDA4AF" strokeWidth="3" />
            <circle cx="140" cy="140" r="5" fill="#FDE047" />
          </g>
        )}

        {/* 4. Xuất huyết: mạch máu vỡ phun hồng cầu vào lòng vị */}
        {selectedDisease === 'dis-bleed' && (
          <g>
            <path d="M210 185 Q238 206 262 195" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" fill="none" />
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx={238}
                cy={206}
                r="4.5"
                fill="#DC2626"
                animate={{ x: [-10 - i * 12, -45 - i * 15], y: [-5 + i * 6, 25 + i * 8], opacity: [1, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.25 }}
              />
            ))}
          </g>
        )}

        {/* 5. Hẹp môn vị: vòng xơ thắt chặt cửa ra môn vị */}
        {selectedDisease === 'dis-pyloric' && (
          <g>
            <motion.circle cx="92" cy="196" r="22" fill="#D97706" opacity=".35" animate={{ scale: [0.9, 1.2, 0.9] }} transition={{ duration: 1.3, repeat: Infinity }} />
            <path d="M84 176 L94 192 M84 216 L94 200" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {/* 6. Ung thư dạ dày: khối u sùi vùng hang vị */}
        {selectedDisease === 'dis-cancer' && (
          <g>
            <motion.circle cx="174" cy="238" r="26" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="5 4" fill="none" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '174px 238px' }} />
            <circle cx="168" cy="236" r="10" fill="#334155" />
            <circle cx="181" cy="234" r="11" fill="#1E293B" />
            <circle cx="175" cy="245" r="9" fill="#475569" />
          </g>
        )}
      </g>

      {/* 6 Điểm Pin Giải Phẫu Đánh Số Tương Tác */}
      {PINS.map((pin) => {
        const active = selectedDisease === pin.id;
        return (
          <g
            key={pin.id}
            onClick={() => {
              playSfx('tick');
              onSelectDisease(pin.id);
            }}
            className="cursor-pointer"
          >
            {active && (
              <motion.circle
                cx={pin.x}
                cy={pin.y}
                r="20"
                fill={pin.color}
                opacity=".35"
                animate={{ scale: [0.85, 1.55, 0.85], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <circle
              cx={pin.x}
              cy={pin.y}
              r={active ? 13 : 10.5}
              fill={active ? pin.color : '#fff'}
              stroke={pin.color}
              strokeWidth="3"
            />
            <text
              x={pin.x}
              y={pin.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="900"
              fill={active ? '#fff' : pin.color}
            >
              {pin.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Slide5StomachDiseases({ onSelectSlide = () => {} }) {
  const [selectedDisease, setSelectedDisease] = useState('dis-acute');
  const active = DISEASES.find((d) => d.id === selectedDisease) || DISEASES[0];

  const selectDis = useCallback((id) => {
    playSfx('tick');
    setSelectedDisease(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-6 py-2 select-none overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#F0F9FF] rounded-3xl">
      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-700 uppercase tracking-wider">
            SLIDE 05 • BỆNH HỌC DẠ DÀY
          </span>
          <h2 className="font-heading font-black text-xl md:text-2xl text-[#12343B]">
            6 Bệnh Dạ Dày Thường Gặp Ở Người
          </h2>
          <span className="hidden xl:inline text-xs font-semibold text-[#5B7B80]">
            — Bản đồ định khu tổn thương từ cấp tính, trào ngược đến biến chứng sâu
          </span>
        </div>

        {/* 2 Focus Disease Pills */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-white shadow-sm">
          <span className="text-[10.5px] font-extrabold text-[#5B7B80] pl-2 pr-1">
            2 Trọng tâm:
          </span>
          <button
            onClick={() => selectDis('dis-acute')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition flex items-center gap-1.5 border ${
              selectedDisease === 'dis-acute'
                ? 'bg-gradient-to-r from-[#FF8A5B] to-[#EA580C] text-white border-transparent shadow-sm'
                : 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
            }`}
          >
            <DiseaseIconSvg id="dis-acute" size={16} />
            <span>Viêm cấp tính</span>
          </button>
          <button
            onClick={() => selectDis('dis-gerd')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition flex items-center gap-1.5 border ${
              selectedDisease === 'dis-gerd'
                ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white border-transparent shadow-sm'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
            }`}
          >
            <DiseaseIconSvg id="dis-gerd" size={16} />
            <span>Trào ngược GERD</span>
          </button>
        </div>
      </div>

      {/* 2. Main Visual Split: Left 3D Pathology Map (5/12) & Right 6 Cards (7/12) */}
      <div className="grid grid-cols-12 gap-3 items-stretch flex-1 my-1 min-h-0 overflow-hidden">
        {/* Left Column (5 Cols): Bản đồ định khu 3D */}
        <div className="col-span-12 lg:col-span-5 p-3 rounded-[24px] bg-white/90 backdrop-blur-md border-2 border-white shadow-lg flex flex-col justify-between items-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between px-1 text-[10.5px] font-extrabold text-[#5B7B80] z-10">
            <span className="text-[#12343B]">Định khu giải phẫu ({active.zone}):</span>
            <div className="flex items-center gap-1">
              {DISEASES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => selectDis(d.id)}
                  className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center transition"
                  style={{
                    background: selectedDisease === d.id ? d.color : '#F1F5F9',
                    color: selectedDisease === d.id ? '#fff' : '#475569',
                  }}
                >
                  {d.num}
                </button>
              ))}
            </div>
          </div>

          <div className="my-auto z-10 flex items-center justify-center">
            <InteractivePathologyMap selectedDisease={selectedDisease} onSelectDisease={selectDis} />
          </div>

          {/* Kính lúp nội soi tóm tắt bệnh đang chọn + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="w-full p-2.5 rounded-2xl bg-slate-50/95 border border-slate-200/80 z-10 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black" style={{ color: active.color }}>
                  #{active.num} {active.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border text-[#5B7B80]">
                  Vị trí: {active.zone}
                </span>
              </div>
              {active.focus && (
                <button
                  onClick={() => {
                    playSfx('whoosh');
                    onSelectSlide(active.slideTarget);
                  }}
                  className={`w-full py-1.5 px-3 rounded-xl text-white font-black text-xs shadow hover:opacity-95 transition flex items-center justify-center gap-1.5 ${
                    active.id === 'dis-acute'
                      ? 'bg-gradient-to-r from-[#FF8A5B] to-[#EA580C]'
                      : 'bg-gradient-to-r from-[#0284C7] to-[#0D9488]'
                  }`}
                >
                  <span>Phân tích chuyên sâu {active.name} (Slide {active.slideTarget})</span>
                  <DiseaseIconSvg id="arrowRight" size={14} color="#fff" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column (7 Cols): 6 Thẻ Bệnh Lý Với Minh Họa SVG Riêng Biệt */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
          {DISEASES.map((dis) => {
            const isSelected = selectedDisease === dis.id;
            return (
              <motion.div
                key={dis.id}
                whileHover={{ y: -2 }}
                onClick={() => selectDis(dis.id)}
                className={`p-3 rounded-[20px] cursor-pointer transition-all duration-200 flex flex-col justify-between border-2 relative overflow-hidden ${
                  isSelected
                    ? 'bg-white shadow-xl'
                    : dis.focus
                    ? 'bg-white/95 hover:bg-white border-orange-200/80 shadow-sm'
                    : 'bg-white/80 hover:bg-white/95 border-white shadow-sm'
                }`}
                style={{
                  borderColor: isSelected ? dis.color : undefined,
                  borderLeft: `5px solid ${dis.color}`,
                }}
              >
                <div>
                  {/* Card Header: SVG Illustration + Name + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="shrink-0">
                        <DiseaseIconSvg id={dis.id} size={36} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-black text-xs md:text-[13.5px] text-[#12343B] truncate">
                          {dis.num}. {dis.name}
                        </h3>
                        <span className="block text-[9.5px] font-bold text-[#5B7B80]">{dis.severity}</span>
                      </div>
                    </div>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: dis.focus ? '#10B981' : `${dis.color}15`,
                        color: dis.focus ? '#FFFFFF' : dis.color,
                      }}
                    >
                      {dis.levelBadge}
                    </span>
                  </div>

                  {/* 2 Dòng Mô Tả Tổn Thương & Dấu Hiệu Có Icon SVG */}
                  <div className="space-y-1 text-[11px] leading-snug my-1">
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 mt-0.5"><DiseaseIconSvg id="damageTag" size={14} /></span>
                      <span>
                        <strong className="text-rose-700">Tổn thương: </strong>
                        <span className="text-[#5B7B80] font-medium">{dis.damage}</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 mt-0.5"><DiseaseIconSvg id="symptomTag" size={14} /></span>
                      <span>
                        <strong className="text-amber-700">Triệu chứng: </strong>
                        <span className="text-[#12343B] font-semibold">{dis.symptom}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-1.5 mt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="font-extrabold" style={{ color: dis.color }}>
                    {isSelected ? '● Đang hiển thị trên bản đồ 3D' : 'Chạm để định vị trên dạ dày'}
                  </span>

                  {dis.focus && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSfx('whoosh');
                        onSelectSlide(dis.slideTarget);
                      }}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-extrabold text-[10px] transition border border-orange-200"
                    >
                      <span>Vào Slide {dis.slideTarget}</span>
                      <DiseaseIconSvg id="arrowRight" size={11} color="#C2410C" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Slide Footer */}
      <div className="w-full p-2 px-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-emerald-50 border border-amber-200/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-[#12343B]">
        <div className="flex items-center gap-2">
          <DiseaseIconSvg id="bulb" size={18} />
          <span>
            <strong>Định hướng bài báo cáo:</strong> Nhóm tập trung phân tích sâu 2 bệnh lý có tần suất mắc cao nhất trong cộng đồng là <strong>Viêm dạ dày cấp tính (Slide 6)</strong> và <strong>Trào ngược thực quản GERD (Slide 7)</strong>.
          </span>
        </div>
        <span className="text-[10px] text-[#5B7B80] font-extrabold whitespace-nowrap">
          Nguồn: Bộ Y tế Việt Nam (moh.gov.vn)
        </span>
      </div>
    </div>
  );
}

export default Slide5StomachDiseases;