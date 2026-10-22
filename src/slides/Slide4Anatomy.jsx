import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide4Anatomy v4 — 100% Full Custom Multi-Layer SVG (Sơ đồ Giải phẫu Hệ Tiêu Hóa + Vi cấu trúc Niêm mạc Dạ dày) */

const PARTS = {
  esophagus: {
    name: 'Thực quản', short: 'Thực quản', color: '#0EA5E9', stat: '25', unit: 'cm',
    label: 'Ống cơ dẫn truyền một chiều',
    desc: 'Co bóp nhu động nhịp nhàng đưa thức ăn từ hầu họng qua cơ thắt tâm vị (LES) xuống dạ dày trong 6–8 giây.',
    sub: 'Cơ vòng thực quản dưới ngăn trào ngược axit',
  },
  stomach: {
    name: 'Dạ dày', short: 'Dạ dày', color: '#F97316', stat: '1.5–3.5', unit: 'pH',
    label: 'Buồng nhào trộn & tiêu hóa đạm',
    desc: 'Trữ tới 1,5 lít thức ăn, co bóp 3 lần/phút cùng dịch vị HCl và enzym Pepsin nghiền thành vị trấp nhuyễn mịn.',
    sub: '3 lớp cơ trơn: cơ dọc · cơ vòng · cơ chéo',
  },
  duodenum: {
    name: 'Tá tràng', short: 'Tá tràng', color: '#F59E0B', stat: '25', unit: 'cm',
    label: 'Ngã ba trung hòa dịch vị',
    desc: 'Đoạn đầu ruột non hình chữ C tiếp nhận dịch mật và dịch tụy giàu Bicarbonat để trung hòa axit từ dạ dày.',
    sub: 'Nơi diễn ra phản ứng tiêu hóa mạnh nhất',
  },
  liver: {
    name: 'Gan – Túi mật', short: 'Gan – Mật', color: '#D97706', stat: '800–1.000', unit: 'ml/ngày',
    label: 'Tiết mật nhũ hóa chất béo',
    desc: 'Gan sản xuất dịch mật liên tục, cô đặc tại túi mật và bơm xuống tá tràng giúp cắt nhỏ giọt mỡ để Lipase phân giải.',
    sub: 'Nhà máy chuyển hóa & khử độc lớn nhất cơ thể',
  },
  pancreas: {
    name: 'Tụy tạng', short: 'Tụy tạng', color: '#EAB308', stat: '3', unit: 'nhóm enzym',
    label: 'Amylase · Lipase · Trypsin',
    desc: 'Tiết dịch tụy kiềm giàu Bicarbonat và bộ 3 enzym chủ lực phân giải toàn diện Tinh bột, Chất béo và Protein.',
    sub: 'Bảo vệ tá tràng khỏi độ chua của dịch vị',
  },
  smallIntestine: {
    name: 'Ruột non', short: 'Ruột non', color: '#EC4899', stat: '250', unit: 'm²',
    label: 'Bề mặt vi nhung mao hấp thu',
    desc: 'Dài 5–6 mét với hàng triệu nhung mao và vi nhung mao gấp nếp, hấp thu hơn 90% dưỡng chất vào máu và bạch huyết.',
    sub: 'Gồm Hỗng tràng và Hồi tràng',
  },
  largeIntestine: {
    name: 'Ruột già (Đại tràng)', short: 'Ruột già', color: '#14B8A6', stat: '90', unit: '% nước',
    label: 'Tái hấp thu nước & điện giải',
    desc: 'Thu hồi nước, Natri, Kali còn lại; hệ vi sinh đường ruột lên men chất xơ, tổng hợp Vitamin K và tạo khuôn phân.',
    sub: 'Cân bằng hệ vi sinh vật đường ruột (Microbiome)',
  },
};

