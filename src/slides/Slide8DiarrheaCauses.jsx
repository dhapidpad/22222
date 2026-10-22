import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import sfx from '../audio/sfx';

/* ==========================================
   SVG MINH HỌA VECTOR ĐA LỚP Y HỌC CAO CẤP
   ========================================== */

function PathogenVector({ type, size = 64 }) {
  if (type === 'virus') {
    // Rotavirus: Cấu trúc bánh xe nan hoa đặc trưng (Wheel-like Capsid)
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <radialGradient id="rotaGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="60%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
          <filter id="rotaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 12 Gai Protein VP4/VP7 nhô ra ngoài */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <line x1="50" y1="18" x2="50" y2="7" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="6" r="3.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
            </g>
          );
        })}

        {/* Thân bánh xe ngoài (Outer Capsid) */}
        <circle cx="50" cy="50" r="32" fill="url(#rotaGrad)" filter="url(#rotaGlow)" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#E0F2FE" strokeWidth="2.5" strokeDasharray="5 3" />

        {/* Lớp vỏ trong (Intermediate & Inner Capsid) */}
        <circle cx="50" cy="50" r="21" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2" />

        {/* 11 Phân đoạn RNA lõi */}
        <g transform="translate(50, 50) rotate(25) translate(-50, -50)">
          <path d="M 42 42 Q 50 36 58 42 Q 50 52 42 42 Z" fill="#F0FDFA" opacity="0.9" />
          <path d="M 44 58 Q 50 64 56 58 Q 50 48 44 58 Z" fill="#F0FDFA" opacity="0.9" />
          <circle cx="50" cy="50" r="4.5" fill="#38BDF8" />
        </g>
      </svg>
    );
  }

  if (type === 'bacteria') {
    // Trực khuẩn E. coli / Salmonella: Hình que có lông roi flagella uốn lượn
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="bactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>

        {/* Lông nhung (Pili) li ti quanh thân */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 26 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FB923C"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.75"
            />
          );
        })}

        {/* 3 Roi đuôi dài (Flagella) uốn lượn */}
        <path
          d="M 24 50 C 14 38, 4 60, -6 46 S -18 64, -28 50"
          fill="none"
          stroke="#EA580C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 26 44 C 16 28, 6 48, -4 34 S -14 52, -24 38"
          fill="none"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 26 56 C 16 68, 8 52, -2 66 S -12 50, -22 62"
          fill="none"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Thân trực khuẩn hình viên nhộng */}
        <rect
          x="28"
          y="35"
          width="44"
          height="30"
          rx="15"
          fill="url(#bactGrad)"
          stroke="#FED7AA"
          strokeWidth="2.5"
          className="shadow-sm"
        />

        {/* Vệt sáng bóng & Nhiễm sắc thể ADN cuộn */}
        <path d="M 36 41 Q 50 37 64 41" stroke="#FFEDD5" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
        <path
          d="M 38 52 Q 43 47 48 52 T 58 52 T 62 50"
          fill="none"
          stroke="#FFEDD5"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }

  // Ký sinh trùng Giardia lamblia / Amip
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      <defs>
        <radialGradient id="giardiaGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="60%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </radialGradient>
      </defs>

      {/* 4 Đôi roi bơi đối xứng */}
      <path d="M 50 82 C 44 94, 38 102, 28 108" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 82 C 56 94, 62 102, 72 108" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 34 50 C 18 56, 10 44, 2 54" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 66 50 C 82 56, 90 44, 98 54" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />

      {/* Thân hình giọt nước / diều đặc trưng */}
      <path
        d="M 50 14 C 74 14, 76 44, 64 68 C 58 80, 52 86, 50 88 C 48 86, 42 80, 36 68 C 24 44, 26 14, 50 14 Z"
        fill="url(#giardiaGrad)"
        stroke="#CCFBF1"
        strokeWidth="2.5"
      />

      {/* 2 Nhân tế bào giống 2 "con mắt" ngộ nghĩnh */}
      <ellipse cx="42" cy="38" rx="6.5" ry="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1.5" />
      <circle cx="43" cy="37" r="3" fill="#CCFBF1" />
      <ellipse cx="58" cy="38" rx="6.5" ry="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1.5" />
      <circle cx="57" cy="37" r="3" fill="#CCFBF1" />

      {/* Sợi trục axoneme dọc sống lưng */}
      <line x1="50" y1="28" x2="50" y2="84" stroke="#5EEAD4" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

