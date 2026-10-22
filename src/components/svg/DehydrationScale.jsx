import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sfx from '../../audio/sfx';

export function DehydrationScale({ className = '' }) {
  const [level, setLevel] = useState(1); // 1 = Không mất nước, 2 = Có mất nước, 3 = Mất nước nặng

  const levels = {
    1: {
      name: 'Mức 1: Không mất nước',
      status: 'Nhẹ (Bù dịch tại nhà - Phác đồ A)',
      color: '#1FBFA8',
      waterPercent: 95,
      eyes: 'Mắt bình thường, sáng khỏe',
      thirst: 'Uống nước bình thường',
      skin: 'Véo da bụng phẳng ngay (< 2 giây)',
      mind: 'Tỉnh táo, linh hoạt'
    },
    2: {
      name: 'Mức 2: Có mất nước',
      status: 'Vừa (Cần đến trạm y tế - Phác đồ B)',
      color: '#FF8A5B',
      waterPercent: 65,
      eyes: 'Mắt trũng sâu, môi khô',
      thirst: 'Khát nước dữ dội, uống vồ vập',
      skin: 'Véo da bụng mất chậm (< 2 giây)',
      mind: 'Bứt rứt, vật vã, quấy khóc'
    },
    3: {
      name: 'Mức 3: Mất nước nặng',
      status: '🚨 CẤP CỨU KHẨN CẤP (Phác đồ C - Truyền dịch)',
      color: '#EF4B5F',
      waterPercent: 30,
      eyes: 'Mắt rất trũng, khô khốc, không có nước mắt',
      thirst: 'Không thể uống được hoặc uống rất kém',
      skin: 'Véo da mất rất chậm (> 2 giây)',
      mind: 'Li bì, hôn mê khó đánh thức, lạnh đầu chi'
    }
  };

  const current = levels[level];

  return (
    <div className={`p-6 rounded-[28px] bg-white/85 backdrop-blur-md border border-white shadow-mint-glow flex flex-col items-center ${className}`}>
      {/* Level Selector Buttons */}
      <div className="w-full flex items-center justify-between gap-2 mb-6">
        {[1, 2, 3].map((lvl) => {
          const isSelected = level === lvl;
          return (
            <button
              key={lvl}
              onClick={() => {
                sfx.tick();
                setLevel(lvl);
              }}
              className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
                isSelected
                  ? 'text-white shadow-md scale-102'
                  : 'bg-white/80 text-[#5B7B80] hover:bg-white hover:text-[#12343B]'
              }`}
              style={{
                backgroundColor: isSelected ? levels[lvl].color : undefined,
                border: isSelected ? `2px solid ${levels[lvl].color}` : '1px solid #E2E8F0'
              }}
            >
              <span>MỨC {lvl}</span>
              <span className="text-[11px] font-medium opacity-90">
                {lvl === 1 ? 'Không mất nước' : lvl === 2 ? 'Có mất nước' : 'Mất nước nặng ⚠'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Center: Person SVG + Water Flask Gauge */}
      <div className="w-full grid grid-cols-12 gap-6 items-center">
        {/* Person Visual (Col 1-5) */}
        <div className="col-span-5 flex flex-col items-center justify-center">
          <svg viewBox="0 0 160 220" width="150" height="200" className="overflow-visible">
            {/* Torso/Silhouette */}
            <motion.path
              d="M 50 85 Q 80 80 110 85 L 120 180 Q 80 185 40 180 Z"
              fill={level === 1 ? '#E3F7F2' : level === 2 ? '#FFF2EB' : '#FFE9EC'}
              stroke={current.color}
              strokeWidth="3"
              animate={{ fill: level === 1 ? '#E3F7F2' : level === 2 ? '#FFF2EB' : '#FFE9EC' }}
            />

            {/* Head */}
            <circle
              cx="80"
              cy="45"
              r="30"
              fill={level === 1 ? '#E3F7F2' : level === 2 ? '#FFF2EB' : '#FFE9EC'}
              stroke={current.color}
              strokeWidth="3"
            />

            {/* Face Expressions */}
            {level === 1 && (
              <g>
                <circle cx="70" cy="42" r="3" fill="#12343B" />
                <circle cx="90" cy="42" r="3" fill="#12343B" />
                <path d="M 72 54 Q 80 62 88 54" fill="none" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {level === 2 && (
              <g>
                {/* Sunken eyes */}
                <ellipse cx="68" cy="42" rx="4.5" ry="3.5" fill="#C98A6B" opacity="0.4" />
                <circle cx="68" cy="42" r="2.5" fill="#12343B" />
                <ellipse cx="92" cy="42" rx="4.5" ry="3.5" fill="#C98A6B" opacity="0.4" />
                <circle cx="92" cy="42" r="2.5" fill="#12343B" />
                {/* Dry mouth straight */}
                <line x1="72" y1="56" x2="88" y2="56" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {level === 3 && (
              <g>
                {/* Very sunken closed eyes / lethargic */}
                <ellipse cx="68" cy="42" rx="6" ry="5" fill="#EF4B5F" opacity="0.3" />
                <line x1="63" y1="42" x2="73" y2="42" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="92" cy="42" rx="6" ry="5" fill="#EF4B5F" opacity="0.3" />
                <line x1="87" y1="42" x2="97" y2="42" stroke="#12343B" strokeWidth="2.5" strokeLinecap="round" />
                {/* Drooping mouth */}
                <path d="M 72 58 Q 80 50 88 58" fill="none" stroke="#EF4B5F" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* Skin Pinch indicator at belly */}
            <g transform="translate(80, 130)">
              <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={current.color} strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="bold" fill={current.color}>
                {level === 3 ? '> 2s' : '< 2s'}
              </text>
            </g>
          </svg>
        </div>

        {/* Water Flask Gauge & Details (Col 6-12) */}
        <div className="col-span-7 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#5B7B80]">Lượng nước cơ thể ước tính:</span>
            <span className="text-sm font-extrabold" style={{ color: current.color }}>
              {current.waterPercent}%
            </span>
          </div>

          {/* Animated Water Bar */}
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200 mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: current.color }}
              animate={{ width: `${current.waterPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Diagnostic Key Criteria */}
          <div className="space-y-1.5 text-xs text-[#12343B]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }}></span>
              <span className="font-semibold">Mắt:</span>
              <span>{current.eyes}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }}></span>
              <span className="font-semibold">Cơn khát:</span>
              <span>{current.thirst}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }}></span>
              <span className="font-semibold">Nếp véo da:</span>
              <span>{current.skin}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.color }}></span>
              <span className="font-semibold">Tri giác:</span>
              <span>{current.mind}</span>
            </div>
          </div>

          {/* Action recommendation */}
          <div
            className="mt-4 p-2.5 rounded-xl text-xs font-bold text-center border"
            style={{
              backgroundColor: `${current.color}15`,
              borderColor: `${current.color}40`,
              color: current.color
            }}
          >
            {current.status}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DehydrationScale;
