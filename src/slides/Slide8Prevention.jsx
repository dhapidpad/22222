import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight, Utensils, Clock, Pill, Sparkles, HeartHandshake } from 'lucide-react';
import Stomach from '../components/svg/Stomach';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide8Prevention({ onSelectSlide }) {
  const data = content.slide8;
  const [activePillar, setActivePillar] = useState(0);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2 select-none">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-2">
        <div>
          <span className="text-xs font-bold text-[#1FBFA8] tracking-widest uppercase">
            {data.tag}
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            {data.title}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-medium max-w-md text-right">
          "Phòng bệnh hơn chữa bệnh — Thay đổi từ những thói quen ăn uống và sinh hoạt nhỏ nhất."
        </p>
      </div>

      {/* Main 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 my-1 items-stretch">
        {data.pillars.map((pil, idx) => {
          const isSelected = activePillar === idx;
          const colors = ['#1FBFA8', '#3BB8F0', '#FF8A5B', '#FFD166'];
          const color = colors[idx];

          return (
            <motion.div
              key={pil.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                sfx.tick();
                setActivePillar(idx);
              }}
              className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-white shadow-xl scale-102 border-[#1FBFA8]'
                  : 'bg-white/75 hover:bg-white/95 border-white shadow-sm'
              }`}
              style={{
                borderTop: `4px solid ${color}`
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{pil.icon}</span>
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {pil.badge}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-sm text-[#12343B] mb-2.5">
                  {pil.title}
                </h3>

                <ul className="space-y-2 text-xs text-[#5B7B80]">
                  {pil.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">✔</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-3 py-1.5 px-3 rounded-xl text-[10px] font-bold text-center"
                style={{ backgroundColor: `${color}15`, color }}
              >
                Trụ cột #{idx + 1} bảo vệ dạ dày
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Summary Bar with Next Slide Button */}
      <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-[#EAF6FD] to-[#FFF3DC] border border-white/80 shadow-sm flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#12343B] font-semibold">
          <span className="text-base">🌿</span>
          <span>
            <strong>Nguyên tắc vàng:</strong> "Ăn đúng giờ • Không nằm sau ăn ít nhất 2–3 giờ • Không tự ý lạm dụng thuốc giảm đau NSAID!"
          </span>
        </div>

        <button
          onClick={() => {
            sfx.whoosh();
            onSelectSlide(9);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white text-xs font-bold shadow hover:opacity-95 shrink-0"
        >
          <span>Kiểm tra kiến thức: 3 Câu hỏi (Slide 9)</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default Slide8Prevention;
