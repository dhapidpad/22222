import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FitStage from './components/FitStage';
import SlideShell from './components/SlideShell';
import useSlideNav from './hooks/useSlideNav';
import sfx from './audio/sfx';

// ==========================================
// EAGER LOAD TẤT CẢ CÁC SLIDE (0ms Latency, Siêu Mượt, Không Bị Khựng)
// ==========================================
import Slide1Hero from './slides/Slide1Hero';
import Slide2Video from './slides/Slide2Video';
import Slide3Team from './slides/Slide3Team';

// Slide 4 (3 góc nhìn)
import Slide4Anatomy from './slides/Slide4Anatomy';
import Slide4StomachRoles from './slides/Slide4StomachRoles';
import Slide4StomachDiseases from './slides/Slide4StomachDiseases';

// Slide 5 (3 góc nhìn)
import Slide5UlcerCauses from './slides/Slide5UlcerCauses';
import Slide5StomachDiseases from './slides/Slide5StomachDiseases';
import Slide5AcuteGastritis from './slides/Slide5AcuteGastritis';

// Slide 6 (3 góc nhìn)
import Slide6UlcerSymptoms from './slides/Slide6UlcerSymptoms';
import Slide6AcuteGastritis from './slides/Slide6AcuteGastritis';
import Slide6GERD from './slides/Slide6GERD';

// Slide 7 (3 góc nhìn)
import Slide7UlcerPrevention from './slides/Slide7UlcerPrevention';
import Slide7GERD from './slides/Slide7GERD';
import Slide7Prevention from './slides/Slide7Prevention';

// Slide 8 (Bệnh 2 Tiêu chảy cấp: Gộp 4 view toàn diện)
import Slide9DiarrheaSymptoms from './slides/Slide9DiarrheaSymptoms';
import Slide8DiarrheaCauses from './slides/Slide8DiarrheaCauses';
import Slide10DiarrheaPrevention from './slides/Slide10DiarrheaPrevention';
import Slide9Closing from './slides/Slide9Closing';

// Slide 9 (Minigame Đấu trí Sinh học 6 câu)
import Slide10QuizArena from './slides/Slide10QuizArena';

// Slide 10 (Tổng kết toàn diện, Q&A & Cam kết 5T)
import Slide12Closing from './slides/Slide12Closing';

// ==========================================
// CẤU HÌNH TỔ CHỨC 10 SLIDE & CÁC GÓC NHÌN (VIEWS)
// ==========================================
const SLIDE_CONFIG = {
  1: {
    views: [
      { id: 'hero', label: 'Trang bìa', icon: '🌿', Component: Slide1Hero }
    ]
  },
  2: {
    views: [
      { id: 'video', label: 'Video dẫn nhập', icon: '🎬', Component: Slide2Video }
    ]
  },
  3: {
    views: [
      { id: 'team', label: 'Đội ngũ 9 TV', icon: '👥', Component: Slide3Team }
    ]
  },
  4: {
    views: [
      { id: 'anatomy', label: 'Giải phẫu 7 cơ quan', icon: '🫁', Component: Slide4Anatomy },
      { id: 'roles', label: '4 Vai trò sinh lý', icon: '🔬', Component: Slide4StomachRoles },
      { id: 'diseases', label: 'Bản đồ bệnh lý', icon: '📋', Component: Slide4StomachDiseases }
    ]
  },
  5: {
    views: [
      { id: 'ulcer-causes', label: 'Nguyên nhân HP & NSAID', icon: '🦠', Component: Slide5UlcerCauses },
      { id: 'diseases-3d', label: 'Toàn cảnh bệnh lý', icon: '📋', Component: Slide5StomachDiseases },
      { id: 'acute-gastritis', label: 'Viêm dạ dày cấp', icon: '🔥', Component: Slide5AcuteGastritis }
    ]
  },
  6: {
    views: [
      { id: 'ulcer-symptoms', label: 'Triệu chứng & Cờ đỏ', icon: '⚠️', Component: Slide6UlcerSymptoms },
      { id: 'acute-detail', label: 'Viêm cấp chi tiết', icon: '🔥', Component: Slide6AcuteGastritis },
      { id: 'gerd', label: 'Trào ngược GERD', icon: '⚡', Component: Slide6GERD }
    ]
  },
  7: {
    views: [
      { id: 'ulcer-prev', label: 'Phòng ngừa & Điều trị', icon: '🛡️', Component: Slide7UlcerPrevention },
      { id: 'gerd-adv', label: 'Trào ngược nâng cao', icon: '⚡', Component: Slide7GERD },
      { id: 'prev-pillars', label: '4 Trụ cột phòng vệ', icon: '🏥', Component: Slide7Prevention }
    ]
  },
  8: {
    views: [
      { id: 'diarrhea-symptoms', label: '1. Dấu hiệu & Mất nước', icon: '💧', Component: Slide9DiarrheaSymptoms },
      { id: 'diarrhea-causes', label: '2. Căn nguyên & Đường lây', icon: '🧫', Component: Slide8DiarrheaCauses },
      { id: 'diarrhea-prev', label: '3. Phòng bệnh & Oresol', icon: '🛡️', Component: Slide10DiarrheaPrevention },
      { id: 'diarrhea-closing', label: '4. Tổng kết nhanh', icon: '✨', Component: Slide9Closing }
    ]
  },
  9: {
    views: [
      { id: 'quiz-arena', label: 'Đấu trí 6 câu', icon: '🎮', Component: Slide10QuizArena }
    ]
  },
  10: {
    views: [
      { id: 'closing-master', label: 'Tổng kết & Q&A', icon: '🎓', Component: Slide12Closing }
    ]
  }
};

export function App() {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    totalSlides
  } = useSlideNav(10); // Toàn bộ 10 slide chính thức

  const [subView, setSubView] = useState(0);

  // Khi chuyển slide, tự động quay về góc nhìn đầu tiên (F1)
  useEffect(() => {
    setSubView(0);
  }, [currentSlide]);

  // Phím tắt điều khiển các góc nhìn F1, F2, F3, F4: Phím mũi tên Lên/Xuống hoặc phím số 1, 2, 3, 4
  useEffect(() => {
    function handleKeyDown(e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const views = SLIDE_CONFIG[currentSlide]?.views || [];
      if (views.length > 1) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          sfx.tick();
          setSubView((prev) => (prev + 1) % views.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          sfx.tick();
          setSubView((prev) => (prev - 1 + views.length) % views.length);
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          const targetIdx = parseInt(e.key, 10) - 1;
          if (targetIdx < views.length) {
            sfx.tick();
            setSubView(targetIdx);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const currentConfig = SLIDE_CONFIG[currentSlide] || SLIDE_CONFIG[1];
  const currentViews = currentConfig.views;
  const safeSubView = subView < currentViews.length ? subView : 0;
  const ActiveComponent = currentViews[safeSubView].Component;

  return (
    <FitStage>
      <SlideShell
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={nextSlide}
        onPrev={prevSlide}
        onSelectSlide={goToSlide}
        onToggleFullscreen={toggleFullscreen}
        views={currentViews}
        currentView={safeSubView}
        onSelectView={setSubView}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${currentSlide}-${safeSubView}`}
            initial={{ opacity: 0, y: 10, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.992 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ willChange: 'opacity, transform' }}
            className="w-full h-full flex flex-col justify-center"
          >
            <ActiveComponent
              onNext={nextSlide}
              onPrev={prevSlide}
              onSelectSlide={goToSlide}
              onSelectView={setSubView}
            />
          </motion.div>
        </AnimatePresence>
      </SlideShell>
    </FitStage>
  );
}

export default App;