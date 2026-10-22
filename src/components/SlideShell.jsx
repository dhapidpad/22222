import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Menu
} from 'lucide-react';
import Blobs from './Blobs';
import SlideSidebar from './SlideSidebar';
import sfx from '../audio/sfx';

export function SlideShell({
  children,
  currentSlide,
  totalSlides = 11,
  onNext,
  onPrev,
  onSelectSlide,
  onToggleFullscreen,
  views = [],
  currentView = 0,
  onSelectView
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard shortcuts: M (Menu), H (Toggle hide/collapse dock)
  useEffect(() => {
    function handleKeyDown(e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'm' || e.key === 'M') {
        setIsSidebarOpen((prev) => !prev);
      } else if (e.key === 'h' || e.key === 'H') {
        setIsCollapsed((prev) => !prev);
        sfx.tick();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFullscreenToggle = () => {
    sfx.tick();
    setIsFullscreen(!isFullscreen);
    if (onToggleFullscreen) onToggleFullscreen();
  };

  const isVideoSlide = currentSlide === 2;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#F7FCFB]">
      {/* Background Ambience */}
      <Blobs />

      {/* Collapsible Slide Navigator Sidebar (M key) */}
      <SlideSidebar
        currentSlide={currentSlide}
        onSelectSlide={onSelectSlide}
        isOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
      />

      {/* Main Slide Canvas (Clean, spacious, zero top overlap) */}
      <main
        className={`relative z-20 flex-1 flex flex-col justify-center items-center overflow-hidden w-full max-w-[2200px] mx-auto ${
          isVideoSlide
            ? 'p-2 md:p-3'
            : isCollapsed
            ? 'px-3 md:px-6 pt-1 pb-7'
            : 'px-3 md:px-6 pt-1 pb-16 md:pb-18'
        }`}
      >
        {children}
      </main>

      {/* Floating Bottom Dock (Unified Control Center & View Switcher) */}
      {!isVideoSlide && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              /* EXPANDED DOCK (No text wrapping, pure luxury aesthetic) */
              <motion.div
                key="expanded-dock"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-2xl border border-white/95 shadow-[0_12px_40px_-8px_rgba(18,52,59,0.22)] transition-all max-w-[98vw] overflow-x-auto scrollbar-none whitespace-nowrap flex-nowrap"
              >
                {/* Left: Branding & Subject */}
                <div className="hidden 2xl:flex items-center gap-2 pr-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1FBFA8] to-[#3BB8F0] p-0.5 shadow-xs flex items-center justify-center text-xs flex-shrink-0">
                    🌿
                  </div>
                  <div className="flex flex-col text-left leading-tight flex-shrink-0">
                    <span className="font-heading font-extrabold text-[12px] text-[#12343B] tracking-tight whitespace-nowrap">
                      GUT CARE
                    </span>
                    <span className="text-[10px] font-semibold text-[#5B7B80] whitespace-nowrap">
                      Báo cáo Sinh học
                    </span>
                  </div>
                </div>

                <div className="hidden 2xl:block w-px h-4 bg-slate-200/90 flex-shrink-0" />

                {/* Center 1: Slide Navigation */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                  <button
                    disabled={currentSlide === 1}
                    onClick={() => {
                      sfx.whoosh();
                      onPrev();
                    }}
                    title="Slide trước (←)"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#12343B] disabled:opacity-30 disabled:pointer-events-none transition-all text-xs font-bold active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <ChevronLeft size={14} className="flex-shrink-0" />
                    <span className="hidden sm:inline whitespace-nowrap">Trước</span>
                  </button>

                  <button
                    onClick={() => {
                      sfx.tick();
                      setIsSidebarOpen(true);
                    }}
                    title="Xem danh mục 11 slide (Phím M)"
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-[#12343B] font-mono font-black text-xs tracking-wider transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center"
                  >
                    {String(currentSlide).padStart(2, '0')}&nbsp;/&nbsp;{String(totalSlides).padStart(2, '0')}
                  </button>

                  <button
                    disabled={currentSlide === totalSlides}
                    onClick={() => {
                      sfx.whoosh();
                      onNext();
                    }}
                    title="Slide tiếp theo (→ hoặc Phím cách)"
                    className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white hover:opacity-95 disabled:opacity-30 disabled:pointer-events-none transition-all text-xs font-extrabold shadow-sm active:scale-95 cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <span className="hidden sm:inline whitespace-nowrap">Tiếp</span>
                    <ChevronRight size={14} className="flex-shrink-0" />
                  </button>
                </div>

                {/* Center 2: Sub-View Switcher (F1 · F2 · F3) */}
                {views.length > 1 && (
                  <>
                    <div className="w-px h-4 bg-slate-200/90 flex-shrink-0" />
                    <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 rounded-full bg-slate-100/90 border border-slate-200/70 flex-shrink-0">
                      {views.map((v, idx) => {
                        const isActive = currentView === idx;
                        return (
                          <button
                            key={v.id}
                            onClick={() => {
                              sfx.tick();
                              if (onSelectView) onSelectView(idx);
                            }}
                            title={`${v.label} (Phím ${idx + 1} hoặc ↑/↓)`}
                            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                              isActive
                                ? 'bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white shadow-xs font-black scale-102'
                                : 'text-[#5B7B80] hover:text-[#12343B] hover:bg-white/70'
                            }`}
                          >
                            <span className="text-sm flex-shrink-0">{v.icon}</span>
                            <span className="hidden sm:inline text-xs whitespace-nowrap font-bold">
                              {v.label}
                            </span>
                            <span
                              className={`text-[9.5px] font-mono px-1 py-0.2 rounded-full font-black flex-shrink-0 ${
                                isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-[#5B7B80]'
                              }`}
                            >
                              F{idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="w-px h-4 bg-slate-200/90 flex-shrink-0" />

                {/* Right: Quick actions & Collapse */}
                <div className="flex items-center gap-1 text-[#12343B] flex-shrink-0">
                  {/* Slide sidebar quick toggle */}
                  <button
                    onClick={() => {
                      sfx.tick();
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                    title="Mở danh sách 11 slide (Phím M)"
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#12343B] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Menu size={13} />
                  </button>

                  {/* Fullscreen button */}
                  <button
                    onClick={handleFullscreenToggle}
                    title="Toàn màn hình (Phím F)"
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#12343B] transition-colors cursor-pointer flex-shrink-0"
                  >
                    {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>

                  {/* Collapse Button */}
                  <button
                    onClick={() => {
                      sfx.tick();
                      setIsCollapsed(true);
                    }}
                    title="Thu gọn thanh điều khiển (Phím H)"
                    className="flex items-center gap-1 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#1FBFA8]/15 hover:text-[#1FBFA8] text-[#5B7B80] text-[11px] font-bold transition-colors group ml-0.5 cursor-pointer whitespace-nowrap flex-shrink-0"
                  >
                    <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
                    <span className="hidden md:inline whitespace-nowrap font-bold">Thu gọn</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* COLLAPSED MINI DOCK */
              <motion.div
                key="collapsed-dock"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.9 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 p-1 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border border-white/95 shadow-[0_8px_25px_-5px_rgba(18,52,59,0.22)] whitespace-nowrap flex-shrink-0"
              >
                <button
                  disabled={currentSlide === 1}
                  onClick={() => {
                    sfx.whoosh();
                    onPrev();
                  }}
                  title="Trước (←)"
                  className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-[#12343B] transition-colors cursor-pointer flex-shrink-0"
                >
                  <ChevronLeft size={13} />
                </button>

                <button
                  onClick={() => {
                    sfx.tick();
                    setIsSidebarOpen(true);
                  }}
                  title="Xem danh mục 11 slide (Phím M)"
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-mono font-black text-[#12343B] tracking-tight cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  {String(currentSlide).padStart(2, '0')}&nbsp;/&nbsp;{String(totalSlides).padStart(2, '0')}
                  {views.length > 1 && (
                    <span className="ml-1 text-[10px] text-[#1FBFA8] font-mono font-black">
                      (F{currentView + 1})
                    </span>
                  )}
                </button>

                <button
                  disabled={currentSlide === totalSlides}
                  onClick={() => {
                    sfx.whoosh();
                    onNext();
                  }}
                  title="Tiếp (→)"
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-opacity cursor-pointer flex-shrink-0"
                >
                  <ChevronRight size={13} />
                </button>

                <button
                  onClick={() => {
                    sfx.tick();
                    setIsCollapsed(false);
                  }}
                  title="Mở rộng thanh điều khiển (Phím H)"
                  className="w-6 h-6 rounded-full bg-[#1FBFA8]/15 hover:bg-[#1FBFA8]/25 text-[#1FBFA8] flex items-center justify-center transition-colors ml-0.5 cursor-pointer flex-shrink-0"
                >
                  <ChevronUp size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default SlideShell;
