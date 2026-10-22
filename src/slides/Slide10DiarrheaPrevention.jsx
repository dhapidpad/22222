import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import HandWash from '../components/svg/HandWash';
import content from '../data/content';
import sfx from '../audio/sfx';

/* ──────────────────────────────────────────────────────────────
   HẰNG SỐ & TIỆN ÍCH
   ────────────────────────────────────────────────────────────── */
const INK = '#12343B';
const MUTE = '#5B7B80';

const play = (name) => {
  try {
    if (sfx && typeof sfx[name] === 'function') sfx[name]();
  } catch (e) {}
};

const loop = (reduce, animate, duration = 4, extra = {}) =>
  reduce ? {} : { animate, transition: { duration, repeat: Infinity, ease: 'easeInOut', ...extra } };

const wave = (p, y, a, ext = 160) =>
  `M0 ${y}q${p / 4} ${-a} ${p / 2} 0${` t${p / 2} 0`.repeat(Math.ceil((ext + p) / (p / 2)))}V240H0Z`;

const DROP = 'M0 -8C4 -2 6 2 6 4A6 6 0 0 1 -6 4C-6 2 -4 -2 0 -8Z';
const FLAME = 'M0 0C-5 -4 -3 -9 0 -13C3 -9 6 -6 4 -1C3 1 0 2 0 0Z';

const PILLARS = [
  { id: 'handwash', name: 'Rửa tay 6 bước', short: 'Quy trình Bộ Y tế', tone: { main: '#1FBFA8', deep: '#0F8F7D', tint: '#E3F7F2' } },
  { id: 'food', name: 'Ăn chín uống sôi', short: '5 Chìa khóa WHO', tone: { main: '#FF8A5B', deep: '#C2511F', tint: '#FFF2EB' } },
  { id: 'water', name: 'Nước & Vệ sinh', short: 'Kiểm soát nguồn nước', tone: { main: '#3BB8F0', deep: '#0284C7', tint: '#EAF6FD' } },
  { id: 'vaccine', name: 'Vaccine Rotavirus', short: 'Miễn dịch chủ động', tone: { main: '#8B5CF6', deep: '#6D28D9', tint: '#F3EEFF' } }
];

const TAB_DETAILS = {
  handwash: {
    title: 'Trụ 1: Rửa tay 6 bước với xà phòng',
    desc: 'Rửa tay thường quy theo quy trình 6 bước của Bộ Y tế trong tối thiểu 30 giây. Thực hiện trước khi ăn, trước khi chuẩn bị thức ăn, sau khi đi vệ sinh và sau khi chạm bề mặt bẩn.',
    imgCaption: 'Rửa tay kỹ với xà phòng dưới vòi nước sạch',
    badge: 'Cắt đứt lây lan 45%'
  },
  food: {
    title: 'Trụ 2: Ăn chín uống sôi triệt để',
    desc: 'Nấu chín kỹ thực phẩm (thịt, cá, trứng, hải sản), không ăn đồ sống tái (tiết canh, gỏi, nem chua). Bảo quản thức ăn trong tủ lạnh, đậy kín lồng bàn chống ruồi; tách biệt dao thớt đồ sống và chín.',
    imgCaption: 'Nấu chín kỹ, bảo quản lạnh và không để quá 2 giờ',
    badge: 'An toàn thực phẩm WHO'
  },
  water: {
    title: 'Trụ 3: Nguồn nước sạch & Vệ sinh môi trường',
    desc: 'Uống nước đun sôi để nguội hoặc nước đóng chai đạt chuẩn kiểm định. Giữ gìn nhà tiêu hợp vệ sinh, không phóng uế bừa bãi ra môi trường ao hồ xung quanh; khử trùng Cloramin B khi có bão lũ.',
    imgCaption: 'Đun sôi, để nguội và chỉ uống nước đạt chuẩn',
    badge: 'Kiểm định nguồn nước'
  },
  vaccine: {
    title: 'Trụ 4: Vaccine Rotavirus & Sữa mẹ hoàn toàn',
    desc: 'Cho trẻ uống đủ 2 liều vaccine phòng Rotavirus (bắt đầu từ 2 tháng tuổi, hoàn thành trước 6 tháng tuổi). Nuôi con bằng sữa mẹ hoàn toàn trong 6 tháng đầu để truyền kháng thể sIgA tự nhiên bảo vệ niêm mạc ruột.',
    imgCaption: 'Miễn dịch chủ động và kháng thể sữa mẹ bảo vệ ruột',
    badge: 'Phòng ngừa chủ động'
  }
};

/* ──────────────────────────────────────────────────────────────
   BIỂU TƯỢNG TRỤ CỘT (vẽ tay, hệ tọa độ 48×48)
   ────────────────────────────────────────────────────────────── */