/* ==========================================
   CẤU HÌNH DỮ LIỆU 3 TÁC NHÂN VI SINH HỌC
   ========================================== */
const PATHOGENS = {
  virus: {
    id: 'virus',
    name: 'Virus đường ruột',
    sub: 'Tác nhân #1 gây mất nước cấp nhập viện',
    stat: '>70%',
    statLabel: 'ca tiêu chảy cấp ở trẻ <5 tuổi',
    color: '#0284C7',
    badge: 'Chiếm đa số tuyệt đối',
    targets: [
      {
        name: 'Rotavirus (Nguy hiểm nhất)',
        detail: 'Phá hủy nhung mao ruột non, gây sốt, nôn ói dữ dội và tiêu chảy tóe nước 10–20 lần/ngày.',
        highlight: 'Uống đủ 2 liều vaccine trước 6 tháng tuổi'
      },
      {
        name: 'Norovirus (Bùng dịch cộng đồng)',
        detail: 'Khả năng lây nhiễm cực mạnh qua tiếp xúc, gây dịch lớn ở trường học, ký túc xá, bệnh viện.',
        highlight: 'Bền vững với cồn rửa tay thông thường'
      },
      {
        name: 'Adenovirus & Astrovirus',
        detail: 'Gây tiêu chảy kéo dài kèm viêm đường hô hấp trên và viêm kết mạc ở trẻ nhỏ.',
        highlight: 'Chỉ điều trị hỗ trợ bù nước, không kháng sinh'
      }
    ],
    rxWarning: 'CẢNH BÁO TỐI QUAN TRỌNG: Kháng sinh HOÀN TOÀN KHÔNG DIỆT ĐƯỢC VIRUS! Tự ý uống kháng sinh làm chết sạch lợi khuẩn, khiến tiêu chảy trầm trọng hơn.'
  },
  bacteria: {
    id: 'bacteria',
    name: 'Vi khuẩn xâm lấn & Sinh độc tố',
    sub: 'Nhiễm trùng từ thực phẩm ôi thiu & ngộ độc',
    stat: '15–20%',
    statLabel: 'ca tiêu chảy nhiễm khuẩn',
    color: '#EA580C',
    badge: 'Độc tố ruột & Phân máu',
    targets: [
      {
        name: 'E. coli (ETEC / EHEC)',
        detail: 'ETEC tiết độc tố ruột gây tiêu chảy du lịch tóe nước; EHEC gây xuất huyết đại tràng nguy kịch.',
        highlight: 'Thường từ nước uống và rau sống nhiễm bẩn'
      },
      {
        name: 'Salmonella non-typhi',
        detail: 'Xâm lấn biểu mô hồi tràng, gây sốt cao rét run, đau quặn bụng từng cơn và phân tanh hôi.',
        highlight: 'Nhiễm từ thịt gà, trứng chưa nấu chín kỹ'
      },
      {
        name: 'Shigella (Lỵ trực trùng)',
        detail: 'Độc tố Shiga độc lực cao làm loét niêm mạc đại tràng, gây mót rặn, đau quặn và phân có mủ máu.',
        highlight: 'BẮT BUỘC khám bác sĩ để dùng kháng sinh đúng'
      }
    ],
    rxWarning: 'Chỉ dùng kháng sinh khi có xét nghiệm phân hoặc bác sĩ chẩn đoán hội chứng lỵ (sốt, phân máu), tả hoặc nhiễm khuẩn xâm lấn nặng.'
  },
  parasite: {
    id: 'parasite',
    name: 'Ký sinh trùng & Loạn khuẩn ruột',
    sub: 'Nguồn nước ô nhiễm & Tác dụng phụ thuốc',
    stat: '5–10%',
    statLabel: 'ca tiêu chảy mạn / đặc thù',
    color: '#0D9488',
    badge: 'Bào nang & Suy kiệt vi sinh',
    targets: [
      {
        name: 'Giardia lamblia',
        detail: 'Bào nang bám chặt che phủ vi nhung mao tá tràng, cản trở hấp thu chất béo gây phân sống nhiều mỡ.',
        highlight: 'Lây qua nước ao hồ, nước suối chưa đun sôi'
      },
      {
        name: 'Entamoeba histolytica (Lỵ amip)',
        detail: 'Amip ăn mòn niêm mạc đại tràng tạo các ổ loét hình bình thắt, gây đi ngoài nhầy máu tái diễn.',
        highlight: 'Điều trị bằng phác đồ diệt amip chuyên khoa'
      },
      {
        name: 'Loạn khuẩn do kháng sinh (Dysbiosis)',
        detail: 'Kháng sinh phổ rộng tiêu diệt hệ vi sinh vật có lợi, tạo điều kiện cho vi khuẩn Clostridioides bùng phát.',
        highlight: 'Bổ sung men vi sinh và ngưng kháng sinh sai'
      }
    ],
    rxWarning: 'Đun sôi nước uống và nấu chín kỹ thức ăn là biện pháp duy nhất tiêu diệt triệt để các bào nang ký sinh trùng đề kháng clo.'
  }
};

