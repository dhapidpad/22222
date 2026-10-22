import React, { useState } from 'react';
import sfx from '../audio/sfx';

const slideTitles = [
  '1. Trang bìa',
  '2. Video giới thiệu (Intro)',
  '3. Nhóm thực hiện đề tài',
  '4. Vai trò của dạ dày',
  '5. Các bệnh về dạ dày',
  '6. Viêm dạ dày cấp tính',
  '7. Trào ngược GERD',
  '8. Giải pháp phòng tránh',
  '9. 3 Câu hỏi củng cố',
  '10. Tổng kết & Nguồn'
];

export function ProgressDots({ currentSlide, totalSlides = 11, onSelectSlide }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm relative select-none">
      {Array.from({ length: totalSlides }, (_, i) => {
        const slideNum = i + 1;
        const isActive = slideNum === currentSlide;
        const isPast = slideNum < currentSlide;

        return (
          <div key={slideNum} className="relative flex items-center justify-center">
            <button
              onClick={() => {
                sfx.tick();
                onSelectSlide(slideNum);
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Chuyển tới ${slideTitles[i] || `Slide ${slideNum}`}`}
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-5 h-2.5 bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] shadow-sm'
                  : isPast
                  ? 'w-2 h-2 bg-[#1FBFA8]/70 hover:scale-125'
                  : 'w-2 h-2 bg-[#5B7B80]/30 hover:scale-125 hover:bg-[#5B7B80]/60'
              }`}
            />

            {hoveredIndex === i && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#12343B] text-white text-[11px] font-medium rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-50">
                {slideTitles[i] || `Slide ${slideNum}`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressDots;
