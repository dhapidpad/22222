import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Droplets,
  Microscope,
  CheckCircle2,
  XCircle,
  BookOpen,
  X,
  Stethoscope,
  Info,
  HelpCircle,
  RotateCcw,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import sfx from '../audio/sfx';

/* ==========================================================================
   DỮ LIỆU CHUẨN Y KHOA: BỘ Y TẾ (QĐ 4121/QĐ-BYT) & WHO CLINICAL MANUAL
   ========================================================================== */

const SUMMARY_PILLARS = [
  {
    id: 'dehydration',
    icon: Droplets,
    color: '#0284C7',
    tag: 'TRỤ CỘT 1 · LÂM SÀNG',
    title: '3 Mức độ Mất nước & Cờ đỏ',
    badge: 'Hiểm họa số 1',
    highlight: 'Mất nước là nguyên nhân gây tử vong hàng đầu trong tiêu chảy cấp.',
    points: [
      {
        label: 'Mức 1 (<5% TLCT)',
        detail: 'Tỉnh táo, mắt bình thường, uống tốt, nếp véo da phẳng ngay (<2s).'
      },
      {
        label: 'Mức 2 (5–10% TLCT)',
        detail: 'Bứt rứt, quấy khóc, mắt trũng, khát vồ vập, nếp véo da mất chậm (≈2s).'
      },
      {
        label: 'Mức 3 (>10% TLCT)',
        detail: 'Li bì/hôn mê, mắt rất trũng khô khốc, không uống được, nếp véo da >2s (Cấp cứu 115).'
      },
      {
        label: 'Dấu hiệu cờ đỏ',
        detail: 'Phân lẫn máu tươi/nhầy, nôn liên tục không giữ được nước, sốt cao >38.5°C co giật.'
      }
    ]
  },
  {
    id: 'etiology',
    icon: Microscope,
    color: '#0D9488',
    tag: 'TRỤ CỘT 2 · CĂN NGUYÊN',
    title: 'Mầm bệnh & Chu trình lây 5F',
    badge: 'Đường phân - miệng',
    highlight: 'Cắt đứt chu trình phân - miệng là chìa khóa chặn đứng dịch tiêu chảy.',
    points: [
      {
        label: 'Rotavirus (Số 1)',
        detail: 'Gây viêm dạ dày ruột cấp nặng nhất ở trẻ dưới 2 tuổi; có vaccine uống dự phòng.'
      },
      {
        label: 'Vi khuẩn xâm lấn',
        detail: 'E. coli (ETEC du lịch, EHEC), Salmonella, Shigella (lỵ trực trùng phân máu).'
      },
      {
        label: 'Chu trình 5F',
        detail: 'Faeces (Phân) ➔ Fingers (Tay) • Flies (Ruồi) • Fields (Đất) • Fluids (Nước) ➔ Food (Ăn).'
      },
      {
        label: 'Cơ chế sinh bệnh',
        detail: 'Độc tố ruột kích thích bơm $\\text{Cl}^-$, kéo ồ ạt nước và $\\text{Na}^+$ vào lòng ruột.'
      }
    ]
  },
  {
    id: 'oresol',
    icon: Stethoscope,
    color: '#2563EB',
    tag: 'TRỤ CỘT 3 · ĐIỀU TRỊ',
    title: 'Nguyên tắc Vàng Oresol & Kẽm',
    badge: 'Chuẩn WHO 245 mOsm/L',
    highlight: 'Oresol áp lực thẩm thấu thấp tối ưu hóa hấp thu nước qua đồng vận chuyển Na-Glucose.',
    points: [
      {
        label: 'Quy tắc pha 100%',
        detail: 'Pha nguyên gói với đúng thể tích nước sôi để nguội; không thêm đường, sữa hay nước ép.'
      },
      {
        label: 'Cách uống chuẩn',
        detail: 'Uống từng ngụm nhỏ rải rác; nếu nôn thì dừng 10 phút rồi cho uống lại chậm hơn.'
      },
      {
        label: 'Bổ sung Kẽm (Zinc)',
        detail: '10–20mg/ngày trong 10–14 ngày giúp tái tạo biểu mô ruột và giảm 25% nguy cơ tái phát.'
      },
      {
        label: 'Phân tầng A - B - C',
        detail: 'Phác đồ A (tại nhà), Phác đồ B (Trạm Y tế 4 giờ đầu), Phác đồ C (Truyền Ringer Lactate).'
      }
    ]
  },
  {
    id: 'warnings',
    icon: AlertTriangle,
    color: '#DC2626',
    tag: 'TRỤ CỘT 4 · CẢNH BÁO TỬ HUYỆT',
    title: '3 Lời Cảnh Báo "3 KHÔNG"',
    badge: 'Tuyệt đối tránh',
    highlight: 'Sai lầm trong xử trí tiêu chảy có thể gây liệt ruột, hoại tử hoặc tử vong.',
    points: [
      {
        label: '1. KHÔNG dùng thuốc cầm',
        detail: 'Loperamide/Imodium làm liệt ruột, ứ đọng độc tố gây viêm hoại tử, nhiễm trùng huyết.'
      },
      {
        label: '2. KHÔNG lạm dụng KS',
        detail: 'Phần lớn do virus; tự ý dùng kháng sinh diệt sạch lợi khuẩn, gây tiêu chảy kéo dài.'
      },
      {
        label: '3. KHÔNG nhịn ăn kiêng khem',
        detail: 'Tiếp tục cho ăn lỏng mềm, giàu dinh dưỡng, bú mẹ bình thường để phục hồi nhung mao.'
      },
      {
        label: 'Phòng vệ 4 lá chắn',
        detail: 'Rửa tay 6 bước với xà phòng • Ăn chín uống sôi • Nước sạch • Uống vaccine Rotavirus.'
      }
    ]
  }
];

