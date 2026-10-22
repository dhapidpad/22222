import React, { useState } from 'react';
import { motion } from 'framer-motion';
import sfx from '../../audio/sfx';

export function VennCompare({ onSelectSection = null, className = '' }) {
  const [selectedPart, setSelectedPart] = useState('both'); // 'ulcer' | 'diarrhea' | 'both'

  const details = {
    ulcer: {
      title: '🟠 VIÊM LOÉT DẠ DÀY – TÁ TRÀNG',
      color: '#FF8A5B',
      subtitle: 'Đường tiêu hóa trên (Dạ dày, Hành tá tràng)',
      points: [
        'Tác nhân: Vi khuẩn H. pylori, lạm dụng thuốc giảm đau NSAID',
        'Cơ chế: Mất cân bằng mạn tính giữa axit và lớp chất nhầy bảo vệ',
        'Triệu chứng: Đau nóng rát thượng vị, ợ chua, đầy chướng bụng',
        'Diễn tiến: Thường kéo dài, mạn tính hoặc tái phát nhiều đợt',
        'Biến chứng: Xuất huyết dạ dày (nôn ra máu, phân đen), thủng ổ loét'
      ]
    },
    diarrhea: {
      title: '🔵 TIÊU CHẢY CẤP',
      color: '#3BB8F0',
      subtitle: 'Đường tiêu hóa dưới (Ruột non, Đại tràng)',
      points: [
        'Tác nhân: Rotavirus, Norovirus, vi khuẩn E. coli, Salmonella',
        'Cơ chế: Nhiễm trùng cấp tính làm tăng tiết dịch và tổn thương niêm mạc',
        'Triệu chứng: Đi ngoài phân lỏng ≥ 3 lần/24h, đau quặn bụng, nôn ói',
        'Diễn tiến: Khởi phát cấp tính, thường tự giới hạn dưới 14 ngày',
        'Biến chứng: Kiệt nước và rối loạn điện giải nhanh chóng, sốc nguy kịch'
      ]
    },
    both: {
      title: '🌿 ĐIỂM GIAO THOA: CÙNG MỘT GỐC "VỆ SINH"',
      color: '#1FBFA8',
      subtitle: 'Nền tảng phòng bệnh và chăm sóc đường ruột',
      points: [
        'Cùng lây truyền qua đường ăn uống, nước bẩn, dùng chung bát đũa thìa',
        'Phòng ngừa gốc rễ: Rửa tay 6 bước với xà phòng và ăn chín uống sôi',
        'Tuyệt đối không tự ý mua thuốc điều trị bừa bãi (kháng sinh, thuốc cầm tiêu chảy)',
        'Cần đi khám và cấp cứu ngay khi xuất hiện dấu hiệu báo động nguy hiểm',
        'Tuân thủ đầy đủ phác đồ điều trị do bác sĩ chuyên khoa chỉ dẫn'
      ]
    }
  };

  const handleSelect = (part) => {
    sfx.tick();
    setSelectedPart(part);
    if (onSelectSection) onSelectSection(part);
  };

  const current = details[selectedPart];

  return (
    <div className={`grid grid-cols-12 gap-6 items-center ${className}`}>
      {/* Venn Circles Graphic (Col 1-6) */}
      <div className="col-span-6 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 460 320" width="100%" height="280" className="overflow-visible">
          <defs>
            <radialGradient id="ulcerGrad" cx="40%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF8A5B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FF8A5B" stopOpacity="0.15" />
            </radialGradient>

            <radialGradient id="diarrheaGrad" cx="60%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3BB8F0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3BB8F0" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* Left Circle: Ulcer */}
          <circle
            cx="175"
            cy="160"
            r="125"
            fill="url(#ulcerGrad)"
            stroke="#FF8A5B"
            strokeWidth={selectedPart === 'ulcer' ? 4 : 2}
            className="cursor-pointer transition-all"
            onClick={() => handleSelect('ulcer')}
          />

          {/* Right Circle: Diarrhea */}
          <circle
            cx="285"
            cy="160"
            r="125"
            fill="url(#diarrheaGrad)"
            stroke="#3BB8F0"
            strokeWidth={selectedPart === 'diarrhea' ? 4 : 2}
            className="cursor-pointer transition-all"
            onClick={() => handleSelect('diarrhea')}
          />

          {/* Center Intersection: Green Glow */}
          <path
            d="M 230 55 C 265 90, 275 130, 275 160 C 275 190, 265 230, 230 265 C 195 230, 185 190, 185 160 C 185 130, 195 90, 230 55 Z"
            fill="#1FBFA8"
            fillOpacity={selectedPart === 'both' ? 0.75 : 0.45}
            stroke="#1FBFA8"
            strokeWidth={selectedPart === 'both' ? 3.5 : 2}
            className="cursor-pointer transition-all"
            onClick={() => handleSelect('both')}
          />

          {/* Labels on SVG */}
          <text
            x="115"
            y="165"
            textAnchor="middle"
            fill="#D84315"
            fontSize="14"
            fontWeight="bold"
            className="cursor-pointer"
            onClick={() => handleSelect('ulcer')}
          >
            VIÊM LOÉT
          </text>

          <text
            x="345"
            y="165"
            textAnchor="middle"
            fill="#0288D1"
            fontSize="14"
            fontWeight="bold"
            className="cursor-pointer"
            onClick={() => handleSelect('diarrhea')}
          >
            TIÊU CHẢY
          </text>

          <text
            x="230"
            y="165"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="extrabold"
            className="cursor-pointer"
            onClick={() => handleSelect('both')}
          >
            GIAO NHAU
          </text>
        </svg>

        {/* Click Instruction Note */}
        <div className="text-[11px] font-semibold text-[#5B7B80] mt-1">
          Nhấp vào từng vòng tròn để xem so sánh chi tiết
        </div>
      </div>

      {/* Detail Inspector Card (Col 7-12) */}
      <motion.div
        key={selectedPart}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="col-span-6 p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-white shadow-xl"
        style={{ borderTop: `4px solid ${current.color}` }}
      >
        <div className="font-heading font-extrabold text-base mb-1" style={{ color: current.color }}>
          {current.title}
        </div>
        <div className="text-xs font-semibold text-[#5B7B80] mb-3">
          {current.subtitle}
        </div>

        <ul className="space-y-2 text-xs text-[#12343B]">
          {current.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: current.color }} />
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default VennCompare;