const SHIELDS = [
  {
    id: 'mucus', color: '#14B8A6', title: 'Lớp Gel Chất nhầy', stat: '0.2 mm',
    sub: 'Hàng rào vật lý không thấm',
    desc: 'Mạng lưới glycoprotein Mucin đặc quánh ngăn không cho phân tử Pepsin và ion H⁺ tiếp xúc trực tiếp với tế bào biểu mô.',
  },
  {
    id: 'bicarb', color: '#0EA5E9', title: 'Đệm Bicarbonat (HCO₃⁻)', stat: 'pH ~ 7.0',
    sub: 'Lá chắn hóa học trung hòa',
    desc: 'Tế bào bề mặt tiết HCO₃⁻ nằm ngay dưới lớp nhầy, nâng pH từ 1.5–2.0 trong lòng dạ dày lên ~7.0 sát màng tế bào.',
  },
  {
    id: 'blood', color: '#F97316', title: 'Vi tuần hoàn & Tái tạo', stat: '3–5 ngày',
    sub: 'Prostaglandin E₂ bảo vệ',
    desc: 'Mạng mao mạch dồi dào cung cấp oxy, dưỡng chất và HCO₃⁻, giúp lớp biểu mô niêm mạc thay mới hoàn toàn sau 3–5 ngày.',
  },
];