const PROTOCOLS_DETAIL = [
  {
    protocol: 'PHÁC ĐỒ A',
    subtitle: 'Mức 1 · Không mất nước (< 5%)',
    place: 'Điều trị theo dõi tại nhà',
    color: '#0D9488',
    target: 'Bù lượng dịch đã mất qua phân & nôn để ngăn ngừa tiến triển mất nước',
    dose: 'Trẻ < 2 tuổi: 50–100ml Oresol sau mỗi lần đi ngoài; Trẻ ≥ 2 tuổi & người lớn: 100–200ml hoặc uống theo nhu cầu.',
    diet: 'Tiếp tục cho ăn thức ăn mềm, lỏng, giàu dinh dưỡng (cháo gà, súp khoai, chuối). Tiếp tục bú mẹ theo nhu cầu.',
    zinc: 'Bổ sung Kẽm: Trẻ < 6 tháng uống 10mg/ngày, trẻ ≥ 6 tháng uống 20mg/ngày liên tục 10–14 ngày.',
    redFlags: 'Đưa đến viện ngay nếu: Nôn tất cả, sốt cao, khát dữ dội, phân lẫn máu, hoặc sau 2 ngày không thuyên giảm.'
  },
  {
    protocol: 'PHÁC ĐỒ B',
    subtitle: 'Mức 2 · Có mất nước (5% – 10%)',
    place: 'Điều trị giám sát tại Trạm Y tế / Phòng khám',
    color: '#D97706',
    target: 'Bù dịch tích cực bằng Oresol qua đường uống trong 4 giờ đầu',
    dose: 'Lượng Oresol uống trong 4 giờ đầu (ml) = Cân nặng (kg) × 75. Cho uống từng thìa nhỏ hoặc từng ngụm chậm rãi.',
    diet: 'Tạm hoãn thức ăn trong 4 giờ đầu bù Oresol tích cực (trừ trẻ bú mẹ vẫn cho bú giữa các lần uống). Sau 4 giờ đánh giá lại.',
    zinc: 'Sau khi bù đủ nước trong 4 giờ đầu, tiến hành bổ sung Kẽm và cho ăn trở lại như Phác đồ A.',
    redFlags: 'Nếu trẻ nôn liên tục hoặc nếp véo da xấu đi ➔ đặt sonde dạ dày nhỏ giọt Oresol hoặc chuyển ngay sang Phác đồ C.'
  },
  {
    protocol: 'PHÁC ĐỒ C',
    subtitle: 'Mức 3 · Mất nước nặng (> 10%)',
    place: 'CẤP CỨU 115 · BỆNH VIỆN TUYẾN TỈNH / HUYỆN',
    color: '#DC2626',
    target: 'Hồi sức sốc kiệt dịch cấp cứu — Thiết lập ngay đường truyền tĩnh mạch lớn',
    dose: 'Truyền tĩnh mạch dung dịch Ringer Lactate hoặc Nước muối sinh lý 0.9%: Tổng liều 100ml/kg chia theo phác đồ tuổi (nhỏ hơn 1 tuổi: 30ml/kg trong 1 giờ đầu, 70ml/kg trong 5 giờ tiếp theo; lớn hơn 1 tuổi: 30ml/kg trong 30 phút, 70ml/kg trong 2.5 giờ).',
    diet: 'Không cho ăn uống bằng đường miệng khi đang sốc, li bì hoặc mất phản xạ nuốt.',
    zinc: 'Chỉ bổ sung qua đường tiêu hóa khi bệnh nhân đã tỉnh táo hoàn toàn và uống lại được.',
    redFlags: 'Theo dõi sát mạch, huyết áp, tri giác và SpO2 mỗi 15–30 phút. Báo động đỏ toàn viện!'
  }
];

