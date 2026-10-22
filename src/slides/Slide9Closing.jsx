import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, BookOpen, ExternalLink, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content';
import sfx from '../audio/sfx';

const DEFAULT_TAKEAWAYS = [
  {
    icon: '💧',
    title: 'Mất nước là hiểm họa số 1',
    desc: 'Tiêu chảy cấp gây kiệt nước và điện giải cực nhanh. Theo dõi sát tri giác, độ trũng mắt và nếp véo da bụng (>2s là báo động đỏ).',
    color: '#0284C7'
  },
  {
    icon: '🧪',
    title: 'Nguyên tắc vàng bù Oresol',
    desc: 'Pha đúng 100% thể tích nước sạch theo chỉ dẫn (245 mOsm/L). Uống từng ngụm nhỏ rải rác; tuyệt đối không pha thêm đường hay sữa.',
    color: '#1FBFA8'
  },
  {
    icon: '🚨',
    title: 'Không tự ý dùng thuốc cầm',
    desc: 'Tiêu chảy là phản xạ tống xuất mầm bệnh. Tuyệt đối KHÔNG tự ý uống thuốc cầm (Loperamide) gây liệt ruột, viêm ruột hoại tử!',
    color: '#EF4B5F'
  }
];

const DEFAULT_SOURCES = [
  'Bộ Y tế Việt Nam — Hướng dẫn xử trí tiêu chảy cấp ở trẻ em và người lớn (QĐ 4121/QĐ-BYT)',
  'WHO (Tổ chức Y tế Thế giới) — The Treatment of Diarrhoea: A manual for physicians',
  'CDC Hoa Kỳ — Prevention of Rotavirus Gastroenteritis & Food Safety Guidelines',
  'Viện Dinh dưỡng Quốc gia — Chế độ ăn và dinh dưỡng phục hồi cho người bệnh tiêu chảy'
];

export function Slide9Closing({ onSelectSlide, onSelectView }) {
  const data = content.slide9 || {};
  const takeaways = data.takeaways && data.takeaways.length > 0 ? data.takeaways : DEFAULT_TAKEAWAYS;
  const sourcesList = data.sources && data.sources.length > 0 ? data.sources : DEFAULT_SOURCES;

  const [showSources, setShowSources] = useState(false);

  useEffect(() => {
    sfx.success();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1FBFA8', '#3BB8F0', '#FFD166', '#FF8A5B']
      });
    } catch (e) {}
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 py-2 select-none overflow-hidden">
      {/* Slide Header */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#3BB8F0]/15 border border-[#3BB8F0]/30 text-[#0284C7] text-xs font-bold uppercase mb-1">
            <Sparkles size={13} className="text-[#0284C7]" />
            <span>TỔNG KẾT NHANH BỆNH LÝ 2: TIÊU CHẢY CẤP</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B]">
            3 NGUYÊN TẮC CỐT LÕI CẦN GHI NHỚ TRONG TIÊU CHẢY CẤP
          </h2>
        </div>

        {onSelectSlide && (
          <button
            onClick={() => {
              sfx.whoosh();
              onSelectSlide(9); // Jump to Minigame Slide 9
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-heading font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <span>Sang Slide 09 Minigame</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* 3 Core Takeaway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-1 flex-1 items-stretch min-h-0">
        {takeaways.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-white shadow-md flex flex-col justify-between"
            style={{ borderTop: `4px solid ${item.color}` }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  Nguyên tắc #{idx + 1}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-sm md:text-base text-[#12343B] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#5B7B80] leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1FBFA8]">
              <CheckCircle2 size={14} />
              <span>Khuyến nghị chuẩn Bộ Y tế & WHO</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Actions & References Toggle */}
      <div className="w-full flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-2xs text-xs flex-shrink-0 mt-1">
        <button
          onClick={() => {
            sfx.tick();
            setShowSources(!showSources);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#12343B] font-semibold transition-colors"
        >
          <BookOpen size={14} className="text-[#1FBFA8]" />
          <span>{showSources ? 'Ẩn tài liệu tham khảo' : 'Xem nguồn tài liệu y khoa đã kiểm chứng (4 nguồn)'}</span>
        </button>

        <div className="flex items-center gap-2">
          {onSelectView && (
            <button
              onClick={() => {
                sfx.tick();
                onSelectView(0); // Return to Symptoms F1
              }}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#5B7B80] font-bold border border-gray-200"
            >
              ← Xem lại F1 Dấu hiệu
            </button>
          )}

          <div className="text-[11px] text-[#5B7B80] font-semibold flex items-center gap-1">
            <ShieldCheck size={14} className="text-[#1FBFA8]" />
            <span>Phác đồ A, B, C theo QĐ 4121/QĐ-BYT</span>
          </div>
        </div>
      </div>

      {/* Verified Sources Expandable Modal / Drawer */}
      <AnimatePresence>
        {showSources && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-3xl bg-white border border-gray-200 shadow-2xl max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <h4 className="font-heading font-extrabold text-xs text-[#12343B] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={16} className="text-[#1FBFA8]" />
                  <span>Nguồn tài liệu y khoa xác minh:</span>
                </h4>
                <button
                  onClick={() => setShowSources(false)}
                  className="text-gray-400 hover:text-gray-700 text-sm font-bold px-1"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2 text-xs text-[#5B7B80]">
                {sourcesList.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FBFA8] mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide9Closing;
