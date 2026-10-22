import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  RotateCcw,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Award,
  Stethoscope,
  HeartHandshake,
  Users,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  Flame,
  Droplets,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import sources from '../data/sources';
import content from '../data/content';
import { teamMembers, teamInfo } from '../data/teamMembers';
import GutHealthShield from '../components/svg/GutHealthShield';
import sfx from '../audio/sfx';

export function Slide12Closing({ onSelectSlide }) {
  const data = content.slide12;
  const [activeTab, setActiveTab] = useState('takeaways'); // 'takeaways' | 'qa' | 'pledge' | 'team'
  const [showSourcesModal, setShowSourcesModal] = useState(false);
  const [selectedQA, setSelectedQA] = useState(0); // Index of selected QA in Master-Detail layout

  // 5T Pledge State
  const [pledges, setPledges] = useState({
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false
  });
  const [hasCelebratedPledge, setHasCelebratedPledge] = useState(false);

  // Trigger gentle confetti on arrival
  useEffect(() => {
    sfx.success();
    fireConfetti();
  }, []);

  // Keyboard shortcut listener for Tab 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        sfx.tick();
        if (e.key === '1') setActiveTab('takeaways');
        if (e.key === '2') setActiveTab('qa');
        if (e.key === '3') setActiveTab('pledge');
        if (e.key === '4') setActiveTab('team');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#1FBFA8', '#3BB8F0', '#FFD166', '#FF8A5B', '#EF4B5F']
      });
    } catch (e) {}
  };

  const togglePledge = (key) => {
    sfx.tick();
    const nextState = { ...pledges, [key]: !pledges[key] };
    setPledges(nextState);

    const allChecked = Object.values(nextState).every(Boolean);
    if (allChecked && !hasCelebratedPledge) {
      setHasCelebratedPledge(true);
      sfx.success();
      fireConfetti();
    }
  };

  const checkAllPledges = () => {
    sfx.success();
    setPledges({ t1: true, t2: true, t3: true, t4: true, t5: true });
    setHasCelebratedPledge(true);
    fireConfetti();
  };

  const completedPledgesCount = Object.values(pledges).filter(Boolean).length;

  const pledgeItems = [
    {
      id: 't1',
      code: 'T1',
      title: 'TAY SẠCH TOÀN DIỆN',
      action: 'Rửa tay 6 bước với xà phòng ≥ 30 giây',
      desc: 'Thực hiện trước khi ăn, sau khi đi vệ sinh và sau khi chạm bề mặt công cộng để cắt đứt chu trình lây truyền Phân – Miệng.',
      icon: '🧼',
      color: '#1FBFA8'
    },
    {
      id: 't2',
      code: 'T2',
      title: 'THỨC ĂN NẤU CHÍN',
      action: 'Triệt để ăn chín, uống sôi, tách biệt sống - chín',
      desc: 'Tuyệt đối không ăn tiết canh, gỏi sống, nem chua; đậy lồng bàn chống ruồi nhặng để ngăn ngừa vi khuẩn Salmonella, E. coli, Rotavirus.',
      icon: '🍲',
      color: '#FF8A5B'
    },
    {
      id: 't3',
      code: 'T3',
      title: 'THUỐC ĐÚNG CHỈ ĐỊNH',
      action: 'Không tự ý dùng kháng sinh, NSAID hay thuốc cầm',
      desc: 'Tránh lạm dụng thuốc giảm đau NSAID gây thủng loét dạ dày; không tự uống Loperamide gây liệt ruột, nhiễm độc khi bị tiêu chảy.',
      icon: '💊',
      color: '#EF4B5F'
    },
    {
      id: 't4',
      code: 'T4',
      title: 'THÓI QUEN ĐIỀU ĐỘ',
      action: 'Ăn đúng giờ, nhai kỹ, không nằm ngay sau ăn',
      desc: 'Giúp dạ dày tiết axit HCl nhịp nhàng; tránh nằm ngay trong vòng 2-3 giờ sau khi ăn để bảo vệ cơ thắt thực quản dưới chống GERD.',
      icon: '⏰',
      color: '#3BB8F0'
    },
    {
      id: 't5',
      code: 'T5',
      title: 'TỦ THUỐC CÓ ORESOL',
      action: 'Luôn dự phòng và pha chuẩn 100% tỷ lệ nước sạch',
      desc: 'Gói Oresol nồng độ thẩm thấu 245 mOsm/L chuẩn WHO; uống từng ngụm nhỏ để bù nước tức thì, chống kiệt nước và trụy mạch.',
      icon: '💧',
      color: '#FFD166'
    }
  ];

  const clinicalQAs = [
    {
      id: 'hp',
      shortTitle: 'Có cần dùng kháng sinh diệt ngay vi khuẩn H. pylori?',
      q: 'Nhiễm vi khuẩn H. pylori có nhất thiết phải dùng kháng sinh diệt ngay không?',
      badge: 'Chỉ định Y khoa',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      drAnswer:
        'KHÔNG PHẢI TẤT CẢ! Ước tính có tới 70% người Việt Nam mang H. pylori trong dạ dày, nhưng đa số vi khuẩn chung sống hòa bình không gây bệnh. Phác đồ kháng sinh tiệt trừ H. pylori chỉ được chỉ định khi: có ổ loét dạ dày – tá tràng đang tiến triển, viêm teo niêm mạc mạn tính, hoặc gia đình có người thân trực hệ từng mắc ung thư dạ dày.',
      highlight: 'Chỉ diệt H. pylori khi có kết quả xét nghiệm dương tính kèm chỉ định và phác đồ chuẩn của Bác sĩ chuyên khoa tiêu hóa.',
      riskWarning: 'Tự ý mua kháng sinh uống bừa bãi là nguyên nhân hàng đầu gây vi khuẩn kháng thuốc (nhờn thuốc) và rối loạn hệ vi sinh đường ruột.'
    },
    {
      id: 'oresol',
      shortTitle: 'Oresol khó uống, có thể pha thêm đường hoặc sữa không?',
      q: 'Oresol có vị lợ khó uống, có thể pha thêm chút đường hay sữa cho dễ uống không?',
      badge: 'Cảnh báo Nguy kịch',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      drAnswer:
        'TUYỆT ĐỐI CẤM! Gói Oresol đã được Tổ chức Y tế Thế giới (WHO) tính toán tỷ lệ ion Natri, Kali và Glucose chính xác tuyệt đối để đạt áp lực thẩm thấu tối ưu (245 mOsm/L). Việc pha thêm đường, sữa hay nước ngọt sẽ làm tăng áp lực thẩm thấu trong lòng ruột lên quá cao, hút ngược nước từ mạch máu ra lòng ruột.',
      highlight: 'Luôn pha đúng 100% thể tích nước đun sôi để nguội ghi trên vỏ gói (thường là 1000ml hoặc 200ml). Tuyệt đối không chia nhỏ gói thuốc.',
      riskWarning: 'Pha sai tỷ lệ sẽ làm tiêu chảy dữ dội hơn, kiệt nước cấp tính và có nguy cơ co giật, hôn mê do tăng Natri máu!'
    },
    {
      id: 'loperamide',
      shortTitle: 'Vừa bị tiêu chảy có nên uống ngay viên thuốc cầm (Loperamide)?',
      q: 'Vừa bị tiêu chảy có nên uống ngay viên thuốc cầm tiêu chảy (Loperamide) không?',
      badge: 'Phản xạ Sinh lý',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      drAnswer:
        'KHÔNG NÊN TỰ Ý UỐNG! Tiêu chảy là phản xạ bảo vệ sinh lý tự nhiên của cơ thể nhằm tống xuất vi khuẩn, virus và độc tố ra ngoài. Các thuốc cầm tiêu chảy như Loperamide hoạt động bằng cách làm tê liệt nhu động ruột, khiến chất thải bị ứ trệ lại bên trong ống tiêu hóa.',
      highlight: 'Nguyên tắc vàng số 1 khi bị tiêu chảy là BÙ NƯỚC VÀ ĐIỆN GIẢI BẰNG ORESOL, không phải là uống thuốc làm liệt ruột.',
      riskWarning: 'Ứ đọng vi khuẩn và độc tố trong ruột dễ dẫn đến biến chứng nguy hiểm: phình giãn đại tràng nhiễm độc, viêm ruột hoại tử và nhiễm trùng huyết.'
    },
    {
      id: 'redflags',
      shortTitle: 'Những dấu hiệu đau bụng nào cảnh báo cờ đỏ gọi cấp cứu 115?',
      q: 'Những dấu hiệu đau bụng nào cảnh báo cờ đỏ nguy hiểm cần gọi cấp cứu 115 ngay?',
      badge: 'Cờ Đỏ Cấp Cứu 115',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-300',
      drAnswer:
        'CẦN ĐƯA ĐẾN BỆNH VIỆN CẤP CỨU NGAY khi xuất hiện 1 trong các dấu hiệu cờ đỏ: (1) Đau bụng đột ngột, dữ dội như dao đâm, sờ bụng thấy gồng cứng như gỗ (nghi ngờ thủng dạ dày); (2) Nôn ra máu tươi hoặc dịch màu bã cà phê; (3) Đi ngoài phân đen như bã hắc ín, mùi tanh nồng (xuất huyết tiêu hóa); (4) Tiêu chảy mất nước nặng: mắt rất trũng, nếp véo da mất rất chậm (>2 giây), li bì, hôn mê hoặc tụt huyết áp.',
      highlight: 'Không chần chừ, không tự cho uống thuốc giảm đau hay đắp lá tại nhà — phải đưa người bệnh đến cơ sở y tế gần nhất ngay!',
      riskWarning: 'Các biến chứng thủng tạng rỗng hay xuất huyết ồ ạt có thể đe dọa tính mạng chỉ sau vài giờ nếu không phẫu thuật kịp thời.'
    }
  ];

  const tabs = [
    { id: 'takeaways', label: '3 Thông Điệp Vàng', icon: '🌟', key: '1' },
    { id: 'qa', label: 'Vấn Đáp Q&A Y Khoa', icon: '❓', key: '2' },
    { id: 'pledge', label: 'Cam Kết 5T Gut Care', icon: '📜', key: '3', badge: `${completedPledgesCount}/5` },
    { id: 'team', label: 'Đội Ngũ 11A5 & Nguồn', icon: '👥', key: '4' }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 lg:px-12 pt-2 pb-16 md:pb-20 select-none overflow-hidden text-[#12343B]">
      {/* ========================================================= */}
      {/* 1. SLIDE HEADER */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between gap-4 mb-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1FBFA8] to-[#3BB8F0] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-[#1FBFA8]/20 shrink-0">
            10
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-[#1FBFA8] tracking-widest uppercase">
                {data.tag || '10 · TỔNG KẾT & CAM KẾT HÀNH ĐỘNG'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBFA8]"></span>
              <span className="text-[11px] text-[#5B7B80] font-semibold">
                Báo cáo Chuyên đề Sinh học 11 · {teamInfo.groupName} – {teamInfo.className}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B] leading-tight tracking-tight">
              TIÊU HÓA KHỎE MẠNH — KHỞI NGUỒN CUỘC SỐNG VUI TƯƠI
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sfx.whoosh();
              onSelectSlide(1);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-[#12343B] font-heading font-bold text-xs border border-gray-200/90 shadow-xs hover:border-[#1FBFA8]/40 transition-all active:scale-95"
            title="Quay lại Trang bìa (Slide 1)"
          >
            <RotateCcw size={13} className="text-[#1FBFA8]" />
            <span>Chiếu lại từ đầu</span>
          </button>

          <button
            onClick={() => {
              sfx.success();
              fireConfetti();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD166] via-[#FF8A5B] to-[#EF4B5F] text-white font-heading font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Bắn pháo hoa ăn mừng kết thúc báo cáo!"
          >
            <Sparkles size={14} className="animate-spin" />
            <span>Pháo hoa 🎉</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. REFINED SEGMENTED NAVIGATION CONTROL */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between gap-2 p-1 rounded-2xl bg-slate-200/50 backdrop-blur-md border border-white/60 mb-2.5 shrink-0">
        <div className="grid grid-cols-4 gap-1 w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.tick();
                  setActiveTab(tab.id);
                }}
                className={`relative px-3 py-1.5 rounded-xl text-center font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-[#12343B] shadow-sm'
                    : 'text-[#5B7B80] hover:text-[#12343B] hover:bg-white/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="closing-active-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-white/80"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 text-sm">{tab.icon}</span>
                <span className="relative z-10 truncate">{tab.label}</span>
                {tab.badge && (
                  <span className="relative z-10 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-[#1FBFA8] text-white">
                    {tab.badge}
                  </span>
                )}
                <span className="relative z-10 text-[10px] font-mono opacity-50 hidden lg:inline">
                  [{tab.key}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT DISPLAY AREA */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-hidden min-h-0 relative">
        <AnimatePresence mode="wait">
          {/* ------------------------------------------------------- */}
          {/* VIEW 1: 3 CORE TAKEAWAYS + GUT HEALTH SHIELD SVG */}
          {/* ------------------------------------------------------- */}
          {activeTab === 'takeaways' && (
            <motion.div
              key="takeaways"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full h-full grid grid-cols-12 gap-3.5 items-stretch"
            >
              {/* Left Column: Golden Shield SVG + KPI Metrics (Col 1-5) */}
              <div className="col-span-12 lg:col-span-5 p-3.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between border-b border-gray-100 pb-2 px-1">
                  <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5 tracking-wide">
                    <ShieldCheck size={16} className="text-[#1FBFA8]" />
                    LÁ CHẮN BẢO VỆ ĐƯỜNG TIÊU HÓA
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#1FBFA8]/15 text-[#1FBFA8] border border-[#1FBFA8]/20">
                    WHO & BỘ Y TẾ
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center w-full py-1">
                  <GutHealthShield
                    onPledgeClick={() => {
                      fireConfetti();
                    }}
                  />
                </div>

                {/* 3 High-Yield Metric Cards */}
                <div className="w-full grid grid-cols-3 gap-2 text-center pt-2 border-t border-gray-100">
                  <div className="p-2 rounded-2xl bg-[#FFF2EB]/90 border border-[#FF8A5B]/20">
                    <div className="font-heading font-extrabold text-sm text-[#FF8A5B]">70%</div>
                    <div className="text-[10px] text-[#5B7B80] font-semibold leading-tight mt-0.5">Dân số mang HP</div>
                    <div className="text-[9px] text-gray-400">Chỉ diệt khi có chỉ định</div>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#EAF6FD]/90 border border-[#3BB8F0]/20">
                    <div className="font-heading font-extrabold text-sm text-[#3BB8F0]">245</div>
                    <div className="text-[10px] text-[#5B7B80] font-semibold leading-tight mt-0.5">mOsm/L Oresol</div>
                    <div className="text-[9px] text-gray-400">Chuẩn thẩm thấu WHO</div>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#E3F7F2]/90 border border-[#1FBFA8]/20">
                    <div className="font-heading font-extrabold text-sm text-[#1FBFA8]">≥ 30s</div>
                    <div className="text-[10px] text-[#5B7B80] font-semibold leading-tight mt-0.5">Rửa tay 6 bước</div>
                    <div className="text-[9px] text-gray-400">Cắt đường phân – miệng</div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Pillar Takeaways + Philosophy Banner (Col 6-12) */}
              <div className="col-span-12 lg:col-span-7 flex flex-col justify-between gap-2.5">
                {/* 1. Loét dạ dày */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF2EB]/90 via-white to-white border border-[#FF8A5B]/30 shadow-xs flex items-start gap-3 flex-1 border-l-4 border-l-[#FF8A5B]">
                  <div className="w-9 h-9 rounded-xl bg-[#FF8A5B]/15 text-[#FF8A5B] flex items-center justify-center shrink-0 mt-0.5">
                    <Flame size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-heading font-extrabold text-sm text-[#D35400]">
                        1. DẠ DÀY & TÁ TRÀNG: CÂN BẰNG TẤN CÔNG & BẢO VỆ
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF2EB] text-[#FF8A5B]">
                        Đường tiêu hóa trên
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      Giữ vững cân bằng giữa <strong>yếu tố bảo vệ</strong> (chất nhầy, HCO₃⁻, tưới máu) và <strong>yếu tố tấn công</strong> (axit HCl, Pepsin, <em>H. pylori</em>). Tuyệt đối không lạm dụng thuốc giảm đau NSAID và chỉ uống kháng sinh diệt HP khi có chỉ định của Bác sĩ chuyên khoa.
                    </p>
                  </div>
                </div>

                {/* 2. Tiêu chảy cấp */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#EAF6FD]/90 via-white to-white border border-[#3BB8F0]/30 shadow-xs flex items-start gap-3 flex-1 border-l-4 border-l-[#3BB8F0]">
                  <div className="w-9 h-9 rounded-xl bg-[#3BB8F0]/15 text-[#3BB8F0] flex items-center justify-center shrink-0 mt-0.5">
                    <Droplets size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-heading font-extrabold text-sm text-[#0284C7]">
                        2. ĐƯỜNG RUỘT & TIÊU CHẢY: BÙ NƯỚC ORESOL KỊP THỜI
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF6FD] text-[#3BB8F0]">
                        Đường tiêu hóa dưới
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      Tiêu chảy là phản xạ sinh lý tự nhiên nhằm đào thải độc tố; mối nguy hiểm lớn nhất là <strong>mất nước và điện giải</strong>. Bù ngay <strong>Oresol pha đúng 100% tỷ lệ nước</strong>; không tự ý uống thuốc cầm (Loperamide) gây liệt ruột, nhiễm độc nguy kịch.
                    </p>
                  </div>
                </div>

                {/* 3. Lối sống phòng ngừa */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#E3F7F2]/90 via-white to-white border border-[#1FBFA8]/30 shadow-xs flex items-start gap-3 flex-1 border-l-4 border-l-[#1FBFA8]">
                  <div className="w-9 h-9 rounded-xl bg-[#1FBFA8]/15 text-[#1FBFA8] flex items-center justify-center shrink-0 mt-0.5">
                    <Activity size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-heading font-extrabold text-sm text-[#0F766E]">
                        3. NỀN TẢNG BỀN VỮNG: ĂN CHÍN UỐNG SÔI & TAY SẠCH
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E3F7F2] text-[#1FBFA8]">
                        Phòng ngừa từ gốc
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      Cắt đứt hoàn toàn chu trình lây lan Phân – Miệng bằng thói quen <strong>rửa tay 6 bước</strong> bằng xà phòng. Ăn chín uống sôi, nhai kỹ, sinh hoạt điều độ để nuôi dưỡng hệ vi sinh đường ruột (microbiome) khỏe mạnh trọn đời.
                    </p>
                  </div>
                </div>

                {/* Slogan Banner */}
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#12343B] via-[#0F766E] to-[#1FBFA8] text-white flex items-center justify-between px-4 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <HeartHandshake size={20} className="text-[#FFD166] shrink-0" />
                    <span className="text-xs font-semibold leading-snug">
                      "Yêu thương bản thân bắt đầu từ việc chăm sóc đúng cách cho hệ tiêu hóa mỗi ngày."
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 uppercase tracking-widest shrink-0">
                    GUT CARE 11A5
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------- */}
          {/* VIEW 2: CLINICAL Q&A SPOTLIGHT (MASTER-DETAIL LAYOUT) */}
          {/* ------------------------------------------------------- */}
          {activeTab === 'qa' && (
            <motion.div
              key="qa"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full h-full grid grid-cols-12 gap-3.5 items-stretch"
            >
              {/* Left Column: 4 Selectable Clinical Scenarios (Col 1-5) */}
              <div className="col-span-12 lg:col-span-5 p-3 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div className="border-b border-gray-100 pb-2 mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[#3BB8F0]/15 text-[#3BB8F0]">
                      <Stethoscope size={16} />
                    </span>
                    <span className="font-heading font-extrabold text-xs text-[#12343B] uppercase tracking-wide">
                      4 TÌNH HUỐNG LÂM SÀNG THƯỜNG GẶP
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5B7B80] mt-0.5">
                    Nhấp chọn từng câu hỏi để xem giải đáp chuyên khoa:
                  </p>
                </div>

                <div className="space-y-2 flex-1">
                  {clinicalQAs.map((item, idx) => {
                    const isSelected = selectedQA === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          sfx.tick();
                          setSelectedQA(idx);
                        }}
                        className={`w-full p-2.5 rounded-2xl text-left transition-all border flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#EAF6FD] border-[#3BB8F0] shadow-sm ring-1 ring-[#3BB8F0]/30'
                            : 'bg-white hover:bg-slate-50 border-gray-100'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-xl flex items-center justify-center font-heading font-extrabold text-xs shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#3BB8F0] text-white shadow-xs'
                              : 'bg-slate-100 text-[#5B7B80]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span
                              className={`text-[9.5px] font-bold px-2 py-0.2 rounded-full border ${item.badgeColor}`}
                            >
                              {item.badge}
                            </span>
                            {isSelected && (
                              <ArrowRight size={12} className="text-[#3BB8F0] shrink-0" />
                            )}
                          </div>
                          <div className="font-heading font-bold text-xs text-[#12343B] line-clamp-2 leading-snug">
                            {item.shortTitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 p-2 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-[#5B7B80] flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#1FBFA8] shrink-0" />
                  <span>Dữ liệu y khoa chuẩn hóa theo Bộ Y tế & WHO</span>
                </div>
              </div>

              {/* Right Column: Active Spotlight Card (Col 6-12) */}
              <div className="col-span-12 lg:col-span-7 p-4.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-3">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${clinicalQAs[selectedQA].badgeColor}`}
                    >
                      {clinicalQAs[selectedQA].badge}
                    </span>
                    <span className="text-xs text-[#5B7B80] font-semibold">
                      Tình huống lâm sàng #{selectedQA + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base md:text-lg text-[#12343B] mb-3 leading-snug">
                    {clinicalQAs[selectedQA].q}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs md:text-sm text-[#334155] leading-relaxed mb-3">
                    <div className="flex items-center gap-1.5 font-bold text-[#12343B] mb-1 text-xs uppercase tracking-wider">
                      <Stethoscope size={14} className="text-[#3BB8F0]" />
                      <span>Ý kiến Bác sĩ chuyên khoa tiêu hóa:</span>
                    </div>
                    {clinicalQAs[selectedQA].drAnswer}
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Highlight Box */}
                  <div className="p-3 rounded-2xl bg-[#E3F7F2] border border-[#1FBFA8]/30 text-[#0F766E] text-xs font-medium flex items-start gap-2.5 shadow-xs">
                    <span className="text-base shrink-0">💡</span>
                    <div>
                      <strong className="font-bold text-[#0F766E]">Điểm mấu chốt: </strong>
                      {clinicalQAs[selectedQA].highlight}
                    </div>
                  </div>

                  {/* Risk Warning Box */}
                  <div className="p-2.5 rounded-2xl bg-[#FFF2EB] border border-[#FF8A5B]/30 text-[#C2410C] text-[11px] font-medium flex items-start gap-2">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5 text-[#FF8A5B]" />
                    <div>
                      <strong className="font-bold text-[#C2410C]">Cảnh báo nguy cơ: </strong>
                      {clinicalQAs[selectedQA].riskWarning}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------- */}
          {/* VIEW 3: 5T PLEDGE CHECKLIST (CAM KẾT SỨC KHỎE 5T) */}
          {/* ------------------------------------------------------- */}
          {activeTab === 'pledge' && (
            <motion.div
              key="pledge"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full h-full p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
            >
              {/* Pledge Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-[#1FBFA8]/15 text-[#1FBFA8]">
                      <Award size={18} />
                    </span>
                    <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B]">
                      CAM KẾT 5T HÀNH ĐỘNG VÌ HỆ TIÊU HÓA KHỎE MẠNH
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#5B7B80] mt-0.5">
                    Hãy nhấp chọn các cam kết mà bạn và gia đình quyết tâm thực hiện từ hôm nay:
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-heading font-extrabold text-[#1FBFA8]">
                      {completedPledgesCount} / 5 Cam kết
                    </div>
                    <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] transition-all duration-300"
                        style={{ width: `${(completedPledgesCount / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={checkAllPledges}
                    className="px-3 py-1.5 rounded-xl bg-[#1FBFA8] hover:bg-[#19a591] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    Tích chọn tất cả
                  </button>
                </div>
              </div>

              {/* 5 Pledge Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 flex-1">
                {pledgeItems.map((p, idx) => {
                  const isChecked = pledges[p.id];
                  const isLast = idx === 4; // T5 takes full width on md screen if needed
                  return (
                    <div
                      key={p.id}
                      onClick={() => togglePledge(p.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isLast ? 'md:col-span-2 lg:col-span-1' : ''
                      } ${
                        isChecked
                          ? 'bg-[#E3F7F2]/90 border-[#1FBFA8] shadow-xs ring-1 ring-[#1FBFA8]/30'
                          : 'bg-white hover:bg-slate-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{p.icon}</span>
                          <div>
                            <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-md bg-slate-100 text-[#5B7B80]">
                              {p.code}
                            </span>
                            <h4 className="font-heading font-extrabold text-xs text-[#12343B] mt-0.5">
                              {p.title}
                            </h4>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                            isChecked
                              ? 'bg-[#1FBFA8] text-white shadow-xs'
                              : 'border-2 border-gray-300 bg-white'
                          }`}
                        >
                          {isChecked && <CheckCircle2 size={16} />}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-[#0F766E] mb-1">
                        👉 {p.action}
                      </div>

                      <p className="text-[10.5px] text-[#475569] leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Celebration Certificate Banner */}
              <div
                className={`mt-2 p-2.5 rounded-2xl text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  completedPledgesCount === 5
                    ? 'bg-gradient-to-r from-[#FFD166] via-[#1FBFA8] to-[#3BB8F0] text-white shadow-md'
                    : 'bg-slate-100 text-[#5B7B80]'
                }`}
              >
                <span>🏆</span>
                <span>
                  {completedPledgesCount === 5
                    ? 'XUẤT SẮC! BẠN ĐÃ NHẬN HUY HIỆU ĐẠI SỨ SỨC KHỎE GUT CARE MASTER 11A5!'
                    : `Hãy hoàn thành thêm ${5 - completedPledgesCount} cam kết để mở khóa Huy hiệu Sức khỏe!`}
                </span>
              </div>
            </motion.div>
          )}

          {/* ------------------------------------------------------- */}
          {/* VIEW 4: TEAM CREDITS & MEDICAL SOURCES */}
          {/* ------------------------------------------------------- */}
          {activeTab === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="w-full h-full grid grid-cols-12 gap-3.5 items-stretch"
            >
              {/* Left Column: 9 Team Members of Group 2 (Col 1-7) */}
              <div className="col-span-12 lg:col-span-7 p-3.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                    <Users size={16} className="text-[#3BB8F0]" />
                    ĐỘI NGŨ THỰC HIỆN DỰ ÁN ({teamInfo.groupName} – {teamInfo.className})
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3BB8F0]/10 text-[#0284C7]">
                    9 Thành viên chuyên trách
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 flex-1">
                  {teamMembers.map((m) => (
                    <div
                      key={m.id}
                      className="p-2 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.avatar || m.gif ? (
                            <img src={m.avatar || m.gif} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{m.id}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-heading font-bold text-xs text-[#12343B] truncate">
                            {m.name}
                          </div>
                          <div className="text-[10px] font-semibold text-[#0284C7] truncate">
                            {m.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-[9.5px] text-[#64748B] line-clamp-2 leading-tight">
                        {m.titleRole}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4 Credible Medical Authorities (Col 8-12) */}
              <div className="col-span-12 lg:col-span-5 p-3.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                    <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                      <BookOpen size={16} className="text-[#1FBFA8]" />
                      BẢO CHỨNG Y KHOA CHÍNH THỐNG
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#E3F7F2]/80 border border-[#1FBFA8]/20">
                      <div className="font-bold text-[#12343B] flex items-center gap-1.5">
                        <span>🇻🇳</span>
                        <span>Bộ Y tế Việt Nam</span>
                      </div>
                      <div className="text-[10.5px] text-[#5B7B80] mt-0.5">
                        Quyết định 4121/QĐ-BYT (Xử trí tiêu chảy) & 462/QĐ-BYT (Loét dạ dày)
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#EAF6FD]/80 border border-[#3BB8F0]/20">
                      <div className="font-bold text-[#12343B] flex items-center gap-1.5">
                        <span>🌐</span>
                        <span>WHO (Tổ chức Y tế Thế giới)</span>
                      </div>
                      <div className="text-[10.5px] text-[#5B7B80] mt-0.5">
                        Fact sheet Diarrhoeal disease & H. pylori Gastric Guidelines
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#FFF2EB]/80 border border-[#FF8A5B]/20">
                      <div className="font-bold text-[#12343B] flex items-center gap-1.5">
                        <span>🇺🇸</span>
                        <span>CDC Hoa Kỳ (Trung tâm Kiểm soát Bệnh tật)</span>
                      </div>
                      <div className="text-[10.5px] text-[#5B7B80] mt-0.5">
                        Handwashing: Clean Hands Save Lives & Food Safety Standards
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-purple-50/80 border border-purple-200">
                      <div className="font-bold text-[#12343B] flex items-center gap-1.5">
                        <span>🏥</span>
                        <span>Mayo Clinic & Cleveland Clinic</span>
                      </div>
                      <div className="text-[10.5px] text-[#5B7B80] mt-0.5">
                        Clinical Updates on Peptic Ulcer Disease & Gastrointestinal Health
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sfx.tick();
                    setShowSourcesModal(true);
                  }}
                  className="mt-2.5 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#12343B] font-heading font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 cursor-pointer"
                >
                  <BookOpen size={14} className="text-[#1FBFA8]" />
                  <span>Mở danh mục trích dẫn đầy đủ (Modal)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* 4. FULL MEDICAL SOURCES MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showSourcesModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3 border-b pb-3">
                <div className="font-heading font-extrabold text-base text-[#12343B] flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-[#1FBFA8]/15 text-[#1FBFA8]">
                    <BookOpen size={18} />
                  </span>
                  <span>DANH MỤC NGUỒN THAM KHẢO & TƯ LIỆU Y KHOA ĐÃ KIỂM CHỨNG</span>
                </div>
                <button
                  onClick={() => setShowSourcesModal(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-[#5B7B80] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
                {sources.map((src) => (
                  <div
                    key={src.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#1FBFA8] uppercase tracking-wider text-[10px]">
                        Slide {src.slide} · {src.type === 'image' ? 'ẢNH TƯ LIỆU BẢN QUYỀN' : 'KHẲNG ĐỊNH Y KHOA'}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {src.license}
                      </span>
                    </div>
                    <div className="font-bold text-[#12343B] mb-0.5">
                      {src.title}
                    </div>
                    <div className="text-[#5B7B80] text-[11px] mb-1.5 leading-relaxed">
                      {src.claim || src.description}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1.5 border-t border-slate-200/60">
                      <span>{src.author} ({src.organization}, {src.year})</span>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#3BB8F0] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Truy cập nguồn</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide12Closing;