/* ==========================================
   5 TRẠM CHU TRÌNH PHÂN – MIỆNG & ĐIỂM CHẶN
   ========================================== */
const TRANSMISSION_STATIONS = [
  {
    id: 1,
    title: 'Trạm 1: Nguồn thải mầm bệnh',
    name: 'Phân người / Động vật mang trùng',
    icon: '🚽',
    accent: '#64748B',
    barrier: 'Quản lý nhà tiêu tự hoại hợp vệ sinh, không phóng uế bừa bãi',
    actionLabel: 'Xây dựng nhà vệ sinh chuẩn',
  },
  {
    id: 2,
    title: 'Trạm 2: Véc-tơ trung gian',
    name: 'Bàn tay bẩn & Ruồi nhặng',
    icon: '🪰',
    accent: '#EA580C',
    barrier: 'Rửa tay thường quy 6 bước với xà phòng ≥ 30 giây; đậy kín lồng bàn',
    actionLabel: 'Rửa tay xà phòng 6 bước',
  },
  {
    id: 3,
    title: 'Trạm 3: Môi trường tiếp nhận',
    name: 'Nguồn nước & Thực phẩm ô nhiễm',
    icon: '🍲',
    accent: '#0284C7',
    barrier: 'Thực hiện nghiêm ngặt "Ăn chín, uống sôi", dùng nước sạch kiểm định',
    actionLabel: 'Ăn chín · Uống sôi',
  },
  {
    id: 4,
    title: 'Trạm 4: Cửa ngõ xâm nhập',
    name: 'Khoang miệng & Thói quen ăn uống',
    icon: '👄',
    accent: '#DB2777',
    barrier: 'Không mút tay, không gặm đồ chơi bẩn, giữ bát đũa cốc chén sạch khô',
    actionLabel: 'Vệ sinh dụng cụ ăn uống',
  },
  {
    id: 5,
    title: 'Trạm 5: Cơ quan tổn thương',
    name: 'Đường ruột (Nhung mao viêm cấp)',
    icon: '🫁',
    accent: '#0D9488',
    barrier: 'Uống đủ 2 liều vaccine Rotavirus trước 6 tháng tuổi, nuôi con bằng sữa mẹ',
    actionLabel: 'Vaccine Rota & Sữa mẹ',
  },
];

/* ==========================================
   SLIDE 8: THIẾT KẾ MASTER HOÀN THIỆN
   ========================================== */
