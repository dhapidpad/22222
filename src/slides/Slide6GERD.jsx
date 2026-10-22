import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide6GERD v4 — 100% Custom Multi-Layer SVG (Trọng Tâm 2: Trào Ngược Dạ Dày – Thực Quản GERD & Mô Phỏng Van Tâm Vị LES 3D) */

const CAUSES = [
  {
    id: 'gerd-les',
    svg: 'lesValve',
    title: 'Suy yếu cơ thắt thực quản dưới (LES)',
    badge: 'Cơ chế cốt lõi',
    desc: 'Van cơ vòng một chiều ở tâm vị bị giãn thoáng qua bất thường (TLESR) hoặc mất trương lực, tạo khe hở cho dịch vị trào lên.',
  },
  {
    id: 'gerd-late',
    svg: 'lateMeal',
    title: 'Ăn quá no, ăn khuya & nằm ngay sau ăn',
    badge: 'Thói quen #1',
    desc: 'Dạ dày căng phồng dịch axit cộng với tư thế nằm ngang khiến trọng lực không còn giữ được dịch vị ở bên dưới.',
  },
  {
    id: 'gerd-pressure',
    svg: 'abdoPressure',
    title: 'Tăng áp lực ổ bụng (Thừa cân, mặc đồ bó sát)',
    badge: 'Ép cơ học',
    desc: 'Mỡ nội tạng hoặc áp lực cơ học trong ổ bụng ép mạnh vào thân dạ dày, đẩy túi axit vượt qua van tâm vị.',
  },
  {
    id: 'gerd-food',
    svg: 'triggerDrink',
    title: 'Cà phê, rượu bia, nước có gas & đồ nhiều dầu mỡ',
    badge: 'Giãn cơ vòng',
    desc: 'Caffeine và cồn làm giãn trực tiếp cơ vòng LES; chất béo làm chậm quá trình tống xuất thức ăn khỏi dạ dày.',
  },
];

