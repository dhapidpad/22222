import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide4StomachDiseases v4 — 100% Minh họa Giải phẫu Bệnh lý Vector SVG Đa Lớp (6 Bệnh Lý Dạ Dày Điển Hình) */

const DISEASES = [
  {
    id: 'dis-acute',
    name: 'Viêm dạ dày cấp tính',
    severity: 'Phổ biến #1 • Khởi phát nhanh',
    color: '#F97316',
    focus: true,
    stat: '60–70%',
    statLabel: 'Ca đau thượng vị cấp',
    mechanism: 'Bào mòn lớp nhầy bảo vệ đột ngột do NSAID, rượu bia, đồ cay nóng hoặc stress cấp.',
    desc: 'Niêm mạc dạ dày xung huyết, phù nề và trợt nông. Gây đau rát thượng vị dữ dội, buồn nôn, đầy chướng ngay sau ăn hoặc khi đói.',
    slideTarget: 5,
    cta: 'Đi sâu Viêm dạ dày cấp (Slide 5)',
  },
  {
    id: 'dis-gerd',
    name: 'Trào ngược dạ dày – thực quản (GERD)',
    severity: 'Phổ biến #2 • Mạn tính dễ tái phát',
    color: '#0EA5E9',
    focus: true,
    stat: '15–20%',
    statLabel: 'Dân số trưởng thành',
    mechanism: 'Suy yếu cơ thắt thực quản dưới (LES) kèm tăng áp lực ổ bụng khiến dịch vị axit trào ngược.',
    desc: 'Axit HCl và Pepsin vượt qua tâm vị trào lên thực quản gây ợ nóng sau xương ức, ợ chua, đắng miệng, ho khan và viêm thực quản.',
    slideTarget: 6,
    cta: 'Đi sâu Trào ngược GERD (Slide 6)',
  },
  {
    id: 'dis-ulcer',
    name: 'Loét dạ dày – tá tràng',
    severity: 'Tổn thương sâu qua lớp cơ niêm',
    color: '#EF4444',
    focus: false,
    stat: '10–12%',
    statLabel: 'Nguy cơ suốt đời',
    mechanism: 'Mất cân bằng nghiêm trọng giữa yếu tố tấn công (Axit, Pepsin) và hàng rào bảo vệ niêm mạc.',
    desc: 'Hình thành ổ loét lõm sâu xuyên qua lớp niêm mạc xuống lớp dưới niêm, gây đau chu kỳ theo bữa ăn và nguy cơ thủng hoặc chảy máu.',
  },
  {
    id: 'dis-hp',
    name: 'Nhiễm khuẩn Helicobacter pylori',
    severity: 'Tác nhân vi sinh hàng đầu',
    color: '#8B5CF6',
    focus: false,
    stat: '70–80%',
    statLabel: 'Tỷ lệ nhiễm tại VN',
    mechanism: 'Xoắn khuẩn tiết enzym Urease trung hòa axit quanh mình, chui sâu dưới lớp nhầy tiết độc tố CagA/VacA.',
    desc: 'Nguyên nhân của hơn 80% ca loét dạ dày – tá tràng và được WHO xếp vào nhóm nguy cơ hàng đầu gây ung thư dạ dày nếu không tiệt trừ.',
  },
  {
    id: 'dis-bleed',
    name: 'Xuất huyết tiêu hóa trên',
    severity: 'Cấp cứu nội – ngoại khoa',
    color: '#DC2626',
    focus: false,
    stat: '5–10%',
    statLabel: 'Tỷ lệ tử vong nếu sốc',
    mechanism: 'Ổ loét ăn thủng mạch máu dưới niêm mạc gây chảy máu ồ ạt vào lòng dạ dày.',
    desc: 'Biểu hiện nôn ra máu đỏ tươi hoặc máu cục nâu đen, đi ngoài phân đen như bã cà phê, hoa mắt chóng mặt, tụt huyết áp cấp tính.',
  },
  {
    id: 'dis-cancer',
    name: 'Ung thư dạ dày (Gastric Cancer)',
    severity: 'Bệnh lý ác tính nguy hiểm',
    color: '#475569',
    focus: false,
    stat: 'Top 5',
    statLabel: 'Ung thư thường gặp',
    mechanism: 'Chuỗi tiến triển Correa: Viêm mạn tính → Teo niêm mạc → Dị sản ruột → Loạn sản → Ung thư biểu mô.',
    desc: 'Giai đoạn sớm triệu chứng rất mơ hồ giống viêm dạ dày thông thường; nội soi tầm soát định kỳ giúp phát hiện sớm và điều trị khỏi.',
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
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.16);
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

/* ─── Minh họa Giải Phẫu Bệnh Lý Vector SVG Đa Lớp (72x72) ─── */
function DiseaseIllustration({ id, size = 64 }) {
  const p = { width: size, height: size, viewBox: '0 0 72 72', fill: 'none', 'aria-hidden': true };
  switch (id) {
    /* 1. Viêm dạ dày cấp tính: Dạ dày xung huyết đỏ rực + Ngọn lửa viêm cấp */
    case 'dis-acute':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2.5" />
          <path d="M30 11V19C30 23 50 23 54 37C58 51 45 61 31 60C19 59 13 50 15 39C16 32 23 29 27 25C30 22 30 17 30 11Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="3" />
          {/* Các đám xung huyết đỏ rực niêm mạc */}
          <circle cx="36" cy="40" r="11" fill="#EF4444" fillOpacity=".35" />
          <circle cx="36" cy="40" r="6" fill="#EF4444" />
          <circle cx="24" cy="46" r="4.5" fill="#F97316" />
          {/* Ngọn lửa đau rát cấp tính */}
          <path d="M48 12C50 19 43 23 45 28C47 25 50 24 51 21C56 26 59 31 59 37C59 42.5 54 46 48 46C42 46 37 41.5 37 36C37 28 42 21 48 12Z" fill="#EF4444" stroke="#fff" strokeWidth="2" />
          <circle cx="48" cy="39" r="3.5" fill="#FEF08A" />
        </svg>
      );

    /* 2. Trào ngược GERD: Luồng axit dâng ngược qua cơ thắt tâm vị lên thực quản */
    case 'dis-gerd':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2.5" />
          {/* Ống thực quản & dạ dày */}
          <path d="M27 8V29M37 8V29" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <path d="M27 28C27 32 52 30 56 44C59 55 46 63 32 62C19 61 13 53 16 43C18 36 27 34 27 28Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
          {/* Dịch axit vàng cam trào ngược lên thực quản */}
          <path d="M18 48 Q28 44 38 48 T54 48 C52 57 42 61 32 61 C22 61 16 55 18 48 Z" fill="#F97316" />
          <path d="M32 45V13M25 20L32 12L39 20" stroke="#EF4444" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="34" r="3" fill="#FDE047" />
          <circle cx="29" cy="25" r="2.2" fill="#F97316" />
        </svg>
      );

    /* 3. Loét dạ dày – tá tràng: Ổ loét khoét sâu qua lớp niêm mạc & tia axit ăn mòn */
    case 'dis-ulcer':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2.5" />
          {/* Thành niêm mạc bị khoét lõm sâu hình miệng núi lửa */}
          <path d="M10 38 H24 C27 38 28 52 36 52 C44 52 45 38 48 38 H62 V58 H10 V38 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="3" strokeLinejoin="round" />
          {/* Đáy ổ loét hoại tử & viêm đỏ */}
          <ellipse cx="36" cy="51" rx="8" ry="4" fill="#881337" />
          {/* Giọt axit ăn mòn chiếu thẳng vào ổ loét */}
          <path d="M36 12C36 12 26 24 26 31A10 10 0 0 0 46 31C46 24 36 12 36 12Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <text x="36" y="34" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff">HCl</text>
          <path d="M20 26L25 32M52 26L47 32" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    /* 4. Nhiễm khuẩn H. pylori: Xoắn khuẩn có chùm tiên mao & đám mây Urease */
    case 'dis-hp':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="2.5" />
          <circle cx="38" cy="36" r="22" fill="#8B5CF6" fillOpacity=".15" />
          {/* Tiên mao xoắn khuẩn */}
          <path d="M18 46C10 46 8 54 13 58M20 42C11 38 7 44 9 50M22 49C16 55 18 63 24 61" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
          {/* Thân xoắn H. pylori */}
          <path d="M21 44C28 24 37 24 41 38S53 54 58 34" stroke="#7C3AED" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="57" cy="29" r="10" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="2.5" />
          <circle cx="54" cy="28" r="2.2" fill="#fff" />
          <circle cx="60" cy="28" r="2.2" fill="#fff" />
          <rect x="12" y="12" width="32" height="15" rx="7.5" fill="#6D28D9" />
          <text x="28" y="22.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff">Urease</text>
        </svg>
      );

    /* 5. Xuất huyết tiêu hóa: Mạch máu dưới niêm mạc vỡ chảy máu + Chữ thập cấp cứu */
    case 'dis-bleed':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="2.5" />
          {/* Mạch máu bị ăn thủng */}
          <path d="M10 48 Q24 40 36 48 T62 48" stroke="#991B1B" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M10 48 Q24 40 36 48 T62 48" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Tia máu phun ra từ điểm vỡ */}
          <path d="M36 45 C36 32 26 24 22 18 M36 45 C36 30 36 20 36 14 M36 45 C36 32 46 24 50 18" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="17" r="4" fill="#DC2626" />
          <circle cx="36" cy="13" r="4.5" fill="#B91C1C" />
          <circle cx="50" cy="17" r="4" fill="#DC2626" />
          {/* Huy hiệu cấp cứu */}
          <circle cx="54" cy="54" r="10" fill="#DC2626" stroke="#fff" strokeWidth="2" />
          <path d="M54 49V59M49 54H59" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    /* 6. Ung thư dạ dày: Khối tăng sinh tế bào bất thường & Kính lúp tầm soát nội soi */
    case 'dis-cancer':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="64" height="64" rx="20" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2.5" />
          {/* Thành dạ dày & cụm tế bào loạn sản */}
          <path d="M12 46 Q36 38 60 46 V58 H12 V46 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2.5" />
          <circle cx="28" cy="40" r="7" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <circle cx="38" cy="37" r="8.5" fill="#334155" stroke="#0F172A" strokeWidth="2" />
          <circle cx="34" cy="45" r="6.5" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <circle cx="37" cy="36" r="2.5" fill="#F43F5E" />
          {/* Kính lúp nội soi phát hiện sớm */}
          <circle cx="42" cy="26" r="11" fill="#E0F2FE" fillOpacity=".65" stroke="#0284C7" strokeWidth="3.2" />
          <path d="M50 34L59 43" stroke="#0F2E35" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
}

