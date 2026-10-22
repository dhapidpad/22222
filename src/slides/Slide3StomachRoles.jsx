import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';
import Stomach from '../components/svg/Stomach';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide3StomachRoles({ onNext, onSelectSlide }) {
  const data = content.slide3;
  const [selectedRole, setSelectedRole] = useState(0);

  const activeRole = data.roles[selectedRole] || data.roles[0];

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
          "Đoạn phình to nhất của ống tiêu hóa, nối giữa thực quản và tá tràng."
        </p>
      </div>

      {/* Main Grid: Left Interactive Stomach Graphic + Right 4 Role Cards */}
      <div className="grid grid-cols-12 gap-6 items-center flex-1 my-1">
        {/* Left Column (5 Cols): Stomach Visual & PH Indicator */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center">
          <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-white shadow-xl flex flex-col items-center">
            <Stomach state="normal" size={260} showFace={true} />

            {/* Gastric pH Acid Scale */}
            <div className="w-full mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-center">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                <span>Độ Axit dịch vị (HCl):</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white font-extrabold">
                  pH 1.5 – 3.5
                </span>
              </div>
              <div className="w-full h-3 bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 rounded-full relative">
                {/* Needle pointer at pH 2 */}
                <div className="absolute top-[-3px] left-[18%] w-2 h-4.5 bg-[#12343B] rounded-full shadow" />
              </div>
              <div className="flex justify-between text-[10px] text-amber-800 font-bold mt-1">
                <span>pH 1 (Cực mạnh)</span>
                <span>pH 7 (Trung tính)</span>
                <span>pH 14 (Kiềm)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): 4 Core Roles Grid */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.roles.map((r, i) => {
              const isSelected = selectedRole === i;
              return (
                <div
                  key={r.id}
                  onClick={() => {
                    sfx.tick();
                    setSelectedRole(i);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white shadow-xl scale-102 border-[#1FBFA8]'
                      : 'bg-white/70 hover:bg-white/95 border-white opacity-85'
                  }`}
                  style={{
                    borderLeft: isSelected ? `5px solid ${r.color}` : '1px solid rgba(255,255,255,0.8)'
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{r.icon}</span>
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${r.color}20`, color: r.color }}
                    >
                      {r.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-sm text-[#12343B] mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#5B7B80] leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Jump to Diseases Slide */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#1FBFA8]/15 via-[#3BB8F0]/15 to-transparent border border-white/80 shadow-sm mt-1">
            <span className="text-xs font-semibold text-[#12343B]">
              👉 Khi các vai trò này bị rối loạn sẽ dẫn đến các bệnh lý nguy hiểm nào?
            </span>
            <button
              onClick={() => {
                sfx.whoosh();
                onSelectSlide(4);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white text-xs font-bold shadow hover:opacity-95"
            >
              <span>Xem các bệnh dạ dày (Slide 4)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Footer Note */}
      <div className="w-full text-center text-[11px] text-[#5B7B80] font-medium pt-1">
        💡 Dạ dày tự bảo vệ mình khỏi Axit HCl bằng lớp chất nhầy Mucin kiềm dày 0.2 mm. Khi lớp này tổn thương, bệnh lý sẽ bùng phát!
      </div>
    </div>
  );
}

export default Slide3StomachRoles;
