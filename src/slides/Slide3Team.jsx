import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ChevronRight, CheckCircle2, Bookmark, Users } from 'lucide-react';
import { teamMembers, teamInfo, groups } from '../data/teamMembers';
import content from '../data/content';
import sfx from '../audio/sfx';

const CYCLE_MS = 6500;

export function Slide3Team({ onSelectSlide }) {
  const data = content.slide3;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(Date.now());

  // Reset timer khi chọn thủ công
  const resetTimer = () => {
    startRef.current = Date.now();
    setProgress(0);
  };

  // 🎯 Progress ring + auto-cycle dùng RAF cho mượt
  useEffect(() => {
    const tick = () => {
      if (!paused) {
        const elapsed = Date.now() - startRef.current;
        const p = Math.min(elapsed / CYCLE_MS, 1);
        setProgress(p);
        if (p >= 1) {
          setSelectedIndex((prev) => (prev + 1) % teamMembers.length);
          startRef.current = Date.now();
          setProgress(0);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  const activeMember = teamMembers[selectedIndex] || teamMembers[0];
  const activeGroup = groups[activeMember.group] || { name: 'Thành viên', color: activeMember.color };

  const handleSelect = (index) => {
    sfx.tick();
    setSelectedIndex(index);
    resetTimer();
  };

  const handleNext = () => {
    sfx.whoosh();
    onSelectSlide(4);
  };

  const workflowSteps = [
    { title: 'Biên tập & Lời thoại', members: 'Trâm, Thảo, Phúc' },
    { title: 'Nội dung & Dịch tễ', members: 'Ánh, Trường, Việt' },
    { title: 'Thiết kế & Motion 43s', members: 'Tài, Việt Anh' },
    { title: 'Phản biện Y khoa & Q&A', members: 'Khánh' }
  ];

  // Chu vi vòng progress
  const R = 32;
  const CIRC = 2 * Math.PI * R;

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-3 md:px-8 py-2 select-none overflow-hidden">
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0FDFB] via-[#F4FBFF] to-[#EAF6FF]" />
        <motion.div
          className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #1FBFA8 0%, transparent 70%)' }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full blur-3xl opacity-35"
          style={{ background: 'radial-gradient(circle, #3BB8F0 0%, transparent 70%)' }}
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#12343B 1px, transparent 1px), linear-gradient(90deg, #12343B 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ===== TITLE BAR ===== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-2 relative flex-shrink-0">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-[#1FBFA8]/15 text-[#0D9488] border border-[#1FBFA8]/30 flex items-center gap-1">
              <Sparkles size={11} className="animate-pulse" />
              <span>{teamInfo.groupName || 'Nhóm 2'} • Lớp {teamInfo.className || '11A5'}</span>
            </span>
            <span className="text-[#5B7B80] font-semibold">Chuyên đề Sinh học 11</span>
          </motion.div>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B] mt-0.5 leading-tight flex items-center gap-2">
            <span>Đội Ngũ 9 Thành Viên Thực Hiện Báo Cáo</span>
            <span className="w-2 h-2 rounded-full bg-[#1FBFA8] animate-pulse" />
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1 rounded-xl bg-white/80 border border-white shadow-2xs text-[#12343B] font-bold">
            Phân công chuyên môn: <span className="text-[#0D9488]">4 Nhóm chức năng</span>
          </div>
        </div>
      </div>

      {/* ===== MAIN GRID (COLUMNS) ===== */}
      <div className="grid grid-cols-12 gap-4 items-stretch flex-1 my-1 min-h-0">
        {/* ===== LEFT: ACTIVE MEMBER SPOTLIGHT CARD (Col 1-5) ===== */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[28px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_16px_40px_-12px_rgba(18,52,59,0.18)] p-4 md:p-5 flex flex-col justify-between overflow-hidden h-full"
              style={{ borderTop: `4px solid ${activeMember.color}` }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Member Header (Avatar + Name + Role) */}
              <div className="flex items-center gap-3.5 mb-2">
                {/* Progress Ring with Dynamic GIF/Avatar Image */}
                <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 76 76" width="72" height="72">
                    <circle cx="38" cy="38" r={R} fill="none" stroke="#E6F4F1" strokeWidth="3" />
                    <circle
                      cx="38"
                      cy="38"
                      r={R}
                      fill="none"
                      stroke={activeMember.color}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC * (1 - progress)}
                      style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                    />
                  </svg>

                  <div
                    className="w-[58px] h-[58px] rounded-full p-[2px] shadow-md overflow-hidden relative"
                    style={{ background: `linear-gradient(135deg, ${activeMember.color}, #1FBFA8)` }}
                  >
                    {activeMember.avatar || activeMember.gif ? (
                      <img
                        src={activeMember.avatar || activeMember.gif}
                        alt={activeMember.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-heading font-extrabold text-base text-[#12343B]">
                        {activeMember.id}
                      </div>
                    )}
                  </div>

                  {/* ID Tag */}
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white font-extrabold text-[10px] flex items-center justify-center shadow-md"
                    style={{ backgroundColor: activeMember.color }}
                  >
                    #{activeMember.id}
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-left min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider text-white"
                      style={{ backgroundColor: activeMember.color }}
                    >
                      {activeGroup.short}
                    </span>
                    <span className="text-[10px] text-[#5B7B80] font-semibold truncate">
                      Phụ trách: {activeMember.slide}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base md:text-lg text-[#12343B] leading-tight truncate">
                    {activeMember.name}
                  </h3>

                  <div className="text-xs font-bold text-[#0D9488] mt-0.5 truncate">
                    {activeMember.titleRole}
                  </div>
                </div>
              </div>

              {/* Slogan Quote */}
              <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 text-xs italic text-[#5B7B80] leading-snug mb-2 text-left">
                <span className="text-[#0D9488] font-bold text-sm mr-1">“</span>
                {activeMember.slogan}
                <span className="text-[#0D9488] font-bold text-sm ml-1">”</span>
              </div>

              {/* Key Deliverables Bullet Points */}
              <div className="space-y-1.5 text-left mb-2.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#12343B] flex items-center gap-1">
                  <Bookmark size={11} className="text-[#0D9488]" />
                  <span>Nhiệm vụ trọng tâm trong dự án:</span>
                </div>
                {activeMember.keyDeliverables?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[#12343B] leading-tight">
                    <CheckCircle2 size={13} className="text-[#0D9488] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Jump Button */}
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5"
                style={{
                  background: 'linear-gradient(90deg, #1FBFA8 0%, #3BB8F0 100%)',
                }}
              >
                <Zap size={13} />
                <span>Bắt đầu bài học: Giải phẫu & Sinh lý dạ dày</span>
                <ArrowRight size={13} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ===== RIGHT: 3x3 GRID OF ALL 9 MEMBERS (Col 6-12) ===== */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between min-h-0">
          <div className="grid grid-cols-3 gap-2 flex-1">
            {teamMembers.map((m, i) => {
              const isSelected = selectedIndex === i;
              const mGroup = groups[m.group] || { short: 'Nhóm' };
              return (
                <motion.button
                  key={m.id}
                  onClick={() => handleSelect(i)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-2.5 rounded-2xl transition-all flex items-center gap-2.5 text-left border overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md border-transparent ring-2 ring-[#0D9488]/30'
                      : 'bg-white/70 hover:bg-white/95 border-white/80 shadow-2xs'
                  }`}
                >
                  {/* Left Active Indicator Bar */}
                  {isSelected && (
                    <motion.span
                      layoutId="activeTeamBar"
                      className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                  )}

                  {/* Thumbnail Avatar/GIF */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${m.color}, #1FBFA8)`,
                    }}
                  >
                    {m.avatar || m.gif ? (
                      <img
                        src={m.avatar || m.gif}
                        alt={m.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span>{m.id}</span>
                    )}

                    {isSelected && (
                      <motion.span
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: m.color }}
                        animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded text-white" style={{ backgroundColor: m.color }}>
                        {mGroup.short}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400">#{m.id}</span>
                    </div>
                    <div className="text-xs font-bold text-[#12343B] truncate leading-tight">
                      {m.name}
                    </div>
                    <div className="text-[10px] text-[#5B7B80] truncate mt-0.5 font-medium">
                      {m.role}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Group Distribution Legend Bar */}
          <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200/60">
            {Object.keys(groups).map((gKey) => {
              const grp = groups[gKey];
              const count = teamMembers.filter((m) => m.group === gKey).length;
              return (
                <div key={gKey} className="p-1.5 rounded-xl bg-white/80 border border-white/90 text-center shadow-2xs">
                  <div className="text-[10px] font-extrabold text-[#12343B] truncate">
                    {grp.name}
                  </div>
                  <div className="text-[9px] font-bold" style={{ color: grp.color }}>
                    {count} thành viên
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM: 4-STAGE PIPELINE ===== */}
      <div className="relative w-full px-4 py-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-2xs flex items-center justify-between text-xs font-bold text-[#5B7B80] flex-shrink-0 mt-1">
        <span className="text-[#12343B] font-extrabold flex items-center gap-1.5 shrink-0 text-[11px]">
          <span>⚙️</span>
          <span>Dây chuyền phối hợp:</span>
        </span>

        <div className="flex-1 flex items-center justify-around px-3">
          {workflowSteps.map((st, idx) => (
            <React.Fragment key={st.title}>
              <div className="flex items-center gap-1.5 text-[10.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>
                <span className="font-extrabold text-[#12343B]">{st.title}:</span>
                <span className="text-[#5B7B80] font-medium hidden sm:inline">{st.members}</span>
              </div>
              {idx < workflowSteps.length - 1 && (
                <ChevronRight size={12} className="text-[#0D9488]/40 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slide3Team;
