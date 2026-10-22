import React, { useState } from 'react';
import sfx from '../../audio/sfx';

export function HandWash({ className = '' }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: 'Bước 1: Tạo bọt xà phòng',
      desc: 'Làm ướt tay bằng nước, lấy xà phòng và chà sát hai lòng bàn tay vào nhau tạo bọt dày.'
    },
    {
      num: 2,
      title: 'Bước 2: Mu bàn tay & kẽ ngoài',
      desc: 'Chà lòng bàn tay này lên mu bàn tay và kẽ ngoài các ngón tay của bàn tay kia và ngược lại.'
    },
    {
      num: 3,
      title: 'Bước 3: Lòng bàn tay & kẽ trong',
      desc: 'Chà hai lòng bàn tay vào nhau, miết thật mạnh các kẽ ngón tay ở bên trong.'
    },
    {
      num: 4,
      title: 'Bước 4: Mặt ngoài ngón tay',
      desc: 'Chà mặt ngoài các ngón tay của bàn tay này vào lòng bàn tay kia theo kiểu khóa các khớp ngón.'
    },
    {
      num: 5,
      title: 'Bước 5: Xoay ngón tay cái',
      desc: 'Dùng bàn tay này nắm và xoay ngón cái của bàn tay kia và ngược lại để làm sạch toàn diện.'
    },
    {
      num: 6,
      title: 'Bước 6: Xoay đầu ngón tay',
      desc: 'Xoay các đầu ngón tay này vào lòng bàn tay kia để làm sạch sâu móng tay; sau đó xả sạch dưới vòi nước.'
    }
  ];

  return (
    <div className={`p-5 rounded-[28px] bg-white/85 backdrop-blur-md border border-white shadow-mint-glow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-heading font-extrabold text-sm text-[#12343B] flex items-center gap-2">
          <span>🧼</span>
          <span>QUY TRÌNH RỬA TAY 6 BƯỚC THƯỜNG QUY (BỘ Y TẾ)</span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#1FBFA8]/15 text-[#1FBFA8]">
          Tối thiểu 30 giây
        </span>
      </div>

      {/* 6 Step Circles */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {steps.map((st) => {
          const isActive = activeStep === st.num;
          return (
            <button
              key={st.num}
              onClick={() => {
                sfx.tick();
                setActiveStep(st.num);
              }}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white shadow-md scale-105'
                  : 'bg-white/80 text-[#5B7B80] hover:bg-white hover:text-[#12343B]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                {st.num}
              </span>
              <span className="text-[10px] whitespace-nowrap">Bước {st.num}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <div className="p-4 rounded-2xl bg-[#E3F7F2]/60 border border-[#1FBFA8]/20 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1FBFA8] to-[#3BB8F0] text-white font-extrabold flex items-center justify-center text-lg shadow-sm shrink-0">
          {activeStep}
        </div>
        <div>
          <div className="font-heading font-bold text-sm text-[#12343B]">
            {steps[activeStep - 1].title}
          </div>
          <div className="text-xs text-[#5B7B80] mt-1 leading-relaxed">
            {steps[activeStep - 1].desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandWash;