const SYMPTOMS = [
  {
    id: 'sym-heartburn',
    svg: 'heartburnChest',
    title: 'Ợ nóng (Heartburn) bỏng rát sau xương ức',
    tag: 'Điển hình nhất',
    desc: 'Cảm giác luồng nóng rát lan từ vùng thượng vị dọc sau xương ức lên cổ họng, nặng hơn khi cúi gập người hoặc nằm đêm.',
    highlight: true,
  },
  {
    id: 'sym-regurg',
    svg: 'acidRegurg',
    title: 'Ợ chua, ợ hơi & Trớ dịch chua đắng lên họng',
    tag: 'Trào dịch vị',
    desc: 'Dịch axit HCl và Pepsin dâng ngược lên khoang miệng gây vị chua gắt hoặc đắng miệng, làm mòn men răng.',
    highlight: false,
  },
  {
    id: 'sym-dysphagia',
    svg: 'throatSwallow',
    title: 'Khó nuốt, nuốt vướng & Đau tức ngực không do tim',
    tag: 'Co thắt thực quản',
    desc: 'Niêm mạc thực quản phù nề và co thắt phản xạ gây đau thắt ngực dễ nhầm bệnh mạch vành, cảm giác nghẹn ở cổ.',
    highlight: false,
  },
  {
    id: 'sym-cough',
    svg: 'larynxCough',
    title: 'Ho khan mạn tính, khàn giọng, viêm thanh quản',
    tag: 'Ngoài thực quản',
    desc: 'Axit vi trào ngược ban đêm kích ứng dây thanh âm và phế quản gây ho kéo dài, khàn tiếng vào buổi sáng.',
    highlight: false,
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
    if (kind === 'pop') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.18);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (kind === 'whoosh') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
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

/* ─── Hệ thống Minh họa Vector SVG 3D Cho Bệnh GERD (64x64) ─── */
function GerdSvg({ name, size = 38, color = '#0284C7' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'lesValve':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          {/* Ống thực quản & cơ vòng LES bị hở */}
          <path d="M22 10V28C22 33 16 37 16 44V54M42 10V28C42 33 48 37 48 44V54" stroke="#0284C7" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="22" cy="28" r="5" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <circle cx="42" cy="28" r="5" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <path d="M32 48V16M25 23L32 15L39 23" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'lateMeal':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2.5" />
          {/* Mặt trăng khuya + Bát ăn đêm */}
          <path d="M42 12A11 11 0 1 0 52 26A9 9 0 1 1 42 12Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <path d="M12 36H44C44 46 37 52 28 52C19 52 12 46 12 36Z" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2.5" />
          <ellipse cx="28" cy="36" rx="16" ry="4.5" fill="#FDE68A" stroke="#4C1D95" strokeWidth="2" />
        </svg>
      );
    case 'abdoPressure':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
          {/* Dạ dày bị mũi tên hai bên ép chặt đẩy axit lên */}
          <path d="M29 14V21C29 24 44 24 47 35C50 45 40 53 30 52C21 51 17 45 18 37C19 32 25 30 27 26C29 23 29 19 29 14Z" fill="#FDBA74" stroke="#C2410C" strokeWidth="2.8" />
          <path d="M8 36H17M13 31L18 36L13 41M56 36H47M51 31L46 36L51 41" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'triggerDrink':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFEDD5" stroke="#FB923C" strokeWidth="2.5" />
          {/* Cốc cà phê & bọt gas */}
          <path d="M16 22H42V38C42 46 36 52 29 52C22 52 16 46 16 38V22Z" fill="#7C2D12" stroke="#431407" strokeWidth="2.8" />
          <path d="M42 26H47A5 5 0 0 1 47 36H42" stroke="#7C2D12" strokeWidth="3.5" />
          <circle cx="24" cy="14" r="3" fill="#F97316" />
          <circle cx="33" cy="11" r="3.5" fill="#EF4444" />
          <circle cx="38" cy="16" r="2.5" fill="#FBBF24" />
        </svg>
      );

    /* 4 Triệu chứng */
    case 'heartburnChest':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Lồng ngực & ngọn lửa sau xương ức */}
          <path d="M18 14C24 11 40 11 46 14L50 52H14L18 14Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.5" />
          <path d="M33 17C35 25 27 29 29 35C31 32 34 30 35 27C41 33 45 39 45 45C45 51 39 54 32 54C25 54 19 49 19 43C19 35 26 27 33 17Z" fill="#EF4444" />
          <circle cx="32" cy="46" r="5" fill="#FDE047" />
        </svg>
      );
    case 'acidRegurg':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFEDD5" stroke="#FB923C" strokeWidth="2.5" />
          <path d="M23 48V18M23 18L16 25M23 18L30 25" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M41 44V15M41 15L35 21M41 15L47 21" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23" cy="53" r="3" fill="#EF4444" />
          <circle cx="41" cy="50" r="3.5" fill="#F97316" />
        </svg>
      );
    case 'throatSwallow':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="2.5" />
          {/* Ống thực quản co thắt nghẹn */}
          <path d="M21 10 C21 24 27 28 27 32 C27 36 21 40 21 54" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M43 10 C43 24 37 28 37 32 C37 36 43 40 43 54" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="24" r="5.5" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M12 32H20M44 32H52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'larynxCough':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="2.5" />
          {/* Thanh quản & sóng âm ho khan */}
          <path d="M24 14V36C24 43 20 48 16 52M34 14V36C34 43 38 48 42 52" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="29" cy="28" r="6" fill="#EF4444" fillOpacity=".35" />
          <path d="M42 20C46 23 46 29 42 32M48 15C54 21 54 31 48 37" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'warn':
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
    default:
      return null;
  }
}

