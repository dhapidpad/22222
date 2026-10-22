import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide5UlcerCauses v4 — 100% Custom Multi-Layer SVG (4 Thủ Phạm Gây Loét & Mô Phỏng Suy Giảm Lá Chắn Niêm Mạc) */

const CAUSES = [
  {
    id: 'cause-hp',
    svg: 'hpCause',
    title: 'Vi khuẩn H. pylori',
    badge: 'Thủ phạm số 1',
    color: '#8B5CF6',
    stat: '70–80%',
    label: 'dân số VN mang khuẩn',
    desc: 'Tiết enzym Urease trung hòa axit quanh mình, xuyên qua lớp nhầy và tiết độc tố CagA/VacA phá hủy biểu mô.',
  },
  {
    id: 'cause-nsaid',
    svg: 'nsaidCause',
    title: 'Thuốc giảm đau NSAID',
    badge: 'Thủ phạm số 2',
    color: '#EA580C',
    stat: '↓ COX-1',
    label: 'mất Prostaglandin',
    desc: 'Ibuprofen, Aspirin, Diclofenac ức chế COX-1 làm ngưng tiết chất nhầy, Bicarbonat và giảm tưới máu niêm mạc.',
  },
  {
    id: 'cause-habits',
    svg: 'habitsCause',
    title: 'Rượu bia & Thuốc lá',
    badge: 'Bào mòn & Cản lành',
    color: '#DC2626',
    stat: '↓ Tưới máu',
    label: 'Nicotine gây co mạch',
    desc: 'Cồn nồng độ cao hòa tan lớp gel Mucin; Nicotine làm co mạch máu dưới niêm khiến ổ tổn thương rất lâu lành.',
  },
  {
    id: 'cause-stress',
    svg: 'stressCause',
    title: 'Stress & Đồ cay chua',
    badge: 'Khuếch đại ổ viêm',
    color: '#E11D48',
    stat: '↑↑ HCl',
    label: 'kích thích dây phế vị',
    desc: 'Căng thẳng thần kinh và Capsaicin kích thích tế bào viền tăng tiết axit HCl quá mức, làm bùng phát cơn đau rát.',
  },
];

const RING_R = 130;
const RING_C = 2 * Math.PI * RING_R;

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
    osc.frequency.setValueAtTime(640, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.07);
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.085);
  } catch { /* ignore */ }
}

/* ─── Hệ thống Minh họa Vector SVG 3D Cho 4 Thủ Phạm Gây Loét (64x64) ─── */
function CauseSvg({ name, size = 40 }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'hpCause':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#F5F3FF" stroke="#C4B5FD" strokeWidth="2.5" />
          <circle cx="36" cy="34" r="20" fill="#8B5CF6" fillOpacity=".15" />
          {/* Tiên mao xoắn khuẩn */}
          <path d="M16 42C9 42 7 50 12 54M18 38C10 34 6 40 8 46M20 45C14 51 16 58 22 56" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
          {/* Thân xoắn H. pylori */}
          <path d="M19 40C25 22 34 22 38 35S49 50 54 31" stroke="#7C3AED" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="53" cy="27" r="9.5" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="2.2" />
          <circle cx="50" cy="26" r="2" fill="#fff" />
          <circle cx="56" cy="26" r="2" fill="#fff" />
          <rect x="10" y="10" width="30" height="14" rx="7" fill="#6D28D9" />
          <text x="25" y="20" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff">Urease</text>
        </svg>
      );
    case 'nsaidCause':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2.5" />
          {/* Viên nang NSAID 3D + Biểu tượng khóa COX-1 */}
          <g transform="rotate(-32 32 32)">
            <rect x="12" y="22" width="40" height="20" rx="10" fill="#fff" stroke="#9A3412" strokeWidth="3" />
            <path d="M32 22H42A10 10 0 0 1 42 42H32V22Z" fill="#EA580C" />
            <path d="M18 27H28" stroke="#CBD5E1" strokeWidth="2.8" strokeLinecap="round" />
          </g>
          <circle cx="46" cy="46" r="9" fill="#EF4444" stroke="#fff" strokeWidth="2" />
          <path d="M42.5 42.5L49.5 49.5M49.5 42.5L42.5 49.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'habitsCause':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2.5" />
          {/* Ly rượu cồn + Điếu thuốc lá */}
          <path d="M16 14H36L33 32C32 37 28.5 40 26 40C23.5 40 20 37 19 32L16 14Z" fill="#FCA5A5" stroke="#991B1B" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M18 23H34L32.5 31.5C31.8 35.5 29 38 26 38C23 38 20.2 35.5 19.5 31.5L18 23Z" fill="#DC2626" />
          <path d="M26 40V52M19 52H33" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          {/* Điếu thuốc lá nghiêng */}
          <g transform="rotate(-20 42 42)">
            <rect x="28" y="40" width="24" height="6" rx="2" fill="#fff" stroke="#475569" strokeWidth="2" />
            <rect x="28" y="40" width="7" height="6" rx="1" fill="#F97316" />
            <circle cx="53" cy="43" r="2.5" fill="#EF4444" />
          </g>
        </svg>
      );
    case 'stressCause':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="2.5" />
          {/* Tia sét thần kinh phế vị + Ớt cay + Giọt axit */}
          <path d="M36 9L18 33H32L28 55L48 29H34L36 9Z" fill="#E11D48" stroke="#881337" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="17" cy="18" r="5" fill="#FBBF24" />
          <circle cx="49" cy="47" r="5.5" fill="#EF4444" />
          <text x="49" y="50" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#fff">H⁺</text>
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

