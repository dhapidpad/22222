import React from 'react';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';
import VennCompare from '../components/svg/VennCompare';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide11Compare({ onSelectSlide }) {
  const data = content.slide11;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-12 py-2">
      {/* Slide Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-[#1FBFA8] tracking-widest uppercase">
            {data.tag}
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            {data.title}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-medium max-w-lg text-right">
          "Khác nhau về vị trí giải phẫu và diễn tiến, nhưng cùng chung nền tảng phòng bệnh từ đôi bàn tay sạch."
        </p>
      </div>

      {/* Top Part: Interactive Venn Diagram */}
      <div className="flex-1 my-1 flex items-center justify-center">
        <VennCompare className="w-full max-w-4xl" />
      </div>

      {/* Bottom Part: 2x3 Comparison Table with Clickable Jump Buttons */}
      <div className="w-full p-4 rounded-3xl bg-white/85 backdrop-blur-md border border-white shadow-sm mt-2">
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Header Row */}
          <div className="col-span-3 text-xs font-bold text-[#5B7B80]">BỆNH LÝ</div>
          <div className="col-span-3 text-xs font-bold text-[#5B7B80]">① NGUYÊN NHÂN</div>
          <div className="col-span-3 text-xs font-bold text-[#5B7B80]">② TRIỆU CHỨNG</div>
          <div className="col-span-3 text-xs font-bold text-[#5B7B80]">③ PHÒNG BỆNH</div>

          {/* Row 1: Loét Dạ Dày */}
          <div className="col-span-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A5B]"></span>
            <span className="font-heading font-extrabold text-xs text-[#D84315]">
              🟠 Viêm loét dạ dày
            </span>
          </div>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(5);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#FFF2EB] hover:bg-[#FF8A5B]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>H. pylori & Thuốc NSAID</span>
            <ArrowUpRight size={13} className="text-[#FF8A5B] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(6);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#FFF2EB] hover:bg-[#FF8A5B]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>Đau rát thượng vị, ợ chua</span>
            <ArrowUpRight size={13} className="text-[#FF8A5B] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(7);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#FFF2EB] hover:bg-[#FF8A5B]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>4 Khiên bảo vệ niêm mạc</span>
            <ArrowUpRight size={13} className="text-[#FF8A5B] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Row 2: Tiêu Chảy Cấp */}
          <div className="col-span-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3BB8F0]"></span>
            <span className="font-heading font-extrabold text-xs text-[#0288D1]">
              🔵 Tiêu chảy cấp
            </span>
          </div>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(8);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#EAF6FD] hover:bg-[#3BB8F0]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>Rotavirus & Vi khuẩn E. coli</span>
            <ArrowUpRight size={13} className="text-[#3BB8F0] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(9);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#EAF6FD] hover:bg-[#3BB8F0]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>Phân lỏng ≥3 lần, mất nước</span>
            <ArrowUpRight size={13} className="text-[#3BB8F0] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(10);
            }}
            className="col-span-3 p-2 rounded-xl bg-[#EAF6FD] hover:bg-[#3BB8F0]/20 transition-colors text-left text-xs text-[#12343B] flex items-center justify-between group"
          >
            <span>Rửa tay, vaccine, Oresol</span>
            <ArrowUpRight size={13} className="text-[#3BB8F0] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide11Compare;
