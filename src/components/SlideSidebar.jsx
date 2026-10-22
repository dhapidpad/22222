import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import sfx from '../audio/sfx';

export const slideManifest = [
  { id: 1, title: 'Trang bìa GUT CARE', category: 'Giới thiệu', group: 'intro', icon: '🌿' },
  { id: 2, title: 'Video giới thiệu (43s)', category: 'Video hoạt hình', group: 'intro', icon: '🎬' },
  { id: 3, title: 'Nhóm thực hiện đề tài', category: 'Thành viên', group: 'team', icon: '👥' },
  { id: 4, title: 'Hệ tiêu hóa & Sinh lý dạ dày (3 file)', category: 'Giải phẫu', group: 'roles', icon: '🫁' },
  { id: 5, title: '🟠 Viêm loét: ① Nguyên nhân (3 file)', category: 'Bệnh 1', group: 'gastritis', icon: '🦠' },
  { id: 6, title: '🟠 Viêm loét: ② Triệu chứng (3 file)', category: 'Bệnh 1', group: 'gastritis', icon: '⚠️' },
  { id: 7, title: '🟠 Viêm loét: ③ Phòng bệnh (3 file)', category: 'Bệnh 1', group: 'gastritis', icon: '🛡️' },
  { id: 8, title: '🔵 Tiêu chảy cấp: Dấu hiệu, Căn nguyên & Phòng bệnh (4 file)', category: 'Bệnh 2', group: 'diarrhea', icon: '💧' },
  { id: 9, title: '🎯 Đấu trí y khoa: Minigame 6 câu', category: 'Trắc nghiệm', group: 'quiz', icon: '🎮' },
  { id: 10, title: '🎓 Tổng kết, Q&A & Cam kết hành động', category: 'Kết luận', group: 'closing', icon: '✨' }
];

export function SlideSidebar({ currentSlide, onSelectSlide, isOpen, onToggle }) {
  const getBadgeStyle = (group) => {
    switch (group) {
      case 'team':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gastritis':
        return 'bg-[#FF8A5B]/15 text-[#D84315] border-[#FF8A5B]/30';
      case 'diarrhea':
        return 'bg-[#3BB8F0]/15 text-[#0288D1] border-[#3BB8F0]/30';
      case 'quiz':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'compare':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'roles':
        return 'bg-[#1FBFA8]/15 text-[#1FBFA8] border-[#1FBFA8]/30';
      case 'closing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-[#5B7B80] border-gray-200';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing when clicking outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={() => onToggle(false)}
            className="fixed inset-0 bg-slate-900 z-40"
          />

          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="fixed top-0 left-0 bottom-0 w-72 md:w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-2xl z-50 flex flex-col justify-between select-none"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1FBFA8] to-[#3BB8F0] flex items-center justify-center text-white text-base shadow-sm">
                  🌿
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#12343B]">
                    GUT CARE
                  </h3>
                  <p className="text-[11px] font-semibold text-[#5B7B80]">
                    10 Slide chuyên đề tiêu hóa
                  </p>
                </div>
              </div>

              {/* Close / Collapse button */}
              <button
                onClick={() => {
                  sfx.tick();
                  onToggle(false);
                }}
                title="Thu gọn sidebar"
                className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#12343B] flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            </div>

            {/* Slide List */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
              {slideManifest.map((s) => {
                const isActive = currentSlide === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      sfx.whoosh();
                      onSelectSlide(s.id);
                      onToggle(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1FBFA8]/15 via-[#3BB8F0]/10 to-transparent border border-[#1FBFA8]/40 shadow-sm'
                        : 'hover:bg-gray-100/80 border border-transparent text-[#5B7B80]'
                    }`}
                  >
                    {/* Number badge */}
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#1FBFA8] text-white shadow-md scale-105'
                          : 'bg-gray-100 text-[#5B7B80] group-hover:bg-white group-hover:text-[#12343B]'
                      }`}
                    >
                      {String(s.id).padStart(2, '0')}
                    </span>

                    {/* Title & Group */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs font-bold truncate ${
                          isActive ? 'text-[#12343B]' : 'text-[#3E5C62] group-hover:text-[#12343B]'
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border ${getBadgeStyle(
                            s.group
                          )}`}
                        >
                          {s.category}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <span className="text-sm opacity-80 group-hover:scale-110 transition-transform">
                      {s.icon}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Footer Info */}
            <div className="p-3.5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between text-[11px] text-[#5B7B80]">
              <span>Phím tắt: <code className="bg-white px-1.5 py-0.5 rounded border">←</code> <code className="bg-white px-1.5 py-0.5 rounded border">→</code></span>
              <button
                onClick={() => {
                  sfx.tick();
                  onToggle(false);
                }}
                className="font-bold text-[#1FBFA8] hover:underline"
              >
                Thu gọn ❮
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default SlideSidebar;