const CLINICAL_QUIZ = {
  scenario:
    'Bé Min (16 tháng tuổi) bị tiêu chảy cấp 6 lần từ sáng, mắt trũng rõ, khát nước đòi uống vồ vập, nếp véo da bụng mất chậm khoảng 2 giây. Người nhà lo lắng định ra hiệu thuốc mua ngay 1 viên Imodium (Loperamide) cho bé uống để "cầm tiêu chảy", đồng thời định pha nửa gói Oresol với 1 cốc sữa chua cho bé dễ uống.',
  question: 'Dưới góc độ Y học và Sinh học 11, em sẽ đưa ra lời khuyên xử trí nào chuẩn xác nhất?',
  options: [
    {
      id: 'A',
      text: 'Đồng ý cho uống nửa viên Imodium để đỡ mất nước, và pha Oresol vào sữa giúp bé có thêm năng lượng phục hồi.',
      isCorrect: false,
      feedback:
        'SAI NGUY HIỂM! Imodium gây liệt ruột giữ độc tố lại dẫn tới hoại tử ruột ở trẻ em. Pha Oresol vào sữa làm tăng vọt áp lực thẩm thấu, kéo nước vào ruột khiến tiêu chảy dữ dội hơn!'
    },
    {
      id: 'B',
      text: 'Tuyệt đối KHÔNG dùng Imodium (nguy cơ liệt ruột tử vong); Oresol phải pha đúng 100% tỷ lệ nước đun sôi để nguội; đưa bé đến Trạm Y tế áp dụng Phác đồ B điều trị trong 4 giờ đầu.',
      isCorrect: true,
      feedback:
        'CHÍNH XÁC XUẤT SẮC! Bé đang ở Mức 2 (Có mất nước) cần áp dụng Phác đồ B (75ml × kg trong 4 giờ). Tuyệt đối cấm thuốc cầm tiêu chảy và phải pha Oresol đúng chuẩn 245 mOsm/L!'
    },
    {
      id: 'C',
      text: 'Cho bé nhịn ăn hoàn toàn 24 giờ để dạ dày và ruột được nghỉ ngơi, chỉ uống nước lọc đun sôi để nguội.',
      isCorrect: false,
      feedback:
        'SAI! Nước lọc thiếu điện giải sẽ gây hạ natri máu co giật. Nhịn ăn làm teo nhung mao ruột và suy dinh dưỡng cấp, ruột sẽ lâu lành hơn.'
    }
  ]
};

