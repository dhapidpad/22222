import React, { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

/* Slide2Video v3 — 100% Custom Vector SVG Artwork & Icons (không dùng emoji hay icon ngoài dễ lỗi font) */

const TOTAL = 43;
const C = {
  ink: '#0F2E35',
  mute: '#52737A',
  teal: '#14B8A6',
  mint: '#6EE7B7',
  sky: '#0EA5E9',
  coral: '#F97316',
  red: '#EF4444',
  sun: '#F59E0B',
  violet: '#7C3AED',
};
const SPEEDS = [1, 1.5, 2];

const SCENES = [
  {
    id: 1, name: 'Dạ dày khỏe', range: [0, 6], accent: C.teal, mood: 0, tag: 'Hoạt động tự nhiên',
    deco: ['sparkle', 'leaf', 'bubble'],
    caption: 'Mỗi ngày, dạ dày làm việc không ngừng để tiêu hóa thức ăn và nuôi sống cơ thể.',
    bg: 'radial-gradient(circle at 18% 20%, #CCFBF1 0%, transparent 45%), radial-gradient(circle at 85% 80%, #E0F2FE 0%, transparent 50%), linear-gradient(135deg, #F0FDFA 0%, #F8FAFC 55%, #FFFBEB 100%)',
  },
  {
    id: 2, name: 'Vai trò', range: [6, 13], accent: C.sun, mood: 4, tag: '6 chức năng cốt lõi',
    deco: ['star', 'sparkle', 'heart'],
    caption: 'Dạ dày không chỉ chứa thức ăn: còn nhào trộn, tiêu hóa đạm, diệt khuẩn, hỗ trợ hấp thu vitamin B12 và điều tiết đẩy xuống ruột.',
    bg: 'radial-gradient(circle at 15% 25%, #FEF3C7 0%, transparent 48%), radial-gradient(circle at 85% 75%, #E0F2FE 0%, transparent 48%), linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 50%, #F0F9FF 100%)',
  },
  {
    id: 3, name: 'Thói quen xấu', range: [13, 19], accent: C.coral, mood: 1, tag: 'Yếu tố nguy cơ',
    deco: ['flame', 'bolt', 'warnDot'],
    caption: 'Ăn trễ, bỏ bữa, stress, rượu bia, lạm dụng thuốc giảm đau… dạ dày âm thầm tổn thương.',
    bg: 'radial-gradient(circle at 20% 20%, #FFEDD5 0%, transparent 48%), radial-gradient(circle at 80% 80%, #FEE2E2 0%, transparent 50%), linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 50%, #FEF2F2 100%)',
  },
  {
    id: 4, name: 'Vi khuẩn HP', range: [19, 25], accent: C.red, mood: 2, tag: 'Bệnh lý 1: Viêm loét',
    deco: ['spore', 'flame', 'bolt'],
    caption: 'Vi khuẩn H. pylori là tác nhân chính gây viêm loét dạ dày – tá tràng, rất dễ bị xem nhẹ!',
    bg: 'radial-gradient(circle at 18% 22%, #FEE2E2 0%, transparent 48%), radial-gradient(circle at 82% 78%, #EDE9FE 0%, transparent 48%), linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 50%, #F5F3FF 100%)',
  },
  {
    id: 5, name: 'Mất nước cấp', range: [25, 31], accent: C.sky, mood: 3, tag: 'Bệnh lý 2: Tiêu chảy cấp',
    deco: ['drop', 'bubble', 'ion'],
    caption: 'Tiêu chảy cấp gây mất nước rất nhanh — là nguyên nhân tử vong hàng đầu ở trẻ nhỏ (WHO).',
    bg: 'radial-gradient(circle at 20% 22%, #E0F2FE 0%, transparent 48%), radial-gradient(circle at 82% 78%, #CCFBF1 0%, transparent 48%), linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 50%, #ECFEFF 100%)',
  },
  {
    id: 6, name: 'GUT CARE', range: [31, 36], accent: C.teal, mood: 4, tag: 'Thông điệp sức khỏe',
    deco: ['heart', 'sparkle', 'shieldMini'],
    caption: 'Hiểu đúng – phòng sớm – chăm sóc đúng cách. Cùng GUT CARE sống khỏe mỗi ngày!',
    bg: 'radial-gradient(circle at 20% 20%, #CCFBF1 0%, transparent 48%), radial-gradient(circle at 82% 80%, #FEF3C7 0%, transparent 48%), linear-gradient(135deg, #ECFDF5 0%, #F0F9FF 50%, #FFFBEB 100%)',
  },
  {
    id: 7, name: 'Chào mừng', range: [36, 43], accent: '#5EEAD4', mood: 4, tag: 'Lời chào mở đầu',
    deco: ['sparkle', 'star', 'heart'],
    caption: 'Chào mừng cô và các bạn đến với bài thuyết trình của nhóm em!',
    bg: 'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.32) 0%, transparent 48%), radial-gradient(circle at 80% 78%, rgba(14,165,233,0.3) 0%, transparent 50%), linear-gradient(135deg, #062229 0%, #0C4A5A 52%, #0F766E 100%)',
  },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
const fmt = (s) => {
  const n = Math.floor(s);
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
};
const sceneAt = (t) => SCENES.find((s) => t >= s.range[0] && t < s.range[1]) || SCENES[SCENES.length - 1];
const glass = 'rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_12px_34px_-10px_rgba(15,46,53,0.18)]';

/* ───────────────────────── HỆ THỐNG SVG ICON & MINH HỌA CHUẨN VECTOR ───────────────────────── */

function SvgIcon({ name, size = 18, color = 'currentColor', className = '' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className, 'aria-hidden': true };
  switch (name) {
    /* UI Controls */
    case 'play':
      return <svg {...p}><path d="M7 5.5v13l11-6.5-11-6.5Z" fill={color} stroke={color} strokeWidth="1.8" strokeLinejoin="round" /></svg>;
    case 'pause':
      return <svg {...p}><rect x="6.5" y="5" width="4" height="14" rx="1.5" fill={color} /><rect x="13.5" y="5" width="4" height="14" rx="1.5" fill={color} /></svg>;
    case 'rewind':
      return <svg {...p}><path d="M11 18l-7-6 7-6v12ZM20 18l-7-6 7-6v12Z" fill={color} opacity=".88" /></svg>;
    case 'forward':
      return <svg {...p}><path d="M4 18l7-6-7-6v12ZM13 18l7-6-7-6v12Z" fill={color} opacity=".88" /></svg>;
    case 'replay':
      return <svg {...p}><path d="M4 12a8 8 0 1 0 2.3-5.6L4 8.5M4 4v4.5h4.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'subtitles':
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" stroke={color} strokeWidth="2" /><path d="M7 11h4M13 11h4M7 15h6M15 15h2" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'volume':
      return <svg {...p}><path d="M11 5L6 9H3v6h3l5 4V5Z" fill={color} /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'mute':
      return <svg {...p}><path d="M11 5L6 9H3v6h3l5 4V5Z" fill={color} opacity=".6" /><path d="M16 9l5 6M21 9l-5 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" /></svg>;
    case 'mic':
      return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" fill={color} /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'fullscreen':
      return <svg {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'minimize':
      return <svg {...p}><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'chevron':
      return <svg {...p}><path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'check':
      return <svg {...p}><circle cx="12" cy="12" r="9.5" fill={color} fillOpacity=".16" /><path d="M8 12.3l2.6 2.6L16.2 9" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'warn':
      return <svg {...p}><path d="M12 3.5L21.2 19a1.5 1.5 0 0 1-1.3 2.2H4.1A1.5 1.5 0 0 1 2.8 19L12 3.5Z" fill={color} fillOpacity=".18" stroke={color} strokeWidth="2" strokeLinejoin="round" /><path d="M12 9.5v4.5M12 17.2h.01" stroke={color} strokeWidth="2.4" strokeLinecap="round" /></svg>;
    case 'activity':
      return <svg {...p}><path d="M3 12h4l2.5-6 5 12 2.5-6H21" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'drop':
      return <svg {...p}><path d="M12 3s7 7.2 7 12a7 7 0 1 1-14 0c0-4.8 7-12 7-12Z" fill={color} fillOpacity=".25" stroke={color} strokeWidth="2" /></svg>;

    /* Particles & Badges */
    case 'sparkle':
      return <svg {...p}><path d="M12 2l2.3 6.7L21 11l-6.7 2.3L12 20l-2.3-6.7L3 11l6.7-2.3L12 2Z" fill={color} /></svg>;
    case 'star':
      return <svg {...p}><path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" fill={color} /></svg>;
    case 'heart':
      return <svg {...p}><path d="M12 20.5s-7.5-4.6-9.3-9A5.3 5.3 0 0 1 12 6.3a5.3 5.3 0 0 1 9.3 5.2c-1.8 4.4-9.3 9-9.3 9Z" fill={color} /></svg>;
    case 'leaf':
      return <svg {...p}><path d="M20 4C11 4 5 9.5 5 17.5c0 .8.2 1.6.5 2.5 8 0 14.5-5.5 14.5-16Z" fill={color} fillOpacity=".85" /><path d="M6 19C10 14.5 14 11 19 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case 'bubble':
      return <svg {...p}><circle cx="12" cy="12" r="8.5" fill={color} fillOpacity=".28" stroke={color} strokeWidth="1.8" /><circle cx="9.2" cy="9.2" r="2.2" fill="#fff" opacity=".85" /></svg>;
    case 'flame':
      return <svg {...p}><path d="M12.5 2.5c.8 3.6-2.5 5.4-1.5 8.5.7-1.2 2-2 2.6-3.4 2.7 2.6 4.4 5.3 4.4 8.2a6 6 0 0 1-12 0c0-3.8 2.6-6.9 6.5-13.3Z" fill="#EF4444" /><path d="M12 12.2c1.4 1.4 2.4 2.8 2.4 4.3a2.4 2.4 0 0 1-4.8 0c0-1.5 1-2.8 2.4-4.3Z" fill="#FDE047" /></svg>;
    case 'bolt':
      return <svg {...p}><path d="M13 2L4.5 13.5h6L9.5 22 19.5 10h-6L13 2Z" fill={color} /></svg>;
    case 'warnDot':
      return <svg {...p}><circle cx="12" cy="12" r="8" fill="#F97316" opacity=".8" /><circle cx="12" cy="12" r="4" fill="#FEF08A" /></svg>;
    case 'spore':
      return <svg {...p}><circle cx="12" cy="12" r="5.5" fill="#8B5CF6" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'ion':
      return <svg {...p}><circle cx="12" cy="12" r="8.5" fill="#38BDF8" fillOpacity=".25" stroke="#0288D1" strokeWidth="1.8" /><path d="M9 12h6M12 9v6" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'shieldMini':
      return <svg {...p}><path d="M12 3l7 3v5.5c0 4.8-3 8.4-7 9.8-4-1.4-7-5-7-9.8V6l7-3Z" fill={color} fillOpacity=".85" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

    /* Scene 1: Healthy Foods */
    case 'oats':
      return (
        <svg {...p}>
          <path d="M8 6.5c0-1.2 1.2-1.8 1.2-3M12 6c0-1.2 1.2-1.8 1.2-3M16 6.5c0-1.2 1.2-1.8 1.2-3" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="12" cy="11" rx="8.5" ry="3.2" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <path d="M3.5 11c0 5 3.6 8.5 8.5 8.5s8.5-3.5 8.5-8.5H3.5Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="1.5" />
          <circle cx="9.5" cy="10.8" r="1.1" fill="#EF4444" /><circle cx="13.8" cy="11.2" r="1" fill="#D97706" /><circle cx="11.8" cy="10.2" r=".9" fill="#10B981" />
        </svg>
      );
    case 'greens':
      return (
        <svg {...p}>
          <path d="M6 18c-1.5-4.5 1-9.5 6.5-11.5 2 4.5.5 9.5-6.5 11.5Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <path d="M12.5 18.5c-1-5 2.5-9.5 7.5-10 1 4.8-1.5 9.2-7.5 10Z" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
          <path d="M6 18c2.2-3.5 4.2-6 6-8M12.5 18.5c2.2-3 4.2-5 6.2-6.5" stroke="#ECFDF5" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'soup':
      return (
        <svg {...p}>
          <path d="M9 5.5c0-1 .8-1.5.8-2.5M15 5.5c0-1 .8-1.5.8-2.5" stroke="#FB923C" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4.5 10h15v4.5a6.5 6.5 0 0 1-6.5 6.5h-2a6.5 6.5 0 0 1-6.5-6.5V10Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M2.5 10.5h19" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="12" cy="10" rx="7.5" ry="2.2" fill="#FDE68A" stroke="#C2410C" strokeWidth="1.4" />
        </svg>
      );
    case 'water':
      return (
        <svg {...p}>
          <path d="M6.5 4.5h11l-1.2 14.2a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8L6.5 4.5Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.6" />
          <path d="M7.2 9.5c2.2 1 3.5-1 5.5 0s3.2 0 4.1-.5L16 18.2a1.2 1.2 0 0 1-1.2 1.1H9.2A1.2 1.2 0 0 1 8 18.2L7.2 9.5Z" fill="#38BDF8" />
          <circle cx="10.5" cy="14.5" r="1" fill="#fff" /><circle cx="13.5" cy="12.5" r=".8" fill="#fff" />
        </svg>
      );

    /* Scene 2: 6 Roles & Digestive Pipeline */
    case 'bowl':
      return (
        <svg {...p}>
          <path d="M3.5 10.5h17a8.5 8.5 0 0 1-17 0Z" fill="#14B8A6" fillOpacity=".22" stroke="#0F766E" strokeWidth="1.8" />
          <path d="M6.5 10.5a3.5 3.5 0 0 1 6.5-1.8 3 3 0 0 1 4.5 1.8" fill="#FCD34D" stroke="#B45309" strokeWidth="1.5" />
          <path d="M8 19.5h8" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'mix':
      return (
        <svg {...p}>
          <path d="M12 4a8 8 0 0 1 7.4 5M19.4 4.5V9h-4.5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 20a8 8 0 0 1-7.4-5M4.6 19.5V15h4.5" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.8" fill="#38BDF8" />
        </svg>
      );
    case 'flask':
      return (
        <svg {...p}>
          <path d="M9 3h6M10 3v5.2L5.2 16.8A2.2 2.2 0 0 0 7.1 20h9.8a2.2 2.2 0 0 0 1.9-3.2L14 8.2V3" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.7 14.5h10.6l1.4 2.4a1.2 1.2 0 0 1-1 1.8H6.3a1.2 1.2 0 0 1-1-1.8l1.4-2.4Z" fill="#FB7185" />
          <circle cx="10.5" cy="16.5" r="1" fill="#fff" /><circle cx="13.5" cy="15.8" r=".8" fill="#fff" />
        </svg>
      );
    case 'shieldCheck':
      return (
        <svg {...p}>
          <path d="M12 3l7.5 3.2v5.6c0 5-3.2 8.8-7.5 10.2-4.3-1.4-7.5-5.2-7.5-10.2V6.2L12 3Z" fill="#8B5CF6" fillOpacity=".2" stroke="#6D28D9" strokeWidth="1.8" />
          <path d="M8.8 12.2l2.2 2.2 4.4-4.4" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'b12':
      return (
        <svg {...p}>
          <rect x="3.5" y="7.5" width="17" height="9" rx="4.5" transform="rotate(-28 12 12)" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.7" />
          <path d="M12 7.5h4a4.5 4.5 0 0 1 0 9h-4v-9Z" transform="rotate(-28 12 12)" fill="#EA580C" />
          <circle cx="18" cy="6" r="1.6" fill="#F59E0B" />
        </svg>
      );
    case 'pylorus':
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="12" rx="6" fill="#CCFBF1" stroke="#0F766E" strokeWidth="1.8" />
          <circle cx="8.5" cy="12" r="2.6" fill="#14B8A6" />
          <path d="M13 12h4.5M15.5 9.5L18 12l-2.5 2.5" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'esophagus':
      return (
        <svg {...p}>
          <path d="M9 3v18M15 3v18" stroke="#0F766E" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="8" r="2.2" fill="#F59E0B" /><circle cx="12" cy="15" r="1.8" fill="#14B8A6" />
        </svg>
      );
    case 'stomachMini':
      return (
        <svg {...p}>
          <path d="M10 3v3c0 2 6 2 7.5 6.5 1.5 4.5-2 9-6.5 8.8-4-.2-6.5-2.5-6.2-5.8.2-2.2 2-3.2 3.5-4 1-.6 1-2 1-3.5V3" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'intestine':
      return (
        <svg {...p}>
          <path d="M6 7.5h11a2.5 2.5 0 0 1 0 5H7a2.5 2.5 0 0 0 0 5h10" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M6 7.5h11a2.5 2.5 0 0 1 0 5H7a2.5 2.5 0 0 0 0 5h10" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    /* Scene 3: Bad Habits */
    case 'coffee':
      return (
        <svg {...p}>
          <path d="M9 4.5c0 1.2-1 1.8-1 3M13 4.5c0 1.2-1 1.8-1 3" stroke="#9A3412" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 9h11v5.5a5.5 5.5 0 0 1-11 0V9Z" fill="#7C2D12" stroke="#431407" strokeWidth="1.6" />
          <path d="M16 10.5h1.8a2.2 2.2 0 0 1 0 4.4H16" stroke="#7C2D12" strokeWidth="1.8" />
          <path d="M4 20h13" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'chili':
      return (
        <svg {...p}>
          <path d="M17.5 5.5c1-1.5 2.5-2 3.5-1.5" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M18 6.5c1.5 3.5-.8 9.2-6.2 12.2-3.5 2-6.8 1.8-8.3.5 2.8-.6 5.5-2.6 7.5-5.8 1.8-2.8 3.2-6 7-6.9Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...p}>
          <circle cx="12" cy="13" r="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
          <path d="M12 9v4l2.8 1.8M5 4.5L3 6.5M19 4.5l2 2" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'beer':
      return (
        <svg {...p}>
          <path d="M6 8.5h10v9.5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8.5Z" fill="#FBBF24" stroke="#92400E" strokeWidth="1.6" />
          <path d="M16 10.5h2.2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H16" stroke="#92400E" strokeWidth="1.8" />
          <path d="M5.5 8a2.2 2.2 0 0 1 2.2-2.2 2.6 2.6 0 0 1 4.8-.6 2.3 2.3 0 0 1 4 1.6v1.7H5.5V8Z" fill="#fff" stroke="#92400E" strokeWidth="1.4" />
        </svg>
      );
    case 'pill':
      return (
        <svg {...p}>
          <rect x="3.5" y="7.5" width="17" height="9" rx="4.5" transform="rotate(-35 12 12)" fill="#fff" stroke="#DC2626" strokeWidth="1.8" />
          <path d="M12 7.5h4.2a4.5 4.5 0 0 1 0 9H12v-9Z" transform="rotate(-35 12 12)" fill="#EF4444" />
        </svg>
      );

    /* Scene 4: HP Symptoms */
    case 'burn':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" fill="#FEE2E2" />
          <path d="M12.3 4.5c.6 2.8-2 4.2-1.2 6.6.6-1 1.6-1.5 2-2.6 2.1 2 3.4 4.1 3.4 6.3a4.6 4.6 0 0 1-9.2 0c0-2.9 2-5.3 5-10.3Z" fill="#EF4444" />
          <circle cx="12" cy="15.2" r="1.8" fill="#FDE047" />
        </svg>
      );
    case 'reflux':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" fill="#FFEDD5" />
          <path d="M9 17V8m0 0L6.5 10.5M9 8l2.5 2.5M15 15V7m0 0l-2 2m2-2l2 2" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="17.5" r="1.2" fill="#F59E0B" />
        </svg>
      );
    case 'nausea':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" fill="#FEF3C7" />
          <path d="M12 12a2 2 0 1 1 2-2 4 4 0 1 1-4-4 6 6 0 1 1-6 6" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    /* Scene 5: Dehydration Signs */
    case 'dryLips':
      return (
        <svg {...p}>
          <path d="M3 12c2.5-3.2 5.2-4 6.8-2.2.8.8 1.6.8 2.4 0C13.8 8 16.5 8.8 19 12c-3 4.2-6 5.2-8 5.2S6 16.2 3 12Z" fill="#FB7185" stroke="#BE123C" strokeWidth="1.6" />
          <path d="M3.5 12h15M8.5 12l-1 2.8M13.5 12l1 2.8" stroke="#881337" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'sunkenEye':
      return (
        <svg {...p}>
          <path d="M2.5 12S6.5 6.5 12 6.5 21.5 12 21.5 12 17.5 17.5 12 17.5 2.5 12 2.5 12Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="3.2" fill="#0F2E35" /><circle cx="11" cy="11" r="1" fill="#fff" />
          <path d="M5.5 17.5c2 1.8 4.2 2.5 6.5 2.5s4.5-.7 6.5-2.5" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );
    case 'lowUrine':
      return (
        <svg {...p}>
          <path d="M12 3.5s6.5 6.8 6.5 11.2a6.5 6.5 0 1 1-13 0C5.5 10.3 12 3.5 12 3.5Z" fill="#D97706" fillOpacity=".3" stroke="#B45309" strokeWidth="1.8" />
          <path d="M8.5 15a3.5 3.5 0 0 0 7 0H8.5Z" fill="#B45309" />
          <path d="M15.5 6l4 4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'dizzy':
      return (
        <svg {...p}>
          <circle cx="12" cy="13" r="7.5" fill="#FDE68A" stroke="#B45309" strokeWidth="1.7" />
          <path d="M8.2 11l2 2m0-2l-2 2M13.8 11l2 2m0-2l-2 2M9.5 16.2c1.5-1.2 3.5-1.2 5 0" stroke="#78350F" strokeWidth="1.7" strokeLinecap="round" />
          <ellipse cx="12" cy="4.2" rx="6.5" ry="1.8" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );

    /* Scene 6: 4 GUT CARE Pillars */
    case 'washHands':
      return (
        <svg {...p}>
          <path d="M7 14.5c0-3 2.5-5.5 5.5-5.5h3a2 2 0 0 1 0 4H13l3.5 1.2a1.8 1.8 0 0 1-.6 3.5l-5.4.8A4.5 4.5 0 0 1 7 14.5Z" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.6" />
          <circle cx="7.5" cy="6.5" r="2.2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.4" />
          <circle cx="13" cy="5" r="1.6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.3" />
          <circle cx="17.5" cy="7.5" r="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.4" />
        </svg>
      );
    case 'cookedFood':
      return (
        <svg {...p}>
          <path d="M8.5 5c0-1 .8-1.5.8-2.5M15.5 5c0-1 .8-1.5.8-2.5" stroke="#EA580C" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M5 10h14l-1.2 8a2.2 2.2 0 0 1-2.2 1.8H8.4A2.2 2.2 0 0 1 6.2 18L5 10Z" fill="#FB923C" stroke="#9A3412" strokeWidth="1.6" />
          <path d="M4 10c0-2.8 3.6-4.5 8-4.5s8 1.7 8 4.5H4Z" fill="#FDE68A" stroke="#9A3412" strokeWidth="1.6" />
          <path d="M9.8 14.2l1.6 1.6 3.2-3.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'oresol':
      return (
        <svg {...p}>
          <rect x="5" y="4" width="14" height="16" rx="2.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.7" />
          <path d="M5 8h14" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M12 10.5v5M9.5 13h5" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="17.5" cy="17.5" r="3.5" fill="#14B8A6" stroke="#fff" strokeWidth="1.4" />
        </svg>
      );
    case 'stethoscope':
      return (
        <svg {...p}>
          <path d="M6 4v5a4 4 0 0 0 8 0V4M4.5 4h3M12.5 4h3" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 13v2.5a4.5 4.5 0 0 0 9 0V13" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
          <circle cx="19" cy="11.5" r="2.5" fill="#14B8A6" stroke="#0F766E" strokeWidth="1.6" />
        </svg>
      );
    default:
      return <svg {...p}><circle cx="12" cy="12" r="6" fill={color} /></svg>;
  }
}

/* ───────────────────────── Âm thanh v2: nhạc nền nhiều lớp + hiệu ứng "chuông/kalimba" (WebAudio) ───────────────────────── */

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
const CH = { M: [0, 4, 7, 11], m: [0, 3, 7, 10] };
const MOODS = [
  { c: [[60, 'M'], [57, 'm'], [53, 'M'], [55, 'M']], bpm: 92, hat: 1 },
  { c: [[57, 'm'], [53, 'M'], [60, 'M'], [52, 'm']], bpm: 96, hat: 0 },
  { c: [[50, 'm'], [46, 'M'], [53, 'M'], [57, 'M']], bpm: 104, hat: 1 },
  { c: [[53, 'M'], [55, 'M'], [52, 'm'], [57, 'm']], bpm: 88, hat: 0 },
  { c: [[60, 'M'], [55, 'M'], [57, 'm'], [53, 'M']], bpm: 108, hat: 1 },
];
const MELS = [
  [3, -1, 2, 1, 3, 2, -1, 0, 2, 1, 3, -1, 4, 3, 2, 1],
  [2, 3, -1, 3, 1, -1, 2, 0, 3, 2, -1, 1, 2, 4, 3, -1],
];
const PENTA = [60, 62, 64, 67, 69, 72, 74, 76];

function createAudio() {
  let ctx; let master; let bus; let rev; let mrev; let dly; let mdly; let nbuf; let timer;
  let next = 0; let step = 0; let mood = 0;
  const a = { playing: false, muted: false, voice: false, dingN: 0 };

  const makeIR = () => {
    const sr = ctx.sampleRate; const len = Math.floor(sr * 2.6);
    const buf = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let lp = 0;
      for (let i = 0; i < len; i++) {
        const k = i / len;
        lp += ((Math.random() * 2 - 1) - lp) * (0.55 - 0.47 * k);
        d[i] = lp * 2.2 * Math.pow(1 - k, 2.4) * (i < sr * 0.012 ? i / (sr * 0.012) : 1);
      }
    }
    return buf;
  };
  const makeRev = (ir, out, g) => { const c = ctx.createConvolver(); c.buffer = ir; const w = ctx.createGain(); w.gain.value = g; c.connect(w); w.connect(out); return c; };
  const makeDelay = (out, g) => {
    const inp = ctx.createGain(); const l = ctx.createDelay(1); const r = ctx.createDelay(1);
    const fb = ctx.createGain(); const lp = ctx.createBiquadFilter(); const mg = ctx.createChannelMerger(2); const w = ctx.createGain();
    l.delayTime.value = 0.28; r.delayTime.value = 0.42; fb.gain.value = 0.32; lp.type = 'lowpass'; lp.frequency.value = 2800; w.gain.value = g;
    inp.connect(l); l.connect(lp); lp.connect(r); r.connect(fb); fb.connect(l);
    l.connect(mg, 0, 0); r.connect(mg, 0, 1); mg.connect(w); w.connect(out);
    return inp;
  };

  const ensure = () => {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return null;
    ctx = new AC({ latencyHint: 'interactive' });
    master = ctx.createGain(); master.gain.value = a.muted ? 0 : 0.85;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 18; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.22;
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -3; lim.knee.value = 0; lim.ratio.value = 20; lim.attack.value = 0.001; lim.release.value = 0.08;
    master.connect(comp); comp.connect(lim); lim.connect(ctx.destination);
    bus = ctx.createGain(); bus.gain.value = 0;
    const tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 7000; tone.Q.value = 0.3;
    bus.connect(tone); tone.connect(master);
    const ir = makeIR();
    rev = makeRev(ir, master, 0.9); mrev = makeRev(ir, bus, 0.9);
    dly = makeDelay(master, 0.45); mdly = makeDelay(bus, 0.5);
    nbuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = nbuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    return ctx;
  };

  const mu = (o) => ({ dest: bus, rv: mrev, dl: mdly, ...o });

  const note = (f, t, d, o = {}) => {
    const { type = 'sine', v = 0.15, a: at = 0.01, dest = master, rv = rev, dl = dly, send = 0.4, echo = 0, to, det = 0, lp } = o;
    const os = ctx.createOscillator(); const g = ctx.createGain();
    os.type = type; os.frequency.setValueAtTime(f, t); if (det) os.detune.value = det;
    if (to) os.frequency.exponentialRampToValueAtTime(to, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(v, t + at);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    os.connect(g);
    let out = g;
    if (lp) { const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; g.connect(fl); out = fl; }
    out.connect(dest);
    if (send) { const s = ctx.createGain(); s.gain.value = send; out.connect(s); s.connect(rv); }
    if (echo) { const s = ctx.createGain(); s.gain.value = echo; out.connect(s); s.connect(dl); }
    os.start(t); os.stop(t + d + 0.05);
  };

  const bell = (f, t, d, v = 0.1, o = {}) => {
    note(f, t, d, { v, a: 0.004, ...o });
    note(f * 2.76, t, d * 0.35, { v: v * 0.3, a: 0.002, ...o, send: (o.send ?? 0.4) * 0.5 });
    note(f * 5.4, t, d * 0.15, { v: v * 0.12, a: 0.001, ...o, send: 0 });
  };

  const noise = (t, d, f0, f1, v, o = {}) => {
    const { dest = master, Q = 1.2, type = 'bandpass', send = 0 } = o;
    const s = ctx.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = type; f.Q.value = Q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + d);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + d * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(f); f.connect(g); g.connect(dest);
    if (send) { const sg = ctx.createGain(); sg.gain.value = send; g.connect(sg); sg.connect(o.rv || rev); }
    s.start(t, Math.random() * 0.5); s.stop(t + d + 0.05);
  };

  const fx = (fn, gap = 60) => {
    let last = 0;
    return () => {
      try {
        if (!ensure()) return;
        const n = performance.now();
        if (n - last < gap) return;
        last = n; fn(ctx.currentTime);
      } catch { /* bỏ qua lỗi âm thanh */ }
    };
  };
  const seq = (t, ms, d, v, gap = 0.09, o = {}) => ms.forEach((m, i) => bell(midi(m), t + i * gap, d, v, o));

  a.pop = fx((t) => { const f = midi(PENTA[Math.floor(Math.random() * PENTA.length)] + 12); note(f, t, 0.15, { v: 0.1, to: f * 1.6, a: 0.003, send: 0.3 }); bell(f * 2, t + 0.03, 0.2, 0.03); }, 50);
  a.ding = fx((t) => { const m = PENTA[a.dingN++ % PENTA.length] + 12; bell(midi(m), t, 0.9, 0.11, { echo: 0.3, send: 0.5 }); }, 80);
  a.babble = fx((t) => {
    const n = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) { const f = midi(PENTA[Math.floor(Math.random() * 5)] + 12); note(f, t + i * 0.075, 0.1, { type: 'triangle', v: 0.09, a: 0.01, to: f * (0.9 + Math.random() * 0.35), lp: 2600, send: 0.15 }); }
  }, 200);
  a.giggle = fx((t) => { [0, 1, 2, 3, 4].forEach((i) => { const f = midi(76 + (i % 2) * 4 + (i > 2 ? 2 : 0)); note(f, t + i * 0.06, 0.08, { type: 'triangle', v: 0.07, to: f * 1.08, lp: 3000, send: 0.2 }); }); }, 300);
  a.snicker = fx((t) => { [0, 0.13, 0.26, 0.39].forEach((o, i) => note(midi(52 - i), t + o, 0.1, { type: 'square', v: 0.035, lp: 900, to: midi(50 - i), send: 0.15 })); }, 400);
  a.tick = fx((t) => note(1500, t, 0.04, { type: 'square', v: 0.025, a: 0.002, lp: 3000, send: 0.05 }), 20);
  a.whoosh = fx((t) => noise(t, 0.7, 300, 5000, 0.2, { Q: 0.8, send: 0.3 }), 200);
  a.chime = fx((t) => seq(t, [76, 83, 88], 1.1, 0.09, 0.09, { echo: 0.25 }), 200);
  a.warn = fx((t) => [880, 660, 880, 660].forEach((f, i) => note(f, t + i * 0.14, 0.16, { type: 'square', v: 0.03, lp: 2200, send: 0.2 })), 300);
  a.drip = fx((t) => { note(1300, t, 0.22, { v: 0.12, a: 0.003, to: 380, send: 0.4 }); bell(midi(96), t + 0.06, 0.3, 0.02); }, 150);
  a.splash = fx((t) => { noise(t, 0.5, 3500, 700, 0.18, { send: 0.3 }); note(1100, t + 0.05, 0.2, { v: 0.1, to: 350 }); }, 300);
  a.boing = fx((t) => { note(180, t, 0.3, { type: 'triangle', v: 0.16, to: 520, lp: 2000 }); note(520, t + 0.28, 0.25, { type: 'triangle', v: 0.1, to: 260, lp: 2000 }); }, 250);
  a.ouch = fx((t) => { note(620, t, 0.5, { type: 'triangle', v: 0.12, to: 230, lp: 2200 }); note(560, t + 0.35, 0.6, { type: 'triangle', v: 0.1, to: 180, lp: 2200 }); }, 400);
  a.munch = fx((t) => [0, 0.14, 0.28].forEach((o) => noise(t + o, 0.09, 700, 250, 0.22)), 300);
  a.gurgle = fx((t) => { note(95, t, 0.5, { type: 'sawtooth', v: 0.05, to: 60, send: 0.1, lp: 400 }); note(80, t + 0.3, 0.5, { type: 'sawtooth', v: 0.05, to: 55, send: 0.1, lp: 400 }); }, 400);
  a.sparkle = fx((t) => { for (let i = 0; i < 8; i++) bell(midi(PENTA[(i * 3) % 8] + 24), t + i * 0.07, 0.6, 0.045, { echo: 0.3 }); }, 300);
  a.jingle = fx((t) => seq(t, [72, 76, 79, 84, 88], 0.9, 0.09, 0.08, { echo: 0.25 }), 400);
  a.confetti = fx((t) => { noise(t, 0.35, 2000, 9000, 0.2, { Q: 0.7 }); seq(t, [84, 88, 91], 0.6, 0.06, 0.05); }, 400);
  a.fanfare = fx((t) => {
    seq(t, [60, 64, 67, 72, 76, 79], 2, 0.1, 0.11, { echo: 0.3 });
    [48, 55, 60].forEach((m) => note(midi(m), t, 2.2, { type: 'sawtooth', v: 0.028, a: 0.05, lp: 1200, send: 0.5 }));
    noise(t, 1.2, 800, 6000, 0.12, { Q: 0.7, send: 0.3 });
  }, 500);

  const tickMusic = () => {
    if (!ctx) return;
    const m = MOODS[mood]; const e = 30 / m.bpm;
    if (next < ctx.currentTime) next = ctx.currentTime + 0.05;
    while (next < ctx.currentTime + 0.5) {
      const s = step % 8; const [root, q] = m.c[Math.floor(step / 8) % 4];
      const tones = CH[q].map((i) => root + i);
      const t = next + (step % 2 ? e * 0.16 : 0);
      if (s === 0) tones.forEach((n, i) => [-7, 7].forEach((dt) => note(midi(n), next, e * 8.6, mu({ type: 'sawtooth', v: i ? 0.011 : 0.015, a: 0.55, lp: 1100, det: dt, send: 0.6 }))));
      if (s % 4 === 0) {
        note(midi(root - 24), next, e * 3, mu({ v: 0.17, a: 0.015, send: 0.05 }));
        note(150, next, 0.2, mu({ v: 0.2, a: 0.002, to: 42, send: 0 }));
      }
      if (s === 6) note(midi(root - 12), t, e * 1.2, mu({ v: 0.07, send: 0 }));
      if (m.hat) {
        if (s % 2 === 1) noise(t, 0.05, 7500, 9500, 0.025, { dest: bus });
        if (s === 2 || s === 6) note(1046, t, 0.05, mu({ type: 'triangle', v: 0.03, send: 0.2 }));
      }
      if (s % 2 === 0) bell(midi(tones[(s / 2) % 4] + 12), t, 0.7, 0.035, mu({ echo: 0.3, send: 0.5 }));
      const k = MELS[Math.floor(step / 16) % 2][step % 16];
      if (k >= 0) bell(midi(k < 4 ? tones[k] + 12 : tones[0] + 24), t, 1.1, 0.06, mu({ echo: 0.35, send: 0.7 }));
      next += e; step += 1;
    }
  };

  const level = () => (a.voice ? 0.3 : 0.6);
  a.start = () => {
    if (!ensure()) return;
    a.playing = true; bus.gain.setTargetAtTime(level(), ctx.currentTime, 0.2);
    clearInterval(timer); next = 0; timer = setInterval(tickMusic, 100);
  };
  a.stop = () => { a.playing = false; clearInterval(timer); if (ctx) bus.gain.setTargetAtTime(0, ctx.currentTime, 0.08); };
  a.setMood = (i) => { mood = i; };
  a.setMuted = (v) => { a.muted = v; if (ctx) master.gain.setTargetAtTime(v ? 0 : 0.85, ctx.currentTime, 0.08); };
  a.setVoice = (v) => { a.voice = v; if (ctx && a.playing) bus.gain.setTargetAtTime(level(), ctx.currentTime, 0.2); };
  return a;
}

const FxCtx = createContext(null);

const pickVoice = () => {
  const vs = (window.speechSynthesis.getVoices() || []).filter((x) => x.lang?.toLowerCase().startsWith('vi'));
  return vs.find((x) => /hoaimy|linh|google|natural/i.test(x.name)) || vs[0];
};
const speak = (text, rate) => {
  try {
    const s = window.speechSynthesis; s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'vi-VN'; u.rate = rate; u.pitch = 1.2;
    const v = pickVoice(); if (v) u.voice = v;
    s.speak(u);
  } catch { /* trình duyệt không hỗ trợ */ }
};
const hush = () => { try { window.speechSynthesis?.cancel(); } catch { /* bỏ qua */ } };

/* ───────────────────────── Hooks ───────────────────────── */

function useClock(total) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const tRef = useRef(0);
  useEffect(() => {
    if (!playing) return undefined;
    let raf; let last = performance.now(); let lastPaint = 0;
    const loop = (now) => {
      const dt = Math.min(0.25, (now - last) / 1000); last = now;
      tRef.current = Math.min(total, tRef.current + dt * speed);
      if (now - lastPaint > 33 || tRef.current >= total) { lastPaint = now; setT(tRef.current); }
      if (tRef.current >= total) { setPlaying(false); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, total]);
  const seek = useCallback((v) => { const c = clamp(v, 0, total); tRef.current = c; setT(c); }, [total]);
  return { t, playing, setPlaying, speed, setSpeed, seek };
}

function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query); const h = () => setMatch(mq.matches);
    h(); mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [query]);
  return match;
}

/* ───────────────────────── Nhân vật SVG (Kawaii Vector v3) ───────────────────────── */

const blink = {
  animate: { scaleY: [1, 1, 0.08, 1] },
  transition: { duration: 3.6, repeat: Infinity, times: [0, 0.9, 0.95, 1] },
  style: { transformBox: 'fill-box', transformOrigin: 'center' },
};

function Stomach({ state = 'normal', size = 200, shield = 1, talk = false, cheer = false, hat = null }) {
  const pal = {
    normal: ['#FFD1C7', '#FF8573', '#E05344'],
    thin: ['#FFE6CC', '#F59E56', '#C96A22'],
    ulcer: ['#FFB8C2', '#E63E56', '#9E1B32'],
  }[state];
  const id = `st-${state}-${hat || 'none'}`;
  const clipId = `st-clip-${state}-${hat || 'none'}`;
  const n = state === 'normal';
  const u = state === 'ulcer';
  const body = 'M84 8Q84 0 94 0H104Q114 0 114 10V40C114 56 160 56 178 96C196 138 160 190 110 188C66 186 36 160 38 124C40 100 58 90 74 82C86 76 84 60 84 44Z';
  const arm = { stroke: '#fff', strokeOpacity: 0.75, strokeWidth: 2.2 };
  const top = hat ? -42 : -4;
  const vh = hat ? 252 : 214;
  const wave = cheer ? 52 : 26;
  const dur = cheer ? 0.55 : 1.15;

  return (
    <svg viewBox={`0 ${top} 220 ${vh}`} width={size} height={(size * vh) / 220} aria-hidden="true" className="overflow-visible">
      <defs>
        <radialGradient id={id} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor={pal[0]} />
          <stop offset="68%" stopColor={pal[1]} />
          <stop offset="100%" stopColor={pal[2]} />
        </radialGradient>
        <clipPath id={clipId}><path d={body} /></clipPath>
      </defs>

      {/* Bóng đổ dưới chân */}
      <ellipse cx="108" cy="204" rx="56" ry="5.5" fill="#0F2E35" opacity=".12" />

      {/* Chân nhún nhảy */}
      <motion.g animate={n ? { y: [0, -3.5, 0] } : { y: 0 }} transition={{ duration: 0.6, repeat: Infinity }}>
        <ellipse cx="86" cy="192" rx="14" ry="8" fill={pal[1]} stroke="#fff" strokeWidth="2" />
        <ellipse cx="130" cy="192" rx="14" ry="8" fill={pal[1]} stroke="#fff" strokeWidth="2" />
      </motion.g>

      {/* Hai tay vẫy */}
      <motion.ellipse cx="34" cy="130" rx="10" ry="17" fill={pal[1]} {...arm} style={{ transformOrigin: '44px 116px' }}
        animate={n ? { rotate: [0, -wave, 0] } : u ? { rotate: [0, 12, 0] } : { rotate: 0 }} transition={{ duration: n ? dur : 0.45, repeat: Infinity }} />
      <motion.ellipse cx="186" cy="130" rx="10" ry="17" fill={pal[1]} {...arm} style={{ transformOrigin: '176px 116px' }}
        animate={n ? { rotate: [0, wave, 0] } : u ? { rotate: [0, -12, 0] } : { rotate: 0 }} transition={{ duration: n ? dur : 0.45, repeat: Infinity, delay: 0.25 }} />

      {/* Vòng bảo vệ chất nhầy bên ngoài */}
      <path d={body} transform="translate(-7.6 -7.7) scale(1.07)" fill="none" strokeLinecap="round" strokeWidth="5.5"
        stroke={shield > 0.6 ? '#2DD4BF' : shield > 0.35 ? '#FB923C' : '#EF4444'}
        strokeDasharray={`${shield * 15} ${(1 - shield) * 15 + 2.5}`} opacity={0.3 + 0.7 * shield} />

      {/* Thân dạ dày co bóp nhu động */}
      <motion.g animate={{ scale: [1, 1.032, 1] }} transition={{ duration: n ? 2.4 : 0.95, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '108px 110px' }}>
        <path d={body} fill={`url(#${id})`} stroke="#fff" strokeOpacity=".9" strokeWidth="3.2" />

        {/* Sóng dịch vị bên trong lòng dạ dày */}
        <g clipPath={`url(#${clipId})`}>
          <motion.path
            d="M10 158 Q45 150 80 158 T150 158 T220 158 V210 H10 Z"
            fill={n ? '#FEF08A' : '#FCA5A5'}
            opacity={n ? 0.26 : 0.35}
            animate={{ x: [-28, 0, -28] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {n && [[72, 170, 0], [115, 174, 0.7], [146, 165, 1.4]].map(([x, y, d]) => (
            <motion.circle key={x} cx={x} cy={y} r="3.8" fill="#fff" animate={{ cy: [y, y - 36], opacity: [0, 0.75, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: d }} />
          ))}
        </g>

        {/* Ánh sáng bóng 3D & nếp gấp niêm mạc */}
        <path d="M58 112C61 96 72 90 85 86" stroke="#fff" strokeOpacity=".58" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M62 150C70 166 86 172 98 172" stroke="#fff" strokeOpacity=".28" strokeWidth="5" strokeLinecap="round" fill="none" />
        {n && <path d="M128 168Q146 160 152 142M138 176Q158 164 164 144" stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" fill="none" />}

        {/* Đốm viêm đỏ khi lớp nhầy mỏng */}
        {state === 'thin' && [[66, 146], [150, 134], [126, 172], [142, 102]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="6.5" fill="#EF4444" opacity=".25" />
            <circle cx={x} cy={y} r="3.2" fill="#EF4444" opacity=".8" />
          </g>
        ))}

        {/* Ổ loét & băng cá nhân SVG khi bị loét */}
        {u && (
          <g>
            <motion.circle cx="150" cy="108" r="14" fill="#B91C3C" opacity=".42" animate={{ r: [13, 21, 13] }} transition={{ duration: 0.95, repeat: Infinity }} />
            <circle cx="150" cy="108" r="9" fill="#7F1230" />
            <circle cx="147" cy="105" r="3" fill="#FF8FA0" />
            <g transform="rotate(-28 150 108)">
              <rect x="133" y="102.5" width="34" height="11.5" rx="5.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
              <rect x="145" y="102.5" width="10" height="11.5" fill="#FEF3C7" />
              <circle cx="148" cy="108.2" r="1.1" fill="#D97706" />
              <circle cx="152" cy="108.2" r="1.1" fill="#D97706" />
            </g>
          </g>
        )}

        {/* Má hồng */}
        {n && (
          <>
            <ellipse cx="79" cy="136" rx="9.5" ry="5.5" fill="#F43F5E" opacity=".45" />
            <ellipse cx="139" cy="136" rx="9.5" ry="5.5" fill="#F43F5E" opacity=".45" />
          </>
        )}

        {/* Đôi mắt biểu cảm */}
        {n && [94, 124].map((x) => (
          <motion.g key={x} {...blink}>
            <circle cx={x} cy="124" r="9.2" fill="#0F2E35" />
            <circle cx={x - 3} cy="120.5" r="3.5" fill="#fff" />
            <circle cx={x + 3} cy="127" r="1.8" fill="#fff" />
          </motion.g>
        ))}
        {n && <path d="M86 108Q94 102 102 108M116 108Q124 102 132 108" stroke="#0F2E35" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" fill="none" />}

        {state === 'thin' && [94, 124].map((x) => (
          <motion.g key={x} {...blink}>
            <circle cx={x} cy="124" r="8.8" fill="#fff" stroke="#0F2E35" strokeWidth="1.5" />
            <circle cx={x + 1} cy="126.5" r="4.6" fill="#0F2E35" />
            <circle cx={x - 0.5} cy="124.5" r="1.6" fill="#fff" />
          </motion.g>
        ))}
        {state === 'thin' && <path d="M84 109L102 116M134 109L116 116" stroke="#0F2E35" strokeWidth="2.8" strokeLinecap="round" />}

        {u && <path d="M86 117L100 124L86 131M132 117L118 124L132 131" stroke="#0F2E35" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />}

        {/* Miệng */}
        {n && (
          <motion.g animate={talk ? { scaleY: [1, 0.42, 1.12, 0.5, 1] } : { scaleY: 1 }} transition={{ duration: 0.42, repeat: Infinity }} style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}>
            <path d="M95 140Q109 162 123 140Z" fill="#7F1D1D" />
            <ellipse cx="109" cy="150" rx="6.2" ry="4" fill="#FB7185" />
          </motion.g>
        )}
        {state === 'thin' && <path d="M96 151Q102 145 108 151T120 151" stroke="#0F2E35" strokeWidth="3" fill="none" strokeLinecap="round" />}
        {u && <path d="M95 150Q109 134 123 150Q109 160 95 150Z" fill="#7F1D1D" />}

        {/* Nước mắt / Mồ hôi */}
        {u && [88, 130].map((x, i) => (
          <motion.ellipse key={x} cx={x} cy="132" rx="3.2" ry="5.2" fill="#38BDF8" animate={{ cy: [132, 152], opacity: [1, 0] }} transition={{ duration: 0.95, repeat: Infinity, delay: i * 0.4 }} />
        ))}
        {state === 'thin' && (
          <motion.path d="M152 84C152 84 145 94 145 98a7 7 0 0 0 14 0C159 94 152 84 152 84Z" fill="#38BDF8" stroke="#fff" strokeWidth="1.5" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.3, repeat: Infinity }} />
        )}
      </motion.g>

      {/* Mũ Đầu Bếp SVG */}
      {hat === 'chef' && (
        <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
          <g transform="translate(99 4)">
            <circle cx="-13" cy="-17" r="10.5" fill="#fff" stroke="#CBD5E1" strokeWidth="1.6" />
            <circle cx="13" cy="-17" r="10.5" fill="#fff" stroke="#CBD5E1" strokeWidth="1.6" />
            <circle cx="0" cy="-24" r="12.5" fill="#fff" stroke="#CBD5E1" strokeWidth="1.6" />
            <rect x="-18" y="-12" width="36" height="14" rx="4" fill="#fff" stroke="#CBD5E1" strokeWidth="1.6" />
            <path d="M-18 -3H18" stroke="#F97316" strokeWidth="2.8" />
          </g>
        </motion.g>
      )}

      {/* Vương Miện SVG */}
      {hat === 'crown' && (
        <motion.g animate={{ y: [0, -3.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <g transform="translate(99 3)">
            <path d="M-19 0L-21 -22L-9 -12L0 -27L9 -12L21 -22L19 0Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="0" cy="-27" r="3.2" fill="#F43F5E" />
            <circle cx="-21" cy="-22" r="2.6" fill="#14B8A6" />
            <circle cx="21" cy="-22" r="2.6" fill="#0EA5E9" />
          </g>
        </motion.g>
      )}
    </svg>
  );
}

function HPylori({ size = 150 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" className="overflow-visible">
      <defs>
        <linearGradient id="hpb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <motion.g animate={{ rotate: [-4, 4, -4], y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '60px 60px' }}>
        {/* Vầng hào quang ферment Urease trung hòa axit */}
        <circle cx="64" cy="60" r="46" fill="#8B5CF6" opacity=".1" />
        {/* Chùm tiên mao (Flagella) giúp H. pylori bơi xuyên lớp nhầy */}
        {[
          'M24 72C10 70 4 84 12 94',
          'M25 66C10 58 3 68 6 79',
          'M27 78C16 88 18 104 29 102',
          'M23 75C6 78 2 92 10 100',
        ].map((d, i) => (
          <motion.path key={d} d={d} stroke="#6D28D9" strokeWidth="2.6" strokeLinecap="round" fill="none"
            animate={{ rotate: [-7, 7, -7] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }} style={{ transformOrigin: '25px 74px' }} />
        ))}
        {/* Thân xoắn khuẩn */}
        <path d="M26 72C38 34 54 34 62 60S84 90 94 54" stroke="url(#hpb)" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M26 72C38 34 54 34 62 60S84 90 94 54" stroke="#fff" strokeOpacity=".42" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" fill="none" />
        {/* Đầu vi khuẩn */}
        <circle cx="96" cy="46" r="17.5" fill="url(#hpb)" stroke="#fff" strokeWidth="2.2" />
        {[89, 103].map((x) => (
          <g key={x}>
            <circle cx={x} cy="43" r="5" fill="#fff" />
            <circle cx={x + 1} cy="44" r="2.6" fill="#0F2E35" />
            <circle cx={x} cy="42.5" r="1" fill="#fff" />
          </g>
        ))}
        <ellipse cx="84.5" cy="51" rx="3.4" ry="2" fill="#FB7185" opacity=".65" />
        <ellipse cx="108" cy="51" rx="3.4" ry="2" fill="#FB7185" opacity=".65" />
        <path d="M83 35L93 40M109 35L99 40" stroke="#0F2E35" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M87 53Q96 62 105 53Z" fill="#3B0764" />
        <path d="M89 53L91 57L93 53M99 53L101 57L103 53" fill="#fff" />
        <path d="M84 30L79 21L90 27ZM108 30L113 21L102 27Z" fill="#4C1D95" />
      </motion.g>
    </svg>
  );
}

function Germ({ size = 44, hue = '#86EFAC', dark = '#16A34A' }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => {
        const r = (i * 36 * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1="30" y1="30" x2={30 + 24 * Math.cos(r)} y2={30 + 24 * Math.sin(r)} stroke={dark} strokeWidth="2.5" />
            <circle cx={30 + 24 * Math.cos(r)} cy={30 + 24 * Math.sin(r)} r="4.2" fill={dark} />
          </g>
        );
      })}
      <circle cx="30" cy="30" r="19.5" fill={hue} stroke={dark} strokeWidth="2.2" />
      <circle cx="23" cy="21" r="3" fill="#fff" opacity=".35" />
      {[23, 37].map((x) => (
        <g key={x}>
          <circle cx={x} cy="27" r="5" fill="#fff" />
          <circle cx={x + 1} cy="28" r="2.5" fill="#0F2E35" />
        </g>
      ))}
      <path d="M20 20.5L27 23.5M40 20.5L33 23.5" stroke="#0F2E35" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 37Q30 45 38 37Z" fill="#0F2E35" />
    </svg>
  );
}

function Buddy({ kind = 'shield', size = 44, mood = 'happy' }) {
  const col = {
    shield: ['#A7F3D0', '#14B8A6'],
    acid: ['#FECACA', '#EF4444'],
    enzyme: ['#FDE68A', '#F59E0B'],
  }[kind];
  const d = {
    shield: 'M50 6L88 20V50C88 74 70 90 50 96C30 90 12 74 12 50V20Z',
    acid: 'M50 4C50 4 14 46 14 66a36 36 0 0 0 72 0C86 46 50 4 50 4Z',
    enzyme: 'M50 12C76 12 90 32 90 56S74 94 50 94S10 80 10 56S24 12 50 12Z',
  }[kind];
  const id = `bd-${kind}-${mood}`;
  const sad = mood === 'sad';

  return (
    <motion.div className="shrink-0" style={{ width: size, height: size }} animate={{ y: [0, -3.5, 0], rotate: [-3, 3, -3] }} transition={{ duration: 2 + (kind.length % 3) * 0.3, repeat: Infinity, ease: 'easeInOut' }}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={col[0]} />
            <stop offset="100%" stopColor={col[1]} />
          </linearGradient>
        </defs>
        <path d={d} fill={`url(#${id})`} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
        <path d="M28 40Q32 30 42 28" stroke="#fff" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" fill="none" />
        {sad && kind === 'shield' && <path d="M52 14L46 30L56 40L48 56" stroke="#0F2E35" strokeOpacity=".5" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {[38, 62].map((x) => (
          <motion.g key={x} {...blink}>
            <circle cx={x} cy="58" r="6" fill="#0F2E35" />
            <circle cx={x - 2} cy="55.5" r="2.2" fill="#fff" />
          </motion.g>
        ))}
        <ellipse cx="29" cy="68" rx="5" ry="3" fill="#F43F5E" opacity=".42" />
        <ellipse cx="71" cy="68" rx="5" ry="3" fill="#F43F5E" opacity=".42" />
        <path d={sad ? 'M42 77Q50 69 58 77' : 'M41 69Q50 80 59 69'} stroke="#0F2E35" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        {/* Kéo cắt phân tử đạm bằng vector SVG thay cho emoji ✂️ */}
        {kind === 'enzyme' && (
          <g transform="translate(50 26)">
            <circle cx="-6" cy="-4" r="4" fill="none" stroke="#78350F" strokeWidth="2.4" />
            <circle cx="6" cy="-4" r="4" fill="none" stroke="#78350F" strokeWidth="2.4" />
            <path d="M-3 -1L7 9M3 -1L-7 9" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        )}
        {kind === 'acid' && (
          <text x="50" y="34" textAnchor="middle" fontSize="13" fontWeight="900" fill="#991B1B" opacity=".8">HCl</text>
        )}
      </svg>
    </motion.div>
  );
}

const Bubble = ({ children, color = C.ink, icon = 'sparkle' }) => (
  <div className="relative px-3 py-1.5 rounded-2xl bg-white border-2 shadow-lg text-[11px] md:text-sm font-extrabold whitespace-nowrap flex items-center gap-1.5" style={{ color, borderColor: color }}>
    <SvgIcon name={icon} size={14} color={color} />
    <span>{children}</span>
    <span className="absolute -bottom-[7px] left-5 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2" style={{ borderColor: color }} />
  </div>
);

const CONF = Array.from({ length: 34 }, (_, i) => ({
  l: (i * 29) % 100,
  d: (i * 0.23) % 2.2,
  c: ['#F97316', '#0EA5E9', '#FBBF24', '#2DD4BF', '#FB7185'][i % 5],
  w: 6 + ((i * 3) % 7),
  r: (i * 57) % 360,
}));
const Confetti = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {CONF.map((p, i) => (
      <motion.span key={i} className="absolute rounded-sm" style={{ left: `${p.l}%`, top: -20, width: p.w, height: p.w * 1.6, background: p.c }}
        animate={{ y: [0, 560], rotate: [p.r, p.r + 360], x: [0, i % 2 ? 30 : -30] }} transition={{ duration: 3.2 + (i % 4) * 0.4, repeat: Infinity, delay: p.d, ease: 'linear' }} />
    ))}
  </div>
);

const Hearts = ({ n = 4 }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <motion.span key={i} className="absolute z-20 pointer-events-none" style={{ left: `${20 + i * 19}%`, top: '6%' }}
        animate={{ y: [0, -38], opacity: [0, 1, 0], scale: [0.6, 1.15] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
        <SvgIcon name="heart" size={18} color="#F43F5E" />
      </motion.span>
    ))}
  </>
);

/* ───────────────────────── Thành phần bố cục dùng chung ───────────────────────── */

function Beat({ at, local, children, className = '', from = 'up', sfx = 'pop', until }) {
  const fxa = useContext(FxCtx);
  const on = local >= at && (until == null || local < until);
  const prev = useRef(on);
  useEffect(() => { if (on && !prev.current && fxa?.playing) fxa[sfx]?.(); prev.current = on; }, [on, fxa, sfx]);
  const off = from === 'left' ? { x: -28 } : from === 'right' ? { x: 28 } : { y: 14 };
  return (
    <motion.div className={className} initial={false} animate={on ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, scale: 0.84, ...off }}
      transition={{ type: 'spring', stiffness: 270, damping: 18 }}>{children}</motion.div>
  );
}

function Cue({ at, local, fx }) {
  const a = useContext(FxCtx);
  const on = local >= at; const prev = useRef(on);
  useEffect(() => { if (on && !prev.current && a?.playing) a[fx](); prev.current = on; }, [on, a, fx]);
  return null;
}

function Headline({ s, sub, children }) {
  return (
    <div className="text-center mb-2 md:mb-3.5 max-w-4xl px-2">
      <div className="inline-flex items-center gap-2 mb-1 pl-1 pr-3 py-0.5 rounded-full bg-white/95 border border-white shadow-sm text-[10px] md:text-[11px] font-extrabold tracking-wide" style={{ color: s.accent }}>
        <span className="w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] shadow-sm" style={{ background: s.accent }}>{s.id}</span>
        {s.tag}
      </div>
      <h3 className="font-heading font-black text-lg sm:text-2xl md:text-[32px] leading-tight text-[#0F2E35] tracking-tight">{children}</h3>
      {sub && <p className="text-[11px] sm:text-xs md:text-sm text-[#52737A] font-medium mt-0.5 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

const Row = ({ children }) => <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-7">{children}</div>;
const Left = ({ children }) => <div className="flex md:flex-col flex-wrap justify-center gap-2 md:items-end">{children}</div>;
const Right = ({ children }) => <div className="flex flex-col gap-2.5 max-w-xs mx-auto md:mx-0 w-full">{children}</div>;

function Chip({ color = C.ink, icon, children, badge }) {
  return (
    <div className="px-3 py-1.5 rounded-2xl bg-white/95 border-2 shadow-sm text-xs md:text-sm font-bold flex items-center gap-2 transition-transform hover:scale-[1.02]" style={{ color, borderColor: `${color}30` }}>
      {icon && (
        <span className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
          <SvgIcon name={icon} size={18} color={color} />
        </span>
      )}
      <span>{children}</span>
      {badge}
    </div>
  );
}

function BuddyCard({ kind, mood, name, line, color }) {
  return (
    <div className={`${glass} px-3 py-1.5 flex items-center gap-2.5`}>
      <Buddy kind={kind} mood={mood} size={38} />
      <div className="leading-tight text-left">
        <div className="text-xs font-extrabold" style={{ color }}>{name}</div>
        <div className="text-[10px] md:text-[11px] font-semibold text-[#52737A]">{line}</div>
      </div>
    </div>
  );
}

function Meter({ label, value, color }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-[11px] md:text-xs font-bold text-[#0F2E35] mb-1">
        <span>{label}</span>
        <span className="font-mono font-extrabold" style={{ color }}>{Math.round(value)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-[#0F2E35]/10 overflow-hidden p-[1px]">
        <div className="h-full rounded-full transition-[width] duration-200 ease-linear" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

/* ───────────────────────── 7 CẢNH HOẠT HÌNH KHOA HỌC ───────────────────────── */

function SceneDigest({ local, compact }) {
  const foods = [
    ['oats', 'Cháo yến mạch', '#0D9488'],
    ['greens', 'Rau xanh hấp', '#059669'],
    ['soup', 'Thức ăn chín mềm', '#D97706'],
    ['water', 'Nước sạch ấm', '#0284C7'],
  ];
  const ph = 7 - 5 * ease((local - 0.8) / 2.5);
  const S = compact ? 140 : 188;
  return (
    <>
      <Cue at={0.2} local={local} fx="boing" /><Cue at={0.9} local={local} fx="munch" /><Cue at={2.4} local={local} fx="gurgle" /><Cue at={3.6} local={local} fx="sparkle" />
      <Headline s={SCENES[0]} sub="Axit HCl (pH 1,5 – 3,5) diệt khuẩn, enzym pepsin phân giải đạm">Dạ dày – “nhà máy năng lượng” của cơ thể</Headline>
      <Row>
        <Left>
          {foods.map(([icon, name, col], i) => (
            <Beat key={name} at={0.4 + i * 0.55} local={local} from="left">
              <Chip color={col} icon={icon} badge={<SvgIcon name="check" size={16} color={C.teal} />}>{name}</Chip>
            </Beat>
          ))}
        </Left>
        <div className="relative order-first md:order-none flex items-center justify-center" style={{ width: S + 60, height: S + 56 }}>
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute inset-0 rounded-full border-2 border-[#14B8A6]/35"
              animate={{ scale: [0.82, 1.32], opacity: [0.55, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }} />
          ))}
          {['oats', 'greens', 'soup'].map((ic, i) => (
            <motion.div key={ic} className="absolute top-0 left-1/2 -ml-3.5 z-20 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-teal-100"
              animate={{ y: [-12, S * 0.42], opacity: [0, 1, 0], scale: [1.05, 0.55], rotate: [0, 140] }}
              transition={{ duration: 1.65, repeat: Infinity, delay: 0.4 + i * 0.55, ease: 'easeIn' }}>
              <SvgIcon name={ic} size={18} />
            </motion.div>
          ))}
          <div className={`${glass} p-3 relative z-10`}>
            <Stomach state="normal" size={S} talk={local > 1.2 && local < 3} cheer />
          </div>
          <Hearts n={3} />
          <Beat at={1.2} local={local} sfx="babble" className="absolute -top-3 -right-8 z-30">
            <Bubble color={C.teal} icon="heart">Ngon & bổ quá!</Bubble>
          </Beat>
        </div>
        <Right>
          <div className={`${glass} p-3`}>
            <div className="flex items-center justify-between text-xs font-bold text-[#0F2E35] mb-2">
              <span>Thang pH dịch vị</span>
              <span className="font-mono font-extrabold text-[#EF4444]">pH {ph.toFixed(1)}</span>
            </div>
            <div className="relative h-3 rounded-full" style={{ background: 'linear-gradient(90deg,#EF4444,#F97316,#FBBF24,#4ADE80,#14B8A6,#0EA5E9,#6366F1)' }}>
              <div className="absolute -top-1 h-5 rounded-md border-2 border-dashed border-[#0F2E35]/55" style={{ left: `${(1.5 / 14) * 100}%`, width: `${(2 / 14) * 100}%` }} />
              <div className="absolute top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-[3px] border-[#0F2E35] shadow transition-[left] duration-200 ease-linear" style={{ left: `${(ph / 14) * 100}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-semibold text-[#52737A] mt-1.5">
              <span>0 axit mạnh</span><span>7 trung tính</span><span>14 kiềm</span>
            </div>
          </div>
          <Beat at={3} local={local} from="right"><BuddyCard kind="acid" name="Bạn HCl" line="“Mình diệt khuẩn & hoạt hóa pepsin!”" color={C.red} /></Beat>
          <Beat at={3.8} local={local} from="right"><BuddyCard kind="enzyme" name="Bạn Pepsin" line="“Mình cắt nhỏ chuỗi đạm!”" color="#B45309" /></Beat>
          <Beat at={4.6} local={local} from="right"><BuddyCard kind="shield" name="Bạn Chất nhầy" line="“Mình che chở thành dạ dày!”" color="#0F766E" /></Beat>
        </Right>
      </Row>
    </>
  );
}

const Flow = () => (
  <motion.span className="inline-flex text-[#F59E0B]" animate={{ x: [0, 4, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>
    <SvgIcon name="chevron" size={15} color="#F59E0B" />
  </motion.span>
);

function Role({ icon, title, note, color, compact }) {
  return (
    <div className="px-3 py-2 rounded-2xl bg-white/95 border-2 shadow-sm flex items-center gap-2.5 text-left transition-transform hover:scale-[1.02]" style={{ borderColor: `${color}30` }}>
      <span className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center shadow-inner" style={{ background: `${color}15` }}>
        <SvgIcon name={icon} size={20} color={color} />
      </span>
      <span className="leading-tight">
        <span className="block text-xs md:text-sm font-extrabold" style={{ color }}>{title}</span>
        {!compact && <span className="block text-[10px] md:text-[11px] font-semibold text-[#52737A]">{note}</span>}
      </span>
    </div>
  );
}

function SceneRoles({ local, compact }) {
  const S = compact ? 120 : 158;
  const roles = [
    ['bowl', 'Chứa thức ăn', 'Sức chứa khoảng 1–1,5 lít', '#0D9488'],
    ['mix', 'Nhào trộn cơ học', 'Co bóp, nghiền thành vị trấp', '#0284C7'],
    ['flask', 'Tiêu hóa đạm', 'HCl + pepsin phân giải protein', '#E11D48'],
    ['shieldCheck', 'Diệt khuẩn tự nhiên', 'Hàng rào axit tiêu diệt mầm bệnh', '#7C3AED'],
    ['b12', 'Hỗ trợ hấp thu B12', 'Tiết yếu tố nội (Intrinsic Factor)', '#EA580C'],
    ['pylorus', 'Điều tiết xuống ruột', 'Đẩy từng đợt nhỏ qua môn vị', '#0F766E'],
  ];
  const item = ([icon, title, note, color], i) => (
    <Beat key={title} at={0.9 + i * 0.75} local={local} from={i < 3 ? 'left' : 'right'} sfx="ding">
      <Role icon={icon} title={title} note={note} color={color} compact={compact} />
    </Beat>
  );
  return (
    <>
      <Cue at={0.2} local={local} fx="jingle" /><Cue at={5.2} local={local} fx="sparkle" />
      <Headline s={SCENES[1]} sub="Một cơ quan nhỏ nhưng đảm nhận cả “dây chuyền sinh học” trước khi thức ăn xuống ruột non">Dạ dày đảm nhiệm 6 vai trò thiết yếu</Headline>
      <Row>
        <Left>{roles.slice(0, 3).map(item)}</Left>
        <div className="relative order-first md:order-none flex items-center justify-center" style={{ width: S + 60, height: S + 76 }}>
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute inset-3 rounded-full border-2 border-[#F59E0B]/35"
              animate={{ scale: [0.82, 1.35], opacity: [0.55, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }} />
          ))}
          {[['star', -72, -22, '#F59E0B'], ['sparkle', 76, -34, '#14B8A6'], ['heart', -64, 68, '#F43F5E'], ['star', 70, 58, '#0EA5E9']].map(([ic, x, y, col], i) => (
            <motion.span key={i} className="absolute left-1/2 top-1/2 z-20" style={{ marginLeft: x, marginTop: y }}
              animate={{ y: [0, -8, 0], rotate: [0, 18, 0], scale: [1, 1.18, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}>
              <SvgIcon name={ic} size={18} color={col} />
            </motion.span>
          ))}
          <div className={`${glass} p-3 relative z-10`}>
            <Stomach state="normal" size={S} hat="chef" cheer talk={local > 0.5 && local < 5.6} />
          </div>
          <Beat at={0.4} until={4.8} local={local} sfx="babble" className="absolute -top-1 -right-12 z-30">
            <Bubble color={C.sky} icon="sparkle">Tớ làm 6 việc lận đó!</Bubble>
          </Beat>
          <Beat at={4.8} local={local} sfx="giggle" className="absolute -top-1 -right-12 z-30">
            <Bubble color={C.sun} icon="star">Đầu bếp chăm chỉ chưa!</Bubble>
          </Beat>
        </div>
        <Right>{roles.slice(3).map(item)}</Right>
      </Row>
      <Beat at={5.2} local={local} className="mt-2 md:mt-3">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-white shadow text-[11px] md:text-xs font-extrabold text-[#0F2E35]">
          <span className="inline-flex items-center gap-1"><SvgIcon name="esophagus" size={15} /> Thực quản</span>
          <Flow />
          <span className="inline-flex items-center gap-1"><SvgIcon name="stomachMini" size={15} /> Dạ dày (2–4 giờ/bữa)</span>
          <Flow />
          <span className="inline-flex items-center gap-1"><SvgIcon name="intestine" size={15} /> Ruột non hấp thu</span>
        </div>
      </Beat>
    </>
  );
}

function SceneHabits({ local, compact }) {
  const habits = [
    ['coffee', 'Cà phê lúc đói', '#9A3412'],
    ['chili', 'Đồ cay, chua gắt', C.red],
    ['clock', 'Bỏ bữa, thức khuya', '#B45309'],
    ['beer', 'Rượu bia, thuốc lá', '#991B1B'],
    ['pill', 'Lạm dụng NSAID', '#C2410C'],
  ];
  const mucus = 100 - 72 * clamp((local - 0.4) / 4.5);
  const mc = mucus > 60 ? C.teal : mucus > 40 ? C.coral : C.red;
  const S = compact ? 140 : 188;
  return (
    <>
      <Cue at={0.3} local={local} fx="gurgle" /><Cue at={3.4} local={local} fx="warn" /><Cue at={4.4} local={local} fx="ouch" />
      <Headline s={SCENES[2]} sub="Prostaglandin bảo vệ suy giảm khiến thành dạ dày mỏng manh trước dịch vị axit">Lớp chất nhầy bị bào mòn, axit ngấm vào niêm mạc</Headline>
      <Row>
        <Left>
          {habits.map(([icon, name, color], i) => (
            <Beat key={name} at={0.4 + i * 0.8} local={local} from="left">
              <Chip color={color} icon={icon} badge={<span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-[#EF4444]/12 text-[#EF4444]">−Bảo vệ</span>}>
                {name}
              </Chip>
            </Beat>
          ))}
        </Left>
        <div className="relative order-first md:order-none flex items-start justify-center pt-5" style={{ width: S + 60 }}>
          <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden" style={{ opacity: clamp(local / 2) }}>
            {[14, 30, 46, 62, 78, 24, 70].map((left, i) => (
              <motion.span key={left} className="absolute" style={{ left: `${left}%`, top: 0 }}
                animate={{ y: [0, S * 0.72], opacity: [0, 0.95, 0], scale: [0.8, 1.1] }}
                transition={{ duration: 1.55, repeat: Infinity, delay: i * 0.32, ease: 'easeIn' }}>
                <SvgIcon name="flame" size={16} />
              </motion.span>
            ))}
          </div>
          <motion.div className={`${glass} p-3 relative z-10`} animate={local > 4 ? { x: [0, -3, 3, -3, 0] } : { x: 0 }} transition={{ duration: 0.48, repeat: local > 4 ? Infinity : 0, repeatDelay: 0.75 }}>
            <Stomach state="thin" size={S} shield={mucus / 100} />
          </motion.div>
          <Beat at={4.6} local={local} sfx="babble" className="absolute top-0 -right-6 z-30">
            <Bubble color={C.red} icon="warn">Ối, nóng rát quá!</Bubble>
          </Beat>
        </div>
        <Right>
          <div className={`${glass} p-3 flex items-center gap-3`}>
            <Buddy kind="shield" mood={mucus > 55 ? 'happy' : 'sad'} size={44} />
            <Meter label="Lớp chất nhầy bảo vệ" value={mucus} color={mc} />
          </div>
          <Beat at={4} local={local} from="right">
            <Chip color="#B45309" icon="activity">Prostaglandin bảo vệ suy giảm</Chip>
          </Beat>
          <Beat at={4.8} local={local} from="right">
            <Chip color={C.red} icon="warn">Axit HCl & Pepsin ngấm sâu</Chip>
          </Beat>
        </Right>
      </Row>
    </>
  );
}

function Donut({ value, label }) {
  const r = 39; const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="hpGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={C.coral} />
            <stop offset="100%" stopColor={C.red} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#0F2E35" strokeOpacity="0.08" strokeWidth="10" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#hpGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - value)} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-heading font-black text-base text-[#0F2E35]">{label}</div>
    </div>
  );
}

function SceneHPylori({ local, compact }) {
  const S = compact ? 140 : 188;
  const donut = 0.75 * ease((local - 0.8) / 2.5);
  const fly = 1 - ease((local - 0.3) / 2.4);
  const hurt = local > 3.2;
  return (
    <>
      <Cue at={0.4} local={local} fx="whoosh" /><Cue at={3.2} local={local} fx="ouch" /><Cue at={3.8} local={local} fx="warn" />
      <Headline s={SCENES[3]} sub="Tiết enzym Urease trung hòa axit quanh mình, xuyên qua lớp nhầy gây ổ viêm loét">H. pylori – thủ phạm hàng đầu gây viêm loét dạ dày</Headline>
      <Row>
        <Beat at={0.2} local={local} from="left" className="relative flex flex-col items-center md:items-end">
          <Beat at={1.2} local={local} sfx="snicker" className="absolute -top-9 left-2 z-30">
            <Bubble color={C.violet} icon="spore">Có Urease, tớ chẳng sợ axit!</Bubble>
          </Beat>
          <div className={`${glass} flex flex-col items-center p-3.5`}>
            <HPylori size={compact ? 92 : 148} />
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#7C3AED]/12 text-[#6D28D9] mt-1.5 border border-[#7C3AED]/25">
              Helicobacter pylori
            </span>
          </div>
        </Beat>
        <div className="relative order-first md:order-none flex items-center justify-center" style={{ width: S + 60, height: S + 56 }}>
          <motion.span className="absolute inset-4 rounded-full bg-[#EF4444]/15" animate={{ scale: [1, 1.18, 1], opacity: [0.9, 0.3, 0.9] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <div className={`${glass} p-3 relative z-10`}>
            <Stomach state={hurt ? 'ulcer' : 'thin'} size={S} shield={hurt ? 0.2 : 0.5} />
          </div>
          {!compact && [{ x: -90, y: -40, s: 1 }, { x: -60, y: 70, s: 0.8 }, { x: -110, y: 20, s: 0.7 }].map((h, i) => (
            <motion.div key={i} className="absolute z-20 left-1/2 top-1/2" style={{ x: h.x * fly - 20, y: h.y * fly - 20, opacity: clamp(local / 0.8) * (hurt ? 0.9 : 1) }}>
              <motion.div animate={{ rotate: [0, 20, 0], y: [0, -6, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}>
                <HPylori size={46 * h.s + 10} />
              </motion.div>
            </motion.div>
          ))}
          <Beat at={4} local={local} sfx="babble" className="absolute -top-3 -right-8 z-30">
            <Bubble color={C.red} icon="warn">Ái ui! Loét đau quá!</Bubble>
          </Beat>
        </div>
        <Right>
          <Beat at={0.8} local={local} from="right" className={`${glass} p-3 flex items-center gap-3`}>
            <Donut value={donut} label="70–80%" />
            <p className="text-[11px] md:text-xs font-semibold text-[#52737A] leading-snug text-left">
              Ước tính tỷ lệ người Việt nhiễm H. pylori — đa số âm thầm không triệu chứng
            </p>
          </Beat>
          <div className="flex flex-col gap-1.5">
            <Beat at={2.6} local={local} from="right"><Chip color={C.red} icon="burn">Đau rát vùng thượng vị</Chip></Beat>
            <Beat at={3.2} local={local} from="right"><Chip color="#B45309" icon="reflux">Ợ chua, ợ hơi, trào ngược</Chip></Beat>
            <Beat at={3.8} local={local} from="right"><Chip color="#854D0E" icon="nausea">Đầy bụng, khó tiêu, buồn nôn</Chip></Beat>
          </div>
          <Beat at={4.6} local={local} from="right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#FEE2E2] text-[#DC2626] text-[11px] md:text-xs font-extrabold border border-[#EF4444]/30">
              <SvgIcon name="warn" size={15} color="#DC2626" />
              Đau kéo dài: đi khám & test HP sớm
            </div>
          </Beat>
        </Right>
      </Row>
    </>
  );
}

function SceneDehydration({ local, compact }) {
  const k = clamp(local / 5.5);
  const level = 95 - 65 * k;
  const lc = level > 65 ? C.sky : level > 45 ? C.coral : C.red;
  const W = compact ? 120 : 168;
  const top = 146 - (level / 100) * 138;
  const who = Math.round(443 * ease((local - 1) / 3));
  const signs = [
    ['dryLips', 'Khô môi, khát nước dữ dội'],
    ['sunkenEye', 'Mắt trũng, da kém đàn hồi'],
    ['lowUrine', 'Đi tiểu ít, nước tiểu sẫm'],
    ['dizzy', 'Mệt lả, choáng váng, li bì'],
  ];
  const drop = 'M60 8C60 8 14 62 14 100a46 46 0 0 0 92 0C106 62 60 8 60 8Z';
  const mouth = level > 65 ? 'M48 98Q60 110 72 98' : level > 45 ? 'M50 104H70' : 'M48 108Q60 96 72 108';
  return (
    <>
      <Cue at={0.3} local={local} fx="splash" /><Cue at={2.2} local={local} fx="drip" /><Cue at={3.4} local={local} fx="drip" /><Cue at={4} local={local} fx="ouch" />
      <Headline s={SCENES[4]} sub="Mất nước nặng cần bù dịch và điện giải kịp thời, đặc biệt ở trẻ nhỏ và người cao tuổi">Tiêu chảy cấp: thất thoát nước & điện giải cực nhanh</Headline>
      <Row>
        <Left>
          <div className="hidden md:flex items-center gap-1.5 text-xs font-extrabold text-[#0284C7] mb-0.5">
            <SvgIcon name="drop" size={15} color="#0284C7" />
            Dấu hiệu cảnh báo mất nước
          </div>
          {signs.map(([icon, name], i) => (
            <Beat key={name} at={0.6 + i * 0.85} local={local} from="left">
              <Chip color="#0369A1" icon={icon}>{name}</Chip>
            </Beat>
          ))}
        </Left>
        <div className="relative order-first md:order-none flex items-center justify-center">
          {[[-44, 4, 0], [-34, 120, 1.1]].map(([x, y, d]) => (
            <motion.div key={y} className="absolute z-20" style={{ left: x, top: y }} animate={{ rotate: [0, 12, -12, 0], y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: d }}>
              <Germ size={compact ? 34 : 46} />
            </motion.div>
          ))}
          <motion.div className="absolute -right-9 bottom-8 z-20" animate={{ y: [0, -8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
            <Germ size={compact ? 30 : 40} hue="#FDE047" dark="#CA8A04" />
          </motion.div>
          <div className={`${glass} p-3 md:p-4 relative`}>
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="absolute left-1/2 bottom-3 z-10" animate={{ y: [0, 48], x: [(i - 1) * 9, (i - 1) * 24], opacity: [0, 1, 0] }} transition={{ duration: 1.25, repeat: Infinity, delay: i * 0.4 }}>
                <SvgIcon name="drop" size={15} color="#0EA5E9" />
              </motion.span>
            ))}
            <svg viewBox="0 0 120 150" width={W} height={W * 1.25}>
              <defs>
                <clipPath id="dropClip"><path d={drop} /></clipPath>
                <linearGradient id="dropWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lc} stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              <path d={drop} fill="#F8FAFC" />
              <g clipPath="url(#dropClip)">
                <g transform={`translate(0 ${top})`} style={{ transition: 'transform .2s linear' }}>
                  <motion.path d="M-40 0 Q-20 -6 0 0 T40 0 T80 0 T120 0 T160 0 V170 H-40Z" fill="url(#dropWater)" animate={{ x: [0, 40] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
                </g>
              </g>
              <path d={drop} fill="none" stroke={lc} strokeWidth="3.2" />
              <path d="M36 52C40 38 48 28 54 22" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" fill="none" />
              {[48, 72].map((x) => (
                <g key={x}>
                  <circle cx={x} cy="84" r="7" fill="#fff" />
                  <circle cx={x} cy={level > 45 ? 85 : 87} r="3.6" fill="#0F2E35" />
                  <circle cx={x - 1.5} cy="82.5" r="1.4" fill="#fff" />
                </g>
              ))}
              <path d={mouth} stroke="#0F2E35" strokeWidth="3" fill="none" strokeLinecap="round" />
              {level <= 45 && <ellipse cx="44" cy="96" rx="2.6" ry="4" fill="#38BDF8" />}
              <text x="60" y="130" textAnchor="middle" fontWeight="900" fontSize="16" fill="#fff" stroke={C.ink} strokeOpacity="0.3" strokeWidth="0.8">{Math.round(level)}%</text>
            </svg>
            <div className="text-center text-[11px] font-extrabold mt-1" style={{ color: lc }}>Nước cơ thể tụt nhanh</div>
          </div>
          <Beat at={3.6} local={local} sfx="babble" className="absolute -top-4 -right-10 z-30">
            <Bubble color="#0284C7" icon="drop">Cần bù Oresol ngay!</Bubble>
          </Beat>
        </div>
        <Right>
          <div className={`${glass} p-3 space-y-2.5`}>
            <Meter label="Điện giải Natri (Na⁺)" value={100 - 62 * k} color={C.sky} />
            <Meter label="Điện giải Kali (K⁺)" value={100 - 70 * k} color={C.coral} />
          </div>
          <Beat at={1} local={local} from="right" className={`${glass} p-3 text-left`}>
            <div className="flex items-center justify-between">
              <div className="font-heading font-black text-2xl md:text-3xl text-[#EF4444] leading-none">≈ {who}.000</div>
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#EF4444] text-[10px] font-extrabold border border-red-200">WHO</span>
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-[#52737A] mt-1 leading-snug">
              trẻ dưới 5 tuổi tử vong mỗi năm vì tiêu chảy cấp trên toàn cầu
            </p>
          </Beat>
        </Right>
      </Row>
    </>
  );
}

function ScenePillars({ local, compact }) {
  const pillars = [
    ['washHands', 'Rửa tay 6 bước', 'Với xà phòng trước khi ăn & sau vệ sinh', C.sky],
    ['cookedFood', 'Ăn chín uống sôi', 'Thực phẩm tươi sạch, ăn đúng giờ', C.coral],
    ['oresol', 'Bù Oresol đúng chuẩn', 'Pha đúng tỷ lệ nước trên bao bì', '#0284C7'],
    ['stethoscope', 'Khám & tầm soát sớm', 'Khi đau thượng vị hoặc rối loạn kéo dài', C.teal],
  ];
  return (
    <div className="flex flex-col items-center text-center max-w-4xl w-full px-2">
      <Cue at={0.1} local={local} fx="jingle" /><Cue at={0.5} local={local} fx="boing" />
      <Headline s={SCENES[5]} sub="4 nguyên tắc vàng bảo vệ hệ tiêu hóa cho bản thân và gia đình">Hiểu đúng – Phòng sớm – Chăm sóc đúng cách</Headline>
      <div className="relative">
        <Hearts n={4} />
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <Stomach state="normal" size={compact ? 76 : 104} hat="crown" cheer talk={local > 0.4 && local < 3} />
        </motion.div>
        <Beat at={0.6} local={local} sfx="giggle" className="absolute top-0 -right-28 z-30">
          <Bubble color={C.teal} icon="shieldMini">Bụng khỏe, cả nhà vui!</Bubble>
        </Beat>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mt-2 w-full">
        {pillars.map(([icon, title, note, color], i) => (
          <Beat key={title} at={0.7 + i * 0.68} local={local} sfx="ding" className={`${glass} p-3 md:p-4 text-left hover:scale-[1.02] transition-transform`}>
            <motion.div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-2 shadow-inner" style={{ background: `${color}18` }}
              animate={{ rotate: [0, -6, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}>
              <SvgIcon name={icon} size={24} color={color} />
            </motion.div>
            <div className="font-heading font-extrabold text-xs md:text-sm text-[#0F2E35] leading-tight">{title}</div>
            <div className="text-[10px] md:text-xs font-medium text-[#52737A] mt-1 leading-snug">{note}</div>
          </Beat>
        ))}
      </div>
    </div>
  );
}

function SceneWelcome({ local, compact, onNext, onReplay }) {
  const sparks = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    l: (i * 47) % 100,
    t: (i * 29) % 92,
    s: 10 + ((i * 5) % 10),
    d: (i * 0.37) % 3,
    kind: i % 2 === 0 ? 'sparkle' : 'star',
  })), []);
  return (
    <div className="relative flex flex-col items-center text-center w-full max-w-4xl px-3">
      <Cue at={0.15} local={local} fx="fanfare" /><Cue at={0.3} local={local} fx="confetti" /><Cue at={1.9} local={local} fx="jingle" /><Cue at={3.3} local={local} fx="sparkle" />
      {local >= 0.3 && <Confetti />}
      {sparks.map((p, i) => (
        <motion.span key={i} className="absolute pointer-events-none" style={{ left: `${p.l}%`, top: `${p.t}%` }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.4, 1, 0.4], y: [0, -20, 0] }} transition={{ duration: 2.6, repeat: Infinity, delay: p.d }}>
          <SvgIcon name={p.kind} size={p.s} color="#99F6E4" />
        </motion.span>
      ))}
      <Beat at={0.1} local={local} className="relative mb-3">
        <motion.div className="absolute -inset-2 rounded-full" style={{ background: 'conic-gradient(from 0deg,#5EEAD4,#38BDF8,#FB923C,#FBBF24,#5EEAD4)' }}
          animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
        <div className="relative rounded-full bg-white flex items-center justify-center shadow-inner" style={{ width: compact ? 96 : 128, height: compact ? 96 : 128 }}>
          <Stomach state="normal" size={compact ? 80 : 108} hat="crown" cheer talk={local > 0.6 && local < 3} />
        </div>
        <Beat at={0.6} local={local} sfx="giggle" className="absolute -top-2 left-full ml-1.5 z-30">
          <Bubble color="#0F766E" icon="heart">Xin chào cô và các bạn!</Bubble>
        </Beat>
      </Beat>
      <Beat at={0.9} local={local}>
        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CCFBF1] to-[#FDE68A] drop-shadow">
          Chào mừng cô và các bạn
        </h2>
      </Beat>
      <Beat at={2} local={local}>
        <p className="font-heading font-bold text-lg sm:text-xl md:text-3xl text-[#CCFBF1] mt-1.5">
          đến với bài thuyết trình của nhóm em
        </p>
      </Beat>
      <Beat at={3.3} local={local}>
        <div className="mt-4 px-5 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-white font-heading font-extrabold text-xs sm:text-sm md:text-lg tracking-wide inline-flex items-center gap-2">
          <SvgIcon name="shieldMini" size={18} color="#5EEAD4" />
          <span>GUT CARE • Tiêu hóa khỏe mạnh, sống vui mỗi ngày</span>
        </div>
      </Beat>
      <Beat at={4.6} local={local} className="mt-5">
        <div className="flex items-center justify-center gap-2.5">
          <button onClick={onReplay} className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/15 border border-white/30 text-white text-xs font-extrabold hover:bg-white/25 transition-colors">
            <SvgIcon name="replay" size={15} color="#fff" />
            <span>Xem lại</span>
          </button>
          <button onClick={onNext} className="flex items-center gap-1 px-5 py-2 rounded-2xl bg-white text-[#0C4A5A] text-xs md:text-sm font-extrabold shadow-lg hover:scale-105 transition-transform">
            <span>Sang Slide 3</span>
            <SvgIcon name="chevron" size={16} color="#0C4A5A" />
          </button>
        </div>
      </Beat>
    </div>
  );
}

/* ───────────────────────── Phụ đề & Thanh tua thời gian ───────────────────────── */

const Caption = ({ text, progress }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} style={{ opacity: i / words.length <= progress ? 1 : 0.42, transition: 'opacity .18s' }}>
          {w}{' '}
        </span>
      ))}
    </span>
  );
};

function Scrubber({ t, onSeek }) {
  const ref = useRef(null); const drag = useRef(false); const [hover, setHover] = useState(null);
  const posToT = (e) => { const r = ref.current.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width) * TOTAL; };
  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Thanh thời gian video"
      aria-valuemin={0}
      aria-valuemax={TOTAL}
      aria-valuenow={Math.round(t)}
      aria-valuetext={fmt(t)}
      className="relative h-6 flex items-center cursor-pointer touch-none group order-last basis-full md:order-none md:basis-auto md:flex-1 md:mx-3 focus-visible:outline-2 focus-visible:outline-[#14B8A6] rounded"
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); onSeek(posToT(e)); }}
      onPointerMove={(e) => { const v = posToT(e); setHover(v); if (drag.current) onSeek(v); }}
      onPointerUp={() => { drag.current = false; }}
      onPointerLeave={() => setHover(null)}
    >
      <div className="flex w-full gap-[3px] h-2 group-hover:h-3 transition-all">
        {SCENES.map((s) => {
          const d = s.range[1] - s.range[0]; const f = clamp((t - s.range[0]) / d);
          return (
            <div key={s.id} className="relative rounded-full bg-[#0F2E35]/10 overflow-hidden" style={{ flex: d }}>
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${f * 100}%`, background: `linear-gradient(90deg,${s.accent},${C.sky})` }} />
            </div>
          );
        })}
      </div>
      <div className="absolute top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white border-[3px] border-[#14B8A6] shadow-md transition-transform group-hover:scale-110" style={{ left: `${(t / TOTAL) * 100}%` }} />
      {hover != null && (
        <div className="absolute -top-8 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#0F2E35] text-white text-[10px] font-bold whitespace-nowrap pointer-events-none shadow" style={{ left: `${(hover / TOTAL) * 100}%` }}>
          {fmt(hover)} • {sceneAt(hover).name}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Component Chính ───────────────────────── */

export function Slide2Video({ onNext }) {
  const rootRef = useRef(null);
  const audio = useMemo(createAudio, []);
  const compact = useMedia('(max-width: 767px)');
  const { t, playing, setPlaying, speed, setSpeed, seek } = useClock(TOTAL);
  const [showSubs, setShowSubs] = useState(true);
  const [muted, setMuted] = useState(false);
  const [voice, setVoice] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const scene = sceneAt(t);
  const idx = SCENES.indexOf(scene);
  const dur = scene.range[1] - scene.range[0];
  const local = t - scene.range[0];
  const started = t > 0 || playing;
  const dark = idx === SCENES.length - 1;

  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    size: 5 + ((i * 7) % 8),
    dur: 9 + ((i * 5) % 8),
    delay: (i * 1.3) % 6,
  })), []);

  const togglePlay = useCallback(() => { audio.tick(); if (t >= TOTAL) seek(0); setPlaying((p) => !p); }, [audio, t, seek, setPlaying]);
  const skip = useCallback((d) => { audio.tick(); seek(t + d); }, [audio, t, seek]);
  const replay = useCallback(() => { seek(0); setPlaying(true); }, [seek, setPlaying]);
  const toggleFull = useCallback(() => { if (!document.fullscreenElement) rootRef.current?.requestFullscreen?.(); else document.exitFullscreen?.(); }, []);
  const goNext = useCallback(() => { audio.whoosh(); onNext?.(); }, [audio, onNext]);

  const prevIdx = useRef(idx);
  useEffect(() => {
    audio.setMood(scene.mood);
    const changed = prevIdx.current !== idx; prevIdx.current = idx;
    if (!playing) { audio.stop(); hush(); return; }
    audio.start();
    if (changed) { audio.whoosh(); if (idx < SCENES.length - 1) audio.chime(); }
    if (voice && !muted) speak(scene.caption, 0.95 * speed);
  }, [playing, idx, voice, muted]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { audio.setMuted(muted); if (muted) hush(); }, [audio, muted]);
  useEffect(() => { audio.setVoice(voice); if (!voice) hush(); }, [audio, voice]);
  useEffect(() => () => { audio.stop(); hush(); }, [audio]);

  useEffect(() => {
    const h = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('button, input, textarea')) return;
      const k = e.key.toLowerCase();
      if (k === ' ' || k === 'k') { e.preventDefault(); togglePlay(); }
      else if (e.key === 'ArrowLeft') skip(-5);
      else if (e.key === 'ArrowRight') skip(5);
      else if (k === 'c') setShowSubs((v) => !v);
      else if (k === 'f') toggleFull();
      else if (k === 'm') setMuted((v) => !v);
      else if (k === 'v') setVoice((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, skip, toggleFull]);

  const sp = { local, compact };
  const ib = 'w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F2E35] flex items-center justify-center transition-colors';
  const tog = (on, col) => `px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-colors ${on ? `${col} text-white shadow-sm` : 'bg-slate-100 text-[#52737A] hover:bg-slate-200'}`;

  return (
    <FxCtx.Provider value={audio}>
      <MotionConfig reducedMotion="user">
        <div ref={rootRef} className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-white rounded-3xl border border-white/80 shadow-2xl select-none">
          {/* Nền chuyển cảnh mượt */}
          {SCENES.map((s, i) => (
            <motion.div key={s.id} className="absolute inset-0 pointer-events-none" style={{ background: s.bg }} animate={{ opacity: i === idx ? 1 : 0 }} transition={{ duration: 0.85 }} />
          ))}
          <div className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(15,46,53,.06) 1.3px, transparent 1.5px)', backgroundSize: '22px 22px' }} />

          {/* Hạt trang trí bằng Vector SVG */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (p.id % 3 === 0 ? (
              <motion.span key={`${scene.id}-${p.id}`} className="absolute select-none" style={{ left: `${p.left}%`, bottom: -30, opacity: 0 }}
                animate={{ y: [0, -640], opacity: [0, 0.55, 0], rotate: [0, p.id % 2 ? 45 : -45] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }}>
                <SvgIcon name={scene.deco[Math.floor(p.id / 3) % scene.deco.length]} size={p.size * 2.1} color={scene.accent} />
              </motion.span>
            ) : (
              <motion.span key={p.id} className="absolute rounded-full" style={{ left: `${p.left}%`, bottom: -20, width: p.size, height: p.size, background: scene.accent, opacity: 0 }}
                animate={{ y: [0, -640], opacity: [0, 0.35, 0] }}
                transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'linear' }} />
            )))}
          </div>

          {/* HEADER */}
          <div className="relative z-30 px-3 md:px-6 pt-3 pb-1.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: scene.accent }} />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: scene.accent }} />
              </span>
              <span className={`text-xs font-extrabold truncate ${dark ? 'text-white' : 'text-[#0F2E35]'}`}>GUT CARE • {TOTAL} giây</span>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/85 backdrop-blur-md border border-white shadow-sm overflow-x-auto max-w-[65%] md:max-w-none">
              {SCENES.map((s, i) => {
                const cur = idx === i; const past = i < idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => { audio.tick(); seek(s.range[0]); }}
                    aria-label={`Chuyển tới ${s.name}`}
                    aria-current={cur}
                    className={`relative overflow-hidden px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${cur ? 'ring-1 ring-[#14B8A6]/50 text-[#0F2E35]' : past ? 'text-[#0F2E35]/80 hover:bg-white' : 'text-[#52737A] hover:bg-white hover:text-[#0F2E35]'}`}
                  >
                    {cur && <span className="absolute inset-y-0 left-0 transition-[width] duration-100 ease-linear" style={{ width: `${clamp(local / dur) * 100}%`, background: `${s.accent}38` }} />}
                    <span className="relative inline-flex items-center gap-1">
                      {past && <SvgIcon name="check" size={12} color={C.teal} />}
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SÂN KHẤU CHÍNH */}
          <div
            onClick={togglePlay}
            className="relative z-20 flex-1 min-h-0 overflow-hidden cursor-pointer"
            title={playing ? "Nhấp để tạm dừng (Space)" : "Nhấp để phát video (Space)"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(5px)' }}
                transition={{ duration: 0.32 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-3 md:px-6 py-2"
              >
                {idx === 0 && <SceneDigest {...sp} />}
                {idx === 1 && <SceneRoles {...sp} />}
                {idx === 2 && <SceneHabits {...sp} />}
                {idx === 3 && <SceneHPylori {...sp} />}
                {idx === 4 && <SceneDehydration {...sp} />}
                {idx === 5 && <ScenePillars {...sp} />}
                {idx === 6 && <SceneWelcome {...sp} onNext={goNext} onReplay={replay} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PHỤ ĐỀ */}
          {showSubs && (
            <div className="relative z-30 w-full flex justify-center items-end px-3 md:px-4 mb-2 min-h-[52px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  aria-live="polite"
                  className="px-5 md:px-7 py-2 md:py-2.5 rounded-2xl bg-[#0F2E35]/90 backdrop-blur-md text-white text-center text-xs sm:text-sm md:text-base font-bold shadow-xl max-w-4xl border border-white/15 leading-relaxed"
                >
                  <Caption text={scene.caption} progress={clamp(local / (dur * 0.8))} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* THANH ĐIỀU KHIỂN */}
          <div className="relative z-30 w-full px-3 md:px-6 py-2 bg-white/85 backdrop-blur-md border-t border-white/90 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 shadow-sm">
            <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={togglePlay} aria-label={playing ? 'Tạm dừng' : 'Phát'} className="w-9 h-9 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform">
                <SvgIcon name={playing ? 'pause' : 'play'} size={17} color="#fff" />
              </button>
              <button onClick={() => skip(-5)} aria-label="Lùi 5 giây" title="Lùi 5 giây (←)" className={ib}><SvgIcon name="rewind" size={14} /></button>
              <button onClick={() => skip(5)} aria-label="Tới 5 giây" title="Tới 5 giây (→)" className={ib}><SvgIcon name="forward" size={14} /></button>
              <button onClick={() => { audio.tick(); seek(0); }} aria-label="Xem lại từ đầu" title="Xem lại từ đầu" className={ib}><SvgIcon name="replay" size={14} /></button>
              <span className="text-xs font-mono font-extrabold text-[#0F2E35] w-[78px] text-center">{fmt(t)} / {fmt(TOTAL)}</span>
            </div>
            <Scrubber t={t} onSeek={seek} />
            <div className="flex items-center gap-1.5 md:gap-2">
              <button onClick={() => setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length])} title="Tốc độ phát" className="px-2.5 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0F2E35] text-xs font-extrabold font-mono transition-colors">{speed}x</button>
              <button onClick={() => setMuted((v) => !v)} aria-pressed={muted} aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'} title="Âm thanh (M)" className={ib}>
                <SvgIcon name={muted ? 'mute' : 'volume'} size={15} />
              </button>
              <button onClick={() => setVoice((v) => !v)} aria-pressed={voice} title="Giọng đọc tiếng Việt (V)" className={tog(voice, 'bg-[#F97316]')}>
                <SvgIcon name="mic" size={14} color={voice ? '#fff' : '#52737A'} />
                <span className="hidden sm:inline">Giọng đọc</span>
              </button>
              <button onClick={() => setShowSubs((v) => !v)} aria-pressed={showSubs} title="Phụ đề (C)" className={tog(showSubs, 'bg-[#14B8A6]')}>
                <SvgIcon name="subtitles" size={14} color={showSubs ? '#fff' : '#52737A'} />
                <span className="hidden sm:inline">Phụ đề</span>
              </button>
              <button onClick={toggleFull} aria-label="Toàn màn hình" title="Toàn màn hình (F)" className={ib}>
                <SvgIcon name={isFull ? 'minimize' : 'fullscreen'} size={14} />
              </button>
              <button onClick={goNext} className="flex items-center gap-1 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white font-extrabold text-xs shadow hover:opacity-95 transition-opacity">
                <span>Sang Slide 3</span>
                <SvgIcon name="chevron" size={14} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </MotionConfig>
    </FxCtx.Provider>
  );
}

export default Slide2Video;