/* ─── Nhân Vật Dạ Dày & Xoắn Khuẩn H. pylori Tương Tác Ở Trung Tâm ─── */
function CenterStomachSvg({ state = 'normal', protectionLevel = 60, activeCauses = [] }) {
  const pal = {
    normal: ['#FFD1C7', '#FF8573', '#E05344'],
    thin: ['#FFE4C4', '#F59E56', '#C96A22'],
    ulcer: ['#FFB8C2', '#E63E56', '#9E1B32'],
  }[state];
  const body = 'M84 8Q84 0 94 0H104Q114 0 114 10V40C114 56 160 56 178 96C196 138 160 190 110 188C66 186 36 160 38 124C40 100 58 90 74 82C86 76 84 60 84 44Z';
  const shield = protectionLevel / 100;
  const n = state === 'normal';
  const u = state === 'ulcer';

  return (
    <svg viewBox="0 0 220 210" width={196} height={188} className="overflow-visible select-none">
      <defs>
        <radialGradient id={`ulcer-st-${state}`} cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor={pal[0]} />
          <stop offset="68%" stopColor={pal[1]} />
          <stop offset="100%" stopColor={pal[2]} />
        </radialGradient>
      </defs>

      <ellipse cx="108" cy="202" rx="54" ry="5.5" fill="#12343B" opacity=".12" />

      {/* Vòng lá chắn chất nhầy quanh dạ dày */}
      <path
        d={body}
        transform="translate(-7.6 -7.7) scale(1.07)"
        fill="none"
        strokeLinecap="round"
        strokeWidth="5.5"
        stroke={shield > 0.6 ? '#14B8A6' : shield > 0.35 ? '#F97316' : '#EF4444'}
        strokeDasharray={`${shield * 16} ${(1 - shield) * 16 + 3}`}
        opacity={0.35 + 0.65 * shield}
      />

      <motion.g
        animate={u ? { x: [0, -2.5, 2.5, -2.5, 0] } : { scale: [1, 1.03, 1] }}
        transition={{ duration: u ? 0.45 : 2.2, repeat: Infinity }}
        style={{ transformOrigin: '108px 110px' }}
      >
        <ellipse cx="86" cy="192" rx="14" ry="8" fill={pal[1]} stroke="#fff" strokeWidth="2" />
        <ellipse cx="130" cy="192" rx="14" ry="8" fill={pal[1]} stroke="#fff" strokeWidth="2" />
        <ellipse cx="34" cy="130" rx="10" ry="17" fill={pal[1]} stroke="#fff" strokeWidth="2" />
        <ellipse cx="186" cy="130" rx="10" ry="17" fill={pal[1]} stroke="#fff" strokeWidth="2" />

        <path d={body} fill={`url(#ulcer-st-${state})`} stroke="#fff" strokeWidth="3.5" />
        <path d="M58 112C61 96 72 90 85 86" stroke="#fff" strokeOpacity=".58" strokeWidth="6.5" strokeLinecap="round" fill="none" />

        {/* Các đốm xung huyết khi suy yếu */}
        {!n && [[66, 146], [150, 134], [126, 172], [142, 102]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4.5" fill="#EF4444" opacity=".75" />
        ))}

        {/* Ổ loét có băng cá nhân khi nguy cơ cao */}
        {u && (
          <g>
            <motion.circle cx="150" cy="108" r="15" fill="#B91C3C" opacity=".45" animate={{ r: [13, 21, 13] }} transition={{ duration: 0.9, repeat: Infinity }} />
            <circle cx="150" cy="108" r="9" fill="#7F1230" />
            <g transform="rotate(-28 150 108)">
              <rect x="133" y="102.5" width="34" height="11.5" rx="5.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
              <rect x="145" y="102.5" width="10" height="11.5" fill="#FEF3C7" />
            </g>
          </g>
        )}

        {/* Mắt & Biểu cảm */}
        {n && [94, 124].map((x) => (
          <g key={x}>
            <circle cx={x} cy="124" r="9" fill="#12343B" />
            <circle cx={x - 3} cy="120.5" r="3.4" fill="#fff" />
          </g>
        ))}
        {state === 'thin' && [94, 124].map((x) => (
          <g key={x}>
            <circle cx={x} cy="124" r="8.5" fill="#fff" stroke="#12343B" strokeWidth="1.5" />
            <circle cx={x + 1} cy="126.5" r="4.5" fill="#12343B" />
          </g>
        ))}
        {state === 'thin' && <path d="M84 109L102 116M134 109L116 116" stroke="#12343B" strokeWidth="2.8" strokeLinecap="round" />}
        {u && <path d="M86 117L100 124L86 131M132 117L118 124L132 131" stroke="#12343B" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />}

        {/* Miệng */}
        {n && <path d="M95 140Q109 160 123 140Z" fill="#7F1D1D" />}
        {state === 'thin' && <path d="M96 151Q102 145 108 151T120 151" stroke="#12343B" strokeWidth="3" fill="none" strokeLinecap="round" />}
        {u && <path d="M95 150Q109 134 123 150Q109 160 95 150Z" fill="#7F1D1D" />}
      </motion.g>

      {/* Hiệu ứng trực quan của từng thủ phạm đang bật quanh dạ dày */}
      {activeCauses.includes('cause-hp') && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1, y: [0, -5, 0] }} transition={{ y: { duration: 1.6, repeat: Infinity } }} transform="translate(148 -6)">
          <CauseSvg name="hpCause" size={54} />
        </motion.g>
      )}
      {activeCauses.includes('cause-nsaid') && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1, y: [0, 5, 0] }} transition={{ y: { duration: 1.8, repeat: Infinity } }} transform="translate(8 6)">
          <CauseSvg name="nsaidCause" size={48} />
        </motion.g>
      )}
      {activeCauses.includes('cause-habits') && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1, y: [0, -4, 0] }} transition={{ y: { duration: 2, repeat: Infinity } }} transform="translate(4 148)">
          <CauseSvg name="habitsCause" size={46} />
        </motion.g>
      )}
      {activeCauses.includes('cause-stress') && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1, y: [0, 4, 0] }} transition={{ y: { duration: 1.5, repeat: Infinity } }} transform="translate(160 148)">
          <CauseSvg name="stressCause" size={46} />
        </motion.g>
      )}
    </svg>
  );
}

