import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* Slide6AcuteGastritis v4 — 100% Custom Multi-Layer SVG (Chuyên Sâu Viêm Dạ Dày Cấp Tính — Bản Slide 6 Chuyển Tiếp Sang Slide 7) */

const CAUSES = [
  {
    id: 'c-nsaid',
    svg: 'pillNsaid',
    title: 'Lạm dụng thuốc giảm đau NSAID & Corticoid',
    badge: 'Thủ phạm #1',
    desc: 'Ibuprofen, Aspirin, Diclofenac ức chế COX-1 làm ngưng tổng hợp Prostaglandin bảo vệ, khiến axit bào mòn niêm mạc cấp tính.',
  },
  {
    id: 'c-alcohol',
    svg: 'alcoholGlass',
    title: 'Uống nhiều rượu bia & Đồ uống có cồn',
    badge: 'Xung huyết cấp',
    desc: 'Ethanol nồng độ cao phá vỡ lớp gel chất nhầy Mucin, gây giãn mạch, phù nề và xuất huyết dưới niêm mạc chỉ sau vài giờ.',
  },
  {
    id: 'c-food',
    svg: 'spicyFood',
    title: 'Thức ăn nhiễm khuẩn, ôi thiu hoặc quá cay nóng',
    badge: 'Kích ứng trực tiếp',
    desc: 'Độc tố vi khuẩn (Staphylococcus, Salmonella) hoặc gia vị cay chua lúc đói kích hoạt phản ứng viêm cấp dữ dội ở hang vị.',
  },
  {
    id: 'c-stress',
    svg: 'stressBolt',
    title: 'Stress cấp tính, thức khuya & nhịn ăn kéo dài',
    badge: 'Tăng tiết HCl',
    desc: 'Kích thích thần kinh phế vị (dây X) làm tăng tiết HCl + Pepsin đồng thời gây co mạch làm thiếu máu nuôi dưỡng niêm mạc.',
  },
];

const SYMPTOMS = [
  {
    id: 's-pain',
    svg: 'epigastricPain',
    title: 'Đau rát, quặn thắt đột ngột vùng thượng vị',
    tag: 'Điển hình nhất',
    desc: 'Đau dữ dội, nóng rát hoặc cồn cào vùng trên rốn ngay sau khi ăn uống chất kích thích hoặc khi bụng rỗng.',
    urgent: false,
  },
  {
    id: 's-nausea',
    svg: 'nauseaVomit',
    title: 'Buồn nôn & Nôn nhiều dịch chua',
    tag: 'Phản xạ bảo vệ',
    desc: 'Niêm mạc dạ dày sưng nề kích hoạt phản xạ nôn; nôn xong giảm đau tạm thời nhưng dễ gây mất nước và điện giải.',
    urgent: false,
  },
  {
    id: 's-bloat',
    svg: 'bloatingGas',
    title: 'Đầy bụng, ợ hơi, ợ chua, nóng cổ họng',
    tag: 'Chậm tiêu cấp',
    desc: 'Dạ dày viêm phù nề làm đình trệ nhu động co bóp, gây cảm giác chướng căng tức nặng và chán ăn.',
    urgent: false,
  },
  {
    id: 's-bleed',
    svg: 'acuteBleed',
    title: 'Biến chứng: Nôn ra máu / Phân đen',
    tag: 'CẤP CỨU NGAY',
    desc: 'Khi các vết trợt xuất huyết lan rộng ăn vào mao mạch niêm mạc gây chảy máu tiêu hóa cấp — phải nhập viện ngay!',
    urgent: true,
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
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.16);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(1350, now + 0.055);
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.065);
    }
  } catch { /* ignore */ }
}