const OFFICIAL_SOURCES = [
  {
    org: 'Bộ Y tế Việt Nam',
    doc: 'Quyết định số 4121/QĐ-BYT',
    title: 'Hướng dẫn chẩn đoán và điều trị bệnh tiêu chảy ở trẻ em',
    year: '2023',
    link: 'https://kcb.vn'
  },
  {
    org: 'WHO (Tổ chức Y tế Thế giới)',
    doc: 'WHO Treatment Guidelines',
    title: 'The Treatment of Diarrhoea: A manual for physicians and other senior health workers (4th Rev)',
    year: '2022',
    link: 'https://who.int'
  },
  {
    org: 'CDC Hoa Kỳ (US CDC)',
    doc: 'CDC Global Diarrhea Disease Guidelines',
    title: 'Rotavirus Surveillance, Oral Rehydration Solutions & Prevention of Waterborne Infections',
    year: '2023',
    link: 'https://cdc.gov'
  },
  {
    org: 'Bộ Giáo dục & Đào tạo',
    doc: 'SGK Sinh học 11 Kết nối tri thức & Cánh diều',
    title: 'Chuyên đề: Tiêu hóa và các bệnh lý đường tiêu hóa ở người',
    year: '2023'
  }
];

export function Slide9Closing({ onSelectSlide, onSelectView }) {
  // Tabs: 'pillars' (Toàn cảnh 4 trụ cột), 'protocols' (Phác đồ A-B-C), 'case-study' (Thử thách lâm sàng)
  const [activeTab, setActiveTab] = useState('pillars');
  const [showSourcesModal, setShowSourcesModal] = useState(false);

  // Mini quiz state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    sfx.success();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#0284C7', '#F59E0B', '#EF4444']
      });
    } catch (e) {}
  }, []);

  const handleSelectQuiz = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt.id);
    setIsAnswered(true);
    if (opt.isCorrect) {
      sfx.success();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#10B981', '#06B6D4', '#3B82F6', '#F59E0B']
        });
      } catch (e) {}
    } else {
      sfx.tick();
    }
  };

  const handleResetQuiz = () => {
    sfx.tick();
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 py-2 select-none overflow-hidden bg-gradient-to-b from-white/60 to-slate-50/70">
      {/* 1. HEADER SECTION & NAVIGATION BAR */}
      <div className="flex items-center justify-between gap-3 mb-1.5 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles size={11} className="text-teal-600" />
              <span>BỆNH 2 · TỔNG KẾT TOÀN DIỆN</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">•</span>
            <span className="text-[10.5px] font-bold text-slate-500">
              Chuẩn Bộ Y tế (QĐ 4121) &amp; WHO
            </span>
          </div>
          <h2 className="font-heading font-black text-xl md:text-2xl text-[#12343B] tracking-tight leading-tight">
            TỔNG KẾT BỆNH HỌC: TIÊU CHẢY CẤP (ACUTE DIARRHEA)
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick jump back to previous views of Slide 8 */}
          {onSelectView && (
            <div className="hidden lg:flex items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/80 text-[11px] font-bold text-[#5B7B80]">
              <span className="px-2 py-1 text-[10px] text-slate-400 uppercase font-black">Xem lại:</span>
              <button
                onClick={() => {
                  sfx.tick();
                  onSelectView(0);
                }}
                className="px-2 py-1 rounded-lg hover:bg-white hover:text-[#0F766E] transition-all cursor-pointer"
                title="Xem lại F1 Dấu hiệu & Mất nước"
              >
                1. Dấu hiệu
              </button>
              <button
                onClick={() => {
                  sfx.tick();
                  onSelectView(1);
                }}
                className="px-2 py-1 rounded-lg hover:bg-white hover:text-[#0F766E] transition-all cursor-pointer"
                title="Xem lại F2 Căn nguyên & Đường lây"
              >
                2. Căn nguyên
              </button>
              <button
                onClick={() => {
                  sfx.tick();
                  onSelectView(2);
                }}
                className="px-2 py-1 rounded-lg hover:bg-white hover:text-[#0F766E] transition-all cursor-pointer"
                title="Xem lại F3 Phòng bệnh & Oresol"
              >
                3. Phòng bệnh
              </button>
            </div>
          )}

          {/* Jump forward to Slide 9 Minigame */}
          {onSelectSlide && (
            <button
              onClick={() => {
                sfx.whoosh();
                onSelectSlide(9);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#0284C7] text-white font-heading font-extrabold text-xs shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Vào Đấu trí Minigame (Slide 9)</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 2. TAB SELECTOR BAR */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70">
          <button
            onClick={() => {
              sfx.tick();
              setActiveTab('pillars');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'pillars'
                ? 'bg-white text-[#0F766E] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck size={14} className={activeTab === 'pillars' ? 'text-[#0F766E]' : 'text-slate-400'} />
            <span>1. Toàn cảnh 4 Trụ cột</span>
          </button>

          <button
            onClick={() => {
              sfx.tick();
              setActiveTab('protocols');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'protocols'
                ? 'bg-white text-[#0284C7] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope size={14} className={activeTab === 'protocols' ? 'text-[#0284C7]' : 'text-slate-400'} />
            <span>2. Đối chiếu 3 Phác đồ (A · B · C)</span>
          </button>

          <button
            onClick={() => {
              sfx.tick();
              setActiveTab('case-study');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'case-study'
                ? 'bg-white text-[#D97706] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle size={14} className={activeTab === 'case-study' ? 'text-[#D97706]' : 'text-slate-400'} />
            <span>3. Tình huống Xử trí Lâm sàng</span>
          </button>
        </div>

        {/* Subtitle / Tip indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
          <Info size={13} className="text-[#0D9488]" />
          <span>
            {activeTab === 'pillars'
              ? 'Nhấn các tab để xem so sánh chuyên sâu hoặc thử sức với tình huống thực tế'
              : activeTab === 'protocols'
              ? 'Phân cấp xử trí theo Quyết định 4121/QĐ-BYT của Bộ Y tế'
              : 'Kiểm tra phản xạ y khoa trước khi bước vào minigame chính thức'}
          </span>
        </div>
      </div>

      {/* 3. DYNAMIC TAB CONTENT (FLEX-1 MIN-H-0) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* =================================================================
              TAB 1: TOÀN CẢNH 4 TRỤ CỘT BỆNH LÝ (EXECUTIVE GRID)
              ================================================================= */}
          {activeTab === 'pillars' && (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-full max-h-[500px]"
            >
              {SUMMARY_PILLARS.map((pillar) => {
                const IconComp = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="p-3.5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                    style={{ borderTop: `4px solid ${pillar.color}` }}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                          style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                        >
                          <IconComp size={16} />
                        </div>
                        <span
                          className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${pillar.color}12`, color: pillar.color }}
                        >
                          {pillar.badge}
                        </span>
                      </div>

                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">
                        {pillar.tag}
                      </div>
                      <h3 className="font-heading font-extrabold text-sm text-[#12343B] mb-2 leading-snug">
                        {pillar.title}
                      </h3>

                      {/* Highlight summary */}
                      <div
                        className="p-2 rounded-xl text-[10.5px] font-semibold mb-2.5 leading-snug"
                        style={{ backgroundColor: `${pillar.color}08`, color: pillar.color }}
                      >
                        {pillar.highlight}
                      </div>

                      {/* Bullet points */}
                      <div className="space-y-1.5">
                        {pillar.points.map((pt, pIdx) => (
                          <div key={pIdx} className="text-[10.5px] leading-tight">
                            <span className="font-bold text-[#12343B]">{pt.label}: </span>
                            <span className="text-slate-600">{pt.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status Indicator */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>Nguyên tắc #{pillar.id === 'dehydration' ? '1' : pillar.id === 'etiology' ? '2' : pillar.id === 'oresol' ? '3' : '4'}</span>
                      <CheckCircle2 size={13} style={{ color: pillar.color }} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* =================================================================
              TAB 2: ĐỐI CHIẾU 3 PHÁC ĐỒ ĐIỀU TRỊ A - B - C (BỘ Y TẾ)
              ================================================================= */}
          {activeTab === 'protocols' && (
            <motion.div
              key="protocols"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3.5 h-full max-h-[500px]"
            >
              {PROTOCOLS_DETAIL.map((proto, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between"
                  style={{ borderTop: `5px solid ${proto.color}` }}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-heading font-black px-2.5 py-0.5 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: proto.color }}
                      >
                        {proto.protocol}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        Phân cấp #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <div className="font-heading font-extrabold text-sm text-[#12343B]">
                        {proto.subtitle}
                      </div>
                      <div
                        className="text-[11px] font-bold mt-0.5"
                        style={{ color: proto.color }}
                      >
                        📍 {proto.place}
                      </div>
                    </div>

                    {/* Mục tiêu */}
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10.5px] text-slate-700 leading-snug">
                      <strong className="text-[#12343B]">🎯 Mục tiêu: </strong>
                      {proto.target}
                    </div>

                    {/* Liều lượng bù dịch */}
                    <div className="text-[10.5px] leading-snug">
                      <div className="font-bold text-[#12343B] mb-0.5 flex items-center gap-1">
                        <Droplets size={12} style={{ color: proto.color }} />
                        <span>Liều lượng dịch bù:</span>
                      </div>
                      <p className="text-slate-600 pl-4">{proto.dose}</p>
                    </div>

                    {/* Dinh dưỡng & Kẽm */}
                    <div className="text-[10.5px] leading-snug">
                      <div className="font-bold text-[#12343B] mb-0.5">
                        🥣 Dinh dưỡng &amp; Bổ sung Kẽm:
                      </div>
                      <p className="text-slate-600 pl-4">{proto.diet}</p>
                      <p className="text-slate-600 pl-4 mt-1">
                        <strong>Kẽm (Zinc):</strong> {proto.zinc}
                      </p>
                    </div>
                  </div>

                  {/* Cảnh báo cờ đỏ / Điểm lưu ý */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 p-2 rounded-xl bg-red-50/60 border border-red-100 text-[10px] text-red-700 leading-tight">
                    <strong className="font-bold">⚠️ Báo động chuyển viện: </strong>
                    {proto.redFlags}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* =================================================================
              TAB 3: TÌNH HUỐNG LÂM SÀNG THỰC TẾ (QUICK QUIZ CASE)
              ================================================================= */}
          {activeTab === 'case-study' && (
            <motion.div
              key="case-study"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-12 gap-3.5 h-full max-h-[500px] items-stretch"
            >
              {/* Left Column: Bệnh cảnh lâm sàng (Col 1-5) */}
              <div className="col-span-12 lg:col-span-5 p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-orange-500/5 border border-amber-200/80 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-heading font-black text-[10px] uppercase shadow-2xs">
                      <Flame size={12} />
                      <span>TÌNH HUỐNG THỰC TẾ</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">
                      Độ khó: Yêu cầu thực tế
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-sm md:text-base text-[#12343B] mb-2 leading-snug">
                    Bệnh cảnh: Xử trí sai lầm thường gặp trong gia đình
                  </h3>

                  <div className="p-3 rounded-2xl bg-white/90 border border-amber-200/60 text-xs text-slate-700 leading-relaxed shadow-2xs mb-3">
                    <p className="font-medium">{CLINICAL_QUIZ.scenario}</p>
                  </div>

                  <div className="font-heading font-extrabold text-xs text-[#0F766E] flex items-center gap-1.5">
                    <HelpCircle size={15} />
                    <span>{CLINICAL_QUIZ.question}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-800 font-semibold">
                  <span>💡 Vận dụng: 3 Mức mất nước &amp; 3 Điều KHÔNG</span>
                  {isAnswered && (
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1 text-[10.5px] font-extrabold px-2 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      <span>Thử lại</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: 3 Lựa chọn & Phản hồi giải thích (Col 6-12) */}
              <div className="col-span-12 lg:col-span-7 flex flex-col justify-between space-y-2">
                <div className="space-y-2">
                  {CLINICAL_QUIZ.options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const showResult = isAnswered && isSelected;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectQuiz(opt)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                          !isAnswered
                            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-400 hover:shadow-xs'
                            : isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                              : 'bg-red-50 border-red-300 shadow-sm'
                            : opt.isCorrect
                            ? 'bg-emerald-50/60 border-emerald-300 border-dashed opacity-80'
                            : 'bg-slate-50/70 border-slate-200 opacity-50'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 font-heading font-black text-xs ${
                              !isAnswered
                                ? 'bg-slate-100 text-slate-700'
                                : opt.isCorrect
                                ? 'bg-emerald-600 text-white'
                                : isSelected
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {opt.id}
                          </span>
                          <p className="text-xs text-[#12343B] font-semibold leading-relaxed flex-1">
                            {opt.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                      CLINICAL_QUIZ.options.find((o) => o.id === selectedOption)?.isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-heading font-black text-xs mb-1">
                      {CLINICAL_QUIZ.options.find((o) => o.id === selectedOption)?.isCorrect ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          <span>KẾT QUẢ: ĐÚNG CHUẨN LÂM SÀNG!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={16} className="text-red-600" />
                          <span>KẾT QUẢ: SAI NGUY HIỂM!</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] font-medium">
                      {CLINICAL_QUIZ.options.find((o) => o.id === selectedOption)?.feedback}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. FOOTER BAR: TÀI LIỆU THAM KHẢO & BẢO CHỨNG Y HỌC */}
      <div className="w-full flex items-center justify-between gap-3 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-2xs text-xs flex-shrink-0 mt-1.5">
        <button
          onClick={() => {
            sfx.tick();
            setShowSourcesModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#12343B] font-bold text-[11px] transition-colors cursor-pointer"
        >
          <BookOpen size={13} className="text-[#0D9488]" />
          <span>Danh mục 4 nguồn tài liệu y khoa thẩm định</span>
          <span className="px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 text-[9.5px]">
            Bộ Y tế &amp; WHO
          </span>
        </button>

        <div className="flex items-center gap-3 text-[11px] text-[#5B7B80] font-semibold">
          <div className="hidden sm:flex items-center gap-1 text-[#0D9488]">
            <ShieldCheck size={14} />
            <span>Phác đồ chuẩn QĐ 4121/QĐ-BYT</span>
          </div>

          <span className="text-slate-300">|</span>

          <span className="text-slate-600">
            Khép lại Chuyên đề Bệnh lý 2 · Sẵn sàng tranh tài minigame
          </span>
        </div>
      </div>

      {/* 5. VERIFIED SOURCES MODAL */}
      <AnimatePresence>
        {showSourcesModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xl max-w-xl w-full"
            >
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-[#12343B]">
                      TÀI LIỆU Y KHOA XÁC MINH (BỆNH 2: TIÊU CHẢY CẤP)
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Kiểm chứng bởi Bộ Y tế Việt Nam, WHO và CDC
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowSourcesModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {OFFICIAL_SOURCES.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0D9488] text-[10.5px]">
                        {s.org}
                      </span>
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                        {s.year}
                      </span>
                    </div>
                    <div className="font-bold text-[#12343B] text-xs mb-0.5">
                      {s.doc}
                    </div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Tuân thủ quy chuẩn y học chứng cứ (Evidence-based Medicine)</span>
                <button
                  onClick={() => setShowSourcesModal(false)}
                  className="px-3 py-1 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 cursor-pointer transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide9Closing;
