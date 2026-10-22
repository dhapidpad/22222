import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, BookOpen, ExternalLink, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide10Closing({ onSelectSlide }) {
  const data = content.slide10;
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
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2 select-none">
      {/* Slide Header with Thank You */}
      <div className="text-center my-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1FBFA8]/15 border border-[#1FBFA8]/30 text-[#1FBFA8] text-xs font-bold uppercase mb-2">
          <span>🌿</span>
          <span>{data.tag}</span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B]">
          CẢM ƠN QUÝ THẦY CÔ VÀ CÁC BẠN ĐÃ LẮNG NGHE!
        </h2>
        <p className="text-xs md:text-sm text-[#5B7B80] font-medium mt-1">
          "Chuyên đề Sinh học: Các Bệnh Về Dạ Dày Thường Gặp (Viêm Dạ Dày Cấp Tính & Trào Ngược GERD)"
        </p>
      </div>

      {/* 3 Core Takeaway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
        {data.takeaways.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="p-5 rounded-3xl bg-white/85 backdrop-blur-md border border-white shadow-xl flex flex-col justify-between"
            style={{ borderTop: `4px solid ${item.color}` }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  Ghi nhớ #{idx + 1}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-base text-[#12343B] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#5B7B80] leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1FBFA8]">
              <CheckCircle2 size={13} />
              <span>Khuyến nghị y khoa chuẩn</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Actions & References Toggle */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/75 backdrop-blur-md border border-white shadow-sm text-xs">
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

        <button
          onClick={() => {
            sfx.tick();
            onSelectSlide(1);
          }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-bold shadow hover:opacity-95"
        >
          <RotateCcw size={14} />
          <span>Xem lại từ đầu (Slide 1)</span>
        </button>
      </div>

      {/* Verified Sources Expandable Modal / Drawer */}
      <AnimatePresence>
        {showSources && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="p-4 rounded-2xl bg-white/95 border border-gray-200 shadow-md">
              <h4 className="font-heading font-bold text-xs text-[#12343B] mb-2 uppercase tracking-wider">
                Nguồn tài liệu đã xác minh:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#5B7B80]">
                {data.sources.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1FBFA8]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide10Closing;