export function Slide8DiarrheaCauses({ onSelectView, onSelectSlide }) {
  const [activeTab, setActiveTab] = useState('virus');
  const [blockedStations, setBlockedStations] = useState([2, 3]); // Mặc định chặn tay & ăn chín

  const pathogen = PATHOGENS[activeTab];

  const toggleStationBlock = useCallback((id) => {
    sfx.tick();
    setBlockedStations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const allBlocked = blockedStations.length === TRANSMISSION_STATIONS.length;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#ECFEFF] rounded-3xl overflow-hidden border border-white/90 shadow-sm">
      {/* 1. Header Bar: Tiêu đề & Nhãn dịch tễ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 flex-shrink-0">
        <div>
          <span className="text-[11px] font-extrabold text-[#0284C7] tracking-widest uppercase flex items-center gap-1.5">
            <span>🔵 SLIDE 08 • BỆNH LÝ 2: TIÊU CHẢY CẤP (① CĂN NGUYÊN BỆNH HỌC)</span>
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B] leading-tight">
            Khi Ruột "Xả Nước": 3 Nhóm Tác Nhân & Chu Trình Phân – Miệng
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-extrabold flex-shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#0284C7]/15 text-[#0284C7] border border-[#0284C7]/30 shadow-2xs">
            ≥ 3 lần lỏng / 24h
          </span>
          <span className="text-[#5B7B80]">•</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
            Cấp tính: &lt; 14 ngày
          </span>
        </div>
      </div>

      {/* 2. Main Stage (Grid 12 Cột Đối Xứng Hoàn Mỹ) */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        {/* NỬA TRÁI (6 Cột): PHÒNG THÍ NGHIỆM 3 NHÓM TÁC NHÂN VI SINH */}
        <div className="col-span-12 lg:col-span-6 p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* 3 Tab Chọn Tác Nhân (Có Vector Art thu nhỏ) */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex-shrink-0">
            {Object.keys(PATHOGENS).map((key) => {
              const p = PATHOGENS[key];
              const isSelected = activeTab === key;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sfx.tick();
                    setActiveTab(key);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md scale-102 font-extrabold'
                      : 'hover:bg-white/60 text-slate-600'
                  }`}
                  style={{
                    borderBottom: isSelected ? `3px solid ${p.color}` : '3px solid transparent',
                  }}
                >
                  <div className="transform scale-75 -my-1">
                    <PathogenVector type={p.id} size={36} />
                  </div>
                  <span className={`text-xs mt-0.5 tracking-tight ${isSelected ? 'text-[#12343B]' : 'text-slate-600'}`}>
                    {p.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>
                    {p.stat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chi tiết Tác Nhân đang chọn */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex-1 flex flex-col justify-between my-2 overflow-y-auto scrollbar-none"
            >
              {/* Header card tác nhân */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
                    <PathogenVector type={activeTab} size={48} />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[#12343B] leading-tight">
                      {pathogen.name}
                    </h3>
                    <p className="text-[11.5px] font-semibold text-slate-500 mt-0.5">
                      {pathogen.sub}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-2xl md:text-3xl leading-none" style={{ color: pathogen.color }}>
                    {pathogen.stat}
                  </span>
                  <div className="text-[10px] font-bold text-slate-500">{pathogen.statLabel}</div>
                </div>
              </div>

              {/* Danh sách 3 mầm bệnh trọng tâm */}
              <div className="space-y-2 my-2">
                {pathogen.targets.map((tgt, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-100 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading font-extrabold text-xs text-[#12343B]">
                        {tgt.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#0284C7] border border-slate-200">
                        {tgt.highlight}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                      {tgt.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hộp Cảnh Báo Kháng Sinh Đỏ/Xanh */}
              <div
                className="p-2.5 rounded-2xl border text-[11.5px] font-bold flex items-start gap-2 flex-shrink-0"
                style={{
                  backgroundColor: `${pathogen.color}10`,
                  borderColor: `${pathogen.color}35`,
                  color: pathogen.color,
                }}
              >
                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{pathogen.rxWarning}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NỬA PHẢI (6 Cột): BẢN ĐỒ CHU TRÌNH PHÂN – MIỆNG 5 MẮT XÍCH & LÁ CHẮN TƯƠNG TÁC */}
        <div className="col-span-12 lg:col-span-6 p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Header nửa phải */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#0284C7] to-[#14B8A6] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                🔄
              </span>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#12343B]">
                  Chu Trình Lây Truyền Phân – Miệng & Lá Chắn
                </h3>
                <p className="text-[10.5px] font-medium text-slate-500">
                  Nhấp vào từng trạm để <strong className="text-emerald-700">Kích hoạt lá chắn ngắt mắt xích</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600">
                Đã chặn: <strong className="text-[#0284C7]">{blockedStations.length}/5</strong>
              </span>
              {allBlocked && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  ✓ An toàn tuyệt đối!
                </span>
              )}
            </div>
          </div>

          {/* Sơ đồ 5 Mắt xích Xếp Tầng Trực Quan */}
          <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5 min-h-0">
            {TRANSMISSION_STATIONS.map((st, idx) => {
              const isBlocked = blockedStations.includes(st.id);
              return (
                <motion.div
                  key={st.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => toggleStationBlock(st.id)}
                  className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isBlocked
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                      : 'bg-slate-50/80 hover:bg-white border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {/* Trái: Icon & Tên Trạm */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-2xs flex-shrink-0 transition-colors ${
                        isBlocked ? 'bg-emerald-500 text-white' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {st.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-slate-200/80 text-slate-600">
                          {st.title.split(':')[0]}
                        </span>
                        <span className="font-heading font-extrabold text-xs text-[#12343B] truncate">
                          {st.name}
                        </span>
                      </div>

                      <div className="text-[11px] font-medium text-slate-600 mt-0.5 truncate">
                        {isBlocked ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            {st.barrier}
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            Chạm để dựng lá chắn: {st.actionLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phải: Trạng Thái Toggle Chặn */}
                  <div className="flex-shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold flex items-center gap-1 transition-all ${
                        isBlocked
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <ShieldCheck size={12} />
                          <span>Đã chặn</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={12} />
                          <span>Đang hở</span>
                        </>
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dòng tóm lược dưới nửa phải */}
          <div className="p-2 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 flex items-center justify-between text-[11px] text-[#0284C7] font-bold flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>
                Chỉ cần ngắt <strong>ít nhất 1 trong 5 mắt xích</strong>, chu trình lây truyền bệnh sẽ bị bẻ gãy hoàn toàn!
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">WHO 2024</span>
          </div>
        </div>
      </div>

      {/* 3. Fact Box Y Tế Vàng Cốt Tử Dưới Đáy (Không che khuất, đúng chuẩn Bộ Y tế) */}
      <div className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-[#EFF6FF] via-[#F0FDF4] to-[#FFFBEB] border border-sky-200/80 flex items-center justify-between gap-3 text-xs flex-shrink-0 shadow-2xs">
        <div className="flex items-center gap-2.5 text-[#0369A1] font-bold">
          <span className="text-base flex-shrink-0">💡</span>
          <span className="leading-snug">
            <strong>Ghi nhớ lâm sàng (Bộ Y tế & WHO):</strong> Tiêu chảy là phản xạ tống xuất mầm bệnh. Tuyệt đối <strong>KHÔNG tự ý dùng thuốc cầm tiêu chảy (Loperamide)</strong> hay kháng sinh khi chưa có chỉ định — thuốc cầm sẽ giữ độc tố lại trong ruột, gây biến chứng viêm ruột hoại tử và nhiễm độc cấp!
          </span>
        </div>
        <span className="text-[10.5px] text-[#0369A1]/80 font-black whitespace-nowrap hidden md:inline flex-shrink-0">
          QĐ 4121/QĐ-BYT • WHO Guidelines
        </span>
      </div>
    </div>
  );
}

export default Slide8DiarrheaCauses;
