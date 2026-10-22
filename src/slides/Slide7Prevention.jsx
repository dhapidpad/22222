import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Slide7Prevention v4 — 100% Custom Multi-Layer SVG (4 Trụ Cột Phòng Tránh Bệnh Dạ Dày Toàn Diện) */

const PILLARS = [
  {
    id: 'pil-diet',
    svg: 'dietBowl',
    color: '#14B8A6',
    badge: 'Dinh dưỡng chuẩn',
    title: '1. Ăn uống khoa học & vệ sinh',
    summary: 'Giảm tải cơ học và trung hòa dịch vị tự nhiên cho niêm mạc dạ dày.',
    tips: [
      'Ăn chín uống sôi, rửa tay xà phòng 6 bước để phòng nhiễm H. pylori.',
      'Ăn chậm nhai kỹ, chia nhỏ bữa, ưu tiên đồ luộc hấp mềm dễ tiêu.',
      'Hạn chế tối đa đồ cay nóng gắt, chua gắt, rượu bia, cà phê lúc đói.',
    ],
  },
  {
    id: 'pil-time',
    svg: 'bioClock',
    color: '#0EA5E9',
    badge: 'Nhịp sinh học',
    title: '2. Đúng giờ & Tư thế sau ăn',
    summary: 'Đồng bộ nhịp tiết axit dạ dày và ngăn chặn luồng trào ngược thực quản.',
    tips: [
      'Ăn đúng khung giờ cố định mỗi ngày; tuyệt đối không bỏ bữa sáng.',
      'Không ăn khuya trong vòng 3 giờ trước khi đi ngủ.',
      'Không nằm ngay hoặc vận động mạnh sau ăn ít nhất 2–3 giờ; kê cao đầu giường 15–20 cm nếu bị GERD.',
    ],
  },
  {
    id: 'pil-med',
    svg: 'safeMed',
    color: '#F97316',
    badge: 'An toàn dược lý',
    title: '3. Dùng thuốc & Khám định kỳ',
    summary: 'Bảo vệ hàng rào Prostaglandin và tiệt trừ dứt điểm căn nguyên gây loét.',
    tips: [
      'Không tự ý mua dùng thuốc giảm đau chống viêm NSAID hoặc Corticoid.',
      'Nếu bắt buộc dùng NSAID, phải uống sau ăn no và có thuốc bảo vệ niêm mạc theo đơn bác sĩ.',
      'Khám & nội soi tầm soát sớm khi đau thượng vị, ợ chua kéo dài trên 2 tuần.',
    ],
  },
  {
    id: 'pil-mind',
    svg: 'calmMind',
    color: '#F59E0B',
    badge: 'Trục Não – Ruột',
    title: '4. Giảm stress & Bỏ thuốc lá',
    summary: 'Ổn định dây thần kinh phế vị và tăng cường vi tuần hoàn tái tạo niêm mạc.',
    tips: [
      'Ngủ đủ 7–8 giờ/đêm, tránh thức khuya quá 23h gây tăng tiết HCl ban đêm.',
      'Giải tỏa căng thẳng bằng thể dục nhẹ nhàng, đi bộ, hít thở sâu.',
      'Ngưng hút thuốc lá hoàn toàn để mạch máu nuôi niêm mạc phục hồi nhanh.',
    ],
  },
];

function playSfx(kind = 'tick') {
  try {
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return;
    if (!playSfx.ctx) playSfx.ctx = new AC();
    const ctx = playSfx.ctx;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    if (kind === 'whoosh') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.16);
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.055);
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.065);
    }
  } catch { /* ignore */ }
}