function GastritisSvg({ name, size = 38, color = '#EA580C' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'pillNsaid':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFEDD5" stroke="#FB923C" strokeWidth="2.5" />
          <g transform="rotate(-32 32 32)">
            <rect x="12" y="22" width="40" height="20" rx="10" fill="#fff" stroke="#9A3412" strokeWidth="3" />
            <path d="M32 22H42A10 10 0 0 1 42 42H32V22Z" fill="#EA580C" />
            <path d="M18 27H28" stroke="#CBD5E1" strokeWidth="2.8" strokeLinecap="round" />
          </g>
          <circle cx="47" cy="47" r="8" fill="#EF4444" stroke="#fff" strokeWidth="2" />
          <path d="M44 47H50" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case 'alcoholGlass':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
          <path d="M18 14H46L41 34C39.5 40 35.5 43 32 43C28.5 43 24.5 40 23 34L18 14Z" fill="#FFFBEB" stroke="#92400E" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M20.5 24H43.5L41 33.5C39.8 38 36 41 32 41C28 41 24.2 38 23 33.5L20.5 24Z" fill="#F59E0B" />
          <path d="M32 43V53M23 53H41" stroke="#92400E" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="29" cy="30" r="2.2" fill="#FEF08A" />
          <circle cx="35" cy="34" r="1.8" fill="#FEF08A" />
        </svg>
      );
    case 'spicyFood':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEE2E2" stroke="#F87171" strokeWidth="2.5" />
          <path d="M44 15C47 11 51 10 54 12" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
          <path d="M46 18C50 27 44 42 30 50C20 55 12 53 9 49C16 47 24 41 29 33C34 26 38 19 46 18Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M40 24C37 31 31 38 23 43" stroke="#FCA5A5" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="20" cy="22" r="4" fill="#84CC16" stroke="#3F6212" strokeWidth="1.8" />
          <circle cx="29" cy="15" r="3" fill="#84CC16" stroke="#3F6212" strokeWidth="1.5" />
        </svg>
      );
    case 'stressBolt':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#F3E8FF" stroke="#C084FC" strokeWidth="2.5" />
          <path d="M35 10L17 34H31L27 54L47 29H33L35 10Z" fill="#9333EA" stroke="#581C87" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M12 20L18 24M52 20L46 24M12 44L18 40M52 44L46 40" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case 'epigastricPain':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2.5" />
          <path d="M27 11V18C27 22 45 22 49 35C53 48 41 56 28 55C17 54 12 46 14 37C15 30 21 28 24 24C27 21 27 16 27 11Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.8" />
          <circle cx="31" cy="37" r="11" fill="#EF4444" fillOpacity=".35" />
          <circle cx="31" cy="37" r="6" fill="#DC2626" />
          <path d="M12 22L18 27M52 22L46 27M52 46L45 42" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'nauseaVomit':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
          <path d="M32 32A5 5 0 1 1 37 27A10 10 0 1 1 27 17A15 15 0 1 1 17 32A19 19 0 0 0 45 45" stroke="#D97706" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="46" cy="18" r="3.5" fill="#10B981" />
          <circle cx="16" cy="46" r="3" fill="#F97316" />
        </svg>
      );
    case 'bloatingGas':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="25" cy="36" r="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.8" />
          <circle cx="40" cy="27" r="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="38" cy="43" r="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
          <path d="M12 32H17M47 32H52M32 11V16" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'acuteBleed':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.8" />
          <path d="M32 10C32 10 16 28 16 40C16 49 23.2 55 32 55C40.8 55 48 49 48 40C48 28 32 10 32 10Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.8" />
          <path d="M32 29V43M25 36H39" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
        </svg>
      );
    case 'siren':
      return (
        <svg {...p}>
          <path d="M18 46V30C18 22.3 24.3 16 32 16C39.7 16 46 22.3 46 30V46H18Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
          <rect x="12" y="46" width="40" height="8" rx="4" fill="#1E293B" />
          <path d="M32 5V11M11 15L16 19M53 15L48 19" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
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

/* ─── Mô Phỏng Mặt Cắt Viêm Cấp Tính & Thấm Ngược Axit H+ (SVG 260x220) ─── */
function AcuteInflammationStage({ mode }) {
  const inflamed = mode === 'inflamed';
  return (
    <svg viewBox="0 0 260 220" className="w-full max-w-[235px] h-auto select-none overflow-visible">
      <defs>
        <radialGradient id="s6EndoNormal" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFD5C8" />
          <stop offset="100%" stopColor="#FB7185" />
        </radialGradient>
        <radialGradient id="s6EndoAcute" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="55%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>

      <circle cx="130" cy="110" r="94" fill="#0F2E35" stroke="#CBD5E1" strokeWidth="5" />
      <circle cx="130" cy="110" r="82" fill={inflamed ? 'url(#s6EndoAcute)' : 'url(#s6EndoNormal)'} />

      <path d="M68 85 Q130 62 192 85" stroke={inflamed ? '#7F1D1D' : '#F43F5E'} strokeWidth={inflamed ? 10 : 6} strokeLinecap="round" fill="none" opacity=".55" />
      <path d="M62 118 Q130 95 198 118" stroke={inflamed ? '#7F1D1D' : '#F43F5E'} strokeWidth={inflamed ? 11 : 6} strokeLinecap="round" fill="none" opacity=".55" />
      <path d="M74 150 Q130 130 186 150" stroke={inflamed ? '#7F1D1D' : '#F43F5E'} strokeWidth={inflamed ? 9 : 6} strokeLinecap="round" fill="none" opacity=".55" />

      {inflamed ? (
        <g>
          {[
            [95, 88, 14],
            [158, 102, 18],
            [114, 136, 15],
            [162, 145, 11],
          ].map(([x, y, r], i) => (
            <motion.g key={i} animate={{ opacity: [0.65, 1, 0.65], scale: [0.95, 1.06, 0.95] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r={r} fill="#FEF08A" opacity=".35" />
              <circle cx={x} cy={y} r={r * 0.65} fill="#7F1D1D" />
              <circle cx={x - 2} cy={y - 2} r="2.5" fill="#EF4444" />
            </motion.g>
          ))}
          <rect x="52" y="168" width="156" height="22" rx="11" fill="#7F1D1D" />
          <text x="130" y="183" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FEF08A">
            XUNG HUYẾT · PHÙ NỀ · TRỢT CẤP
          </text>
        </g>
      ) : (
        <g>
          <path d="M75 70 C95 55 125 50 155 58" stroke="#fff" strokeOpacity=".65" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="58" y="168" width="144" height="22" rx="11" fill="#0F766E" />
          <text x="130" y="183" textAnchor="middle" fontSize="10" fontWeight="900" fill="#CCFBF1">
            NIÊM MẠC HỒNG NHẴN · BẢO VỆ TỐT
          </text>
        </g>
      )}

      <path d="M130 22V32M130 188V198M42 110H52M208 110H218" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Slide6AcuteGastritis({ onSelectSlide = () => {} }) {
  const [endoMode, setEndoMode] = useState('inflamed');
  const [selectedCause, setSelectedCause] = useState(0);

  const toggleEndo = useCallback((m) => {
    playSfx('tick');
    setEndoMode(m);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#FFF1F2] rounded-3xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#EA580C] tracking-widest uppercase">
            SLIDE 06 • BỆNH LÝ TRỌNG TÂM 1
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            Viêm Dạ Dày Cấp Tính: Nguyên Nhân & Triệu Chứng
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 border border-white shadow-sm">
          <span className="text-[10.5px] font-extrabold text-[#5B7B80] pl-2 pr-1">Soi niêm mạc:</span>
          <button
            onClick={() => toggleEndo('inflamed')}
            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
              endoMode === 'inflamed'
                ? 'bg-gradient-to-r from-[#EA580C] to-[#DC2626] text-white shadow-sm'
                : 'bg-slate-100 text-[#5B7B80] hover:bg-slate-200'
            }`}
          >
            Đang viêm cấp
          </button>
          <button
            onClick={() => toggleEndo('normal')}
            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
              endoMode === 'normal'
                ? 'bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white shadow-sm'
                : 'bg-slate-100 text-[#5B7B80] hover:bg-slate-200'
            }`}
          >
            Niêm mạc lành
          </button>
        </div>
      </div>

      {/* Main Content: 3 Cột Cân Đối */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 my-0.5 min-h-0">
        {/* Cột 1 (4 Cols): NGUYÊN NHÂN */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <GastritisSvg name="pillNsaid" size={36} />
              <div>
                <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B]">
                  ① CÁC NGUYÊN NHÂN HÀNG ĐẦU
                </h3>
                <span className="text-[11px] font-semibold text-[#5B7B80]">Yếu tố kích hoạt cơn viêm cấp tính</span>
              </div>
            </div>

            <div className="space-y-2">
              {CAUSES.map((c, idx) => {
                const on = selectedCause === idx;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      playSfx('tick');
                      setSelectedCause(idx);
                      setEndoMode('inflamed');
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      on
                        ? 'bg-orange-50/90 border-orange-300 shadow-sm'
                        : 'bg-white/80 hover:bg-orange-50/40 border-orange-100'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <GastritisSvg name={c.svg} size={34} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-[#C2410C] leading-snug">{c.title}</span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-200/70 text-orange-900 shrink-0">
                          {c.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5B7B80] font-medium leading-snug mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-2 p-2.5 rounded-2xl bg-orange-100/70 border border-orange-200 text-[11px] text-[#9A3412] font-bold">
            Khuyến cáo: Tuyệt đối không tự ý uống thêm thuốc giảm đau khi đang bị đau bụng cấp!
          </div>
        </div>

        {/* Cột 2 (4 Cols): GÓC NHÌN NỘI SOI */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <span className="text-[10px] font-black px-3 py-1 rounded-full bg-rose-100 text-rose-700 uppercase tracking-wider">
              Góc nhìn Nội soi Dạ dày
            </span>
            <h4 className="font-heading font-extrabold text-sm md:text-base text-[#12343B] mt-1.5">
              {endoMode === 'inflamed' ? 'Niêm mạc Sưng phù & Xung huyết' : 'Niêm mạc Dạ dày Khỏe mạnh'}
            </h4>
          </div>

          <div className="my-auto py-1">
            <AcuteInflammationStage mode={endoMode} />
          </div>

          <div className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1">
            <div className="text-[10.5px] font-black text-[#12343B] uppercase tracking-wider">
              Cơ chế tổn thương nhanh:
            </div>
            <div className="text-[11px] font-semibold text-[#5B7B80] leading-snug">
              <span className="text-[#EA580C] font-extrabold">Mất lớp nhầy</span> →{' '}
              <span className="text-[#DC2626] font-extrabold">HCl ngấm ngược</span> →{' '}
              <span className="text-[#BE123C] font-extrabold">Phù nề, trợt nông & xuất huyết</span>
            </div>
          </div>
        </div>

        {/* Cột 3 (4 Cols): TRIỆU CHỨNG LÂM SÀNG */}
        <div className="col-span-12 lg:col-span-4 p-3.5 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <GastritisSvg name="epigastricPain" size={36} />
                <div>
                  <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B]">
                    ② TRIỆU CHỨNG LÂM SÀNG
                  </h3>
                  <span className="text-[11px] font-semibold text-[#5B7B80]">Dấu hiệu nhận biết sớm</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                Đột ngột • Rát bỏng
              </span>
            </div>

            <div className="space-y-2">
              {SYMPTOMS.map((s) => (
                <div
                  key={s.id}
                  className={`p-2.5 rounded-2xl border flex items-start gap-2.5 transition-colors ${
                    s.urgent
                      ? 'bg-rose-50/90 border-rose-300 shadow-sm'
                      : 'bg-white/85 border-slate-100 hover:bg-white'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    <GastritisSvg name={s.svg} size={34} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-extrabold leading-snug ${s.urgent ? 'text-rose-700' : 'text-[#12343B]'}`}>
                        {s.title}
                      </span>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                          s.urgent ? 'bg-rose-600 text-white' : 'bg-slate-100 text-[#5B7B80]'
                        }`}
                      >
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
            className="mt-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#FF8A5B] to-[#FF7043] text-white text-xs font-extrabold shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition"
          >
            <span>Tìm hiểu tiếp: Bệnh Trào ngược thực quản (Slide 7)</span>
            <GastritisSvg name="arrowRight" size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* Bottom Red Flag Warning */}
      <div className="w-full p-2.5 px-4 rounded-2xl bg-rose-50/95 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-rose-900 font-semibold shadow-sm">
        <div className="flex items-center gap-2.5">
          <GastritisSvg name="siren" size={22} />
          <span>
            <strong>Dấu hiệu cấp cứu ngay:</strong> Nôn ra máu đỏ tươi hoặc dịch bã cà phê, đi ngoài phân đen sệt hôi tanh — lập tức đến bệnh viện!
          </span>
        </div>
        <span className="text-[11px] font-bold text-rose-700 whitespace-nowrap opacity-85">
          NIDDK / Mayo Clinic
        </span>
      </div>
    </div>
  );
}

export default Slide6AcuteGastritis;