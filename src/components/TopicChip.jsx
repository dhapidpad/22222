import React from 'react';
import sfx from '../audio/sfx';

export function TopicChip({ currentSlide, onSelectSlide }) {
  if (currentSlide <= 2) return null; // Don't clutter header on cover and video

  const chipData = {
    3: { title: '👥 Nhóm thực hiện', color: '#8B5CF6' },
    4: { title: '🫁 Giải phẫu & Sinh lý', color: '#1FBFA8' },
    5: { title: '🦠 Loét: Nguyên nhân', color: '#FF8A5B' },
    6: { title: '⚠️ Loét: Triệu chứng', color: '#D84315' },
    7: { title: '🛡️ Loét: Phòng bệnh', color: '#1FBFA8' },
    8: { title: '🧫 Tiêu chảy: Căn nguyên', color: '#0284C7' },
    9: { title: '💧 Tiêu chảy: Triệu chứng', color: '#3BB8F0' },
    10: { title: '🎯 Minigame Đấu trí y khoa', color: '#D97706' },
    11: { title: '🎓 Tổng kết & Cam kết', color: '#12343B' }
  };

  const current = chipData[currentSlide];
  if (!current) return null;

  return (
    <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-xs font-bold select-none">
      <span
        className="px-2.5 py-0.5 rounded-full text-white text-[11px] shadow-sm"
        style={{ backgroundColor: current.color }}
      >
        {current.title}
      </span>
    </div>
  );
}

export default TopicChip;