/* ─── Âm thanh WebAudio nhẹ tự chứa ─── */
function playSfx(kind = 'tick') {
  try {
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    if (! playSfx.ctx) playSfx.ctx = new AC();
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
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.06);
      g.gain.setValueAtTime(0.045, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch { /* ignore */ }
}

/* ─── Bộ SVG Icon & Minh họa Y Khoa Đa Lớp ─── */
function MedSvg({ name, size = 24, color = '#14B8A6' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'anatomyTab':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="26" fill={color} fillOpacity=".16" />
          <path d="M27 10V18C27 22 44 22 48 34C52 46 40 54 28 53C18 52 13 44 15 35C16 29 22 27 25 23C27 20 27 16 27 10Z" fill={color} stroke="#fff" strokeWidth="3" />
          <path d="M21 35C22 30 26 27 31 26" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'mucosaTab':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="26" fill={color} fillOpacity=".16" />
          {/* Kính hiển vi y khoa 3D */}
          <path d="M26 12H36L34 30H28L26 12Z" fill={color} stroke="#fff" strokeWidth="2.5" />
          <path d="M34 22C43 24 48 31 46 41C44.5 47 39 51 32 51" stroke={color} strokeWidth="5" strokeLinecap="round" />
          <path d="M18 41H40" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
          <rect x="14" y="49" width="36" height="6" rx="3" fill={color} />
        </svg>
      );
    case 'mucus':
      return (
        <svg {...p}>
          <path d="M32 6L54 15.5V32C54 46 44.5 55.5 32 59.5C19.5 55.5 10 46 10 32V15.5L32 6Z" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M32 12L48 19V31.5C48 42 41 49.5 32 53C23 49.5 16 42 16 31.5V19L32 12Z" fill="#14B8A6" />
          <path d="M22 32.5L29 39.5L42 25.5" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bicarb':
      return (
        <svg {...p}>
          <path d="M32 6C32 6 12 27 12 41C12 52 21 59 32 59C43 59 52 52 52 41C52 27 32 6 32 6Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <path d="M16 40C22 36 27 42 33 39C39 36 44 41 48 39C47 49 40.5 55 32 55C23.5 55 17 49 16 40Z" fill="#0EA5E9" />
          <text x="32" y="34" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0369A1">HCO₃⁻</text>
        </svg>
      );
    case 'blood':
      return (
        <svg {...p}>
          <path d="M32 55C32 55 10 41 10 24C10 15.5 16.5 10 24.5 10C29 10 32 13 32 16.5C32 13 35 10 39.5 10C47.5 10 54 15.5 54 24C54 41 32 55 32 55Z" fill="#FFEDD5" stroke="#EA580C" strokeWidth="3.5" />
          <path d="M16 31H25L29 21L35 41L39 31H48" stroke="#EA580C" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'flameCard':
      return (
        <svg {...p}>
          <path d="M34 6C36 17 25 23 28 32C30.5 28 35 25.5 37 21C45.5 29 51 37.5 51 46C51 55.5 42.5 60 32 60C21.5 60 13 52.5 13 43C13 31 22 21 34 6Z" fill="#fff" fillOpacity=".28" stroke="#fff" strokeWidth="3" />
          <path d="M32 30C37 35 41 40 41 46C41 51.5 37 55.5 32 55.5C27 55.5 23 51.5 23 46C23 40 27 35 32 30Z" fill="#fff" fillOpacity=".65" />
        </svg>
      );
    case 'dropCard':
      return (
        <svg {...p}>
          <path d="M32 7C32 7 13 28 13 41C13 51.5 21.5 58 32 58C42.5 58 51 51.5 51 41C51 28 32 7 32 7Z" fill="#fff" fillOpacity=".28" stroke="#fff" strokeWidth="3" />
          <circle cx="25" cy="40" r="4" fill="#fff" fillOpacity=".75" />
        </svg>
      );
    case 'swords':
      return (
        <svg {...p}>
          <path d="M12 12L52 52M44 12L52 20M12 44L20 52M52 12L12 52" stroke={color} strokeWidth="5.5" strokeLinecap="round" />
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

/* ─── Sơ Đồ Giải Phẫu Hệ Tiêu Hóa Tương Tác Đa Lớp (SVG 420x430) ─── */
function InteractiveDigestiveSvg({ activePart, onSelectPart }) {
  const is = (k) => activePart === k;
  const glow = (k, col) => (is(k) ? `drop-shadow(0 0 12px ${col})` : 'none');

  return (
    <svg viewBox="0 0 420 430" className="w-full max-w-[390px] h-auto select-none overflow-visible">
      <defs>
        <linearGradient id="bodySil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="liverG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E07A5F" />
          <stop offset="100%" stopColor="#9E3B24" />
        </linearGradient>
        <linearGradient id="stomG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="55%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="colonG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="smallG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>

      {/* Đường viền cơ thể mờ làm nền chuẩn giải phẫu */}
      <path
        d="M155 18 C155 40 110 48 92 84 C74 120 78 240 84 320 C88 375 110 412 145 418 L275 418 C310 412 332 375 336 320 C342 240 346 120 328 84 C310 48 265 40 265 18 Z"
        fill="url(#bodySil)"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="6 4"
      />

      {/* 1. THỰC QUẢN (Esophagus) */}
      <g
        onClick={() => onSelectPart('esophagus')}
        className="cursor-pointer"
        style={{ filter: glow('esophagus', '#0EA5E9') }}
      >
        <path
          d="M204 16 C204 55 206 95 212 132 L228 132 C222 95 220 55 220 16 Z"
          fill={is('esophagus') ? '#0EA5E9' : '#38BDF8'}
          stroke="#fff"
          strokeWidth={is('esophagus') ? 3.5 : 2}
        />
        {/* Viên thức ăn (bolus) chạy dọc thực quản */}
        <motion.circle
          cx="214"
          r="5.5"
          fill="#FDE047"
          stroke="#0284C7"
          strokeWidth="1.5"
          animate={{ cy: [24, 124] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </g>

      {/* 2. GAN & TÚI MẬT (Liver & Gallbladder) */}
      <g
        onClick={() => onSelectPart('liver')}
        className="cursor-pointer"
        style={{ filter: glow('liver', '#D97706') }}
      >
        <path
          d="M108 118 C104 156 112 192 128 202 C152 195 196 172 228 146 C234 132 214 112 175 108 C138 104 112 106 108 118 Z"
          fill="url(#liverG)"
          stroke="#fff"
          strokeWidth={is('liver') ? 3.8 : 2.2}
        />
        <path d="M124 132 C142 124 168 122 192 126" stroke="#FDBA74" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Túi mật màu xanh ngọc lục bảo */}
        <path
          d="M158 182 C152 196 158 208 168 208 C178 208 182 196 176 184 L188 196"
          fill="#10B981"
          stroke="#065F46"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* 3. TỤY TẠNG (Pancreas) */}
      <g
        onClick={() => onSelectPart('pancreas')}
        className="cursor-pointer"
        style={{ filter: glow('pancreas', '#EAB308') }}
      >
        <path
          d="M194 214 C215 204 256 202 278 214 C286 220 282 232 268 235 C246 240 212 242 194 234 C184 229 184 218 194 214 Z"
          fill="#FACC15"
          stroke="#A16207"
          strokeWidth={is('pancreas') ? 3.5 : 2}
        />
        {/* Ống tụy chính hình xương cá */}
        <path d="M198 224 H268 M215 218 L222 224 L215 230 M238 218 L245 224 L238 230" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* 4. TÁ TRÀNG (Duodenum - Đoạn C ôm đầu tụy) */}
      <g
        onClick={() => onSelectPart('duodenum')}
        className="cursor-pointer"
        style={{ filter: glow('duodenum', '#F59E0B') }}
      >
        <path
          d="M198 198 C174 198 164 216 168 236 C172 254 192 260 218 256"
          stroke="#F59E0B"
          strokeWidth={is('duodenum') ? 18 : 15}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M198 198 C174 198 164 216 168 236 C172 254 192 260 218 256"
          stroke="#FEF3C7"
          strokeWidth="4"
          strokeDasharray="4 6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 5. DẠ DÀY (Stomach - Cơ quan trung tâm) */}
      <g
        onClick={() => onSelectPart('stomach')}
        className="cursor-pointer"
        style={{ filter: glow('stomach', '#F97316') }}
      >
        <motion.path
          d="M212 128 C222 108 262 104 284 128 C308 154 304 206 270 222 C242 235 208 220 196 202 C192 195 202 186 212 188 C228 190 242 178 240 158 C238 142 222 138 212 128 Z"
          fill="url(#stomG)"
          stroke="#fff"
          strokeWidth={is('stomach') ? 4 : 2.5}
          animate={is('stomach') ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '250px 170px' }}
        />
        {/* Nếp gấp niêm mạc & ánh sáng 3D trên dạ dày */}
        <path d="M255 126 C276 132 288 156 282 184" stroke="#FFEDD5" strokeOpacity=".65" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M232 198 C252 204 268 196 276 178" stroke="#9A3412" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* 6. RUỘT GIÀ / ĐẠI TRÀNG (Large Intestine) */}
      <g
        onClick={() => onSelectPart('largeIntestine')}
        className="cursor-pointer"
        style={{ filter: glow('largeIntestine', '#14B8A6') }}
      >
        <path
          d="M132 346 V262 C132 246 146 238 166 240 H264 C284 238 296 248 296 266 V344 C296 362 276 368 252 368 H222 C214 368 212 378 212 396"
          stroke="url(#colonG)"
          strokeWidth={is('largeIntestine') ? 28 : 24}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Các ngấn đại tràng (Haustra) */}
        <path
          d="M132 340 V262 C132 246 146 238 166 240 H264 C284 238 296 248 296 266 V344 C296 362 276 368 252 368 H222"
          stroke="#CCFBF1"
          strokeOpacity=".65"
          strokeWidth="4"
          strokeDasharray="3 14"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 7. RUỘT NON (Small Intestine) */}
      <g
        onClick={() => onSelectPart('smallIntestine')}
        className="cursor-pointer"
        style={{ filter: glow('smallIntestine', '#EC4899') }}
      >
        <path
          d="M168 272 H254 C266 272 266 292 252 292 H174 C160 292 160 312 174 312 H250 C264 312 264 332 248 332 H176 C164 332 164 350 182 350 H236"
          stroke="url(#smallG)"
          strokeWidth={is('smallIntestine') ? 19 : 16}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M168 272 H254 C266 272 266 292 252 292 H174 C160 292 160 312 174 312 H250 C264 312 264 332 248 332 H176"
          stroke="#FCE7F3"
          strokeOpacity=".55"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Điểm Hotspot Nhấp Nháy Trực Quan */}
      {[
        { id: 'esophagus', x: 212, y: 68, l: 'Thực quản' },
        { id: 'liver', x: 152, y: 146, l: 'Gan – Mật' },
        { id: 'stomach', x: 262, y: 166, l: 'Dạ dày' },
        { id: 'duodenum', x: 172, y: 218, l: 'Tá tràng' },
        { id: 'pancreas', x: 238, y: 222, l: 'Tụy' },
        { id: 'smallIntestine', x: 214, y: 312, l: 'Ruột non' },
        { id: 'largeIntestine', x: 294, y: 298, l: 'Ruột già' },
      ].map((pt) => {
        const active = is(pt.id);
        const col = PARTS[pt.id].color;
        return (
          <g key={pt.id} onClick={() => onSelectPart(pt.id)} className="cursor-pointer">
            {active && (
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="14"
                fill={col}
                opacity=".35"
                animate={{ scale: [0.8, 1.55, 0.8], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            <circle cx={pt.x} cy={pt.y} r={active ? 7.5 : 5.5} fill={active ? col : '#fff'} stroke={col} strokeWidth="2.8" />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Sơ Đồ Mô Học Hàng Rào Niêm Mạc Dạ Dày (SVG 820x270) ─── */
function HistologicalMucosaSvg() {
  return (
    <svg viewBox="0 0 820 270" className="w-full h-auto select-none">
      <defs>
        <linearGradient id="lumenAcid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="100%" stopColor="#FECACA" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="mucusGel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#99F6E4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="epiCell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* TẦNG 1: LÒNG DẠ DÀY (Gastric Lumen - pH 1.5 - 3.5) */}
      <rect x="0" y="0" width="820" height="82" fill="url(#lumenAcid)" />
      <text x="22" y="26" fontSize="13" fontWeight="900" fill="#B91C1C">
        1. LÒNG DẠ DÀY (Dịch vị Axit HCl & Pepsin • pH 1.5 – 3.5)
      </text>
      <text x="22" y="44" fontSize="11" fontWeight="700" fill="#7F1D1D">
        Tấn công liên tục: Ion H⁺, enzym tiêu đạm Pepsin, vi khuẩn H. pylori, thuốc NSAID
      </text>

      {/* Các phân tử H+, Pepsin và H. pylori đang bơi trong lòng dạ dày */}
      {[
        { x: 470, y: 28, t: 'H⁺', c: '#EF4444' },
        { x: 540, y: 48, t: 'Pepsin', c: '#D97706' },
        { x: 630, y: 26, t: 'HCl', c: '#DC2626' },
        { x: 710, y: 46, t: 'H⁺', c: '#EF4444' },
      ].map((m, i) => (
        <motion.g key={i} animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }}>
          <rect x={m.x} y={m.y - 12} width={m.t.length * 9 + 16} height="22" rx="11" fill={m.c} />
          <text x={m.x + (m.t.length * 9 + 16) / 2} y={m.y + 3} textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">
            {m.t}
          </text>
          <path d={`M${m.x + 14} ${m.y + 13} V${m.y + 25}`} stroke={m.c} strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
      ))}

      {/* TẦNG 2: LỚP GEL CHẤT NHẦY & ĐỆM BICARBONAT (0.2 mm • pH 2 -> pH 7) */}
      <path d="M0 80 Q105 70 210 80 T420 80 T630 80 T820 80 V148 H0 Z" fill="url(#mucusGel)" />
      <path d="M0 80 Q105 70 210 80 T420 80 T630 80 T820 80" stroke="#0D9488" strokeWidth="3.5" fill="none" />
      <text x="22" y="106" fontSize="13" fontWeight="900" fill="#0F766E">
        2. LỚP GEL CHẤT NHẦY + ĐỆM BICARBONAT HCO₃⁻ (Dày 0.2 mm • Nâng pH lên ~7.0)
      </text>
      <text x="22" y="125" fontSize="11" fontWeight="700" fill="#0369A1">
        Chặn đứng Pepsin và trung hòa ion H⁺ ngay trước khi chạm tới bề mặt tế bào biểu mô
      </text>

      {/* Các phân tử HCO3- sủi bọt trung hòa axit */}
      {[460, 560, 660, 755].map((x, i) => (
        <motion.g key={x} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
          <rect x={x} y="104" width="56" height="22" rx="11" fill="#fff" stroke="#0284C7" strokeWidth="2" />
          <text x={x + 28} y="119" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0284C7">
            HCO₃⁻
          </text>
        </motion.g>
      ))}

      {/* TẦNG 3: HÀNG RÀO TẾ BÀO BIỂU MÔ TRỤ ĐƠN & LIÊN KẾT CHẶT (Tight Junctions) */}
      <g transform="translate(0 144)">
        {Array.from({ length: 20 }, (_, i) => {
          const x = 14 + i * 40;
          return (
            <g key={i}>
              <rect x={x} y="0" width="36" height="62" rx="10" fill="url(#epiCell)" stroke="#fff" strokeWidth="2.5" />
              <ellipse cx={x + 18} cy="38" rx="8" ry="11" fill="#881337" opacity=".65" />
              <circle cx={x + 16} cy="35" r="2.5" fill="#FDA4AF" />
              {/* Liên kết chặt (Tight junction) giữa các tế bào */}
              {i < 19 && <rect x={x + 35} y="8" width="6" height="14" rx="2" fill="#0F766E" />}
            </g>
          );
        })}
        <rect x="18" y="8" width="355" height="46" rx="12" fill="#0F2E35" fillOpacity=".82" />
        <text x="32" y="28" fontSize="12.5" fontWeight="900" fill="#fff">
          3. BIỂU MÔ NIÊM MẠC & LIÊN KẾT CHẶT (Đổi mới 3–5 ngày)
        </text>
        <text x="32" y="45" fontSize="10.5" fontWeight="700" fill="#99F6E4">
          Tế bào tiết nhầy · Tế bào viền (HCl, B12) · Tế bào chính (Pepsinogen)
        </text>
      </g>

      {/* TẦNG 4: LỚP ĐỆM & VI TUẦN HOÀN MÁU NUÔI (Submucosal Microcirculation & Prostaglandin) */}
      <rect x="0" y="212" width="820" height="58" fill="#FFF1F2" />
      <path d="M0 238 Q120 224 240 238 T480 238 T720 238 T820 238" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M0 238 Q120 224 240 238 T480 238 T720 238 T820 238" stroke="#FCA5A5" strokeWidth="4" strokeDasharray="8 12" strokeLinecap="round" fill="none" />
      <rect x="18" y="218" width="445" height="42" rx="11" fill="#fff" stroke="#FECDD3" strokeWidth="2" />
      <text x="30" y="236" fontSize="12" fontWeight="900" fill="#BE123C">
        4. VI TUẦN HOÀN MÁU NUÔI & PROSTAGLANDIN E₂
      </text>
      <text x="30" y="252" fontSize="10.5" fontWeight="700" fill="#64748B">
        Cung cấp Oxy, dưỡng chất, HCO₃⁻ và dọn sạch axit thấm ngược
      </text>
    </svg>
  );
}

export function Slide4Anatomy({ onSelectSlide = () => {} }) {
  const [activeView, setActiveView] = useState('anatomy');
  const [selectedPart, setSelectedPart] = useState('stomach');

  const info = PARTS[selectedPart] || PARTS.stomach;

  const switchView = useCallback((v) => {
    playSfx('tick');
    setActiveView(v);
  }, []);

  const choosePart = useCallback((part) => {
    playSfx('tick');
    setSelectedPart(part);
  }, []);

  return (
    <div className="w-full h-full flex flex-col px-4 md:px-10 py-2.5 gap-2.5 select-none bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#FFF7ED] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#0D9488] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6]" />
            SLIDE 04 • CẤU TRÚC & HÀNG RÀO BẢO VỆ
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B] leading-tight">
            Giải phẫu Hệ Tiêu hóa & Niêm mạc Dạ dày
          </h2>
        </div>

        {/* Segmented Switch */}
        <div className="relative flex p-1 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-md">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full shadow-lg"
            animate={{
              left: activeView === 'anatomy' ? 4 : 'calc(50%)',
              background: activeView === 'anatomy'
                ? 'linear-gradient(90deg,#14B8A6,#0EA5E9)'
                : 'linear-gradient(90deg,#F97316,#EC4899)',
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
          {[
            { id: 'anatomy', icon: 'anatomyTab', label: 'Toàn cảnh 7 cơ quan' },
            { id: 'mucosa', icon: 'mucosaTab', label: 'Vi cấu trúc Niêm mạc' },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => switchView(id)}
              className={`relative z-10 flex items-center justify-center gap-2 px-4 md:px-5 py-2 rounded-full text-xs font-extrabold transition-colors min-w-[148px] ${
                activeView === id ? 'text-white' : 'text-[#5B7B80] hover:text-[#12343B]'
              }`}
            >
              <MedSvg name={icon} size={18} color={activeView === id ? '#fff' : '#14B8A6'} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === 'anatomy' ? (
            <motion.div
              key="view-anatomy"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full grid grid-cols-12 gap-5 items-center"
            >
              {/* LEFT: Sân khấu giải phẫu SVG tương tác */}
              <div className="col-span-12 lg:col-span-6 relative flex flex-col items-center justify-center bg-white/75 backdrop-blur-md rounded-[30px] border border-white shadow-xl p-3 h-full">
                <motion.div
                  className="absolute w-[320px] h-[320px] rounded-full blur-3xl pointer-events-none"
                  animate={{ backgroundColor: `${info.color}30` }}
                  transition={{ duration: 0.5 }}
                />
                <div className="relative z-10 w-full flex items-center justify-center">
                  <InteractiveDigestiveSvg activePart={selectedPart} onSelectPart={choosePart} />
                </div>
                <span className="relative z-10 text-[11px] font-bold text-[#5B7B80] mt-0.5">
                  Chạm trực tiếp vào từng cơ quan trên sơ đồ để xem thông số sinh học
                </span>
              </div>

              {/* RIGHT: Thông tin chi tiết cơ quan */}
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-3">
                {/* 7 Nút chọn nhanh cơ quan */}
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(PARTS).map(([key, p]) => {
                    const on = key === selectedPart;
                    return (
                      <button
                        key={key}
                        onClick={() => choosePart(key)}
                        className="px-3 py-1.5 rounded-full text-[11px] font-extrabold border transition-all flex items-center gap-1.5"
                        style={{
                          background: on ? p.color : 'rgba(255,255,255,0.9)',
                          color: on ? '#fff' : '#5B7B80',
                          borderColor: on ? p.color : '#fff',
                          boxShadow: on ? `0 6px 16px ${p.color}45` : '0 1px 2px rgba(0,0,0,0.05)',
                          transform: on ? 'translateY(-1px)' : 'none',
                        }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: on ? '#fff' : p.color }} />
                        <span>{p.short}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Thẻ Thông Số Lớn */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPart}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.24 }}
                    className="relative overflow-hidden rounded-[28px] bg-white/95 border border-white shadow-2xl p-6"
                  >
                    <div
                      className="absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-20 blur-2xl pointer-events-none"
                      style={{ background: info.color }}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: info.color }} />
                          <h3 className="font-heading font-extrabold text-xl text-[#12343B]">{info.name}</h3>
                        </div>
                        <span
                          className="text-[11px] font-extrabold px-3 py-1 rounded-full"
                          style={{ background: `${info.color}18`, color: info.color }}
                        >
                          {info.sub}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span
                          className="font-heading font-black leading-none tracking-tight"
                          style={{ fontSize: 'clamp(44px, 6.2vw, 72px)', color: info.color }}
                        >
                          {info.stat}
                        </span>
                        <span className="text-lg font-extrabold text-[#12343B]">{info.unit}</span>
                      </div>
                      <div className="text-xs font-extrabold text-[#5B7B80] mt-1 uppercase tracking-wider">{info.label}</div>

                      <div className="h-px w-full my-3" style={{ background: `${info.color}35` }} />
                      <p className="text-sm font-semibold text-[#12343B] leading-relaxed">{info.desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 2 Nút Chuyển Nhanh Sang Nhóm Bệnh Lý */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: 5, color: '#F97316', icon: 'flameCard', title: 'Viêm loét dạ dày', sub: 'Tổn thương tại Dạ dày · Tá tràng' },
                    { n: 8, color: '#0EA5E9', icon: 'dropCard', title: 'Tiêu chảy cấp', sub: 'Mất nước tại Ruột non · Đại tràng' },
                  ].map(({ n, color, icon, title, sub }) => (
                    <button
                      key={n}
                      onClick={() => {
                        playSfx('whoosh');
                        onSelectSlide(n);
                      }}
                      className="group relative overflow-hidden p-3.5 rounded-2xl text-left text-white shadow-lg hover:-translate-y-0.5 transition-all"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 10px 24px ${color}40` }}
                    >
                      <div className="absolute -right-2 -bottom-2 opacity-80 pointer-events-none">
                        <MedSvg name={icon} size={56} color="#fff" />
                      </div>
                      <div className="relative flex items-center justify-between">
                        <span className="font-heading font-extrabold text-sm">{title}</span>
                        <span className="group-hover:translate-x-1 transition-transform">
                          <MedSvg name="arrowRight" size={16} color="#fff" />
                        </span>
                      </div>
                      <div className="relative text-[11px] font-semibold opacity-95 mt-0.5">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="view-mucosa"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full h-full flex flex-col justify-center gap-3 max-w-5xl"
            >
              <div className="rounded-[28px] bg-white/90 border-2 border-white shadow-xl p-3 overflow-hidden">
                <HistologicalMucosaSvg />
              </div>

              {/* 3 Lá Chắn Bảo Vệ Niêm Mạc */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SHIELDS.map(({ id, color, title, stat, sub, desc }) => (
                  <div
                    key={id}
                    className="relative overflow-hidden p-4 rounded-2xl bg-white/95 border border-white shadow-md flex flex-col justify-between"
                    style={{ borderTop: `4px solid ${color}` }}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${color}15` }}>
                          <MedSvg name={id} size={32} color={color} />
                        </div>
                        <span className="font-heading font-black text-2xl" style={{ color }}>{stat}</span>
                      </div>
                      <div className="text-sm font-extrabold text-[#12343B] mt-2">{title}</div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5" style={{ color }}>{sub}</div>
                      <p className="text-[11px] font-medium text-[#5B7B80] mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer: Cán cân Tấn công vs Bảo vệ */}
      <div className="w-full flex flex-wrap items-center justify-center gap-3 py-1 text-[11px] font-extrabold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#EF4444] border border-red-200">
          <MedSvg name="swords" size={14} color="#EF4444" />
          Yếu tố tấn công: Axit HCl · Pepsin · H. pylori · NSAID
        </span>
        <span className="text-[#12343B]/50 font-black">⚖ CÂN BẰNG SINH HỌC ⚖</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] border border-teal-200">
          <MedSvg name="mucus" size={15} color="#0D9488" />
          Yếu tố bảo vệ: Chất nhầy · HCO₃⁻ · Máu nuôi & Prostaglandin
        </span>
      </div>
    </div>
  );
}

export default Slide4Anatomy;