function UiSvg({ name, size = 16, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true };
  if (name === 'arrow') {
    return <svg {...p}><path d="M5 12h14m-6-6 6 6-6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  if (name === 'bulb') {
    return (
      <svg {...p}>
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.8 10.6c.6.5 1.1 1.3 1.3 2.1h5c.2-.8.7-1.6 1.3-2.1A6 6 0 0 0 12 3Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return <svg {...p}><circle cx="12" cy="12" r="5" fill={color} /></svg>;
}

export function Slide4StomachDiseases({ onSelectSlide = () => {} }) {
  const [selectedDisease, setSelectedDisease] = useState('dis-acute');
  const activeDis = DISEASES.find((d) => d.id === selectedDisease) || DISEASES[0];

  const handleCardClick = useCallback((id) => {
    playSfx('tick');
    setSelectedDisease(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#FFF7ED] via-[#F8FAFC] to-[#F0F9FF] rounded-3xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#F97316] tracking-widest uppercase">
            SLIDE 04 • BỨC TRANH BỆNH HỌC DẠ DÀY – TÁ TRÀNG
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            6 Bệnh Lý Dạ Dày Thường Gặp & Trọng Tâm Báo Cáo
          </h2>
        </div>

        {/* Thanh tóm tắt nhanh bệnh đang chọn */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDis.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="px-3.5 py-2 rounded-2xl bg-white/95 border border-white shadow-md flex items-center gap-3 max-w-md"
          >
            <span className="font-heading font-black text-xl leading-none" style={{ color: activeDis.color }}>
              {activeDis.stat}
            </span>
            <div className="leading-tight text-left">
              <div className="text-[11px] font-extrabold text-[#12343B]">{activeDis.name}</div>
              <div className="text-[10.5px] font-semibold text-[#5B7B80] line-clamp-1">{activeDis.mechanism}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main 6-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 my-0.5 items-stretch">
        {DISEASES.map((dis) => {
          const isSelected = selectedDisease === dis.id;
          return (
            <motion.div
              key={dis.id}
              whileHover={{ y: -3 }}
              onClick={() => handleCardClick(dis.id)}
              className={`p-3.5 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                isSelected
                  ? 'bg-white shadow-xl'
                  : dis.focus
                  ? 'bg-gradient-to-br from-white via-white to-orange-50/50 shadow-md border-white'
                  : 'bg-white/80 hover:bg-white/95 border-white/80 shadow-sm'
              }`}
              style={{
                borderColor: isSelected ? dis.color : undefined,
                borderTop: `4px solid ${dis.color}`,
              }}
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${dis.color}16`, color: dis.color }}
                  >
                    {dis.severity}
                  </span>
                  {dis.focus ? (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                      ★ Trọng tâm báo cáo
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold font-mono text-[#5B7B80]">
                      {dis.stat} • {dis.statLabel}
                    </span>
                  )}
                </div>

                {/* Minh họa SVG + Tiêu đề & Cơ chế */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <DiseaseIllustration id={dis.id} size={58} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-extrabold text-sm md:text-[15px] text-[#12343B] leading-snug">
                      {dis.name}
                    </h3>
                    <p className="text-[11px] font-bold mt-0.5 leading-snug" style={{ color: dis.color }}>
                      Cơ chế: {dis.mechanism}
                    </p>
                  </div>
                </div>

                <p className="text-[11.5px] text-[#5B7B80] font-medium leading-relaxed mt-2">
                  {dis.desc}
                </p>
              </div>

              {/* Nút chuyển slide cho 2 bệnh trọng tâm */}
              {dis.id === 'dis-acute' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('whoosh');
                    onSelectSlide(5);
                  }}
                  className="mt-2.5 w-full py-2 rounded-2xl bg-gradient-to-r from-[#FF8A5B] to-[#EA580C] text-white text-xs font-extrabold shadow-md hover:opacity-95 flex items-center justify-center gap-1.5 transition"
                >
                  <span>{dis.cta}</span>
                  <UiSvg name="arrow" size={14} color="#fff" />
                </button>
              )}

              {dis.id === 'dis-gerd' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('whoosh');
                    onSelectSlide(6);
                  }}
                  className="mt-2.5 w-full py-2 rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] text-white text-xs font-extrabold shadow-md hover:opacity-95 flex items-center justify-center gap-1.5 transition"
                >
                  <span>{dis.cta}</span>
                  <UiSvg name="arrow" size={14} color="#fff" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Focus Banner */}
      <div className="w-full p-2.5 px-4 rounded-2xl bg-amber-50/95 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900 font-semibold shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <UiSvg name="bulb" size={18} />
          </span>
          <span>
            <strong>Định hướng bài báo cáo:</strong> Đi sâu phân tích cơ chế bệnh sinh, nguyên nhân & triệu chứng của 2 bệnh lý có tỷ lệ mắc cao nhất hiện nay là <strong>Viêm dạ dày cấp tính</strong> và <strong>Trào ngược thực quản (GERD)</strong>.
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-800 whitespace-nowrap opacity-85">
          Nguồn: Bộ Y tế & Hội Khoa học Tiêu hóa VN
        </span>
      </div>
    </div>
  );
}

export default Slide4StomachDiseases;