/* ─── Sơ Đồ Mô Phỏng Giải Phẫu Van Tâm Vị (LES) & Trào Ngược Axit 3D (SVG 280x270) ─── */
function GerdAnatomySimulator({ refluxActive }) {
  return (
    <svg viewBox="0 0 280 265" className="w-full max-w-[260px] h-auto select-none overflow-visible">
      <defs>
        <linearGradient id="gerdStomWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="gerdAcidPool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* Cơ hoành (Diaphragm) ngăn cách ngực và ổ bụng */}
      <path d="M18 108 Q85 88 134 106 M162 106 Q210 88 262 108" stroke="#0D9488" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".65" />
      <text x="24" y="92" fontSize="9.5" fontWeight="900" fill="#0F766E">CƠ HOÀNH</text>

      {/* Ống Thực Quản (Esophagus) */}
      <path
        d="M132 14 V108 M160 14 V108"
        stroke={refluxActive ? '#EF4444' : '#0284C7'}
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect
        x="136"
        y="14"
        width="20"
        height="94"
        fill={refluxActive ? '#FEE2E2' : '#E0F2FE'}
      />

      {/* Thân Dạ Dày & Hồ Axit HCl */}
      <path
        d="M132 106 C132 122 214 106 244 156 C272 204 236 254 166 256 C104 258 64 228 68 184 C70 152 96 142 118 128 C132 118 132 112 132 106 Z"
        fill="url(#gerdStomWall)"
        stroke="#9F1239"
        strokeWidth="3.5"
      />
      <path
        d="M74 192 Q130 182 186 192 T248 192 C240 236 204 254 164 254 C108 254 70 226 74 192 Z"
        fill="url(#gerdAcidPool)"
      />
      <text x="164" y="232" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">
        DỊCH VỊ AXIT HCl (pH 1.5–2.0)
      </text>

      {/* Van Cơ Thắt Thực Quản Dưới (LES Sphincter) */}
      <motion.g
        animate={{ x: refluxActive ? -7 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <ellipse cx="133" cy="106" rx="9" ry="7" fill="#B91C1C" stroke="#fff" strokeWidth="2" />
      </motion.g>
      <motion.g
        animate={{ x: refluxActive ? 7 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <ellipse cx="159" cy="106" rx="9" ry="7" fill="#B91C1C" stroke="#fff" strokeWidth="2" />
      </motion.g>

      {/* Luồng Axit Trào Ngược Lên Thực Quản Khi Van LES Mở */}
      {refluxActive ? (
        <g>
          <motion.path
            d="M146 190 V24"
            stroke="#F97316"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={146 + (i % 2 ? 4 : -4)}
              r="5.5"
              fill={i % 2 ? '#FEF08A' : '#EF4444'}
              animate={{ cy: [180, 22], opacity: [1, 0] }}
              transition={{ duration: 1.05, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
          {/* Vòng cảnh báo bỏng rát thực quản */}
          <motion.circle
            cx="146"
            cy="56"
            r="24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeDasharray="5 4"
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          <rect x="172" y="38" width="98" height="34" rx="10" fill="#DC2626" />
          <text x="221" y="53" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#FEF08A">
            VAN LES HỞ!
          </text>
          <text x="221" y="66" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff">
            Axit bỏng thực quản
          </text>
        </g>
      ) : (
        <g>
          <path d="M146 98 L146 114" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <rect x="172" y="88" width="98" height="32" rx="10" fill="#0F766E" />
          <text x="221" y="102" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#CCFBF1">
            VAN LES ĐÓNG KÍN
          </text>
          <text x="221" y="114" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff">
            Chặn axit một chiều
          </text>
        </g>
      )}
    </svg>
  );
}

export function Slide6GERD({ onSelectSlide = () => {} }) {
  const [refluxActive, setRefluxActive] = useState(true);

  const toggleReflux = useCallback((val) => {
    playSfx('pop');
    setRefluxActive(val);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#FFFBEB] rounded-3xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#0284C7] tracking-widest uppercase">
            SLIDE 06 • BỆNH LÝ TRỌNG TÂM 2
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            Trào Ngược Dạ Dày – Thực Quản (GERD)
          </h2>
        </div>

        {/* Công tắc Mô phỏng Van Tâm Vị LES */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 border border-white shadow-sm">
          <span className="text-[10.5px] font-extrabold text-[#5B7B80] pl-2 pr-1">Mô phỏng Van LES:</span>
          <button
            onClick={() => toggleReflux(true)}
            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
              refluxActive
                ? 'bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white shadow-sm'
                : 'bg-slate-100 text-[#5B7B80] hover:bg-slate-200'
            }`}
          >
            Đang trào ngược (GERD)
          </button>
          <button
            onClick={() => toggleReflux(false)}
            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
              !refluxActive
                ? 'bg-gradient-to-r from-[#14B8A6] to-[#0284C7] text-white shadow-sm'
                : 'bg-slate-100 text-[#5B7B80] hover:bg-slate-200'
            }`}
          >
            Van đóng kín (Khỏe)
          </button>
        </div>
      </div>

      {/* Main Content: 3 Cột (Nguyên nhân 4/12 • Mô phỏng Van LES 4/12 • Triệu chứng 4/12) */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 my-0.5 min-h-0">
        {/* Cột 1 (4 Cols): NGUYÊN NHÂN & CƠ CHẾ */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <GerdSvg name="lesValve" size={36} />
              <div>
                <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B]">
                  ① NGUYÊN NHÂN & CƠ CHẾ
                </h3>
                <span className="text-[11px] font-semibold text-[#5B7B80]">Tại sao van tâm vị (LES) bị hở?</span>
              </div>
            </div>

            <div className="space-y-2">
              {CAUSES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => toggleReflux(true)}
                  className="p-2.5 rounded-2xl bg-sky-50/55 hover:bg-sky-50 border border-sky-100 transition-colors cursor-pointer flex items-start gap-2.5"
                >
                  <div className="shrink-0 mt-0.5">
                    <GerdSvg name={c.svg} size={34} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold text-[#0369A1] leading-snug">{c.title}</span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-sky-200/70 text-sky-900 shrink-0">
                        {c.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5B7B80] font-medium leading-snug mt-0.5">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-2.5 rounded-2xl bg-sky-100/70 border border-sky-200 text-[11px] text-[#0369A1] font-bold">
            Khác với dạ dày, thực quản KHÔNG có lớp chất nhầy dày & HCO₃⁻ nên rất dễ bỏng axit!
          </div>
        </div>

        {/* Cột 2 (4 Cols): SÂN KHẤU MÔ PHỎNG VAN TÂM VỊ LES 3D */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-sky-100 text-sky-700 uppercase tracking-wider">
              Cơ chế Van Một Chiều Tâm Vị (LES)
            </span>
            <h4 className="font-heading font-extrabold text-sm md:text-base text-[#12343B] mt-1">
              {refluxActive ? 'Van LES Giãn Hở → Dịch Axit Trào Lên' : 'Van LES Đóng Chặt → Ngăn Trào Ngược'}
            </h4>
          </div>

          <div className="my-auto py-0.5">
            <GerdAnatomySimulator refluxActive={refluxActive} />
          </div>

          <div className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
            <div className="text-[10px] font-black text-[#12343B] uppercase tracking-wider">
              Tiến triển nếu không điều trị:
            </div>
            <div className="text-[11px] font-semibold text-[#5B7B80] mt-0.5 leading-snug">
              <span className="text-[#0284C7] font-extrabold">Viêm thực quản</span> →{' '}
              <span className="text-[#EA580C] font-extrabold">Loét & Hẹp thực quản</span> →{' '}
              <span className="text-[#DC2626] font-extrabold">Barrett thực quản</span>
            </div>
          </div>
        </div>

        {/* Cột 3 (4 Cols): TRIỆU CHỨNG ĐIỂN HÌNH */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <GerdSvg name="heartburnChest" size={36} />
                <div>
                  <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B]">
                    ② TRIỆU CHỨNG ĐIỂN HÌNH
                  </h3>
                  <span className="text-[11px] font-semibold text-[#5B7B80]">Tại thực quản & ngoài thực quản</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Ợ nóng • Ợ chua
              </span>
            </div>

            <div className="space-y-2">
              {SYMPTOMS.map((s) => (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-2xl border flex items-start gap-2.5 transition-colors ${
                    s.highlight
                      ? 'bg-amber-50/85 border-amber-200 shadow-sm'
                      : 'bg-white/85 border-slate-100 hover:bg-white'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    <GerdSvg name={s.svg} size={34} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-extrabold leading-snug ${s.highlight ? 'text-amber-900' : 'text-[#12343B]'}`}>
                        {s.title}
                      </span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-[#5B7B80] shrink-0">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5B7B80] font-medium leading-snug mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              playSfx('whoosh');
              onSelectSlide(7);
            }}
            className="mt-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] text-white text-xs font-extrabold shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition"
          >
            <span>Tìm hiểu tiếp: Giải pháp phòng tránh toàn diện (Slide 7)</span>
            <GerdSvg name="arrowRight" size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* Bottom Medical Warning */}
      <div className="w-full p-2.5 px-4 rounded-2xl bg-amber-50/95 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900 font-semibold shadow-sm">
        <div className="flex items-center gap-2.5">
          <GerdSvg name="warn" size={20} />
          <span>
            <strong>Cảnh báo biến chứng mạn tính:</strong> Trào ngược kéo dài gây viêm loét – chít hẹp thực quản và hội chứng <strong>Barrett thực quản</strong> (dị sản biểu mô tiền ung thư) — cần khám và điều trị sớm!
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-800 whitespace-nowrap opacity-85">
          Cleveland Clinic / ACG Guidelines
        </span>
      </div>
    </div>
  );
}

export default Slide6GERD;