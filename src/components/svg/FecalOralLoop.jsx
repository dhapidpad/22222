import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sfx from '../../audio/sfx';

export function FecalOralLoop({ className = '' }) {
  const [activeStation, setActiveStation] = useState(null);

  const stations = [
    {
      id: 1,
      name: '① Phân mang mầm bệnh',
      icon: '🚽',
      x: 180,
      y: 40,
      blockAction: 'Quản lý nhà vệ sinh đạt chuẩn, diệt ruồi nhặng'
    },
    {
      id: 2,
      name: '② Tay bẩn & Ruồi',
      icon: '🪰',
      x: 320,
      y: 110,
      blockAction: '🛑 CHẶN BẰNG: Rửa tay 6 bước với xà phòng thường xuyên'
    },
    {
      id: 3,
      name: '③ Nước & Thực phẩm ô nhiễm',
      icon: '🍲',
      x: 290,
      y: 220,
      blockAction: '🛑 CHẶN BẰNG: Ăn chín, uống nước sôi, che đậy kỹ'
    },
    {
      id: 4,
      name: '④ Miệng',
      icon: '👄',
      x: 70,
      y: 220,
      blockAction: '🛑 CHẶN BẰNG: Không ngậm tay, vệ sinh răng miệng sạch'
    },
    {
      id: 5,
      name: '⑤ Đường ruột',
      icon: '🫁',
      x: 40,
      y: 110,
      blockAction: '🛑 CHẶN BẰNG: Tiêm phòng Rotavirus, bú mẹ hoàn toàn'
    }
  ];

  return (
    <div className={`p-4 rounded-[28px] bg-white/85 backdrop-blur-md border border-white shadow-ocean-glow flex flex-col items-center ${className}`}>
      <div className="w-full flex items-center justify-between mb-2">
        <div className="font-heading font-extrabold text-sm text-[#12343B] flex items-center gap-2">
          <span>🔄</span>
          <span>CHU TRÌNH ĐƯỜNG LÂY PHÂN – MIỆNG (5 MẮT XÍCH)</span>
        </div>
        <span className="text-[11px] font-semibold text-[#5B7B80]">
          Chạm từng trạm để xem cách ngắt
        </span>
      </div>

      <svg viewBox="0 0 360 270" width="100%" height="210" className="overflow-visible">
        {/* Animated Connecting Pathway Loop */}
        <path
          d="M 180 50 L 320 110 L 290 220 L 70 220 L 40 110 Z"
          fill="none"
          stroke="#3BB8F0"
          strokeWidth="3.5"
          strokeDasharray="6 6"
        />

        {/* 5 Stations */}
        {stations.map((st) => {
          const isSelected = activeStation === st.id;
          return (
            <g
              key={st.id}
              className="cursor-pointer transition-transform"
              onClick={() => {
                sfx.tick();
                setActiveStation(st.id);
              }}
              onMouseEnter={() => setActiveStation(st.id)}
            >
              <circle
                cx={st.x}
                cy={st.y}
                r={isSelected ? 24 : 19}
                fill={isSelected ? '#1FBFA8' : '#FFFFFF'}
                stroke={isSelected ? '#1FBFA8' : '#3BB8F0'}
                strokeWidth={isSelected ? 3 : 2}
                className="transition-all shadow-md"
              />
              <text
                x={st.x}
                y={st.y + 6}
                textAnchor="middle"
                fontSize={isSelected ? 16 : 13}
                className="pointer-events-none"
              >
                {st.icon}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Station Information Pill */}
      <div className="w-full p-2.5 rounded-xl bg-[#EAF6FD] border border-[#3BB8F0]/30 text-center min-h-[46px] flex items-center justify-center">
        {activeStation ? (
          <div className="text-xs font-bold text-[#0288D1]">
            {stations.find((s) => s.id === activeStation)?.blockAction}
          </div>
        ) : (
          <div className="text-xs font-semibold text-[#5B7B80]">
            👉 Nhấp hoặc di chuột qua các trạm để xem giải pháp cắt đứt nguồn lây
          </div>
        )}
      </div>
    </div>
  );
}

export default FecalOralLoop;
