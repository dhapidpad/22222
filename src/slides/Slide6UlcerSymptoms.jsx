import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide6UlcerSymptoms v4 — 100% Custom Multi-Layer SVG (Triệu Chứng Loét Dạ Dày – Tá Tràng, Chu Kỳ Đau & Dấu Hiệu Cờ Đỏ Cấp Cứu) */

const COMMON_SYMPTOMS = [
  {
    id: 'sym-epigastric',
    svg: 'burningPain',
    title: 'Đau nóng rát vùng thượng vị',
    desc: 'Đau âm ỉ hoặc cồn cào bỏng rát vùng trên rốn – dưới mũi ức, có tính chu kỳ rõ rệt theo bữa ăn và thời tiết.',
  },
  {
    id: 'sym-reflux',
    svg: 'sourReflux',
    title: 'Ợ hơi, ợ chua & nóng rát cổ',
    desc: 'Tăng tiết dịch vị axit HCl kèm rối loạn vận động dạ dày làm hơi và dịch chua trào ngược lên thực quản.',
  },
  {
    id: 'sym-bloat',
    svg: 'bloatNausea',
    title: 'Đầy chướng bụng, chậm tiêu, buồn nôn',
    desc: 'Phù nề quanh ổ loét làm dạ dày co bóp tống xuất thức ăn chậm, gây tức nặng sau ăn và buồn nôn.',
  },
  {
    id: 'sym-satiety',
    svg: 'earlyFull',
    title: 'Cảm giác mau no, chán ăn, mất ngủ',
    desc: 'Ăn một lượng nhỏ đã căng tức bụng; cơn đau về đêm gây thức giấc và mệt mỏi suy nhược kéo dài.',
  },
];

const RED_FLAGS = [
  {
    id: 'rf-vomit',
    svg: 'vomitBlood',
    title: 'Nôn ra máu tươi hoặc dịch bã cà phê',
    desc: 'Ổ loét ăn thủng mạch máu lớn dưới niêm mạc gây xuất huyết tiêu hóa trên ồ ạt.',
  },
  {
    id: 'rf-melena',
    svg: 'blackStool',
    title: 'Đi ngoài phân đen như nhựa đường',
    desc: 'Máu chảy từ dạ dày – tá tràng bị dịch tiêu hóa oxy hóa tạo phân đen bóng, sệt, mùi khẳm đặc trưng.',
  },
  {
    id: 'rf-perf',
    svg: 'knifePain',
    title: 'Đau bụng đột ngột dữ dội như dao đâm',
    desc: 'Bụng gồng cứng như gỗ, vã mồ hôi lạnh — dấu hiệu thủng ổ loét dạ dày – tá tràng vào ổ bụng.',
  },
  {
    id: 'rf-shock',
    svg: 'weightShock',
    title: 'Sút cân nhanh, thiếu máu, choáng ngất',
    desc: 'Cảnh báo mất máu cấp/mạn tính, hẹp môn vị hoặc biến chứng ác tính cần nội soi sinh thiết ngay.',
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
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.055);
    g.gain.setValueAtTime(0.04, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.start(now);
    osc.stop(now + 0.065);
  } catch { /* ignore */ }
}