function CauseCard({ item, active, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(item.id)}
      whileTap={{ scale: 0.98 }}
      className="relative text-left overflow-hidden p-4 rounded-[26px] border-2 transition-all duration-300"
      style={{
        background: active ? '#fff' : 'rgba(255,255,255,0.62)',
        borderColor: active ? item.color : '#fff',
        boxShadow: active ? `0 14px 28px ${item.color}30` : '0 2px 6px rgba(0,0,0,0.05)',
        opacity: active ? 1 : 0.72,
        transform: active ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-opacity pointer-events-none"
        style={{ background: item.color, opacity: active ? 0.24 : 0 }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <CauseSvg name={item.svg} size={42} />
            <div>
              <div className="font-heading font-extrabold text-[13.5px] text-[#12343B] leading-tight">{item.title}</div>
              <div className="text-[10.5px] font-extrabold mt-0.5" style={{ color: item.color }}>{item.badge}</div>
            </div>
          </div>

          {/* Công tắc bật/tắt */}
          <span
            className="w-11 h-6 rounded-full p-0.5 flex items-center transition-colors shrink-0"
            style={{ background: active ? item.color : '#CBD5E1', justifyContent: active ? 'flex-end' : 'flex-start' }}
          >
            <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-5 h-5 rounded-full bg-white shadow" />
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="font-heading font-black text-2xl md:text-3xl leading-none" style={{ color: item.color }}>
            {item.stat}
          </span>
          <span className="text-[11px] font-bold text-[#5B7B80]">{item.label}</span>
        </div>
        <p className="text-xs font-medium text-[#12343B] leading-relaxed mt-1.5">{item.desc}</p>
      </div>
    </motion.button>
  );
}

export function Slide5UlcerCauses() {
  const [activeCauses, setActiveCauses] = useState(['cause-hp', 'cause-nsaid']);

  const toggleCause = useCallback((id) => {
    playSfx();
    setActiveCauses((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((c) => c !== id) : prev;
      }
      return [...prev, id];
    });
  }, []);

  const protectionLevel = Math.max(20, 100 - activeCauses.length * 20);
  const status =
    protectionLevel > 60
      ? { color: '#14B8A6', text: 'Còn an toàn' }
      : protectionLevel > 40
      ? { color: '#F97316', text: 'Đang suy yếu' }
      : { color: '#EF4444', text: 'Nguy cơ loét cao!' };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-10 py-2.5 gap-2 select-none bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#F5F3FF] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5">
        <div>
          <span className="text-[11px] font-extrabold text-[#EA580C] tracking-widest uppercase">
            SLIDE 05 • CƠ CHẾ BỆNH SINH VIÊM LOÉT DẠ DÀY – TÁ TRÀNG
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B] leading-tight">
            4 Yếu Tố Tấn Công Phá Vỡ Hàng Rào Niêm Mạc
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-extrabold">
          <span className="px-3 py-1 rounded-full bg-[#8B5CF6] text-white shadow-sm">H. pylori</span>
          <span className="text-[#5B7B80]">+</span>
          <span className="px-3 py-1 rounded-full bg-[#EA580C] text-white shadow-sm">NSAID</span>
          <span className="text-[#5B7B80] hidden md:inline">= 2 thủ phạm hàng đầu gây ổ loét</span>
        </div>
      </div>

      {/* Stage */}
      <div className="grid grid-cols-12 gap-4 items-center flex-1 min-h-0">
        {/* Left 2 Causes */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          {CAUSES.slice(0, 2).map((c) => (
            <CauseCard key={c.id} item={c} active={activeCauses.includes(c.id)} onToggle={toggleCause} />
          ))}
        </div>

        {/* Center: Dạ dày + Vòng đo lá chắn niêm mạc */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-[285px] h-[285px] flex items-center justify-center">
            <motion.div
              className="absolute inset-4 rounded-full blur-3xl pointer-events-none"
              animate={{ backgroundColor: `${status.color}35` }}
              transition={{ duration: 0.5 }}
            />
            <svg viewBox="0 0 300 300" className="absolute inset-0 -rotate-90">
              <circle cx="150" cy="150" r={RING_R} fill="none" stroke="#E2E8F0" strokeWidth="13" />
              <motion.circle
                cx="150"
                cy="150"
                r={RING_R}
                fill="none"
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                animate={{ strokeDashoffset: RING_C * (1 - protectionLevel / 100), stroke: status.color }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </svg>

            <div className="relative z-10">
              <CenterStomachSvg
                state={protectionLevel <= 40 ? 'ulcer' : protectionLevel <= 60 ? 'thin' : 'normal'}
                protectionLevel={protectionLevel}
                activeCauses={activeCauses}
              />
            </div>
          </div>

          {/* Chỉ số lá chắn */}
          <div className="-mt-2 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={protectionLevel}
                  initial={{ scale: 1.2, opacity: 0.4 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-heading font-black text-4xl md:text-5xl leading-none"
                  style={{ color: status.color }}
                >
                  {protectionLevel}
                </motion.span>
              </AnimatePresence>
              <span className="text-xl font-extrabold" style={{ color: status.color }}>%</span>
            </div>
            <div className="text-xs font-extrabold text-[#12343B] mt-1">
              Lá chắn niêm mạc · <span style={{ color: status.color }}>{status.text}</span>
            </div>
            <div className="text-[10.5px] font-semibold text-[#5B7B80]">
              Bật/tắt các công tắc hai bên để mô phỏng mức độ tổn thương
            </div>
          </div>
        </div>

        {/* Right 2 Causes */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          {CAUSES.slice(2, 4).map((c) => (
            <CauseCard key={c.id} item={c} active={activeCauses.includes(c.id)} onToggle={toggleCause} />
          ))}
        </div>
      </div>

      {/* Fact Box */}
      <div className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-[#FFF2EB] to-[#FFE8DC] border border-[#FF8A5B]/35 flex items-center justify-between gap-3 text-xs flex-shrink-0">
        <div className="flex items-center gap-2.5 text-[#C2410C] font-bold">
          <CauseSvg name="bulb" size={20} />
          <span>
            <strong>Ghi nhớ y khoa:</strong> Đồ cay nóng và stress đơn thuần hiếm khi tự tạo ổ loét sâu, nhưng làm tăng tiết axit HCl và thúc đẩy ổ viêm H. pylori / NSAID nặng lên nhanh chóng.
          </span>
        </div>
        <span className="text-[10.5px] text-[#C2410C]/80 font-extrabold whitespace-nowrap hidden md:inline">
          NIDDK / Mayo Clinic
        </span>
      </div>
    </div>
  );
}

export default Slide5UlcerCauses;