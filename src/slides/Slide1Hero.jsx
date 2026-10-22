import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, ArrowRight } from 'lucide-react';
import DigestiveSystem from '../components/svg/DigestiveSystem';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide1Hero({ onNext, onSelectSlide }) {
  const data = content.slide1;

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-12 py-4 select-none">
      {/* Left Column: Heading & CTAs (55%) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[52%] flex flex-col justify-center items-start z-10"
      >
        {/* Category Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1FBFA8]/15 border border-[#1FBFA8]/30 text-[#1FBFA8] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <span>🌿</span>
          <span>{data.tag}</span>
        </div>

        {/* H1 Title with Brand Gradient & Artistic Hand-drawn Underline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-[#12343B] mb-4">
          CÁC BỆNH VỀ <br />
          <span className="text-grad-brand relative inline-block">
            DẠ DÀY
            {/* Hand-drawn yellow underline SVG */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD166] overflow-visible"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M 2 8 C 50 2, 150 2, 198 7"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#5B7B80] font-medium leading-relaxed max-w-xl mb-6">
          {data.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={() => {
              sfx.whoosh();
              onNext();
            }}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-heading font-bold text-base shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            <Play size={18} fill="currentColor" />
            <span>BẮT ĐẦU</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              sfx.tick();
              onSelectSlide(3);
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#12343B] font-heading font-bold text-base border border-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <Users size={18} className="text-[#1FBFA8]" />
            <span>Đội ngũ nhóm</span>
          </button>
        </div>

        {/* 3 Interactive Chips */}
        <div className="flex flex-wrap items-center gap-3">
          {data.items.map((chip, i) => (
            <div
              key={chip.id}
              onClick={() => {
                sfx.tick();
                onSelectSlide(i === 0 ? 4 : i === 1 ? 6 : 7);
              }}
              className="cursor-pointer px-4 py-2 rounded-2xl bg-white/75 backdrop-blur-md border border-white hover:bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
            >
              <span
                className="w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform"
                style={{
                  backgroundColor:
                    chip.color === 'orange' ? '#FF8A5B' : chip.color === 'blue' ? '#3BB8F0' : '#1FBFA8'
                }}
              />
              <span className="text-xs font-bold text-[#12343B]">{chip.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Large Interactive DigestiveSystem SVG (48%) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full md:w-[48%] flex items-center justify-center relative"
      >
        <DigestiveSystem
          width={470}
          height={560}
          onSelectPart={(part) => {
            sfx.tick();
            if (part === 'stomach') onSelectSlide(4);
            else if (part === 'esophagus') onSelectSlide(7);
            else onSelectSlide(4);
          }}
        />
      </motion.div>
    </div>
  );
}

export default Slide1Hero;
