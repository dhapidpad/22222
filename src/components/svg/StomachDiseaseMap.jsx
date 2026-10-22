import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sfx from '../../audio/sfx';

export function StomachDiseaseMap({
  selectedDisease = 'dis-acute',
  onSelectDisease,
  size = 310
}) {
  const diseases = [
    {
      id: 'dis-gerd',
      num: '1',
      name: 'Trào ngược GERD',
      locName: 'Cơ thắt thực quản dưới (Tâm vị)',
      pathology: 'Van tâm vị đóng không kín, axit HCl dâng ngược gây viêm loét thực quản.',
      x: 146,
      y: 52,
      icon: '⚡',
      color: '#0284C7',
      severity: 'Phổ biến',
      severityColor: '#0284C7'
    },
    {
      id: 'dis-acute',
      num: '2',
      name: 'Viêm dạ dày cấp',
      locName: 'Niêm mạc thân & hang vị',
      pathology: 'Xung huyết, phù nề, xuất huyết chấm đỏ rực sau kích thích đột ngột.',
      x: 215,
      y: 135,
      icon: '🔥',
      color: '#EA580C',
      severity: 'Cấp tính',
      severityColor: '#EA580C'
    },
    {
      id: 'dis-ulcer',
      num: '3',
      name: 'Loét dạ dày - tá tràng',
      locName: 'Bờ cong nhỏ & Hành tá tràng',
      pathology: 'Ổ khuyết sâu mất chất qua lớp cơ niêm, đáy phủ giả mạc trắng/vàng.',
      x: 155,
      y: 182,
      icon: '🕳️',
      color: '#EF4444',
      severity: 'Mạn tính',
      severityColor: '#DC2626'
    },
    {
      id: 'dis-bleed',
      num: '4',
      name: 'Xuất huyết dạ dày',
      locName: 'Mạch máu bờ cong nhỏ',
      pathology: 'Ổ loét ăn thủng mạch máu, máu phun thành tia hoặc rỉ rả không ngừng.',
      x: 242,
      y: 195,
      icon: '🩸',
      color: '#B91C1C',
      severity: 'CẤP CỨU',
      severityColor: '#B91C1C'
    },
    {
      id: 'dis-pyloric',
      num: '5',
      name: 'Hẹp môn vị',
      locName: 'Van cơ vòng môn vị',
      pathology: 'Xơ sẹo do loét mạn tính làm chít hẹp lòng môn vị, ứ đọng dịch và thức ăn.',
      x: 88,
      y: 202,
      icon: '⏳',
      color: '#D97706',
      severity: 'Ứ trệ',
      severityColor: '#D97706'
    },
    {
      id: 'dis-cancer',
      num: '6',
      name: 'Ung thư dạ dày',
      locName: 'Thành dạ dày (Bờ cong lớn/nhỏ)',
      pathology: 'Khối sùi loét ác tính, thâm nhiễm làm cứng mất nhu động thành dạ dày.',
      x: 238,
      y: 86,
      icon: '🔬',
      color: '#4B5563',
      severity: 'Ác tính',
      severityColor: '#1F2937'
    }
  ];

  const handlePointClick = (id) => {
    sfx.tick();
    if (onSelectDisease) onSelectDisease(id);
  };

  const active = diseases.find(d => d.id === selectedDisease) || diseases[1];

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full">
      <svg
        viewBox="0 0 350 270"
        width={size}
        height={size * 0.78}
        className="overflow-visible filter drop-shadow-xl"
      >
        <defs>
          {/* 3D Anatomical Organ Gradient */}
          <radialGradient id="organ3DGrad" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#FFAAA6" />
            <stop offset="35%" stopColor="#FF7A6E" />
            <stop offset="80%" stopColor="#FA5252" />
            <stop offset="100%" stopColor="#C92A2A" />
          </radialGradient>

          {/* Glossy highlight reflection */}
          <linearGradient id="organGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>

          {/* Inflamed hyperemia gradient */}
          <radialGradient id="hyperemiaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
          </radialGradient>

          {/* Acid reflux flow gradient */}
          <linearGradient id="refluxWaveGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#EF4444" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="1" />
          </linearGradient>

          {/* Clip path for inner stomach */}
          <clipPath id="innerStomachShape">
            <path d="M 148 78 C 215 78 280 108 278 174 C 275 240 212 278 140 260 C 98 250 90 215 116 198 C 144 178 162 152 148 118 C 144 102 136 88 128 78 Z" />
          </clipPath>
        </defs>

        {/* 1. Thực quản (Esophagus) */}
        <g>
          <path
            d="M 132 12 L 158 12 C 158 45 156 65 152 78 L 128 75 C 132 60 132 38 132 12 Z"
            fill="#FFAAA6"
            stroke="#C92A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M 133 32 Q 145 37 157 32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M 132 50 Q 144 55 155 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Reflux wave animation when GERD selected */}
          {selectedDisease === 'dis-gerd' && (
            <motion.path
              d="M 134 76 Q 145 28 156 76 Z"
              fill="url(#refluxWaveGrad)"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: [-5, -28, -5], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </g>

        {/* 2. Tá tràng (Duodenum) */}
        <g>
          <path
            d="M 98 205 C 75 200 52 225 58 252 C 64 275 92 284 125 284"
            fill="none"
            stroke="#FDE047"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 98 205 C 75 200 52 225 58 252 C 64 275 92 284 125 284"
            fill="none"
            stroke="#EAB308"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Thân dạ dày 3D (Organic 3D Stomach Body) */}
        <path
          d="M 148 78 C 215 78 280 108 278 174 C 275 240 212 278 140 260 C 98 250 90 215 116 198 C 144 178 162 152 148 118 C 144 102 136 88 128 78 Z"
          fill="url(#organ3DGrad)"
          stroke="#A61E4D"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Specular curved gloss for 3D realism */}
        <path
          d="M 170 85 C 220 86 265 110 268 150 C 255 118 215 98 170 94 Z"
          fill="url(#organGloss)"
        />
        <ellipse cx="250" cy="138" rx="12" ry="26" fill="url(#organGloss)" transform="rotate(25 250 138)" />

        {/* Organic mucosal rugae lines */}
        <path d="M 235 105 Q 248 135 240 170" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3" />
        <path d="M 215 95 Q 225 130 218 165" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3" />
        <path d="M 195 95 Q 202 125 195 155" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.3" />

        {/* 4. TỔN THƯƠNG NỘI SOI TRỰC QUAN THEO BỆNH ĐANG CHỌN */}
        <g clipPath="url(#innerStomachShape)">
          {/* Viêm cấp tính: Đốm xung huyết đỏ rực rỡ */}
          {selectedDisease === 'dis-acute' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <ellipse cx="210" cy="142" rx="36" ry="30" fill="url(#hyperemiaGrad)" />
              <ellipse cx="178" cy="190" rx="28" ry="22" fill="url(#hyperemiaGrad)" />
              {/* Petechiae / tiny red hemorrhagic dots */}
              <circle cx="218" cy="132" r="3" fill="#7F1D1D" />
              <circle cx="198" cy="145" r="2.5" fill="#991B1B" />
              <circle cx="225" cy="150" r="2.8" fill="#7F1D1D" />
              {/* Flame spark particles */}
              <motion.circle cx="205" cy="135" r="3" fill="#FFA500" animate={{ y: [-2, -14], opacity: [1, 0] }} transition={{ duration: 0.9, repeat: Infinity }} />
              <motion.circle cx="228" cy="142" r="2.5" fill="#EF4444" animate={{ y: [-2, -16], opacity: [1, 0] }} transition={{ duration: 1.1, delay: 0.3, repeat: Infinity }} />
            </motion.g>
          )}

          {/* Loét dạ dày: Ổ khuyết sâu đáy xơ chai */}
          {selectedDisease === 'dis-ulcer' && (
            <motion.g initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <circle cx="155" cy="182" r="16" fill="#450A0A" stroke="#EF4444" strokeWidth="2.5" />
              <circle cx="155" cy="182" r="9" fill="#7F1D1D" />
              <circle cx="155" cy="182" r="4.5" fill="#FEF08A" opacity="0.9" /> {/* Fibrin slough */}
            </motion.g>
          )}

          {/* Xuất huyết: Mạch máu rách & giọt máu đỏ tươi */}
          {selectedDisease === 'dis-bleed' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <path d="M 235 180 Q 244 192 242 215" stroke="#7F1D1D" strokeWidth="3.5" strokeLinecap="round" />
              <motion.circle
                cx="242"
                cy="198"
                r="7"
                fill="#DC2626"
                animate={{ scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.circle cx="242" cy="210" r="3.5" fill="#B91C1C" animate={{ y: [0, 14], opacity: [1, 0] }} transition={{ duration: 1.1, repeat: Infinity }} />
            </motion.g>
          )}

          {/* Hẹp môn vị: Chít hẹp thắt nút */}
          {selectedDisease === 'dis-pyloric' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <line x1="90" y1="188" x2="90" y2="218" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
              {/* Trapped food */}
              <circle cx="106" cy="202" r="4.5" fill="#D97706" />
              <circle cx="116" cy="208" r="3.8" fill="#B45309" />
              <circle cx="114" cy="195" r="3.2" fill="#F59E0B" />
            </motion.g>
          )}

          {/* Ung thư: Khối u sùi gồ ghề */}
          {selectedDisease === 'dis-cancer' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <circle cx="238" cy="86" r="13" fill="#374151" stroke="#111827" strokeWidth="2" />
              <circle cx="244" cy="80" r="7" fill="#4B5563" />
              <circle cx="232" cy="92" r="7" fill="#1F2937" />
              <circle cx="242" cy="94" r="5" fill="#4B5563" />
            </motion.g>
          )}
        </g>

        {/* 5. 6 ĐIỂM PIN BỆNH LÝ TƯƠNG TÁC (Numbered Medical Badge Pins ①-⑥) */}
        {diseases.map((d) => {
          const isSelected = selectedDisease === d.id;
          return (
            <g
              key={d.id}
              className="cursor-pointer group"
              onClick={() => handlePointClick(d.id)}
            >
              {/* Radar pulse ring */}
              {isSelected && (
                <motion.circle
                  cx={d.x}
                  cy={d.y}
                  r="19"
                  fill={d.color}
                  fillOpacity="0.32"
                  stroke={d.color}
                  strokeWidth="2"
                  animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0.2, 0.7] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx={d.x}
                cy={d.y}
                r={isSelected ? 13 : 10}
                fill={isSelected ? d.color : '#FFFFFF'}
                stroke={d.color}
                strokeWidth={isSelected ? 2.5 : 2}
                className="filter drop-shadow-md"
              />

              {/* Icon Emoji inside Pin */}
              <text
                x={d.x}
                y={d.y + (isSelected ? 4.5 : 3.5)}
                textAnchor="middle"
                fontSize={isSelected ? "11.5" : "10"}
                className="pointer-events-none"
              >
                {d.icon}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Dynamic Pathology Card: Integrated Microscope Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="mt-1 p-2 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-md w-full"
        >
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#12343B]">
              <span className="text-base">{active.icon}</span>
              <span>{active.name}</span>
            </div>
            <span
              className="text-[9.5px] font-black px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${active.color}18`, color: active.color }}
            >
              {active.severity}
            </span>
          </div>

          <div className="text-[10.5px] text-[#5B7B80] leading-snug">
            <div className="font-bold text-[#12343B] flex items-center gap-1">
              <span className="text-emerald-600">📍 Vị trí:</span>
              <span>{active.locName}</span>
            </div>
            <p className="mt-0.5 line-clamp-2">{active.pathology}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default StomachDiseaseMap;