/* ─── Hệ thống Minh họa Vector SVG 3D Cho 4 Trụ Cột Phòng Bệnh (64x64) ─── */
function PillarSvg({ name, size = 44, color = '#14B8A6' }) {
  const p = { width: size, height: size, viewBox: '0 0 64 64', fill: 'none', 'aria-hidden': true };
  switch (name) {
    case 'dietBowl':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="#CCFBF1" stroke="#2DD4BF" strokeWidth="2.5" />
          <path d="M22 15C22 11.5 25 10.5 25 7M32 13C32 9.5 35 8.5 35 5M42 15C42 11.5 45 10.5 45 7" stroke="#0D9488" strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="32" cy="27" rx="20" ry="7.5" fill="#FEF3C7" stroke="#0F766E" strokeWidth="2.5" />
          <circle cx="25" cy="26.5" r="3.5" fill="#10B981" />
          <circle cx="33" cy="25.5" r="3.5" fill="#F59E0B" />
          <circle cx="40" cy="27.5" r="3" fill="#EF4444" />
          <path d="M12 27C12 41 20 50 32 50C44 50 52 41 52 27H12Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="2.8" />
          <path d="M19 34C21 40 25 44 30 45.5" stroke="#99F6E4" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'bioClock':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="20" fill="#fff" stroke="#0284C7" strokeWidth="3.2" />
          <path d="M32 19V32L41 37" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="3.2" fill="#0EA5E9" />
          <path d="M32 8V11M32 53V56M8 32H11M53 32H56" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'safeMed':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="#FFEDD5" stroke="#FB923C" strokeWidth="2.5" />
          <path d="M32 10L50 17.5V31.5C50 43.5 42 51.5 32 55C22 51.5 14 43.5 14 31.5V17.5L32 10Z" fill="#F97316" stroke="#9A3412" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M32 23V39M24 31H40" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'calmMind':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="56" height="56" rx="18" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
          <path d="M32 49C32 49 14 37.5 14 24.5C14 18 19 13.5 25 13.5C28.8 13.5 32 16 32 19C32 16 35.2 13.5 39 13.5C45 13.5 50 18 50 24.5C50 37.5 32 49 32 49Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2.8" />
          <path d="M23 30L29.5 36.5L41.5 24" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'check':
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="26" fill={color} fillOpacity=".16" stroke={color} strokeWidth="4" />
          <path d="M20 33L28.5 41.5L45 24" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'leafShield':
      return (
        <svg {...p}>
          <path d="M52 10C28 10 12 24 12 46C12 49 12.6 51.5 13.5 54C35.5 54 52 38 52 10Z" fill="#10B981" stroke="#047857" strokeWidth="3.5" />
          <path d="M14 52C24 40 35 29 48 16" stroke="#ECFDF5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'arrowRight':
      return (
        <svg {...p}>
          <path d="M14 32H50M36 18L50 32L36 46" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function Slide7Prevention({ onSelectSlide = () => {} }) {
  const [activePillar, setActivePillar] = useState(0);
  const current = PILLARS[activePillar] || PILLARS[0];

  const selectPillar = useCallback((idx) => {
    playSfx('tick');
    setActivePillar(idx);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#FFFBEB] rounded-3xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-extrabold text-[#14B8A6] tracking-widest uppercase">
            SLIDE 07 • GIẢI PHÁP DỰ PHÒNG & BẢO VỆ HỆ TIÊU HÓA
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            4 Trụ Cột Vàng Phòng Tránh Bệnh Dạ Dày Toàn Diện
          </h2>
        </div>

        {/* Thanh tóm tắt trụ cột đang chọn */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="px-3.5 py-2 rounded-2xl bg-white/95 border border-white shadow-md flex items-center gap-2.5 max-w-md"
          >
            <PillarSvg name={current.svg} size={32} />
            <div className="leading-tight text-left">
              <div className="text-xs font-extrabold" style={{ color: current.color }}>{current.title}</div>
              <div className="text-[11px] font-semibold text-[#5B7B80]">{current.summary}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 my-1 items-stretch">
        {PILLARS.map((pil, idx) => {
          const isSelected = activePillar === idx;

          return (
            <motion.div
              key={pil.id}
              whileHover={{ y: -3 }}
              onClick={() => selectPillar(idx)}
              className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                isSelected
                  ? 'bg-white shadow-xl'
                  : 'bg-white/80 hover:bg-white/95 border-white shadow-sm'
              }`}
              style={{
                borderColor: isSelected ? pil.color : undefined,
                borderTop: `5px solid ${pil.color}`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <PillarSvg name={pil.svg} size={46} />
                  <span
                    className="text-[10px] font-extrabold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${pil.color}18`, color: pil.color }}
                  >
                    {pil.badge}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-sm md:text-[15px] text-[#12343B] mb-2">
                  {pil.title}
                </h3>

                <ul className="space-y-2 text-xs text-[#5B7B80] font-medium">
                  {pil.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="shrink-0 mt-0.5">
                        <PillarSvg name="check" size={16} color={pil.color} />
                      </span>
                      <span className="leading-relaxed text-[#12343B]/90">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="mt-3 py-1.5 px-3 rounded-xl text-[10.5px] font-extrabold text-center transition-colors"
                style={{
                  backgroundColor: isSelected ? pil.color : `${pil.color}15`,
                  color: isSelected ? '#fff' : pil.color,
                }}
              >
                {isSelected ? `★ Đang chọn Trụ cột #${idx + 1}` : `Trụ cột #${idx + 1} bảo vệ dạ dày`}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Summary Bar with Next Slide Button */}
      <div className="w-full p-3 px-4 rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-[#EAF6FD] to-[#FFF3DC] border-2 border-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-[#12343B] font-semibold">
          <PillarSvg name="leafShield" size={24} />
          <span>
            <strong>Nguyên tắc vàng GUT CARE:</strong> Ăn chín đúng giờ • Không nằm ngay sau ăn 2–3 giờ • Không tự ý lạm dụng thuốc giảm đau NSAID!
          </span>
        </div>

        <button
          onClick={() => {
            playSfx('whoosh');
            onSelectSlide(8);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] text-white text-xs font-extrabold shadow-md hover:opacity-95 shrink-0 transition"
        >
          <span>Kiểm tra kiến thức: 3 Câu hỏi (Slide 8)</span>
          <PillarSvg name="arrowRight" size={14} color="#fff" />
        </button>
      </div>
    </div>
  );
}

export default Slide7Prevention;