function PillarArt({ id, active, reduce }) {
  const on = active && !reduce;
  if (id === 'handwash') {
    return (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
        <rect x="6" y="26" width="28" height="14" rx="6" transform="rotate(-12 20 33)" fill="#9FE6DA" stroke="#1FBFA8" strokeWidth="2" />
        <path d="M12 32q8 -3 16 -5" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".75" fill="none" />
        {[[34, 14, 7], [22, 12, 4.5], [40, 28, 4], [13, 17, 3]].map(([x, y, r], i) => (
          <motion.g key={i} {...(on ? { animate: { y: [0, -4, 0] }, transition: { duration: 2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' } } : {})}>
            <circle cx={x} cy={y} r={r} fill="#fff" fillOpacity=".75" stroke="#3BB8F0" strokeWidth="1.6" />
            <path d={`M${x - r * 0.55} ${y - r * 0.1}a${r * 0.6} ${r * 0.6} 0 0 1 ${r * 0.45} ${-r * 0.5}`} stroke="#3BB8F0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </motion.g>
        ))}
      </svg>
    );
  }
  if (id === 'food') {
    return (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
        {[16, 24, 32].map((x, i) => (
          <motion.path key={x} d={`M${x} 13q-3 -3 0 -6`} fill="none" stroke="#FF8A5B" strokeWidth="2" strokeLinecap="round"
            {...(on ? { animate: { opacity: [0, 1, 0], y: [2, -3, -6] }, transition: { duration: 2, repeat: Infinity, delay: i * 0.35 } } : { opacity: 0.7 })} />
        ))}
        <path d="M10 25h28v11a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" fill="#FFB48F" stroke="#D35400" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 23a14 6 0 0 1 28 0z" fill="#FFD3BC" stroke="#D35400" strokeWidth="2" strokeLinejoin="round" />
        <path d="M7 25h34" stroke="#D35400" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="24" cy="15.5" r="2.4" fill="#D35400" />
        <path d="M13 30q4 -2 6 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".6" fill="none" />
      </svg>
    );
  }
  if (id === 'water') {
    return (
      <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
        <path d="M24 5C31 15 38 22 38 30a14 14 0 0 1-28 0C10 22 17 15 24 5z" fill="#8ED3F4" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
        <motion.path d="M10 32q6 -4 12 0t12 0t12 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity=".85"
          {...(on ? { animate: { x: [0, -12] }, transition: { duration: 2.4, repeat: Infinity, ease: 'linear' } } : {})} />
        <path d="M17 23q-3 5 -1 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity=".7" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
      <rect x="19" y="3" width="10" height="9" rx="4.5" fill="#C9B6FB" stroke="#6D28D9" strokeWidth="2" />
      <rect x="17" y="11" width="14" height="5" rx="1.5" fill="#6D28D9" />
      <path d="M18 16h12v19a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z" fill="#F3EEFF" stroke="#6D28D9" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 29h10v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z" fill="#B197FC" />
      <rect x="20.5" y="19" width="7" height="5" rx="1" fill="#fff" stroke="#6D28D9" strokeWidth="1" />
      <motion.g transform="translate(24 44)" {...(on ? { animate: { y: [-2, 2, -2], opacity: [0.4, 1, 0.4] }, transition: { duration: 1.6, repeat: Infinity } } : {})}>
        <path d={DROP} transform="scale(.55)" fill="#8B5CF6" />
      </motion.g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   MINH HỌA "HERO" CHO THẺ BÊN TRÁI (viewBox 340 × 110)
   ────────────────────────────────────────────────────────────── */
function Glyph({ kind }) {
  if (kind === 'plate') {
    return (
      <g>
        <circle r="8" fill="#fff" stroke="#1FBFA8" strokeWidth="1.6" />
        <circle r="4.6" fill="none" stroke="#1FBFA8" strokeWidth="1.2" />
      </g>
    );
  }
  if (kind === 'pot') {
    return (
      <g>
        <path d="M-8 -1h16v6a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" fill="#FFB48F" stroke="#C2511F" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M-9 -2h18" stroke="#C2511F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M-3 -5q2 -3 0 -6M3 -5q2 -3 0 -6" fill="none" stroke="#C2511F" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === 'roll') {
    return (
      <g>
        <rect x="-6" y="-8" width="12" height="16" rx="3" fill="#fff" stroke="#0284C7" strokeWidth="1.5" />
        <ellipse cy="-8" rx="6" ry="2" fill="#EAF6FD" stroke="#0284C7" strokeWidth="1.2" />
        <circle cy="1" r="2.4" fill="none" stroke="#0284C7" strokeWidth="1.2" />
      </g>
    );
  }
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <g key={i}>
            <line x1={Math.cos(a) * 4} y1={Math.sin(a) * 4} x2={Math.cos(a) * 8} y2={Math.sin(a) * 8} stroke="#EF4B5F" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx={Math.cos(a) * 8.6} cy={Math.sin(a) * 8.6} r="1.5" fill="#EF4B5F" />
          </g>
        );
      })}
      <circle r="5" fill="#FF8FA0" stroke="#EF4B5F" strokeWidth="1.4" />
    </g>
  );
}

function HeroHand({ reduce }) {
  const C = 2 * Math.PI * 36;
  const chips = [
    [120, 6, ['Trước khi', 'ăn'], 'plate'],
    [232, 6, ['Trước khi', 'chuẩn bị thức ăn'], 'pot'],
    [120, 56, ['Sau khi đi', 'vệ sinh'], 'roll'],
    [232, 56, ['Sau khi chạm', 'bề mặt bẩn'], 'germ']
  ];
  return (
    <svg viewBox="0 0 340 110" className="w-full h-auto" role="img" aria-label="Đồng hồ 30 giây và 4 thời điểm rửa tay">
      <defs>
        <linearGradient id="h1-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1FBFA8" /><stop offset="1" stopColor="#3BB8F0" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="54" r="36" fill="#fff" fillOpacity=".7" stroke="#1FBFA8" strokeOpacity=".15" strokeWidth="9" />
      <g transform="rotate(-90 60 54)">
        <motion.circle cx="60" cy="54" r="36" fill="none" stroke="url(#h1-ring)" strokeWidth="9" strokeLinecap="round" strokeDasharray={C}
          initial={{ strokeDashoffset: reduce ? C * 0.25 : C }}
          animate={reduce ? { strokeDashoffset: C * 0.25 } : { strokeDashoffset: [C, 0, 0, C] }}
          transition={reduce ? undefined : { duration: 7, repeat: Infinity, times: [0, 0.65, 0.92, 1], ease: 'easeInOut' }} />
      </g>
      {Array.from({ length: 6 }, (_, i) => {
        const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
        return <circle key={i} cx={60 + Math.cos(a) * 47} cy={54 + Math.sin(a) * 47} r="2.6" fill="#1FBFA8" opacity=".55" />;
      })}
      <text x="60" y="55" textAnchor="middle" fontSize="23" fontWeight="800" fill={INK}>30</text>
      <text x="60" y="67" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={MUTE}>giây</text>

      {chips.map(([x, y, lines, g], i) => (
        <motion.g key={g} initial={reduce ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 260, damping: 24 }}>
          <rect x={x} y={y} width="108" height="44" rx="13" fill="#fff" fillOpacity=".88" stroke="#1FBFA8" strokeOpacity=".35" />
          <circle cx={x + 19} cy={y + 22} r="13" fill="#E3F7F2" />
          <g transform={`translate(${x + 19} ${y + 22})`}><Glyph kind={g} /></g>
          <text x={x + 38} y={y + 20} fontSize="8.2" fontWeight="700" fill={INK}>{lines[0]}</text>
          <text x={x + 38} y={y + 31} fontSize="8.2" fontWeight="700" fill={INK}>{lines[1]}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function HeroFood({ reduce }) {
  const C = 2 * Math.PI * 22;
  return (
    <svg viewBox="0 0 340 112" className="w-full h-auto" role="img" aria-label="Nồi nấu trên 70 độ, tủ mát dưới 5 độ, đồng hồ 2 giờ">
      <defs>
        <linearGradient id="h2-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#EF4B5F" /><stop offset=".6" stopColor="#FF8A5B" /><stop offset="1" stopColor="#FFD166" />
        </linearGradient>
        <linearGradient id="h2-pot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC9AD" /><stop offset="1" stopColor="#F2824E" />
        </linearGradient>
      </defs>

      {/* Nồi + que đo nhiệt */}
      {[44, 56, 68].map((x, i) => (
        <motion.path key={x} d={`M${x} 32q-4 -4 0 -8t0 -8`} fill="none" stroke="#C2511F" strokeWidth="2" strokeLinecap="round" opacity=".45"
          {...loop(reduce, { y: [0, -6, 0], opacity: [0.15, 0.6, 0.15] }, 2.2, { delay: i * 0.4 })} />
      ))}
      <path d="M26 52h60v18a12 12 0 0 1 -12 12H38a12 12 0 0 1 -12 -12z" fill="url(#h2-pot)" stroke="#C2511F" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M28 52a28 12 0 0 1 56 0z" fill="#FFD9C6" stroke="#C2511F" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="56" cy="37" r="3.4" fill="#C2511F" />
      <rect x="18" y="58" width="8" height="5" rx="2.5" fill="#C2511F" />
      <rect x="86" y="58" width="8" height="5" rx="2.5" fill="#C2511F" />
      <path d="M33 62q4 -3 9 -1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".55" fill="none" />
      <path d="M76 22L67 51" stroke={MUTE} strokeWidth="2" strokeLinecap="round" />
      <rect x="66" y="4" width="42" height="16" rx="5" fill={INK} />
      <text x="87" y="15.5" textAnchor="middle" fontSize="8.8" fontWeight="800" fill="#8EF0C8">&gt; 70°C</text>
      {[40, 56, 72].map((x, i) => (
        <g key={x} transform={`translate(${x} 96)`}>
          <motion.path d={FLAME} transform="scale(1.1)" fill="url(#h2-flame)" {...loop(reduce, { scaleY: [1, 1.2, 0.9, 1] }, 0.9, { delay: i * 0.2 })} />
        </g>
      ))}

      {/* Tủ lạnh */}
      <rect x="143" y="16" width="54" height="76" rx="9" fill="#F4FAFE" stroke="#3BB8F0" strokeWidth="2.4" />
      <path d="M143 42h54" stroke="#3BB8F0" strokeWidth="2" />
      <rect x="187" y="22" width="4" height="14" rx="2" fill="#3BB8F0" />
      <rect x="187" y="48" width="4" height="22" rx="2" fill="#3BB8F0" />
      <motion.g transform="translate(168 66)" {...loop(reduce, { rotate: [0, 60] }, 8, { ease: 'linear' })}>
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <line x1="-11" y1="0" x2="11" y2="0" stroke="#3BB8F0" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M-8 -3l-3 3l3 3M8 -3l3 3l-3 3" fill="none" stroke="#3BB8F0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </motion.g>
      <rect x="150" y="22" width="26" height="14" rx="4" fill="#fff" stroke="#3BB8F0" strokeWidth="1.4" />
      <text x="163" y="32.5" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0284C7">&lt; 5°C</text>

      {/* Đồng hồ 2 giờ */}
      <circle cx="274" cy="52" r="31" fill="#fff" stroke={INK} strokeWidth="2.6" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <line key={i} x1={274 + Math.cos(a) * 25} y1={52 + Math.sin(a) * 25} x2={274 + Math.cos(a) * 28} y2={52 + Math.sin(a) * 28} stroke={INK} strokeOpacity=".6" strokeWidth="1.6" />;
      })}
      <g transform="rotate(-90 274 52)">
        <circle cx="274" cy="52" r="22" fill="none" stroke="#EF4B5F" strokeWidth="6" strokeDasharray={`${C / 6} ${C}`} strokeLinecap="round" opacity=".85" />
      </g>
      <motion.g {...(reduce ? {} : { initial: { rotate: 0 }, animate: { rotate: [0, 60, 60, 0] }, transition: { duration: 6, repeat: Infinity, times: [0, 0.5, 0.85, 1], ease: 'easeInOut' } })}>
        <line x1="274" y1="32" x2="274" y2="52" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <line x1="274" y1="52" x2="274" y2="72" stroke="transparent" strokeWidth="2" />
      </motion.g>
      <circle cx="274" cy="52" r="3.4" fill={INK} />

      <g fontSize="9.2" fontWeight="800" fill={INK} textAnchor="middle">
        <text x="56" y="108">Chín &gt; 70°C</text>
        <text x="170" y="108">Ngăn mát &lt; 5°C</text>
        <text x="274" y="108">Không quá 2 giờ</text>
      </g>
    </svg>
  );
}

function HeroWater({ reduce }) {
  return (
    <svg viewBox="0 0 340 112" className="w-full h-auto" role="img" aria-label="Đun sôi, để nguội, đạt chuẩn">
      <defs>
        <linearGradient id="h3-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D5F1FB" /><stop offset="1" stopColor="#6CC8EE" />
        </linearGradient>
        <linearGradient id="h3-kettle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE3EA" /><stop offset="1" stopColor="#7FA3AF" />
        </linearGradient>
      </defs>

      {/* Ấm đun */}
      {[96, 104, 112].map((x, i) => (
        <motion.path key={x} d={`M${x} 34q-4 -4 0 -8t0 -8`} fill="none" stroke="#5B7B80" strokeWidth="2" strokeLinecap="round" opacity=".4"
          {...loop(reduce, { y: [0, -7, 0], opacity: [0.1, 0.55, 0.1] }, 2.2, { delay: i * 0.35 })} />
      ))}
      <path d="M86 58l18 -20" stroke="#7FA3AF" strokeWidth="7" strokeLinecap="round" />
      <path d="M86 58l18 -20" stroke="#CFE3EA" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 62q0 -24 30 -24t30 24v18q0 6 -6 6H32q-6 0 -6 -6z" fill="url(#h3-kettle)" stroke="#4A6B77" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M32 46q-18 -2 -18 16q0 12 14 12" fill="none" stroke="#4A6B77" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 46q-18 -2 -18 16q0 12 14 12" fill="none" stroke="#CFE3EA" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="56" cy="38" rx="14" ry="3.6" fill="#B7CFD7" stroke="#4A6B77" strokeWidth="1.6" />
      <circle cx="56" cy="33" r="3.6" fill="#4A6B77" />
      <path d="M34 56q4 -9 14 -11" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" fill="none" />
      {[42, 56, 70].map((x, i) => (
        <g key={x} transform={`translate(${x} 100)`}>
          <motion.path d={FLAME} transform="scale(.9)" fill="#FF8A5B" {...loop(reduce, { scaleY: [1, 1.25, 0.9, 1] }, 0.9, { delay: i * 0.2 })} />
        </g>
      ))}

      <motion.path d="M122 56h30" stroke="#3BB8F0" strokeWidth="2.4" strokeDasharray="5 5" strokeLinecap="round" {...loop(reduce, { strokeDashoffset: [0, -20] }, 1.2, { ease: 'linear' })} />
      <path d="M150 50l8 6l-8 6" fill="none" stroke="#3BB8F0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Cốc nước nguội */}
      <path d="M166 22h46l-4 58q-.5 6 -6 6h-26q-5.500 0 -6 -6z" fill="#fff" fillOpacity=".55" stroke="#8CCBE4" strokeWidth="3" strokeLinejoin="round" />
      <path d="M170 38q9 -4 18 0t18 0l-3 40q-.4 4 -4 4h-22q-3.600 0 -4 -4z" fill="url(#h3-water)" />
      <path d="M172 28L175 74" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      {[[196, 52], [202, 66], [184, 70]].map(([x, y], i) => (
        <motion.path key={i} d={`M${x} ${y - 4}v8M${x - 4} ${y}h8`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round"
          {...loop(reduce, { opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }, 2, { delay: i * 0.5 })} />
      ))}

      <motion.path d="M222 56h30" stroke="#3BB8F0" strokeWidth="2.4" strokeDasharray="5 5" strokeLinecap="round" {...loop(reduce, { strokeDashoffset: [0, -20] }, 1.2, { ease: 'linear' })} />
      <path d="M250 50l8 6l-8 6" fill="none" stroke="#3BB8F0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Con dấu đạt chuẩn */}
      <g transform="translate(298 52)">
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 28} cy={Math.sin(a) * 28} r="5.4" fill="#3BB8F0" />;
        })}
        <circle r="28" fill="#3BB8F0" />
        <circle r="23" fill="#fff" />
        <circle r="20" fill="none" stroke="#3BB8F0" strokeWidth="1.2" strokeDasharray="2 2.6" />
        <motion.path d="M-9 -3l6 6l12 -13" fill="none" stroke="#1FBFA8" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
        <text y="16" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0284C7">BYT</text>
      </g>

      <g fontSize="9.2" fontWeight="800" fill={INK} textAnchor="middle">
        <text x="56" y="108">Đun sôi</text>
        <text x="190" y="108">Để nguội</text>
        <text x="298" y="108">Đạt chuẩn QCVN</text>
      </g>
    </svg>
  );
}

function HeroVaccine({ reduce }) {
  const x = (m) => 40 + m * 46.5;
  return (
    <svg viewBox="0 0 340 112" className="w-full h-auto" role="img" aria-label="Lịch uống vaccine Rotavirus trước 6 tháng tuổi và bú mẹ hoàn toàn">
      <defs>
        <linearGradient id="h4-milk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F9A8C9" /><stop offset="1" stopColor="#FDE2EE" />
        </linearGradient>
      </defs>

      <text x="4" y="42" fontSize="8.5" fontWeight="800" fill="#6D28D9">Vaccine</text>
      <rect x={x(0)} y="30" width={x(6) - x(0)} height="16" rx="8" fill="#EDE5FF" />
      <rect x={x(1.38)} y="30" width={x(6) - x(1.38)} height="16" rx="8" fill="#C9B6FB" />
      <text x="224" y="41.500" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#4C2BB5">Hoàn thành phác đồ</text>
      <motion.rect x={x(1.38)} y="30" width={x(1.85) - x(1.38)} height="16" rx="6" fill="#7C3AED"
        {...loop(reduce, { opacity: [0.75, 1, 0.75] }, 1.8)} />

      {/* Lọ vaccine uống */}
      <motion.g transform="translate(115 3)" {...loop(reduce, { y: [0, -2, 0] }, 2)}>
        <rect x="-4.500" y="0" width="9" height="7" rx="3.500" fill="#C9B6FB" stroke="#6D28D9" strokeWidth="1.4" />
        <rect x="-6" y="6" width="12" height="3.500" rx="1" fill="#6D28D9" />
        <path d="M-5.500 9.500h11v11a3 3 0 0 1 -3 3h-5a3 3 0 0 1 -3 -3z" fill="#F3EEFF" stroke="#6D28D9" strokeWidth="1.4" />
        <path d="M-4.500 16h9v4.500a2 2 0 0 1 -2 2h-5a2 2 0 0 1 -2 -2z" fill="#B197FC" />
      </motion.g>
      <text x="126" y="14" fontSize="8.5" fontWeight="800" fill="#6D28D9">Liều đầu: tuần 6 – 8</text>
      <path d="M115 28v-2" stroke="#6D28D9" strokeWidth="1.6" strokeLinecap="round" />

      {/* Cờ mốc 6 tháng */}
      <path d={`M${x(6)} 30V8l11 5l-11 5`} fill="#7C3AED" stroke="#6D28D9" strokeWidth="1.6" strokeLinejoin="round" />
      <text x={x(6) - 6} y="14" textAnchor="end" fontSize="8.5" fontWeight="800" fill="#6D28D9">Trước 6 tháng</text>

      {/* Trục tháng tuổi */}
      <path d={`M${x(0)} 58H${x(6)}`} stroke={INK} strokeOpacity=".4" strokeWidth="1.6" />
      {[0, 1, 2, 3, 4, 5, 6].map((m) => (
        <g key={m}>
          <path d={`M${x(m)} 55v6`} stroke={INK} strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />
          <text x={x(m)} y="71" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={MUTE}>{m}</text>
        </g>
      ))}
      <text x="4" y="71" fontSize="7.5" fontWeight="700" fill={MUTE}>tháng</text>

      <text x="4" y="95" fontSize="8.5" fontWeight="800" fill="#B0306A">Sữa mẹ</text>
      <rect x={x(0)} y="82" width={x(6) - x(0)} height="18" rx="9" fill="url(#h4-milk)" stroke="#F178AB" strokeOpacity=".6" />
      <text x={(x(0) + x(6)) / 2} y="94" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#9D2D61">Bú mẹ hoàn toàn 6 tháng đầu</text>
    </svg>
  );
}

const HEROES = { handwash: HeroHand, food: HeroFood, water: HeroWater, vaccine: HeroVaccine };

/* ──────────────────────────────────────────────────────────────
   TRỤ 2 — NHIỆT KẾ & 5 CHÌA KHÓA
   ────────────────────────────────────────────────────────────── */
function Thermometer({ reduce }) {
  const y = (t) => 262 - t * 2.4;
  return (
    <svg viewBox="0 0 100 296" className="w-full h-full" role="img" aria-label="Nhiệt kế: dưới 5 độ, vùng nguy hiểm 5–60 độ, trên 70 độ">
      <defs>
        <pattern id="th-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#FFE1DC" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#EF4B5F" strokeWidth="2.4" opacity=".55" />
        </pattern>
        <clipPath id="th-tube"><rect x="30" y="14" width="26" height="256" rx="13" /></clipPath>
        <linearGradient id="th-hg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EF4B5F" /><stop offset="1" stopColor="#FF8A5B" />
        </linearGradient>
      </defs>
      <rect x="30" y="14" width="26" height="256" rx="13" fill="#fff" />
      <g clipPath="url(#th-tube)">
        <rect x="30" y={y(5)} width="26" height={262 - y(5) + 10} fill="#BFE6F8" />
        <rect x="30" y={y(60)} width="26" height={y(5) - y(60)} fill="url(#th-hatch)" />
        <rect x="30" y={y(70)} width="26" height={y(60) - y(70)} fill="#FFE9A8" />
        <rect x="30" y="10" width="26" height={y(70) - 10} fill="#B9F0D8" />
        <motion.rect x="38" y={y(72)} width="10" height={270 - y(72)} fill="url(#th-hg)"
          style={{ originY: 1 }}
          initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} />
        <rect x="34" y="14" width="4" height="250" rx="2" fill="#fff" opacity=".55" />
      </g>
      <rect x="30" y="14" width="26" height="256" rx="13" fill="none" stroke={INK} strokeOpacity=".85" strokeWidth="3" />
      <circle cx="43" cy="274" r="19" fill="url(#th-hg)" stroke={INK} strokeOpacity=".85" strokeWidth="3" />
      <ellipse cx="36" cy="268" rx="5" ry="3.600" fill="#fff" opacity=".5" />
      {[[5, '#0284C7'], [60, '#C2511F'], [70, '#0F8F7D']].map(([t, c]) => (
        <g key={t}>
          <path d={`M56 ${y(t)}h10`} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
          <text x="69" y={y(t) + 3.500} fontSize="9.500" fontWeight="800" fill={c}>{t}°C</text>
        </g>
      ))}
      <motion.path d={`M22 ${y(72)}l9 -5v10z`} fill="#0F8F7D" {...loop(reduce, { x: [0, 3, 0] }, 1.4)} />
      <text x="27" y="8" textAnchor="middle" fontSize="8" fontWeight="700" fill={MUTE}>100°C</text>
    </svg>
  );
}

const FOOD_RULES = [
  { n: 1, c: '#1FBFA8', bg: '#E3F7F2', t: 'Giữ vệ sinh sạch sẽ', d: 'Rửa tay bằng xà phòng trước khi chế biến và giữa các công đoạn; giữ bếp, dao thớt và dụng cụ luôn sạch.' },
  { n: 2, c: '#E0A116', bg: '#FFF8E6', t: 'Tách biệt thực phẩm sống và chín', d: 'Dùng dao, thớt, hộp chứa riêng biệt cho thịt sống và đồ ăn đã chín để ngăn ngừa lây nhiễm chéo vi sinh vật.' },
  {
    n: 3, c: '#FF8A5B', bg: '#FFF2EB', t: 'Nấu chín kỹ thức ăn',
    d: (
      <>
        Nhiệt độ tâm thực phẩm phải đạt trên 70°C để tiêu diệt vi khuẩn <em>Salmonella</em>, <em>E. coli</em>, <em>Campylobacter</em>. Tuyệt đối không ăn tiết canh, gỏi sống, nem chua.
      </>
    )
  },
  { n: 4, c: '#3BB8F0', bg: '#EAF6FD', t: 'Bảo quản ở nhiệt độ an toàn', d: 'Không để thức ăn chín ở nhiệt độ phòng quá 2 giờ. Bảo quản trong ngăn mát tủ lạnh (< 5°C) và đậy kín lồng bàn chống ruồi nhặng trung gian.' },
  { n: 5, c: '#8B5CF6', bg: '#F3EEFF', t: 'Chọn nguyên liệu tươi sạch & nước sạch', d: 'Ngâm rửa rau củ nhiều lần dưới vòi nước chảy; chỉ mua thực phẩm có nguồn gốc xuất xứ rõ ràng, còn hạn sử dụng.' }
];

function FoodPanel({ reduce }) {
  return (
    <div className="h-full flex gap-3 min-h-0">
      <div className="w-[84px] shrink-0 rounded-2xl p-1.5 flex flex-col items-center" style={{ background: 'linear-gradient(180deg,#FFF6F1,#FFFFFF)', border: '1px solid rgba(255,138,91,.25)' }}>
        <div className="flex-1 min-h-0 w-full"><Thermometer reduce={reduce} /></div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1.5 justify-between">
        {FOOD_RULES.map((r, i) => (
          <motion.div
            key={r.n}
            initial={reduce ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.08 + i * 0.06 }}
            className="flex items-start gap-2.5 rounded-2xl px-2.5 py-1.5 border"
            style={{ background: r.bg, borderColor: `${r.c}33` }}
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0 mt-0.5" aria-hidden="true">
              <rect x="1" y="1" width="30" height="30" rx="10" fill={r.c} />
              <path d="M5 11q6 -8 22 -6" stroke="#fff" strokeOpacity=".35" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{r.n}</text>
            </svg>
            <div className="min-w-0">
              <div className="font-heading font-extrabold text-[11.5px] leading-tight" style={{ color: INK }}>{r.t}</div>
              <div className="text-[10.5px] leading-snug mt-0.5" style={{ color: MUTE }}>{r.d}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TRỤ 3 — QUY TRÌNH XỬ LÝ NƯỚC KHI BÃO LŨ
   ────────────────────────────────────────────────────────────── */
function WaterFlow({ reduce }) {
  const tiles = [4, 158, 312, 466];
  const BUCKET = 'M32 30h66l-7 56q-.5 5 -6 5H45q-5.500 0 -6 -5z';
  const GLASS = 'M42 30h46l-4 56q-.5 5 -5 5H51q-4.500 0 -5 -5z';
  const sed = [[44, 70], [58, 56], [72, 66], [84, 60], [50, 62], [66, 50]];
  return (
    <svg viewBox="0 0 600 130" className="w-full h-auto" role="img" aria-label="Quy trình 4 bước xử lý nước khi bão lũ">
      <defs>
        <linearGradient id="w-mud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFA56E" /><stop offset="1" stopColor="#9A6B3B" />
        </linearGradient>
        <linearGradient id="w-clear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3F5FC" /><stop offset="1" stopColor="#8ED3F4" />
        </linearGradient>
        <linearGradient id="w-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#EF4B5F" /><stop offset="1" stopColor="#FFD166" />
        </linearGradient>
        <clipPath id="w-bk"><path d={BUCKET} /></clipPath>
        <clipPath id="w-gl"><path d={GLASS} /></clipPath>
      </defs>

      {tiles.map((tx, i) => (
        <g key={tx} transform={`translate(${tx} 0)`}>
          <rect width="130" height="126" rx="16" fill="#fff" fillOpacity=".78" stroke="#3BB8F0" strokeOpacity=".3" />
          <circle cx="14" cy="14" r="8.500" fill="#3BB8F0" />
          <text x="14" y="17.500" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">{i + 1}</text>

          {i === 0 && (
            <g>
              <path d={BUCKET} fill="#fff" fillOpacity=".5" stroke="#8A6C4A" strokeWidth="2.6" strokeLinejoin="round" />
              <g clipPath="url(#w-bk)">
                <motion.path d={wave(22, 42, 2.500, 140)} fill="url(#w-mud)" {...(reduce ? {} : { animate: { x: [0, -22] }, transition: { duration: 3, repeat: Infinity, ease: 'linear' } })} />
                {[[44, 66, 2.4], [60, 54, 1.8], [76, 70, 2.6], [88, 58, 1.6], [52, 76, 2], [70, 48, 1.6]].map(([cx, cy, r], k) => (
                  <motion.circle key={k} cx={cx} cy={cy} r={r} fill="#6F4A24" opacity=".7"
                    {...loop(reduce, { cy: [cy, cy - 8, cy + 4, cy], cx: [cx, cx + 4, cx - 3, cx] }, 3 + k * 0.4, { delay: k * 0.2 })} />
                ))}
              </g>
              <ellipse cx="65" cy="30" rx="33" ry="4.500" fill="#EFE4D2" stroke="#8A6C4A" strokeWidth="2" />
              <text x="65" y="108" textAnchor="middle" fontSize="9.500" fontWeight="800" fill={INK}>Nước lũ, nước đục</text>
              <text x="65" y="119" textAnchor="middle" fontSize="8.500" fill={MUTE}>(chưa xử lý)</text>
            </g>
          )}

          {i === 1 && (
            <g>
              <motion.g {...loop(reduce, { y: [0, 6, 0] }, 2.4)}>
                <polygon points="96,6 104,10.500 104,19.500 96,24 88,19.500 88,10.500" fill="#E8F0F8" stroke="#6F86A0" strokeWidth="1.600" strokeLinejoin="round" />
                <path d="M88 10.500L96 15L104 10.500M96 15V24" fill="none" stroke="#6F86A0" strokeWidth="1.200" />
              </motion.g>
              <path d={BUCKET} fill="#fff" fillOpacity=".5" stroke="#8A6C4A" strokeWidth="2.6" strokeLinejoin="round" />
              <g clipPath="url(#w-bk)">
                <rect x="30" y="42" width="72" height="30" fill="url(#w-clear)" />
                <path d="M30 76q9 -6 18 0t18 0t18 0t18 0V96H30z" fill="#A8784A" />
                {sed.map(([cx, cy], k) => (
                  <motion.circle key={k} cx={cx} cy={cy - 14} r="2.200" fill="#8A6236"
                    {...loop(reduce, { cy: [cy - 26, cy], opacity: [0.9, 0.9, 0] }, 2.8, { delay: k * 0.45, ease: 'easeIn' })} />
                ))}
              </g>
              <ellipse cx="65" cy="30" rx="33" ry="4.500" fill="#EAF6FD" stroke="#8A6C4A" strokeWidth="2" />
              <text x="65" y="108" textAnchor="middle" fontSize="9.500" fontWeight="800" fill={INK}>Phèn chua làm trong</text>
              <text x="65" y="119" textAnchor="middle" fontSize="8.500" fill={MUTE}>1g phèn cho 20 lít nước</text>
            </g>
          )}

          {i === 2 && (
            <g>
              <path d={GLASS} fill="#fff" fillOpacity=".55" stroke="#8CCBE4" strokeWidth="2.800" strokeLinejoin="round" />
              <g clipPath="url(#w-gl)">
                <motion.path d={wave(22, 42, 2.200, 140)} fill="url(#w-clear)" {...(reduce ? {} : { animate: { x: [0, -22] }, transition: { duration: 3, repeat: Infinity, ease: 'linear' } })} />
              </g>
              <motion.g {...loop(reduce, { y: [0, 30], opacity: [1, 1, 0] }, 2.2, { ease: 'easeIn' })}>
                <circle cx="62" cy="10" r="6" fill="#fff" stroke="#0284C7" strokeWidth="1.800" />
                <path d="M58 10h8" stroke="#0284C7" strokeWidth="1.400" strokeLinecap="round" />
              </motion.g>
              <motion.ellipse cx="62" cy="42" rx="4" ry="1.400" fill="none" stroke="#3BB8F0" strokeWidth="1.400"
                {...loop(reduce, { rx: [4, 16], opacity: [0.9, 0], ry: [1.4, 3.200] }, 2.2, { delay: 0.9, ease: 'easeOut' })} />
              <circle cx="104" cy="26" r="12" fill="#fff" stroke="#1FBFA8" strokeOpacity=".4" strokeWidth="4" />
              <g transform="rotate(-90 104 26)">
                <circle cx="104" cy="26" r="12" fill="none" stroke="#1FBFA8" strokeWidth="4" strokeLinecap="round" strokeDasharray="75.4" strokeDashoffset="12" />
              </g>
              <text x="104" y="29" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0F8F7D">30&apos;</text>
              <text x="65" y="108" textAnchor="middle" fontSize="9.500" fontWeight="800" fill={INK}>Khử trùng Cloramin B</text>
              <text x="65" y="119" textAnchor="middle" fontSize="8.500" fill={MUTE}>0,25g · chờ 30 phút</text>
            </g>
          )}

          {i === 3 && (
            <g>
              {[50, 65, 80].map((x, k) => (
                <motion.path key={x} d={`M${x} 40q-4 -4 0 -8t0 -8`} fill="none" stroke="#5B7B80" strokeWidth="2" strokeLinecap="round" opacity=".4"
                  {...loop(reduce, { y: [0, -6, 0], opacity: [0.1, 0.55, 0.1] }, 2.2, { delay: k * 0.35 })} />
              ))}
              <path d="M30 50h70v22a14 14 0 0 1 -14 14H44a14 14 0 0 1 -14 -14z" fill="#CFE3EA" stroke="#4A6B77" strokeWidth="2.400" strokeLinejoin="round" />
              <rect x="22" y="56" width="8" height="5" rx="2.500" fill="#4A6B77" />
              <rect x="100" y="56" width="8" height="5" rx="2.500" fill="#4A6B77" />
              <ellipse cx="65" cy="50" rx="35" ry="6.500" fill="#8ED3F4" stroke="#4A6B77" strokeWidth="2.200" />
              {[[52, 50], [66, 51], [78, 49]].map(([cx, cy], k) => (
                <motion.circle key={k} cx={cx} cy={cy} r="2.400" fill="#fff" stroke="#3BB8F0" strokeWidth="1"
                  {...loop(reduce, { cy: [cy + 4, cy - 2], r: [1.2, 3], opacity: [0.2, 1, 0.2] }, 1.1, { delay: k * 0.3 })} />
              ))}
              {[46, 65, 84].map((x, k) => (
                <g key={x} transform={`translate(${x} 100)`}>
                  <motion.path d={FLAME} transform="scale(1)" fill="url(#w-flame)" {...loop(reduce, { scaleY: [1, 1.25, 0.9, 1] }, 0.9, { delay: k * 0.2 })} />
                </g>
              ))}
              <text x="65" y="108" textAnchor="middle" fontSize="9.500" fontWeight="800" fill={INK}>Đun sôi để uống</text>
              <text x="65" y="119" textAnchor="middle" fontSize="8.500" fill={MUTE}>sau khi khử trùng</text>
            </g>
          )}
        </g>
      ))}

      {[0, 1, 2].map((k) => {
        const x0 = tiles[k] + 130;
        return (
          <g key={k}>
            <motion.path d={`M${x0 + 3} 58h13`} stroke="#3BB8F0" strokeWidth="2.400" strokeDasharray="4 4" strokeLinecap="round" {...loop(reduce, { strokeDashoffset: [0, -16] }, 1.2, { ease: 'linear' })} />
            <path d={`M${x0 + 14} 52l7 6l-7 6`} fill="none" stroke="#3BB8F0" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

function MiniDrink() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
      <path d="M9 6h14l-1.800 20q-.2 2 -2 2h-6.400q-1.800 0 -2 -2z" fill="#E3F5FC" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 13q3 -2 6 0t6 0l-1 13h-10z" fill="#8ED3F4" />
      <path d="M13 17l2.500 2.500l4.500 -5" fill="none" stroke="#0F8F7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniToilet() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" aria-hidden="true">
      <rect x="9" y="3" width="14" height="9" rx="2.500" fill="#fff" stroke="#0F8F7D" strokeWidth="2" />
      <path d="M5 14h22q0 8 -7 11v3h-8v-3q-7 -3 -7 -11z" fill="#E3F7F2" stroke="#0F8F7D" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 18q6 3 12 0" stroke="#0F8F7D" strokeWidth="1.600" strokeLinecap="round" fill="none" opacity=".6" />
    </svg>
  );
}

function WaterPanel({ reduce }) {
  return (
    <div className="h-full flex flex-col gap-2.5 min-h-0">
      <div className="rounded-2xl p-2.5 border" style={{ background: 'linear-gradient(135deg,#F3EEFF,#EAF6FD)', borderColor: 'rgba(59,184,240,.3)' }}>
        <div className="font-heading font-extrabold text-[11.5px] mb-1.5 flex items-center justify-between gap-2" style={{ color: '#4C2BB5' }}>
          <span>Xử lý nước khi bão lũ, thiên tai (Khuyến cáo Bộ Y tế)</span>
        </div>
        <WaterFlow reduce={reduce} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-1 min-h-0">
        <div className="rounded-2xl p-2.5 border flex flex-col justify-between" style={{ background: 'rgba(234,246,253,.85)', borderColor: 'rgba(59,184,240,.3)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 shrink-0"><MiniDrink /></span>
              <span className="font-heading font-extrabold text-[11.5px]" style={{ color: '#0284C7' }}>Nước uống đạt chuẩn</span>
            </div>
            <p className="text-[10.5px] leading-snug" style={{ color: MUTE }}>
              • Triệt để uống nước đã đun sôi để nguội.<br />
              • Dùng nước máy hoặc nước giếng đã qua lõi lọc RO/khử khuẩn.<br />
              • Không uống nước lã từ sông suối, kênh rạch chưa xử lý.
            </p>
          </div>
          <div className="mt-1.5 text-[10px] font-bold bg-white/85 p-1 rounded-xl border text-center" style={{ color: '#0284C7', borderColor: 'rgba(59,184,240,.25)' }}>
            Quy chuẩn QCVN 01-1:2018/BYT
          </div>
        </div>
        <div className="rounded-2xl p-2.5 border flex flex-col justify-between" style={{ background: 'rgba(227,247,242,.85)', borderColor: 'rgba(31,191,168,.3)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 shrink-0"><MiniToilet /></span>
              <span className="font-heading font-extrabold text-[11.5px]" style={{ color: '#0F8F7D' }}>Nhà tiêu hợp vệ sinh</span>
            </div>
            <p className="text-[10.5px] leading-snug" style={{ color: MUTE }}>
              • Sử dụng nhà tiêu tự hoại hoặc bán tự hoại.<br />
              • Tuyệt đối không phóng uế bừa bãi ra đồng ruộng, ao hồ.<br />
              • Thu gom và xử lý tã lót trẻ em vào thùng rác có nắp đậy.
            </p>
          </div>
          <div className="mt-1.5 text-[10px] font-bold bg-white/85 p-1 rounded-xl border text-center" style={{ color: '#0F8F7D', borderColor: 'rgba(31,191,168,.3)' }}>
            Chặn nguồn phát tán mầm bệnh
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TRỤ 4 — NHUNG MAO RUỘT, KHÁNG THỂ sIgA & VACCINE
   ────────────────────────────────────────────────────────────── */
function Ab({ x, y, rot, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0V-5M0 -5L-5 -11M0 -5L5 -11" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <circle cx="-5" cy="-11" r="1.500" fill="#7C3AED" />
      <circle cx="5" cy="-11" r="1.500" fill="#7C3AED" />
    </g>
  );
}

function VirusDot({ x, y, r = 8, reduce, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g {...loop(reduce, { y: [0, -4, 0], x: [0, 2, 0] }, 3.200, { delay })}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={Math.cos(a) * r} y1={Math.sin(a) * r} x2={Math.cos(a) * (r + 3)} y2={Math.sin(a) * (r + 3)} stroke="#E0A92E" strokeWidth="1.800" strokeLinecap="round" />;
        })}
        <circle r={r} fill="#BFE8F8" stroke="#1F93C8" strokeWidth="1.600" />
        <circle r={r * 0.55} fill="#3BB8F0" />
      </motion.g>
    </g>
  );
}

function VilliArt({ reduce }) {
  const fingers = [14, 66, 118, 170];
  const angles = [-62, -31, 0, 31, 62];
  return (
    <svg viewBox="0 0 240 138" className="w-full h-auto" role="img" aria-label="Nhung mao ruột được kháng thể sIgA bao phủ, chặn Rotavirus">
      <defs>
        <linearGradient id="v-lumen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF9EC" /><stop offset="1" stopColor="#FFEFD0" />
        </linearGradient>
        <linearGradient id="v-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAC5B8" /><stop offset="1" stopColor="#F29A8B" />
        </linearGradient>
      </defs>
      <rect width="240" height="138" rx="14" fill="url(#v-lumen)" />

      <g transform="translate(0 16)">
        <rect x="0" y="108" width="240" height="14" fill="#F2A090" />
        {fingers.map((fx) => (
          <g key={fx}>
            <path d={`M${fx} 112V66a22 22 0 0 1 44 0V112Z`} fill="url(#v-wall)" stroke="#E58C7C" strokeWidth="2" strokeLinejoin="round" />
            <path d={`M${fx + 22} 110V70`} stroke="#E94B5F" strokeOpacity=".6" strokeWidth="3.200" strokeLinecap="round" />
            <path d={`M${fx + 6} 64a16 16 0 0 1 8 -12`} stroke="#fff" strokeOpacity=".6" strokeWidth="2.400" strokeLinecap="round" fill="none" />
            {angles.map((a) => {
              const rad = (a * Math.PI) / 180;
              return <Ab key={a} x={fx + 22 + 22 * Math.sin(rad)} y={66 - 22 * Math.cos(rad)} rot={a} s={0.9} />;
            })}
          </g>
        ))}
      </g>

      {/* Virus bị kháng thể bao vây */}
      <g transform="translate(168 24)">
        {[-150, -110, -70, -30, 10, 170].map((th) => {
          const r = (th * Math.PI) / 180;
          return <Ab key={th} x={Math.cos(r) * 21} y={Math.sin(r) * 21} rot={th - 90} s={0.9} />;
        })}
      </g>
      <VirusDot x={168} y={24} reduce={reduce} delay={0.4} />
      <VirusDot x={104} y={34} r={7} reduce={reduce} />

      {/* Chú giải */}
      <Ab x={12} y={17} rot={0} s={0.85} />
      <text x="22" y="16" fontSize="8.500" fontWeight="800" fill="#6D28D9">sIgA</text>
      <circle cx="56" cy="13" r="4" fill="#BFE8F8" stroke="#1F93C8" strokeWidth="1.200" />
      <text x="64" y="16" fontSize="8.500" fontWeight="800" fill="#1F93C8">Rotavirus</text>
    </svg>
  );
}

function ZincTile() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9 shrink-0" aria-hidden="true">
      <rect x="1.500" y="1.500" width="37" height="37" rx="8" fill="#EAF6FD" stroke="#3BB8F0" strokeWidth="2" />
      <text x="6" y="12" fontSize="7" fontWeight="700" fill="#0284C7">30</text>
      <text x="20" y="27" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0284C7">Zn</text>
      <text x="20" y="35" textAnchor="middle" fontSize="6" fontWeight="700" fill={MUTE}>Kẽm</text>
    </svg>
  );
}

function VaccinePanel({ reduce }) {
  const C = 2 * Math.PI * 29;
  return (
    <div className="h-full flex flex-col gap-2.5 min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-1 min-h-0">
        <div className="rounded-2xl p-3 border flex flex-col gap-2" style={{ background: 'rgba(243,238,255,.9)', borderColor: 'rgba(139,92,246,.3)' }}>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 shrink-0 rounded-xl bg-white p-0.5"><PillarArt id="vaccine" reduce={reduce} /></span>
            <h4 className="font-heading font-extrabold text-[11.5px] leading-tight" style={{ color: '#4C2BB5' }}>Uống đủ 2 – 3 liều Vaccine phòng Rotavirus</h4>
          </div>
          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0 flex flex-col items-center">
              <svg width="78" height="78" viewBox="0 0 78 78" role="img" aria-label="Giảm 85 đến 95 phần trăm ca nặng">
                <defs>
                  <linearGradient id="vc-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#8B5CF6" /><stop offset="1" stopColor="#3BB8F0" />
                  </linearGradient>
                </defs>
                <circle cx="39" cy="39" r="29" fill="#fff" stroke="#8B5CF6" strokeOpacity=".15" strokeWidth="9" />
                <g transform="rotate(-90 39 39)">
                  <motion.circle cx="39" cy="39" r="29" fill="none" stroke="url(#vc-ring)" strokeWidth="9" strokeLinecap="round" strokeDasharray={C}
                    initial={{ strokeDashoffset: reduce ? C * 0.1 : C }} animate={{ strokeDashoffset: C * 0.1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
                </g>
                <text x="39" y="43" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4C2BB5">85–95%</text>
              </svg>
              <span className="text-[9.5px] font-bold text-center leading-tight mt-0.5 max-w-[84px]" style={{ color: '#6D28D9' }}>ca nặng phải nhập viện</span>
            </div>
            <p className="text-[10.5px] leading-snug" style={{ color: MUTE }}>
              • Liều đầu tiên uống từ <strong>tuần thứ 6 – 8</strong> sau sinh.<br />
              • Hoàn thành toàn bộ phác đồ trước khi trẻ tròn <strong>6 tháng tuổi</strong>.<br />
              • Hiệu quả bảo vệ: giảm tới <strong>85 – 95%</strong> ca tiêu chảy nặng phải nhập viện cấp cứu!
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-3 border flex flex-col gap-2" style={{ background: 'rgba(255,240,247,.9)', borderColor: 'rgba(241,120,171,.35)' }}>
          <h4 className="font-heading font-extrabold text-[11.5px] leading-tight" style={{ color: '#9D2D61' }}>Nuôi con bằng sữa mẹ hoàn toàn 6 tháng đầu</h4>
          <div className="rounded-xl overflow-hidden shrink-0"><VilliArt reduce={reduce} /></div>
          <p className="text-[10.5px] leading-snug" style={{ color: MUTE }}>
            Sữa mẹ cung cấp lượng lớn kháng thể <strong>sIgA</strong>, lysozyme và lactoferrin giúp bao bọc và bảo vệ nhung mao ruột non, ngăn vi khuẩn, virus bám dính vào niêm mạc.
          </p>
        </div>
      </div>

      <div className="rounded-2xl px-3 py-2 border flex items-center gap-3 text-[11px] shrink-0" style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: MUTE }}>
        <ZincTile />
        <span className="flex-1">Khuyến nghị WHO: bổ sung <strong>Kẽm (Zinc)</strong> 10-14 ngày giúp tái tạo biểu mô ruột.</span>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full" style={{ background: '#EDE5FF', color: '#6D28D9' }}>TCMR 2024</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   KHUNG, NỀN, HUY HIỆU
   ────────────────────────────────────────────────────────────── */
function PanelShell({ pillar, title, chip, children }) {
  const { tone } = pillar;
  return (
    <div className="h-full min-h-0 flex flex-col rounded-3xl bg-white/90 backdrop-blur-xl border border-white p-3.5 overflow-hidden" style={{ boxShadow: '0 12px 36px -14px rgba(18,52,59,.22)' }}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 shrink-0" style={{ borderBottom: `1px solid ${tone.main}26` }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-8 h-8 rounded-xl shrink-0 p-0.5" style={{ background: tone.tint }}>
            <PillarArt id={pillar.id} reduce />
          </span>
          <span className="font-heading font-extrabold text-xs truncate" style={{ color: INK }}>{title}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: tone.tint, color: tone.deep }}>{chip}</span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

function ShieldEmblem({ reduce }) {
  return (
    <svg width="42" height="42" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0 drop-shadow-md">
      <defs>
        <linearGradient id="d10-sh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3BB8F0" /><stop offset=".55" stopColor="#1FBFA8" /><stop offset="1" stopColor="#7DE3B8" />
        </linearGradient>
      </defs>
      <path d="M20 3l15 5.500v10.500c0 9.500 -6.500 15.500 -15 18.500C11.500 34.500 5 28.500 5 19V8.500z" fill="url(#d10-sh)" />
      <path d="M20 3l15 5.500v10.500c0 9.500 -6.500 15.500 -15 18.500" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.600" />
      <path d="M20 9C24 14 27.500 17.500 27.500 21.500a7.500 7.500 0 0 1 -15 0C12.500 17.500 16 14 20 9z" fill="#fff" fillOpacity=".95" />
      <motion.path d="M16.500 21.500l2.800 2.800l5 -5.500" fill="none" stroke="#1FBFA8" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
    </svg>
  );
}

function Backdrop({ reduce }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="d10-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.300" fill={INK} opacity=".07" />
        </pattern>
        <radialGradient id="d10-a"><stop offset="0" stopColor="#1FBFA8" stopOpacity=".24" /><stop offset="1" stopColor="#1FBFA8" stopOpacity="0" /></radialGradient>
        <radialGradient id="d10-b"><stop offset="0" stopColor="#8B5CF6" stopOpacity=".16" /><stop offset="1" stopColor="#8B5CF6" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#d10-dots)" />
      <motion.circle cx="140" cy="90" r="250" fill="url(#d10-a)" {...loop(reduce, { cx: [140, 190, 140], cy: [90, 130, 90] }, 20)} />
      <motion.circle cx="1080" cy="600" r="280" fill="url(#d10-b)" {...loop(reduce, { cx: [1080, 1030, 1080], cy: [600, 560, 600] }, 24)} />
      {[[1010, 520, 9], [1060, 470, 6], [1120, 540, 12], [980, 600, 5], [1150, 430, 7]].map(([x, y, r], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#3BB8F0" strokeOpacity=".28" strokeWidth="1.600"
          {...loop(reduce, { cy: [y, y - 90, y], opacity: [0.2, 0.9, 0.2] }, 9 + i * 1.5, { delay: i })} />
      ))}
    </svg>
  );
}

function PillarButton({ pillar, active, onClick, reduce, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className="relative overflow-hidden rounded-2xl p-2 flex items-center gap-2 text-left cursor-pointer border"
      style={{ borderColor: active ? 'transparent' : 'rgba(255,255,255,.9)', background: active ? 'transparent' : 'rgba(255,255,255,.8)', boxShadow: active ? '0 10px 24px -10px rgba(31,191,168,.7)' : '0 2px 8px -4px rgba(18,52,59,.15)' }}
    >
      {active && (
        <motion.span layoutId="pillar-active" className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(110deg,#1FBFA8,#3BB8F0)' }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
      )}
      <span className="relative w-10 h-10 rounded-xl shrink-0 p-1" style={{ background: active ? 'rgba(255,255,255,.95)' : pillar.tone.tint }}>
        <PillarArt id={pillar.id} active={active} reduce={reduce} />
      </span>
      <span className="relative min-w-0">
        <span className="block font-heading font-extrabold text-xs truncate" style={{ color: active ? '#fff' : INK }}>{pillar.name}</span>
        <span className="block text-[10px] truncate" style={{ color: active ? 'rgba(255,255,255,.9)' : MUTE }}>{pillar.short}</span>
      </span>
      <span className="relative ml-auto text-[10px] font-extrabold shrink-0" style={{ color: active ? 'rgba(255,255,255,.85)' : '#9AAEB2' }}>{index + 1}</span>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────────────────────
   BANNER BÙ NƯỚC (ORS)
   ────────────────────────────────────────────────────────────── */
function OrsArt({ kind, n, color }) {
  return (
    <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" aria-hidden="true">
      {kind === 'glass' && (
        <g>
          <path d="M9 9h20l-2.500 26q-.3 3 -3 3h-9q-2.700 0 -3 -3z" fill="#E3F5FC" stroke="#0F8F7D" strokeWidth="2" strokeLinejoin="round" />
          <path d="M10.500 18q4.500 -3 9 0t7.500 -1l-1.500 17h-12z" fill="#8ED3F4" />
          <g transform="translate(34 18) rotate(18)">
            <rect x="-5.500" y="-9" width="11" height="18" rx="1.500" fill="#2AA8E8" stroke="#0F8F7D" strokeWidth="1.400" />
            <path d="M-5.500 -9l2.200 -2l2.200 2l2.200 -2l2.200 2l2.200 -2" fill="none" stroke="#0F8F7D" strokeWidth="1.200" />
            <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#fff" />
          </g>
        </g>
      )}
      {kind === 'bowl' && (
        <g>
          <path d="M8 24h28a14 14 0 0 1 -28 0z" fill="#FFE3B3" stroke="#B7791F" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="22" cy="24" rx="14" ry="3" fill="#FFF3D6" stroke="#B7791F" strokeWidth="1.600" />
          <path d="M16 12q-2 -3 0 -6M22 12q-2 -3 0 -6" fill="none" stroke="#C2851F" strokeWidth="1.600" strokeLinecap="round" opacity=".6" />
          <path d="M22 28Q34 8 41 16Q36 26 22 28Z" fill="#FFD166" stroke="#B7791F" strokeWidth="1.600" strokeLinejoin="round" />
        </g>
      )}
      {kind === 'pill' && (
        <g>
          <g transform="rotate(-35 22 22)">
            <rect x="8" y="15" width="28" height="14" rx="7" fill="#fff" stroke="#B3283B" strokeWidth="2" />
            <path d="M22 15h-7a7 7 0 0 0 0 14h7z" fill="#EF4B5F" />
            <rect x="8" y="15" width="28" height="14" rx="7" fill="none" stroke="#B3283B" strokeWidth="2" />
          </g>
          <circle cx="22" cy="22" r="17" fill="none" stroke="#EF4B5F" strokeWidth="3.200" />
          <path d="M10 34L34 10" stroke="#EF4B5F" strokeWidth="3.200" strokeLinecap="round" />
        </g>
      )}
      <circle cx="7" cy="7" r="6.500" fill={color} stroke="#fff" strokeWidth="1.600" />
      <text x="7" y="10" textAnchor="middle" fontSize="8.500" fontWeight="800" fill="#fff">{n}</text>
    </svg>
  );
}

function OrsBanner() {
  return (
    <div className="relative z-10 w-full p-2.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs shrink-0 border"
      style={{ background: 'linear-gradient(100deg,#E3F7F2,#EAF6FD 55%,#fff)', borderColor: 'rgba(31,191,168,.3)', boxShadow: '0 8px 22px -14px rgba(31,191,168,.6)' }}>
      <div className="flex items-center gap-2 shrink-0">
        <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow" aria-hidden="true">
          <defs>
            <linearGradient id="ors-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3BB8F0" /><stop offset="1" stopColor="#1FBFA8" />
            </linearGradient>
          </defs>
          <path d="M20 3C27 12 34 19 34 26a14 14 0 0 1 -28 0C6 19 13 12 20 3z" fill="url(#ors-g)" />
          <path d="M12 24q-2 6 3 9" stroke="#fff" strokeOpacity=".6" strokeWidth="2.200" strokeLinecap="round" fill="none" />
          <text x="20" y="28" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">ORS</text>
        </svg>
        <span className="font-heading font-extrabold text-[12px]" style={{ color: INK }}>Xử trí bù nước</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]" style={{ color: INK }}>
        <div className="flex items-center gap-2">
          <OrsArt kind="glass" n="1" color="#1FBFA8" />
          <span><strong>Bù Oresol:</strong> Pha đúng 100% tỷ lệ nước (245 mOsm/L), uống từng ngụm nhỏ, không pha đường/sữa.</span>
        </div>
        <div className="flex items-center gap-2">
          <OrsArt kind="bowl" n="2" color="#3BB8F0" />
          <span><strong>Ăn nhẹ liên tục:</strong> Cháo loãng, chuối chín; trẻ bú mẹ tiếp tục bú bình thường — không nhịn ăn.</span>
        </div>
        <div className="flex items-center gap-2">
          <OrsArt kind="pill" n="3" color="#EF4B5F" />
          <span><strong>Không tự ý:</strong> Dùng thuốc cầm (Loperamide) làm liệt ruột, hoặc tự mua kháng sinh uống bừa bãi!</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   COMPONENT CHÍNH
   ────────────────────────────────────────────────────────────── */
export function Slide10DiarrheaPrevention() {
  const reduce = useReducedMotion();
  const data = content.slide10 || content.slide8?.prevention || {
    tag: 'BỆNH 2 · 4 TRỤ CỘT PHÒNG BỆNH & BÙ NƯỚC',
    title: 'GIẢI PHÁP PHÒNG BỆNH TIÊU CHẢY CẤP & NGUYÊN TẮC ORESOL',
    subtitle: 'Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol.'
  };

  const [activeTab, setActiveTab] = useState('handwash'); // 'handwash' | 'food' | 'water' | 'vaccine'

  const pillarIdx = PILLARS.findIndex((p) => p.id === activeTab);
  const pillar = PILLARS[pillarIdx];
  const current = TAB_DETAILS[activeTab];
  const tone = pillar.tone;
  const Hero = HEROES[activeTab];

  const select = (id) => {
    if (id === activeTab) return;
    play('tick');
    setActiveTab(id);
  };

  /* Phím 1–4 để đổi trụ cột */
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i >= 0) select(PILLARS[i].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="relative w-full h-full flex flex-col gap-2 px-3 md:px-8 lg:px-10 pt-2 pb-16 md:pb-20 select-none overflow-hidden text-[#12343B]">
      <Backdrop reduce={reduce} />

      {/* 1. Tiêu đề */}
      <header className="relative z-10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <ShieldEmblem reduce={reduce} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10.5px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(100deg,#3BB8F0,#1FBFA8)' }}>
                {data.tag}
              </span>
              <span className="text-[11px] font-semibold" style={{ color: MUTE }}>Chiến lược y tế dự phòng (Bộ Y tế &amp; WHO)</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl leading-tight mt-0.5" style={{ color: INK }}>{data.title}</h2>
          </div>
        </div>
        <p className="text-xs font-medium max-w-xs text-right hidden lg:block leading-snug" style={{ color: MUTE }}>
          {data.subtitle || 'Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol.'}
        </p>
      </header>

      {/* 2. Khu vực chính */}
      <div className="relative z-10 grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        {/* Cột trái: chọn trụ cột + thẻ chi tiết */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-2.5 min-h-0">
          <div className="grid grid-cols-2 gap-2 shrink-0">
            {PILLARS.map((p, i) => (
              <PillarButton key={p.id} pillar={p} index={i} active={activeTab === p.id} reduce={reduce} onClick={() => select(p.id)} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="relative flex-1 min-h-0 rounded-3xl bg-white/90 backdrop-blur-xl border border-white p-3.5 flex flex-col gap-2 overflow-hidden"
              style={{ boxShadow: '0 12px 36px -14px rgba(18,52,59,.22)' }}
            >
              <span aria-hidden="true" className="absolute left-0 top-5 bottom-5 w-1.5 rounded-r-full" style={{ background: `linear-gradient(180deg, ${tone.main}, #1FBFA8)` }} />

              <div className="flex items-center justify-between gap-2 shrink-0">
                <span className="text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full" style={{ background: tone.tint, color: tone.deep, border: `1px solid ${tone.main}40` }}>
                  {current.badge}
                </span>
                <div className="flex items-center gap-1.5" aria-label={`Trụ cột ${pillarIdx + 1} trên 4`}>
                  {PILLARS.map((p, i) => (
                    <motion.span key={p.id} className="h-1.5 rounded-full" initial={false}
                      animate={{ width: i === pillarIdx ? 18 : 6, backgroundColor: i === pillarIdx ? tone.main : '#D5DEE1' }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} />
                  ))}
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-sm leading-snug shrink-0" style={{ color: INK }}>{current.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: MUTE }}>{current.desc}</p>

              <figure className="mt-auto shrink-0 rounded-2xl p-2" style={{ background: `linear-gradient(135deg, ${tone.tint}, #fff)`, border: `1px solid ${tone.main}2E` }}>
                <Hero reduce={reduce} />
                <figcaption className="text-[10.5px] font-semibold text-center mt-0.5" style={{ color: tone.deep }}>{current.imgCaption}</figcaption>
              </figure>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cột phải: hiển thị theo trụ cột */}
        <div className="col-span-12 lg:col-span-7 min-h-0 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduce ? false : { opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22 }}
              className="flex-1 min-h-0"
            >
              {activeTab === 'handwash' && (
                <div className="h-full overflow-y-auto rounded-3xl flex flex-col justify-center">
                  <HandWash />
                </div>
              )}
              {activeTab === 'food' && (
                <PanelShell pillar={pillar} title="5 nguyên tắc vàng an toàn thực phẩm (WHO)" chip="Tiêu chuẩn Y tế Quốc tế">
                  <FoodPanel reduce={reduce} />
                </PanelShell>
              )}
              {activeTab === 'water' && (
                <PanelShell pillar={pillar} title="Quản lý nguồn nước sạch & vệ sinh môi trường" chip="Phòng dịch cấp bách">
                  <WaterPanel reduce={reduce} />
                </PanelShell>
              )}
              {activeTab === 'vaccine' && (
                <PanelShell pillar={pillar} title="Miễn dịch chủ động: vaccine Rotavirus & kháng thể sữa mẹ" chip="Bảo vệ trẻ nhỏ">
                  <VaccinePanel reduce={reduce} />
                </PanelShell>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Banner bù nước */}
      <OrsBanner />
    </div>
  );
}

export default Slide10DiarrheaPrevention;