/* ─── Hệ thống Minh họa Vector SVG 3D Cho Triệu Chứng & Cờ Đỏ Cấp Cứu (64x64) ─── */
function SymptomSvg({ name, size = 36 }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    /* 4 Triệu chứng thường gặp */
    case 'burningPain':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2.5" />
          <circle cx="32" cy="34" r="18" fill="#EF4444" fillOpacity=".2" />
          <path d="M33 12C35 21 26 26 28.5 33C30.5 30 34 28 35.5 24.5C42 31 46 37.5 46 44C46 51.5 39.5 55 32 55C24.5 55 18 49.5 18 42C18 32.5 25 24 33 12Z" fill="#F97316" stroke="#C2410C" strokeWidth="2.2" />
          <circle cx="32" cy="45" r="5.5" fill="#FEF08A" />
        </svg>
      );
    case 'sourReflux':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="2.5" />
          <path d="M24 47V18M24 18L17 25M24 18L31 25" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 43V15M40 15L34 21M40 15L46 21" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="52" r="2.8" fill="#EF4444" />
          <circle cx="40" cy="49" r="3.2" fill="#F97316" />
        </svg>
      );
    case 'bloatNausea':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="2.5" />
          <circle cx="26" cy="36" r="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.6" />
          <circle cx="40" cy="27" r="7.5" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.4" />
          <circle cx="38" cy="43" r="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
        </svg>
      );
    case 'earlyFull':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#F3E8FF" stroke="#D8B4FE" strokeWidth="2.5" />
          <path d="M14 34H50C50 45 42 52 32 52C22 52 14 45 14 34Z" fill="#9333EA" stroke="#581C87" strokeWidth="2.5" />
          <ellipse cx="32" cy="34" rx="18" ry="5" fill="#FDE68A" stroke="#581C87" strokeWidth="2.2" />
          <path d="M24 16L40 26M40 16L24 26" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    /* 4 Dấu hiệu Cờ Đỏ Cấp Cứu */
    case 'vomitBlood':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2.5" />
          <path d="M32 10C32 10 16 28 16 40C16 49 23.2 55 32 55C40.8 55 48 49 48 40C48 28 32 10 32 10Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.8" />
          <path d="M23 36C23 30 26.5 25 29.5 21" stroke="#FCA5A5" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="46" cy="18" r="5" fill="#881337" />
        </svg>
      );
    case 'blackStool':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.5" />
          <path d="M32 12C32 12 17 28 17 39C17 47.5 23.8 54 32 54C40.2 54 47 47.5 47 39C47 28 32 12 32 12Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2.8" />
          <path d="M24 36C24 30 27 25 30 22" stroke="#64748B" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="46" cy="46" r="8" fill="#EF4444" stroke="#fff" strokeWidth="2" />
          <path d="M46 42V47M46 50.5H46.1" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'knifePain':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FEE2E2" stroke="#F87171" strokeWidth="2.5" />
          {/* Tia chớp xuyên thủng thành dạ dày */}
          <path d="M36 8L16 34H31L26 56L48 28H33L36 8Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="32" cy="34" r="21" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="4 4" />
        </svg>
      );
    case 'weightShock':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="16" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2.5" />
          <path d="M12 33H21L26 19L35 47L40 33H52" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 43L52 51M52 43V51H44" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'ambulance':
      return (
        <svg {...p}>
          <rect x="6" y="18" width="36" height="28" rx="5" fill="#fff" />
          <path d="M42 25H52L58 35V46H42V25Z" fill="#E2E8F0" />
          <path d="M24 25V39M17 32H31" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
          <circle cx="18" cy="48" r="6" fill="#0F2E35" stroke="#fff" strokeWidth="2" />
          <circle cx="48" cy="48" r="6" fill="#0F2E35" stroke="#fff" strokeWidth="2" />
          <rect x="21" y="12" width="8" height="6" rx="2" fill="#EF4444" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="24" fill="#FFF7ED" stroke="#F97316" strokeWidth="4" />
          <path d="M32 18V32L42 38" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Sơ Đồ Giải Phẫu Phân Biệt Vị Trí & Chu Kỳ Đau: Loét Dạ Dày vs Loét Tá Tràng ─── */
function UlcerLocationCompareSvg({ activeTab }) {
  const isStomach = activeTab === 'stomach';
  const targetX = isStomach ? 156 : 94;
  const targetY = isStomach ? 108 : 138;
  const targetCol = isStomach ? '#F97316' : '#EAB308';

  return (
    <svg viewBox="0 0 260 205" className="w-full max-w-[240px] h-auto select-none overflow-visible">
      <defs>
        <linearGradient id="ulcStomG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="ulcDuoG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      {/* Đường viền lồng ngực & vùng thượng vị chuẩn giải phẫu */}
      <path
        d="M52 14 Q130 6 208 14 L224 188 Q130 196 36 188 Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      {/* Cung sườn hai bên & mũi ức */}
      <path d="M130 22 V48 M130 48 C102 58 72 82 54 112 M130 48 C158 58 188 82 206 112" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".55" />

      {/* Hành Tá Tràng (Duodenum C-Loop) */}
      <path
        d="M110 132 C84 130 74 148 80 168 C85 184 106 190 128 184"
        stroke="url(#ulcDuoG)"
        strokeWidth={isStomach ? 16 : 20}
        strokeLinecap="round"
        fill="none"
        opacity={isStomach ? 0.65 : 1}
      />

      {/* Dạ Dày (Stomach) */}
      <path
        d="M134 42 V64 C134 76 188 68 210 106 C232 144 204 186 152 188 C112 190 92 168 96 138 C98 118 116 112 128 102 C134 94 134 78 134 42 Z"
        fill="url(#ulcStomG)"
        stroke="#fff"
        strokeWidth="3"
        opacity={isStomach ? 1 : 0.65}
      />

      {/* Điểm Phát Sáng Ổ Loét Đang Chọn */}
      <motion.g
        animate={{ x: targetX, y: targetY }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.circle
          cx="0"
          cy="0"
          r="26"
          fill={targetCol}
          opacity=".28"
          animate={{ scale: [0.85, 1.45, 0.85], opacity: [0.45, 0.1, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <circle cx="0" cy="0" r="13" fill="#EF4444" stroke="#fff" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="5" fill="#FEF08A" />
      </motion.g>

      {/* Nhãn chú thích vị trí ổ loét */}
      <rect x="45" y="164" width="170" height="24" rx="12" fill="#12343B" />
      <text x="130" y="180" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">
        {isStomach ? 'VỊ TRÍ: BỜ CONG NHỎ & HANG VỊ' : 'VỊ TRÍ: HÀNH TÁ TRÀNG (ĐẦU RUỘT NON)'}
      </text>
    </svg>
  );
}

export function Slide6UlcerSymptoms() {
  const [activeTab, setActiveTab] = useState('stomach');

  const switchTab = useCallback((tab) => {
    playSfx();
    setActiveTab(tab);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-10 py-2.5 gap-2 select-none bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#FFF1F2] rounded-3xl overflow-hidden">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#F97316] tracking-widest uppercase">
            SLIDE 06 • TRIỆU CHỨNG LÂM SÀNG & DẤU HIỆU BÁO ĐỘNG
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B]">
            Nhận Diện Sớm Loét Dạ Dày – Tá Tràng
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-semibold max-w-md md:text-right">
          Phân biệt tính chất đau thượng vị theo bữa ăn và nhận biết 4 dấu hiệu Cờ Đỏ cần cấp cứu ngay.
        </p>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-12 gap-4 items-stretch flex-1 my-0.5 min-h-0">
        {/* Col 1 (4/12): 4 Triệu chứng thường gặp */}
        <div className="col-span-12 lg:col-span-4 p-4 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <SymptomSvg name="burningPain" size={38} />
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#12343B]">
                  Triệu chứng thường gặp
                </h3>
                <span className="text-[11px] font-semibold text-[#5B7B80]">4 biểu hiện lâm sàng điển hình</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {COMMON_SYMPTOMS.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-2xl bg-orange-50/50 hover:bg-orange-50 border border-orange-100 transition-colors flex items-start gap-2.5"
                >
                  <div className="shrink-0 mt-0.5">
                    <SymptomSvg name={item.svg} size={34} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#12343B]">{item.title}</div>
                    <p className="text-[11px] text-[#5B7B80] font-medium leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-2.5 rounded-2xl bg-[#FFF2EB] border border-[#FF8A5B]/30 text-[11px] text-[#C2410C] font-bold">
            Lưu ý: Khoảng 20% bệnh nhân loét dạ dày – tá tràng (nhất là người dùng NSAID) không có triệu chứng đau báo trước!
          </div>
        </div>

        {/* Col 2 (4/12): Phân biệt Loét Dạ Dày vs Loét Tá Tràng */}
        <div className="col-span-12 lg:col-span-4 p-4 rounded-[28px] bg-white/90 backdrop-blur-md border-2 border-white shadow-md flex flex-col items-center justify-between">
          {/* Switcher */}
          <div className="w-full flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => switchTab('stomach')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'stomach'
                  ? 'bg-gradient-to-r from-[#FF8A5B] to-[#EA580C] text-white shadow-sm'
                  : 'text-[#5B7B80] hover:text-[#12343B]'
              }`}
            >
              Loét Dạ Dày
            </button>
            <button
              onClick={() => switchTab('duodenum')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'duodenum'
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white shadow-sm'
                  : 'text-[#5B7B80] hover:text-[#12343B]'
              }`}
            >
              Loét Tá Tràng
            </button>
          </div>

          {/* Sơ đồ Giải phẫu Vùng Thượng Vị */}
          <div className="my-auto py-1">
            <UlcerLocationCompareSvg activeTab={activeTab} />
          </div>

          {/* Thẻ Chu kỳ đau theo bữa ăn */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="w-full p-3 rounded-2xl bg-orange-50/70 border border-orange-200 text-left"
            >
              <div className="text-xs font-extrabold text-[#C2410C] flex items-center gap-1.5 mb-1">
                <SymptomSvg name="clock" size={18} />
                <span>
                  {activeTab === 'stomach'
                    ? 'Chu kỳ đau: ĐAU TĂNG SAU KHI ĂN (30–60 phút)'
                    : 'Chu kỳ đau: ĐAU LÚC ĐÓI & BAN ĐÊM (2–3 giờ sau ăn)'}
                </span>
              </div>
              <p className="text-[11.5px] font-medium text-[#12343B] leading-relaxed">
                {activeTab === 'stomach'
                  ? 'Thức ăn vào dạ dày kích thích tiết axit HCl và co bóp cọ xát trực tiếp lên ổ loét ở bờ cong nhỏ / hang vị.'
                  : 'Khi dạ dày vơi thức ăn, dịch axit HCl chảy thẳng xuống hành tá tràng đang trống rỗng; ăn nhẹ sẽ dịu đau tạm thời.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Col 3 (4/12): Dấu hiệu Cờ Đỏ Cấp Cứu */}
        <div className="col-span-12 lg:col-span-4 p-4 rounded-[28px] bg-[#FFE9EC]/95 backdrop-blur-md border-2 border-[#EF4444]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <SymptomSvg name="knifePain" size={38} />
              <div>
                <h3 className="font-heading font-extrabold text-base text-[#DC2626]">
                  DẤU HIỆU CỜ ĐỎ CẤP CỨU
                </h3>
                <span className="text-[11px] font-bold text-rose-800">Biến chứng Xuất huyết · Thủng · Hẹp</span>
              </div>
            </div>

            <div className="space-y-2">
              {RED_FLAGS.map((rf) => (
                <div
                  key={rf.id}
                  className="p-2.5 rounded-2xl bg-white/95 border border-rose-200 flex items-start gap-2.5 shadow-sm"
                >
                  <div className="shrink-0 mt-0.5">
                    <SymptomSvg name={rf.svg} size={34} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#B91C1C]">{rf.title}</div>
                    <p className="text-[11px] text-[#12343B] font-medium leading-snug mt-0.5">{rf.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 p-2.5 px-3.5 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center gap-2.5 font-heading font-extrabold text-xs shadow-md">
            <SymptomSvg name="ambulance" size={24} />
            <span>GỌI CẤP CỨU 115 HOẶC ĐẾN BỆNH VIỆN NGAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide6UlcerSymptoms;