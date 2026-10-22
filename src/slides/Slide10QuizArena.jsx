import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import sfx from '../audio/sfx';

/* ──────────────────────────────────────────────────────────────
   DỮ LIỆU CÂU HỎI (giữ nguyên để các slide khác vẫn import được)
   ────────────────────────────────────────────────────────────── */
const QUIZ_QUESTIONS = [
  {
    id: 1,
    topic: 'Dạ dày & Viêm loét',
    category: 'gastritis',
    question: 'Tế bào viền của dạ dày tiết ra chất nào tạo môi trường pH axit rất mạnh (1.5 – 3.5) giúp diệt khuẩn và hoạt hóa men tiêu hóa Pepsin?',
    options: [
      { text: 'A. Axit Axetic (giấm ăn), pH 5.0 – 6.0', correct: false },
      { text: 'B. Axit Clohydric (HCl), pH 1.5 – 3.5', correct: true },
      { text: 'C. Axit Sunfuric (H₂SO₄), pH 0.5 – 1.0', correct: false },
      { text: 'D. Axit Lactic từ quá trình lên men', correct: false }
    ],
    explanation: 'Chính xác! Tế bào viền (parietal cells) ở thân vị dạ dày tiết ra Axit Clohydric (HCl) tạo độ axit cực cao (pH 1.5 – 3.5) để tiêu diệt phần lớn vi khuẩn theo thức ăn và hoạt hóa Pepsinogen thành men Pepsin tiêu hóa protein.'
  },
  {
    id: 2,
    topic: 'Căn nguyên Viêm loét',
    category: 'gastritis',
    question: 'Tác nhân vi khuẩn hàng đầu có mặt ở khoảng 70% dân số Việt Nam, có khả năng tiết men Urease trung hòa axit để sinh sống và gây viêm loét dạ dày là gì?',
    options: [
      { text: 'A. Trực khuẩn E. coli', correct: false },
      { text: 'B. Vi khuẩn xoắn Helicobacter pylori (H. pylori)', correct: true },
      { text: 'C. Phẩy khuẩn tả Vibrio cholerae', correct: false },
      { text: 'D. Vi khuẩn lao Mycobacterium', correct: false }
    ],
    explanation: 'Chính xác! Helicobacter pylori (H. pylori) là vi khuẩn xoắn gram âm duy nhất có khả năng sống trong dịch vị dạ dày nhờ men Urease chuyển hóa ure thành amoniac (kiềm) bao quanh, từ đó phá hủy lớp chất nhầy bảo vệ niêm mạc.'
  },
  {
    id: 3,
    topic: 'Triệu chứng GERD',
    category: 'gastritis',
    question: 'Triệu chứng điển hình và phổ biến nhất của bệnh Trào ngược dạ dày thực quản (GERD) là gì?',
    options: [
      { text: 'A. Đau quặn quanh rốn và đi ngoài phân lỏng nhiều lần', correct: false },
      { text: 'B. Ợ nóng (nóng rát sau xương ức lan lên họng) kèm ợ chua', correct: true },
      { text: 'C. Vàng da, vàng mắt kèm sốt cao co giật', correct: false },
      { text: 'D. Đau dữ dội vùng hố chậu phải', correct: false }
    ],
    explanation: 'Chính xác! Cảm giác nóng rát sau xương ức lan lên cổ họng (heartburn / ợ nóng) và ợ chua là 2 triệu chứng kinh điển khi cơ thắt thực quản dưới (LES) bị suy yếu làm axit trào ngược lên bào mòn niêm mạc thực quản.'
  },
  {
    id: 4,
    topic: 'Căn nguyên Tiêu chảy',
    category: 'diarrhea',
    question: 'Tác nhân virus hàng đầu gây tiêu chảy cấp nặng dẫn đến kiệt nước tử vong ở trẻ em dưới 5 tuổi trên toàn cầu là gì?',
    options: [
      { text: 'A. Virus Viêm gan B', correct: false },
      { text: 'B. Rotavirus (Capsid kép hình nan hoa bánh xe)', correct: true },
      { text: 'C. Virus Cúm mùa H1N1', correct: false },
      { text: 'D. Virus Dengue gây sốt xuất huyết', correct: false }
    ],
    explanation: 'Chính xác! Theo WHO, Rotavirus là nguyên nhân hàng đầu gây tiêu chảy mất nước nặng ở trẻ nhỏ. Cấu trúc capsid kép hình nan hoa bánh xe giúp virus chịu được môi trường axit. Trẻ cần được uống đủ 2 liều vaccine Rotavirus trước 6 tháng tuổi.'
  },
  {
    id: 5,
    topic: 'Dấu hiệu Cờ Đỏ Cấp Cứu',
    category: 'diarrhea',
    question: 'Theo phác đồ của Bộ Y tế và WHO, dấu hiệu nếp véo da bụng phẳng "rất chậm" (> 2 giây) kèm mắt rất trũng, li bì báo hiệu điều gì?',
    options: [
      { text: 'A. Mất nước nhẹ, chỉ cần nằm nghỉ', correct: false },
      { text: 'B. Mất nước mức độ nặng (Phác đồ C) — Cần cấp cứu truyền dịch tĩnh mạch ngay!', correct: true },
      { text: 'C. Dị ứng thực phẩm bình thường', correct: false },
      { text: 'D. Cơ thể đang tự hồi phục tốt', correct: false }
    ],
    explanation: 'Chính xác! Nếp véo da bụng mất rất chậm (> 2 giây) chứng tỏ lượng nước mất đi đã vượt quá 10% trọng lượng cơ thể (mất nước nặng). Người bệnh có nguy cơ trụy tim mạch và sốc giảm thể tích, bắt buộc phải truyền dịch cấp cứu tại bệnh viện!'
  },
  {
    id: 6,
    topic: 'Xử trí Ban Đầu & Oresol',
    category: 'diarrhea',
    question: 'Khi bù nước bằng gói Oresol cho người bị tiêu chảy, nguyên tắc sống còn nào sau đây phải tuân thủ tuyệt đối?',
    options: [
      { text: 'A. Pha thêm đường hoặc sữa cho ngọt thơm dễ uống', correct: false },
      { text: 'B. Pha thật đặc với ít nước để phát huy hiệu quả nhanh', correct: false },
      { text: 'C. Pha đúng 100% lượng nước sạch ghi trên vỏ gói (áp lực thẩm thấu chuẩn 245 mOsm/L), uống từng ngụm nhỏ', correct: true },
      { text: 'D. Uống kèm ngay viên thuốc cầm tiêu chảy Loperamide để chặn ruột', correct: false }
    ],
    explanation: 'Chính xác! Gói Oresol giảm áp lực thẩm thấu (245 mOsm/L) phải được pha đúng chính xác 100% thể tích nước (thường là 1000ml hoặc 200ml). Pha quá đặc hay thêm đường/sữa sẽ hút ngược nước vào lòng ruột, gây co giật não và nguy kịch!'
  }
];

/* ──────────────────────────────────────────────────────────────
   HẰNG SỐ & TIỆN ÍCH
   ────────────────────────────────────────────────────────────── */
const INK = '#12343B';
const MUTE = '#5B7B80';

const TONES = {
  gastritis: { main: '#FF8A5B', deep: '#E4673A', bg1: '#FFF1E8', bg2: '#FFD9C6', label: 'Dạ dày & trào ngược' },
  diarrhea: { main: '#3BB8F0', deep: '#1F93C8', bg1: '#E8F6FD', bg2: '#C2E7F8', label: 'Tiêu chảy cấp' }
};

const splitOpt = (t) => {
  const m = /^([A-D])\.\s*([\s\S]*)$/.exec(t);
  return m ? [m[1], m[2]] : ['', t];
};

const play = (name) => {
  try {
    if (sfx && typeof sfx[name] === 'function') sfx[name]();
  } catch (e) {}
};

const loop = (reduce, animate, duration = 4, extra = {}) =>
  reduce ? {} : { animate, transition: { duration, repeat: Infinity, ease: 'easeInOut', ...extra } };

const wave = (p, y, a, ext = 420) =>
  `M0 ${y}q${p / 4} ${-a} ${p / 2} 0${` t${p / 2} 0`.repeat(Math.ceil((ext + p) / (p / 2)))}V340H0Z`;

const ANGLES = (n) => Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2);
const pt = (r, a) => [+(Math.cos(a) * r).toFixed(2), +(Math.sin(a) * r).toFixed(2)];

const DROP = 'M0 -8C4 -2 6 2 6 4A6 6 0 0 1 -6 4C-6 2 -4 -2 0 -8Z';

/* Nhãn "?" → hiện đáp án sau khi người chơi trả lời */
function Tag({ x, y, text, show, tone = '#1FBFA8' }) {
  const w = Math.max(26, text.length * 5.7 + 20);
  return (
    <g transform={`translate(${x} ${y})`}>
      <AnimatePresence mode="wait" initial={false}>
        {show ? (
          <motion.g
            key="label"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          >
            <rect x={-w / 2} y="-12" width={w} height="24" rx="12" fill={tone} />
            <rect x={-w / 2 + 1.5} y="-10.5" width={w - 3} height="9" rx="4.5" fill="#fff" opacity=".18" />
            <text textAnchor="middle" y="4" fontSize="10.5" fontWeight="800" fill="#fff">{text}</text>
          </motion.g>
        ) : (
          <motion.g
            key="unknown"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <circle r="12" fill="#fff" stroke={tone} strokeWidth="1.8" strokeDasharray="3 2.6" />
            <text textAnchor="middle" y="4.5" fontSize="13" fontWeight="800" fill={tone}>?</text>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}

/* Hình dạ dày dùng chung */
const STOMACH_D =
  'M200 18V74C186 66 160 52 128 70C84 94 60 150 76 202C92 256 160 276 222 264C278 254 314 232 332 204L352 212V184L332 184C318 194 296 202 272 198C238 192 232 146 228 74V18Z';

/* ──────────────────────────────────────────────────────────────
   6 MINH HỌA SVG (viewBox 400 × 304)
   ────────────────────────────────────────────────────────────── */

/* Câu 1 — Tế bào viền & axit HCl */
function SceneAcid({ show, reduce }) {
  const bubbles = [[112, 236, 4], [152, 246, 3], [196, 232, 5], [240, 244, 3.5], [282, 236, 4]];
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Dạ dày, tế bào viền và thang pH">
      <defs>
        <linearGradient id="s1-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFCDBE" /><stop offset="1" stopColor="#F4887A" />
        </linearGradient>
        <linearGradient id="s1-acid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F28A" /><stop offset="1" stopColor="#E3C547" />
        </linearGradient>
        <linearGradient id="s1-ph" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EF4B5F" /><stop offset=".2" stopColor="#FF8A5B" />
          <stop offset=".4" stopColor="#FFD166" /><stop offset=".55" stopColor="#8EDB8A" />
          <stop offset=".75" stopColor="#3BB8F0" /><stop offset="1" stopColor="#7B6CE0" />
        </linearGradient>
        <clipPath id="s1-clip"><path d={STOMACH_D} /></clipPath>
        <clipPath id="s1-lens"><circle cx="322" cy="80" r="48" /></clipPath>
      </defs>

      <g transform="translate(18 2) scale(.9)">
        <path d={STOMACH_D} fill="#C95F52" opacity=".22" transform="translate(6 9)" />
        <path d={STOMACH_D} fill="url(#s1-wall)" stroke="#D9675A" strokeWidth="4" strokeLinejoin="round" />
        <g clipPath="url(#s1-clip)">
          <path d={STOMACH_D} fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="16" />
          {[118, 146, 174].map((y, i) => (
            <path key={y} d={`M70 ${y}q28 -16 56 0t56 0t56 0t56 0`} fill="none" stroke="#fff"
              strokeOpacity={0.5 - i * 0.08} strokeWidth="3.5" strokeLinecap="round" />
          ))}
          <motion.path d={wave(50, 214, 7)} fill="url(#s1-acid)" opacity=".55" transform="translate(0 8)"
            {...(reduce ? {} : { animate: { x: [-50, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'linear' } })} />
          <motion.path d={wave(50, 214, 7)} fill="url(#s1-acid)"
            {...(reduce ? {} : { animate: { x: [0, -50] }, transition: { duration: 5, repeat: Infinity, ease: 'linear' } })} />
          {bubbles.map(([cx, cy, r], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r={r} fill="#fff" fillOpacity=".55" stroke="#fff" strokeOpacity=".8"
              {...loop(reduce, { cy: [cy + 6, cy - 22], opacity: [0, 1, 0] }, 3.2, { delay: i * 0.55, ease: 'easeOut' })} />
          ))}
        </g>
        {[30, 42, 54, 66].map((y) => (
          <path key={y} d={`M201 ${y}H227`} stroke="#D9675A" strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </g>

      {/* Kính lúp: tế bào viền */}
      <path d="M227 101L276 84" stroke={INK} strokeOpacity=".35" strokeWidth="1.6" strokeDasharray="3 3" />
      <circle cx="227" cy="101" r="4" fill="#fff" stroke={INK} strokeOpacity=".5" strokeWidth="1.6" />
      <circle cx="322" cy="80" r="48" fill="#FFF8F3" />
      <g clipPath="url(#s1-lens)">
        <rect x="270" y="30" width="104" height="22" fill="url(#s1-acid)" opacity=".85" />
        <path d="M290 128C288 102 296 82 308 72Q322 64 336 72C348 82 356 102 354 128Z" fill="#FFC7B8" stroke="#E9806F" strokeWidth="2" />
        <path d="M316 78q-5 -8 0 -16M322 76V58M328 78q5 -8 0 -16" fill="none" stroke="#E9806F" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="301" cy="96" rx="6" ry="3" transform="rotate(-30 301 96)" fill="#F6A38D" stroke="#E9806F" />
        <ellipse cx="343" cy="96" rx="6" ry="3" transform="rotate(30 343 96)" fill="#F6A38D" stroke="#E9806F" />
        <circle cx="322" cy="108" r="11" fill="#B88AE0" stroke="#8F5FC0" strokeWidth="1.8" />
        <circle cx="325" cy="105" r="3.4" fill="#8F5FC0" />
        {[[314, 58, '#FF8A5B'], [331, 56, '#1FBFA8'], [322, 46, '#FF8A5B'], [306, 48, '#1FBFA8']].map(([cx, cy, c], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="3.6" fill={c}
            {...loop(reduce, { cy: [cy + 8, cy - 6], opacity: [0, 1, 0] }, 2.4, { delay: i * 0.4, ease: 'easeOut' })} />
        ))}
      </g>
      <circle cx="322" cy="80" r="48" fill="none" stroke="#fff" strokeWidth="5" />
      <circle cx="322" cy="80" r="48" fill="none" stroke="#FF8A5B" strokeWidth="2.2" />
      <path d="M356 114L374 132" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      <path d="M356 114L374 132" stroke="#3B6A72" strokeWidth="3" strokeLinecap="round" />
      <text x="322" y="150" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>Tế bào viền</text>

      <Tag x="152" y="222" text="Axit HCl" show={show} tone="#E4673A" />

      {/* Thang pH */}
      <rect x="40" y="266" width="320" height="10" rx="5" fill="url(#s1-ph)" />
      {[0, 7, 14].map((v) => (
        <g key={v}>
          <path d={`M${40 + (v * 320) / 14} 278v4`} stroke={MUTE} strokeWidth="1.2" />
          <text x={40 + (v * 320) / 14} y="294" textAnchor="middle" fontSize="9" fill={MUTE}>{v}</text>
        </g>
      ))}
      <text x="360" y="259" textAnchor="end" fontSize="9" fontWeight="700" fill={MUTE}>Thang pH</text>
      <motion.g initial={false} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 5 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
        <rect x="74.3" y="262" width="45.7" height="18" rx="7" fill="none" stroke={INK} strokeWidth="2" />
        <text x="97" y="256" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={INK}>pH 1.5 – 3.5</text>
      </motion.g>
    </svg>
  );
}

/* Câu 2 — H. pylori & men Urease */
function Pylori({ x, y, rot = 0, s = 1, reduce, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <motion.g {...loop(reduce, { rotate: [-3, 3, -3], x: [-2, 2, -2] }, 3.6, { delay })}>
        <path d="M-28 0q-10 -9 -19 -3t-17 5" fill="none" stroke="#5A3DB8" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M-28 0q-11 2 -20 8t-14 -1" fill="none" stroke="#5A3DB8" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M-28 0q-9 9 -17 6t-18 -4" fill="none" stroke="#5A3DB8" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M-28 0q7 -12 14 0t14 0t14 0t14 0" fill="none" stroke="#5A3DB8" strokeWidth="9" strokeLinecap="round" />
        <path d="M-28 0q7 -12 14 0t14 0t14 0t14 0" fill="none" stroke="#A98BF5" strokeWidth="3.5" strokeLinecap="round" opacity=".85" />
      </motion.g>
    </g>
  );
}

function ScenePylori({ show, reduce }) {
  const acid = [[40, 22], [96, 46], [150, 24], [222, 54], [272, 28], [352, 44], [190, 84], [60, 84], [312, 86]];
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Vi khuẩn H. pylori trong lớp chất nhầy dạ dày">
      <defs>
        <linearGradient id="s2-lumen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6CF" /><stop offset="1" stopColor="#FFE58F" />
        </linearGradient>
        <linearGradient id="s2-mucus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9F2EA" /><stop offset="1" stopColor="#9FE3D6" />
        </linearGradient>
      </defs>

      <rect width="400" height="112" fill="url(#s2-lumen)" />
      {acid.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="3.6" fill="#FF8A5B"
          {...loop(reduce, { cy: [y, y + 10, y] }, 3 + (i % 3) * 0.5, { delay: i * 0.25 })} />
      ))}
      {[70, 200, 330].map((x, i) => (
        <motion.g key={x} opacity=".7" {...loop(reduce, { y: [0, 7, 0] }, 2.2, { delay: i * 0.3 })}>
          <path d={`M${x} 58v24`} stroke="#EF4B5F" strokeWidth="2.2" strokeLinecap="round" />
          <path d={`M${x - 6} 78l6 8 6 -8`} fill="none" stroke="#EF4B5F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      ))}

      {/* Lớp chất nhầy */}
      <path d={wave(50, 106, 5)} fill="url(#s2-mucus)" stroke="#6FD6C4" strokeWidth="1.6" />
      {[[34, 122], [96, 128], [250, 122], [352, 126], [160, 132]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}q9 12 0 26`} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      ))}

      {/* Biểu mô */}
      <rect x="0" y="172" width="400" height="140" fill="#F9D5CB" />
      <path d="M158 172C158 224 242 224 242 172Z" fill="#D96A5C" />
      <path d="M170 176C170 212 230 212 230 176Z" fill="#B9503F" opacity=".55" />
      {[4, 44, 84, 124, 242, 282, 322, 362].map((x) => (
        <g key={x}>
          {[8, 17, 26].map((dx) => (
            <path key={dx} d={`M${x + dx} 172v-7`} stroke="#E58C7C" strokeWidth="2" strokeLinecap="round" />
          ))}
          <rect x={x} y="172" width="34" height="56" rx="12" fill="#F8B4A6" stroke="#E58C7C" strokeWidth="2" />
          <rect x={x + 4} y="176" width="7" height="38" rx="3.5" fill="#fff" opacity=".28" />
          <circle cx={x + 17} cy="208" r="6.5" fill="#C58AE0" stroke="#9A62C4" strokeWidth="1.5" />
        </g>
      ))}

      {/* Mạch máu */}
      <path d="M0 268C60 248 100 290 160 270S260 250 320 272S380 280 400 264" fill="none" stroke="#E94B5F" strokeWidth="13" strokeLinecap="round" />
      <path d="M0 268C60 248 100 290 160 270S260 250 320 272S380 280 400 264" fill="none" stroke="#FF8F9B" strokeWidth="5" strokeLinecap="round" />
      {[[60, 259], [150, 275], [250, 261], [340, 273]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="3.5" fill="#B71C34" opacity=".75" />
      ))}

      {/* Men Urease tạo "đám mây" kiềm */}
      <motion.ellipse cx="118" cy="148" rx="58" ry="28" fill="#1FBFA8" fillOpacity=".14" stroke="#1FBFA8" strokeWidth="1.6" strokeDasharray="4 4"
        {...loop(reduce, { strokeDashoffset: [0, -16] }, 2, { ease: 'linear' })} />
      {[[80, 134], [150, 130], [100, 166], [142, 164]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#1FBFA8" strokeWidth="1.6"
          {...loop(reduce, { cy: [y + 6, y - 8], opacity: [0, 1, 0] }, 2.6, { delay: i * 0.5, ease: 'easeOut' })} />
      ))}
      <Pylori x={118} y={148} rot={-10} reduce={reduce} />
      <Pylori x={292} y={136} rot={12} s={0.9} reduce={reduce} delay={0.8} />
      <Pylori x={200} y={198} rot={-6} s={0.7} reduce={reduce} delay={1.4} />

      <g fontSize="9.5" fontWeight="700" fill={INK} fillOpacity=".62" textAnchor="end">
        <text x="392" y="16">Dịch vị axit</text>
        <text x="392" y="158">Lớp chất nhầy</text>
        <text x="392" y="246">Niêm mạc dạ dày</text>
      </g>

      <Tag x={118} y={108} text="H. pylori" show={show} tone="#5A3DB8" />
      {show && <Tag x={282} y={100} text="Urease: ure → NH₃" show tone="#1FBFA8" />}
    </svg>
  );
}

/* Câu 3 — Trào ngược & ợ nóng */
function SceneReflux({ show, reduce }) {
  const ST = 'M156 152C100 156 64 192 74 236C84 278 176 290 244 262C296 240 298 190 236 152Z';
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Thực quản, cơ thắt LES và axit trào ngược">
      <defs>
        <linearGradient id="s3-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFCDBE" /><stop offset="1" stopColor="#F4887A" />
        </linearGradient>
        <linearGradient id="s3-acid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F28A" /><stop offset="1" stopColor="#E3C547" />
        </linearGradient>
        <radialGradient id="s3-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FF6B3D" stopOpacity=".85" /><stop offset="1" stopColor="#FF8A5B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="s3-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#EF4B5F" /><stop offset=".55" stopColor="#FF8A5B" /><stop offset="1" stopColor="#FFD166" />
        </linearGradient>
        <clipPath id="s3-st"><path d={ST} /></clipPath>
      </defs>

      {/* Xương ức */}
      {[40, 62, 84, 106].map((y) => (
        <g key={y}>
          <path d={`M250 ${y}q26 2 42 18`} fill="none" stroke="#D9C7A3" strokeWidth="7" strokeLinecap="round" />
          <path d={`M250 ${y}q26 2 42 18`} fill="none" stroke="#FBF3E2" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      ))}
      <rect x="226" y="30" width="24" height="128" rx="12" fill="#FBF3E2" stroke="#D9C7A3" strokeWidth="2.5" />
      <path d="M229 54h18" stroke="#D9C7A3" strokeWidth="2" />
      <text x="252" y="22" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={INK} fillOpacity=".62">Xương ức</text>

      {/* Dạ dày */}
      <path d={ST} fill="#C95F52" opacity=".2" transform="translate(5 8)" />
      <path d={ST} fill="url(#s3-wall)" stroke="#D9675A" strokeWidth="3.5" strokeLinejoin="round" />
      <g clipPath="url(#s3-st)">
        <path d={ST} fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="14" />
        <motion.path d={wave(60, 228, 6)} fill="url(#s3-acid)"
          {...(reduce ? {} : { animate: { x: [0, -60] }, transition: { duration: 5.5, repeat: Infinity, ease: 'linear' } })} />
        {[[110, 252], [160, 262], [220, 250]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="3.6" fill="#fff" fillOpacity=".6"
            {...loop(reduce, { cy: [y, y - 18], opacity: [0, 1, 0] }, 3, { delay: i * 0.7, ease: 'easeOut' })} />
        ))}
      </g>

      {/* Thực quản */}
      <path d="M174 12C168 50 182 92 176 152H216C222 92 208 50 218 12Z" fill="url(#s3-wall)" stroke="#D9675A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M185 12C181 50 190 92 187 152H205C208 92 200 50 207 12Z" fill="#FFE9E1" />
      <motion.ellipse cx="196" cy="116" rx="42" ry="46" fill="url(#s3-glow)"
        {...loop(reduce, { opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }, 1.8)} />

      {/* Axit đi ngược lên */}
      <motion.path d="M196 216V150" fill="none" stroke="#FF8A5B" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="6 7"
        {...loop(reduce, { strokeDashoffset: [0, -26] }, 1.4, { ease: 'linear' })} />
      <path d="M188 154l8 -12l8 12Z" fill="#FF8A5B" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${194 + (i - 1) * 4} ${128 - i * 10})`}>
          <motion.path d={DROP} fill="#E8D44D" stroke="#B8A52E" strokeWidth="1.4"
            {...loop(reduce, { y: [24, -64], opacity: [0, 1, 0] }, 2.8, { delay: i * 0.9, ease: 'easeOut' })} />
        </g>
      ))}

      {/* Cơ thắt thực quản dưới (LES) — đang hở */}
      <g transform="translate(166 152) rotate(-18)">
        <ellipse rx="22" ry="12" fill="#D9594C" stroke="#A93E34" strokeWidth="2.5" />
        <path d="M-14 -3q12 -8 26 -2" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g transform="translate(226 152) rotate(18)">
        <ellipse rx="22" ry="12" fill="#D9594C" stroke="#A93E34" strokeWidth="2.5" />
        <path d="M-12 -4q12 -6 26 2" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d="M98 176L148 157" stroke={INK} strokeOpacity=".35" strokeWidth="1.6" strokeDasharray="3 3" />
      <text x="12" y="172" fontSize="9.5" fontWeight="700" fill={INK}>Cơ thắt thực quản</text>
      <text x="12" y="185" fontSize="9.5" fontWeight="700" fill={INK}>dưới (LES) yếu</text>

      {/* Ngọn lửa ợ nóng */}
      {[[146, 134, 1, 0], [124, 148, 0.72, 0.4]].map(([x, y, s, d], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <motion.path d="M0 0C-12 -10 -5 -22 0 -36C7 -22 14 -15 10 -4C8 4 0 6 0 0Z" fill="url(#s3-flame)"
            {...loop(reduce, { scaleY: [1, 1.14, 0.94, 1], scaleX: [1, 0.92, 1.05, 1] }, 1.1, { delay: d })} />
          <path d="M1 -4C-4 -9 -1 -16 1 -22C5 -15 7 -10 4 -4Z" fill="#FFE9A0" opacity=".9" />
        </g>
      ))}

      <Tag x={322} y={152} text="Ợ nóng + ợ chua" show={show} tone="#E4673A" />
    </svg>
  );
}

/* Câu 4 — Rotavirus */
function Mini({ x, y, r, reduce, dur = 5, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity=".55">
      <motion.g {...loop(reduce, { y: [0, -8, 0] }, dur, { delay: d })}>
        <circle r={r} fill="url(#s4-shell)" stroke="#2A8FBF" strokeWidth="1.6" />
        <circle r={r * 0.68} fill="url(#s4-mid)" stroke="#1FBFA8" strokeWidth="1.4" />
        {ANGLES(8).map((a, i) => {
          const [x1, y1] = pt(r * 0.28, a);
          const [x2, y2] = pt(r * 0.66, a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />;
        })}
        <circle r={r * 0.26} fill="#FF8A5B" />
      </motion.g>
    </g>
  );
}

function SceneRota({ show, reduce }) {
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Virus có capsid kép hình nan hoa bánh xe">
      <defs>
        <radialGradient id="s4-shell" cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#CDEFFB" /><stop offset="1" stopColor="#5EC3EE" />
        </radialGradient>
        <radialGradient id="s4-mid" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#B6F0E4" /><stop offset="1" stopColor="#1FBFA8" />
        </radialGradient>
        <radialGradient id="s4-core" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#FFB48F" /><stop offset="1" stopColor="#EF4B5F" />
        </radialGradient>
        <radialGradient id="s4-halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#3BB8F0" stopOpacity=".3" /><stop offset="1" stopColor="#3BB8F0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="148" r="150" fill="url(#s4-halo)" />
      <Mini x={58} y={74} r={22} reduce={reduce} dur={5.5} />
      <Mini x={346} y={58} r={16} reduce={reduce} dur={4.6} d={0.6} />
      <Mini x={352} y={218} r={20} reduce={reduce} dur={6} d={1.2} />
      <Mini x={50} y={226} r={16} reduce={reduce} dur={5} d={0.3} />

      <g transform="translate(200 148)">
        <circle r="98" fill="#2A8FBF" opacity=".12" transform="translate(6 10)" />
        <motion.g {...loop(reduce, { rotate: [0, -360] }, 90, { ease: 'linear' })}>
          {ANGLES(24).map((a, i) => {
            const [x1, y1] = pt(92, a);
            const [x2, y2] = pt(105, a);
            const [cx, cy] = pt(108, a);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E0A92E" strokeWidth="3" strokeLinecap="round" />
                <circle cx={cx} cy={cy} r="3.7" fill="#FFD166" stroke="#E0A92E" strokeWidth="1.4" />
              </g>
            );
          })}
        </motion.g>
        <circle r="94" fill="url(#s4-shell)" stroke="#2A8FBF" strokeWidth="3" />
        {ANGLES(40).map((a, i) => {
          const [cx, cy] = pt(84, a);
          return <circle key={i} cx={cx} cy={cy} r="2.3" fill="#fff" opacity=".75" />;
        })}
        <circle r="70" fill="url(#s4-mid)" stroke="#0F8F7D" strokeWidth="3" />
        <motion.g {...loop(reduce, { rotate: [0, 360] }, 60, { ease: 'linear' })}>
          {ANGLES(12).map((a, i) => {
            const [x1, y1] = pt(24, a);
            const [x2, y2] = pt(70, a);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0F8F7D" strokeWidth="7" strokeLinecap="round" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8FE9D8" strokeWidth="3.4" strokeLinecap="round" />
              </g>
            );
          })}
        </motion.g>
        <circle r="28" fill="url(#s4-core)" stroke="#fff" strokeWidth="2.5" />
        {ANGLES(11).map((a, i) => (
          <path key={i} d="M0 -8C6 -8 6 -17 0 -18" transform={`rotate(${(a * 180) / Math.PI})`}
            fill="none" stroke="#FFE0D3" strokeWidth="2" strokeLinecap="round" />
        ))}
        <circle r="6" fill="#FFE0D3" opacity=".8" />
      </g>

      <path d="M261 118L312 98" stroke={INK} strokeOpacity=".35" strokeWidth="1.6" strokeDasharray="3 3" />
      <circle cx="261" cy="118" r="3.6" fill="#fff" stroke={INK} strokeOpacity=".55" strokeWidth="1.5" />
      <text x="318" y="96" fontSize="9.5" fontWeight="700" fill={INK}>Capsid kép</text>
      <text x="318" y="109" fontSize="9.5" fontWeight="700" fill={INK}>hình bánh xe</text>

      {[[84, 286, 1.2], [112, 292, 0.9], [318, 284, 1.1]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <motion.path d={DROP} fill="#8ED3F4" stroke="#3BB8F0" strokeWidth="1.4"
            {...loop(reduce, { y: [-4, 4, -4] }, 2.4, { delay: i * 0.4 })} />
        </g>
      ))}

      <Tag x={200} y={22} text="Rotavirus" show={show} tone="#1F93C8" />
    </svg>
  );
}

/* Câu 5 — Nếp véo da & mất nước nặng */
function ScenePinch({ show, reduce }) {
  const C = 2 * Math.PI * 38;
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Nếp véo da bụng, đồng hồ 2 giây và thang mức độ mất nước">
      {/* Mặt cắt da */}
      <rect x="10" y="34" width="196" height="190" rx="20" fill="#fff" opacity=".55" />
      <rect x="22" y="168" width="172" height="44" rx="9" fill="#FFE9A8" />
      {[[40, 182], [66, 196], [92, 184], [118, 198], [144, 184], [170, 196], [52, 200], [178, 182]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#FFF4CC" stroke="#F2CB62" strokeWidth="1.4" />
      ))}
      <path d="M72 176C84 176 90 128 104 106C118 128 124 176 136 176Z" fill="#FFE9A8" />
      <path d="M22 150H72C84 150 90 106 104 78C118 106 124 150 136 150H194V176H136C124 176 118 128 104 106C90 128 84 176 72 176H22Z" fill="#F9C4B6" />
      <path d="M22 150H72C84 150 90 106 104 78C118 106 124 150 136 150H194" fill="none" stroke="#F2A58E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 158H70M138 158H190" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />

      {/* Hai ngón tay */}
      <g transform="translate(60 92) rotate(18)">
        <rect x="-32" y="-9" width="62" height="18" rx="9" fill="#F6CDB0" stroke="#D9A07C" strokeWidth="2" />
        <ellipse cx="22" cy="-1" rx="6" ry="4" fill="#FFE8DA" />
      </g>
      <g transform="translate(148 92) scale(-1 1) rotate(18)">
        <rect x="-32" y="-9" width="62" height="18" rx="9" fill="#F6CDB0" stroke="#D9A07C" strokeWidth="2" />
        <ellipse cx="22" cy="-1" rx="6" ry="4" fill="#FFE8DA" />
      </g>
      <motion.path d="M126 70q18 -8 28 6" fill="none" stroke={INK} strokeOpacity=".5" strokeWidth="1.6" strokeDasharray="3 3" strokeLinecap="round"
        {...loop(reduce, { strokeDashoffset: [0, -12] }, 1.6, { ease: 'linear' })} />
      <text x="108" y="244" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={INK}>Nếp véo da bụng</text>

      {/* Đồng hồ bấm giờ */}
      <rect x="294" y="40" width="16" height="11" rx="3" fill={INK} />
      <rect x="288" y="36" width="28" height="6" rx="3" fill="#3B6A72" />
      <circle cx="302" cy="112" r="54" fill="#E8EEF0" transform="translate(3 5)" />
      <circle cx="302" cy="112" r="52" fill="#fff" stroke={INK} strokeWidth="4" />
      <g transform="rotate(-90 302 112)">
        <circle cx="302" cy="112" r="38" fill="none" stroke="#7AD9C8" strokeWidth="9" strokeDasharray={`${C / 2} ${C}`} />
      </g>
      <g transform="rotate(90 302 112)">
        <circle cx="302" cy="112" r="38" fill="none" stroke="#EF4B5F" strokeWidth="9" strokeDasharray={`${C * 0.375} ${C}`} />
      </g>
      {ANGLES(16).map((a, i) => {
        const [x1, y1] = pt(i % 2 ? 46 : 44, a);
        const [x2, y2] = pt(49, a);
        return <line key={i} x1={302 + x1} y1={112 + y1} x2={302 + x2} y2={112 + y2} stroke={INK} strokeOpacity={i % 2 ? 0.35 : 0.8} strokeWidth={i % 2 ? 1.2 : 2} />;
      })}
      <text x="302" y="86" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>0</text>
      <text x="302" y="140" textAnchor="middle" fontSize="9" fontWeight="800" fill={INK}>2 s</text>
      <motion.g initial={{ rotate: reduce ? 250 : 0 }} animate={{ rotate: 250 }} transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <line x1="302" y1="76" x2="302" y2="120" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="302" y1="120" x2="302" y2="148" stroke="transparent" strokeWidth="3" />
      </motion.g>
      <circle cx="302" cy="112" r="6" fill="#EF4B5F" stroke="#fff" strokeWidth="2" />
      <text x="302" y="186" textAnchor="middle" fontSize="15" fontWeight="800" fill="#D7384D">&gt; 2 giây</text>
      <text x="302" y="200" textAnchor="middle" fontSize="9" fill={MUTE}>nếp véo trở lại rất chậm</text>

      {/* Thang mức độ mất nước */}
      {[[20, '#7AD9C8', 'Nhẹ', '< 5%', '#0F6E60'], [140, '#FFD166', 'Vừa', '5 – 10%', '#7A5300'], [260, '#EF4B5F', 'Nặng', '> 10%', '#fff']].map(([x, fill, t, pct, tc]) => (
        <g key={t}>
          <rect x={x} y="248" width="116" height="18" rx="9" fill={fill} />
          <text x={x + 58} y="261" textAnchor="middle" fontSize="10" fontWeight="800" fill={tc}>{t}</text>
          <text x={x + 58} y="283" textAnchor="middle" fontSize="9" fill={MUTE}>{pct}</text>
        </g>
      ))}
      <motion.path d="M312 236h12l-6 9Z" fill={INK} initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? [0, -3, 0] : 4 }}
        transition={show ? { duration: 1.2, repeat: reduce ? 0 : Infinity } : { duration: 0.2 }} />
      <Tag x={318} y={222} text="Mất nước nặng · Phác đồ C" show={show} tone="#D7384D" />
    </svg>
  );
}

/* Câu 6 — Gói Oresol */
function SceneOresol({ show, reduce }) {
  const G = 'M110 70H250L238 250Q237 262 224 262H136Q123 262 122 250Z';
  const sachet = (() => {
    let top = 'M-35 -46';
    for (let i = 0; i < 7; i++) top += 'l5 -5l5 5';
    let bot = 'V46';
    for (let i = 0; i < 7; i++) bot += 'l-5 5l-5 -5';
    return `${top}${bot}Z`;
  })();
  return (
    <svg viewBox="0 0 400 304" className="w-full h-full" role="img" aria-label="Gói Oresol pha vào cốc nước">
      <defs>
        <linearGradient id="s6-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D5F1FB" /><stop offset="1" stopColor="#68C6EE" />
        </linearGradient>
        <linearGradient id="s6-foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8FE9D8" /><stop offset="1" stopColor="#2AA8E8" />
        </linearGradient>
        <clipPath id="s6-glass"><path d={G} /></clipPath>
      </defs>

      <ellipse cx="180" cy="268" rx="78" ry="8" fill={INK} opacity=".1" />
      <path d={G} fill="#fff" fillOpacity=".5" stroke="#8CCBE4" strokeWidth="3.5" strokeLinejoin="round" />
      <g clipPath="url(#s6-glass)">
        <motion.path d={wave(40, 106, 4)} fill="url(#s6-water)" opacity=".6" transform="translate(0 6)"
          {...(reduce ? {} : { animate: { x: [-40, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: 'linear' } })} />
        <motion.path d={wave(40, 106, 4)} fill="url(#s6-water)"
          {...(reduce ? {} : { animate: { x: [0, -40] }, transition: { duration: 3.6, repeat: Infinity, ease: 'linear' } })} />
        {[[150, 230, 4], [190, 244, 3], [214, 222, 3.6]].map(([x, y, r], i) => (
          <motion.circle key={i} cx={x} cy={y} r={r} fill="#fff" fillOpacity=".6"
            {...loop(reduce, { cy: [y, y - 110], opacity: [0, 1, 0] }, 4, { delay: i * 1.1, ease: 'easeOut' })} />
        ))}
      </g>
      <path d="M124 82L131 246" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="180" cy="70" rx="70" ry="7" fill="#EAF8FD" stroke="#8CCBE4" strokeWidth="2.5" />
      {[104, 150, 196, 242].map((y, i) => (
        <g key={y}>
          <path d={`M250 ${y}h${i === 0 ? 14 : 8}`} stroke={INK} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ))}
      <path d="M252 104H282" stroke="#1FBFA8" strokeWidth="2" strokeDasharray="4 3" />

      {/* Gói Oresol đang đổ bột */}
      <g transform="translate(62 124) rotate(40) scale(.8)">
        <path d={sachet} fill="#12343B" opacity=".14" transform="translate(4 6)" />
        <path d={sachet} fill="url(#s6-foil)" stroke="#0F8F7D" strokeWidth="2" strokeLinejoin="round" />
        <path d="M-20 -46L-4 46M2 -46L18 46" stroke="#fff" strokeOpacity=".3" strokeWidth="7" />
        <rect x="-27" y="-16" width="54" height="36" rx="8" fill="#fff" />
        <path d={DROP} transform="translate(-17 -2) scale(.85)" fill="#FF8A5B" />
        <text x="8" y="2" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F8F7D">ORESOL</text>
        <text x="8" y="13" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={MUTE}>bù nước</text>
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.circle key={i} cx={98 + i * 4} cy={92 + i * 4} r="2.2" fill="#FFE29A" stroke="#E0B84A" strokeWidth=".8"
          {...loop(reduce, { cx: [98 + i * 4, 132 + i * 3], cy: [92 + i * 3, 122 + i * 4], opacity: [0, 1, 0] }, 1.8, { delay: i * 0.28, ease: 'easeIn' })} />
      ))}

      {/* Tế bào cân bằng thẩm thấu */}
      <circle cx="334" cy="200" r="30" fill="#EAF8FD" stroke="#3BB8F0" strokeWidth="2.5" />
      <circle cx="334" cy="200" r="24" fill="none" stroke="#3BB8F0" strokeOpacity=".5" strokeWidth="1.4" strokeDasharray="2 3" />
      <circle cx="334" cy="200" r="8" fill="#C58AE0" stroke="#9A62C4" strokeWidth="1.6" />
      {[[-1, -18], [1, 18]].map(([d, y], i) => (
        <g key={i}>
          <path d={`M${334 + d * 40} ${200 + y * 0.35}h${-d * 14}`} stroke="#1FBFA8" strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M${334 + d * 28} ${200 + y * 0.35 - 4}l${-d * 6} 4l${d * 6} 4`} fill="none" stroke="#1FBFA8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <text x="334" y="246" textAnchor="middle" fontSize="9" fontWeight="700" fill={INK}>Cân bằng thẩm thấu</text>
      <text x="334" y="258" textAnchor="middle" fontSize="9" fill={MUTE}>nước vào = nước ra</text>

      <Tag x={332} y={104} text="Đủ 100% nước" show={show} tone="#0F8F7D" />
      {show && <Tag x={332} y={136} text="245 mOsm/L" show tone="#3BB8F0" />}
    </svg>
  );
}

const SCENES = { 1: SceneAcid, 2: ScenePylori, 3: SceneReflux, 4: SceneRota, 5: ScenePinch, 6: SceneOresol };

/* ──────────────────────────────────────────────────────────────
   THÀNH PHẦN GIAO DIỆN NHỎ
   ────────────────────────────────────────────────────────────── */

/* Dấu ✓ / ✗ vẽ bằng path, tự "viết" ra (hệ tọa độ 40×40) */
function MarkPaths({ kind, color = '#fff', reduce }) {
  const common = {
    fill: 'none', stroke: color, strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round',
    initial: reduce ? false : { pathLength: 0 }, animate: { pathLength: 1 }
  };
  return kind === 'ok' ? (
    <motion.path d="M12 21l6 6 11-13" {...common} transition={{ duration: 0.35, ease: 'easeOut' }} />
  ) : (
    <g>
      <motion.path d="M13 13L27 27" {...common} transition={{ duration: 0.25, ease: 'easeOut' }} />
      <motion.path d="M27 13L13 27" {...common} transition={{ duration: 0.25, delay: 0.12, ease: 'easeOut' }} />
    </g>
  );
}

function Chevron({ dir = 'right' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d={dir === 'right' ? 'M4.5 2.5L9 7l-4.5 4.5' : 'M9.5 2.5L5 7l4.5 4.5'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreRing({ value, total, size = 48, stroke = 6, id, textSize = 13, sub }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Điểm ${value} trên ${total}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1FBFA8" /><stop offset="1" stopColor="#3BB8F0" />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={r} fill="none" stroke={INK} strokeOpacity=".08" strokeWidth={stroke} />
      <g transform={`rotate(-90 ${c} ${c})`}>
        <motion.circle cx={c} cy={c} r={r} fill="none" stroke={`url(#${id})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={C} initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: C * (1 - value / total) }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }} />
      </g>
      <text x={c} y={sub ? c + 2 : c + textSize * 0.35} textAnchor="middle" fontSize={textSize} fontWeight="800" fill={INK}>
        {value}{sub ? '' : `/${total}`}
      </text>
      {sub && <text x={c} y={c + textSize * 0.9} textAnchor="middle" fontSize={textSize * 0.42} fontWeight="700" fill={MUTE}>{sub}</text>}
    </svg>
  );
}

function Emblem() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0 drop-shadow-md">
      <defs>
        <linearGradient id="q9-em" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3BB8F0" /><stop offset=".55" stopColor="#1FBFA8" /><stop offset="1" stopColor="#FFD166" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="13" fill="url(#q9-em)" />
      <path d="M20 8C24 14 28 18 28 23a8 8 0 0 1-16 0c0-5 4-9 8-15Z" fill="#fff" fillOpacity=".95" />
      <path d="M16 24a4.5 4.5 0 0 0 4 4.5" stroke="#3BB8F0" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="29.5" cy="11" r="2.2" fill="#fff" fillOpacity=".75" />
      <circle cx="33" cy="16" r="1.3" fill="#fff" fillOpacity=".5" />
    </svg>
  );
}

function Backdrop({ reduce }) {
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bd-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill={INK} opacity=".08" />
        </pattern>
        <radialGradient id="bd-a"><stop offset="0" stopColor="#3BB8F0" stopOpacity=".28" /><stop offset="1" stopColor="#3BB8F0" stopOpacity="0" /></radialGradient>
        <radialGradient id="bd-b"><stop offset="0" stopColor="#FF8A5B" stopOpacity=".24" /><stop offset="1" stopColor="#FF8A5B" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#bd-dots)" />
      <motion.circle cx="1050" cy="90" r="240" fill="url(#bd-a)" {...loop(reduce, { cx: [1050, 1010, 1050], cy: [90, 130, 90] }, 18)} />
      <motion.circle cx="110" cy="620" r="280" fill="url(#bd-b)" {...loop(reduce, { cx: [110, 160, 110], cy: [620, 580, 620] }, 22)} />
      {[120, 170, 220].map((r) => (
        <circle key={r} cx="1120" cy="660" r={r} fill="none" stroke="#3BB8F0" strokeOpacity=".12" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function PrimaryButton({ children, onClick, glow, reduce, className = '', style }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={`group relative overflow-hidden rounded-xl px-4 py-1.5 text-white font-heading font-bold text-xs shadow-md ${className}`}
      style={{ background: 'linear-gradient(110deg,#1FBFA8,#3BB8F0)', ...style }}
    >
      {glow && !reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl"
          animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,.55) inset', '0 0 0 6px rgba(255,255,255,0) inset'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <span aria-hidden="true" className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/30 transition-transform duration-700 group-hover:translate-x-[320%]" />
      <span className="relative flex items-center justify-center gap-1.5">{children}</span>
    </motion.button>
  );
}

function ProgressNode({ n, state, current, tone, onClick, reduce }) {
  const fill = state === 'ok' ? '#1FBFA8' : state === 'bad' ? '#EF4B5F' : '#fff';
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Câu ${n}`}
      aria-current={current ? 'step' : undefined}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-10 h-10 shrink-0 rounded-full"
    >
      {current && (
        <motion.span
          layoutId="node-ring"
          className="absolute -inset-1.5 rounded-full"
          style={{ border: `2.5px solid ${tone.main}` }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      {current && !reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ background: tone.main }}
          animate={{ scale: [1, 1.55], opacity: [0.3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <svg viewBox="0 0 40 40" className="relative w-full h-full drop-shadow-sm">
        <circle cx="20" cy="20" r="17" fill={fill} stroke={state === 'idle' ? tone.main : fill} strokeWidth="2.5" />
        {state === 'idle' && (
          <text x="20" y="25" textAnchor="middle" fontSize="15" fontWeight="800" fill={current ? INK : MUTE}>{n}</text>
        )}
        {state === 'ok' && <MarkPaths kind="ok" reduce={reduce} />}
        {state === 'bad' && <MarkPaths kind="x" reduce={reduce} />}
      </svg>
    </motion.button>
  );
}

function OptionButton({ letter, body, state, idx, onPick, reduce }) {
  const styles = {
    idle: { background: '#fff', border: '#DDE7EA', color: INK },
    ok: { background: 'linear-gradient(100deg,#E6FAF3,#CFF5E7)', border: '#34C79A', color: '#064E3B' },
    bad: { background: 'linear-gradient(100deg,#FFF0F2,#FFDDE2)', border: '#F08A98', color: '#7F1D2D' },
    dim: { background: '#F6F8F9', border: '#E6ECEE', color: '#9AAEB2' }
  }[state];
  const badgeFill = state === 'ok' ? '#1FBFA8' : state === 'bad' ? '#EF4B5F' : state === 'dim' ? '#E3EAEC' : '#EAF6FD';
  const badgeText = state === 'idle' ? '#1F93C8' : '#9AAEB2';

  return (
    <motion.button
      type="button"
      disabled={state !== 'idle'}
      onClick={onPick}
      initial={reduce ? false : { opacity: 0, x: 18 }}
      animate={
        state === 'bad' && !reduce
          ? { opacity: 1, x: [0, -7, 7, -4, 4, 0] }
          : state === 'ok' && !reduce
          ? { opacity: 1, x: 0, scale: [1, 1.025, 1] }
          : { opacity: 1, x: 0, scale: 1 }
      }
      transition={
        state === 'idle'
          ? { type: 'spring', stiffness: 300, damping: 26, delay: idx * 0.055 }
          : { duration: 0.45 }
      }
      whileHover={state === 'idle' ? { x: 4, boxShadow: '0 8px 22px -10px rgba(59,184,240,.55)' } : undefined}
      whileTap={state === 'idle' ? { scale: 0.985 } : undefined}
      className="relative overflow-hidden w-full text-left rounded-2xl border-2 px-3 py-2 flex items-center gap-3 cursor-pointer disabled:cursor-default"
      style={{ background: styles.background, borderColor: styles.border, color: styles.color }}
    >
      {state === 'ok' && !reduce && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/60"
          initial={{ left: '-40%' }}
          animate={{ left: '130%' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      )}
      <svg viewBox="0 0 40 40" className="relative w-8 h-8 shrink-0">
        <motion.circle cx="20" cy="20" r="18" initial={false} animate={{ fill: badgeFill }} transition={{ duration: 0.3 }} />
        {state === 'ok' && <MarkPaths kind="ok" reduce={reduce} />}
        {state === 'bad' && <MarkPaths kind="x" reduce={reduce} />}
        {(state === 'idle' || state === 'dim') && (
          <text x="20" y="26" textAnchor="middle" fontSize="17" fontWeight="800" fill={badgeText}>{letter}</text>
        )}
      </svg>
      <span className={`relative text-xs md:text-[13px] leading-snug ${state === 'ok' || state === 'bad' ? 'font-bold' : 'font-medium'}`}>{body}</span>
    </motion.button>
  );
}

function Ecg({ color, reduce }) {
  return (
    <svg width="46" height="16" viewBox="0 0 46 16" fill="none" aria-hidden="true">
      <motion.path d="M1 9H12l3-7 4 13 3-9 2 3H45" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
    </svg>
  );
}

function verdictFor(n, total) {
  if (n === total) return { title: 'Xuất sắc!', text: 'Bạn nắm vững cả hai nhóm bệnh tiêu hóa.' };
  if (n >= total - 1) return { title: 'Rất tốt!', text: 'Chỉ còn một chi tiết nhỏ để hoàn hảo.' };
  if (n >= total / 2) return { title: 'Khá tốt', text: 'Xem lại phần giải thích để chắc hơn nhé.' };
  return { title: 'Cùng ôn lại nào', text: 'Đọc lại phần phân tích từng câu rồi thử lần nữa.' };
}

/* ──────────────────────────────────────────────────────────────
   COMPONENT CHÍNH
   ────────────────────────────────────────────────────────────── */
export function Slide10QuizArena({ onSelectSlide }) {
  const reduce = useReducedMotion();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qId]: optionIndex }
  const [showResultCard, setShowResultCard] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[currentIdx];
  const tone = TONES[q.category];
  const answeredIdx = selectedAnswers[q.id];
  const isAnswered = answeredIdx !== undefined;
  const answeredCount = Object.keys(selectedAnswers).length;
  const allDone = answeredCount === total;
  const pickedCorrect = isAnswered && q.options[answeredIdx].correct;
  const correctLetter = splitOpt(q.options.find((o) => o.correct).text)[0];
  const Scene = SCENES[q.id];

  const correctCount = QUIZ_QUESTIONS.filter(
    (item) => selectedAnswers[item.id] !== undefined && item.options[selectedAnswers[item.id]].correct
  ).length;

  const fireConfetti = (opts) => {
    try {
      confetti({ disableForReducedMotion: true, ...opts });
    } catch (e) {}
  };

  const handleSelectOption = (optIdx) => {
    if (isAnswered) return;

    const isCorrect = q.options[optIdx].correct;
    const nextAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (isCorrect) {
      play('success');
      fireConfetti({ particleCount: 45, spread: 60, origin: { y: 0.7 } });
    } else {
      play('pop');
    }

    if (Object.keys(nextAnswers).length === total) {
      setTimeout(() => {
        setShowResultCard(true);
        play('success');
        fireConfetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#1FBFA8', '#3BB8F0', '#FFD166', '#FF8A5B', '#EF4B5F']
        });
      }, 1400);
    }
  };

  const handleReset = () => {
    play('tick');
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResultCard(false);
  };

  const goTo = (idx) => {
    play('tick');
    setCurrentIdx(idx);
  };

  const goSummary = () => {
    play('whoosh');
    if (onSelectSlide) onSelectSlide(10);
  };

  /* Phím tắt A–D / 1–4 để chọn đáp án */
  useEffect(() => {
    const onKey = (e) => {
      if (showResultCard || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };
      const i = map[String(e.key).toLowerCase()];
      if (i !== undefined) handleSelectOption(i);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const optState = (optIdx) => {
    if (!isAnswered) return 'idle';
    const opt = q.options[optIdx];
    if (opt.correct) return 'ok';
    if (answeredIdx === optIdx) return 'bad';
    return 'dim';
  };

  const nodeState = (item) => {
    const a = selectedAnswers[item.id];
    if (a === undefined) return 'idle';
    return item.options[a].correct ? 'ok' : 'bad';
  };

  const verdict = verdictFor(correctCount, total);
  const explanation = q.explanation.replace(/^Chính xác!\s*/, '');

  return (
    <div className="relative w-full h-full flex flex-col gap-2 px-3 md:px-10 py-2 select-none overflow-hidden">
      <Backdrop reduce={reduce} />

      {/* 1. Tiêu đề & điểm */}
      <header className="relative z-10 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Emblem />
          <div className="min-w-0">
            <div className="text-[11px] font-semibold" style={{ color: MUTE }}>
              Slide 09 — Minigame củng cố kiến thức, {total} câu
            </div>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl leading-tight truncate" style={{ color: INK }}>
              Thử thách đấu trí: nhận biết &amp; phòng ngừa 2 bệnh tiêu hóa
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-2xl bg-white/85 backdrop-blur border border-white shadow-sm">
            <ScoreRing id="hd-ring" value={correctCount} total={total} size={44} stroke={5} textSize={12} />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold" style={{ color: MUTE }}>Điểm</div>
              <div className="text-xs font-extrabold" style={{ color: INK }}>
                <motion.span key={correctCount} initial={reduce ? false : { y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block" style={{ color: '#1FBFA8', fontSize: 15 }}>
                  {correctCount}
                </motion.span>
                {' '}/ {total}
              </div>
            </div>
          </div>
          <PrimaryButton onClick={goSummary} reduce={reduce} className="hidden sm:block">
            Slide 10: Tổng kết <Chevron />
          </PrimaryButton>
        </div>
      </header>

      {/* 2. Đường tiến trình theo 2 nhóm bệnh */}
      <nav className="relative z-10 grid grid-cols-2 gap-5 flex-shrink-0 px-1" aria-label="Danh sách câu hỏi">
        {['gastritis', 'diarrhea'].map((cat) => {
          const items = QUIZ_QUESTIONS.map((item, idx) => ({ item, idx })).filter(({ item }) => item.category === cat);
          const t = TONES[cat];
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-1">
                <svg width="22" height="8" viewBox="0 0 22 8" aria-hidden="true">
                  <path d="M1 4q5 -5 10 0t10 0" fill="none" stroke={t.main} strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <span className="text-[11px] font-bold" style={{ color: t.deep }}>{t.label}</span>
              </div>
              <div className="flex items-center">
                {items.map(({ item, idx }, k) => (
                  <React.Fragment key={item.id}>
                    <ProgressNode
                      n={idx + 1}
                      state={nodeState(item)}
                      current={currentIdx === idx}
                      tone={t}
                      reduce={reduce}
                      onClick={() => goTo(idx)}
                    />
                    {k < items.length - 1 && (
                      <div className="relative flex-1 h-[4px] mx-1 rounded-full bg-white/80 overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ background: 'linear-gradient(90deg,#1FBFA8,#3BB8F0)' }}
                          initial={false}
                          animate={{ width: nodeState(item) !== 'idle' ? '100%' : '0%' }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 3. Khu vực chính: minh họa + câu hỏi */}
      <main className="relative z-10 flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl w-full mx-auto">
        {/* Sân khấu minh họa */}
        <section className="hidden md:flex md:col-span-5 min-h-0 relative flex-col rounded-[30px] overflow-hidden border border-white shadow-xl bg-white/50 backdrop-blur-md">
          {['gastritis', 'diarrhea'].map((cat) => (
            <motion.div
              key={cat}
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${TONES[cat].bg1}, ${TONES[cat].bg2})` }}
              initial={false}
              animate={{ opacity: q.category === cat ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
          <div className="relative flex items-center gap-2 px-4 pt-3">
            <motion.span
              className="w-2.5 h-2.5 rounded-full"
              animate={{ backgroundColor: tone.main }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-xs font-extrabold" style={{ color: INK }}>{q.topic}</span>
          </div>
          <div className="relative flex-1 min-h-0 px-3 pb-3 pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                className="w-full h-full"
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.25 }}
              >
                {Scene && <Scene show={isAnswered} reduce={reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Thẻ câu hỏi */}
        <section className="md:col-span-7 min-h-0 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="relative flex-1 min-h-0 overflow-y-auto rounded-[30px] bg-white/95 backdrop-blur-md border border-white shadow-xl p-4 md:p-5 flex flex-col"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full"
                style={{ background: `linear-gradient(180deg, ${tone.main}, #1FBFA8)` }}
              />

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
                    <rect x="2" y="2" width="36" height="36" rx="12" fill={tone.main} />
                    <text x="20" y="27" textAnchor="middle" fontSize="19" fontWeight="800" fill="#fff">{q.id}</text>
                  </svg>
                  <span className="text-xs font-bold" style={{ color: tone.deep }}>{q.topic}</span>
                </div>
                <span className="text-[11px] font-semibold" style={{ color: MUTE }}>Câu {currentIdx + 1} / {total}</span>
              </div>

              <h3 className="font-heading font-extrabold text-sm md:text-[17px] leading-snug mb-3" style={{ color: INK }}>
                {q.question}
              </h3>

              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIdx) => {
                  const [letter, body] = splitOpt(opt.text);
                  return (
                    <OptionButton
                      key={optIdx}
                      idx={optIdx}
                      letter={letter}
                      body={body}
                      state={optState(optIdx)}
                      reduce={reduce}
                      onPick={() => handleSelectOption(optIdx)}
                    />
                  );
                })}
              </div>

              <AnimatePresence initial={false}>
                {isAnswered && (
                  <motion.div
                    key="explain"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="rounded-2xl p-3 border"
                      style={{
                        background: pickedCorrect ? 'linear-gradient(120deg,#EAF9F5,#E4F4FC)' : 'linear-gradient(120deg,#FFF3F0,#EAF6FD)',
                        borderColor: pickedCorrect ? 'rgba(31,191,168,.35)' : 'rgba(239,75,95,.3)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Ecg color={pickedCorrect ? '#1FBFA8' : '#EF4B5F'} reduce={reduce} />
                        <span className="text-[11px] font-extrabold" style={{ color: '#0369A1' }}>
                          Phân tích sinh lý bệnh y khoa
                        </span>
                        <span
                          className="text-[11px] font-extrabold px-2 py-0.5 rounded-full text-white"
                          style={{ background: pickedCorrect ? '#1FBFA8' : '#EF4B5F' }}
                        >
                          {pickedCorrect ? 'Chính xác!' : `Chưa đúng — đáp án là ${correctLetter}`}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#0B5E87' }}>{explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* 4. Thanh điều khiển */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between p-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs flex-shrink-0">
        <motion.button
          type="button"
          onClick={handleReset}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-semibold"
          style={{ color: MUTE }}
        >
          Làm lại từ đầu
        </motion.button>

        <span className="hidden sm:block font-semibold" style={{ color: MUTE }}>
          Đã trả lời {answeredCount}/{total} · phím A–D để chọn nhanh
        </span>

        <div className="flex items-center gap-2">
          {allDone && (
            <motion.button
              type="button"
              onClick={() => { play('tick'); setShowResultCard(true); }}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="px-3.5 py-1.5 rounded-xl font-bold border-2"
              style={{ color: '#0F8F7D', borderColor: '#1FBFA8', background: '#fff' }}
            >
              Xem kết quả
            </motion.button>
          )}
          {currentIdx > 0 && (
            <motion.button
              type="button"
              onClick={() => goTo(currentIdx - 1)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold"
              style={{ color: INK }}
            >
              <Chevron dir="left" /> Câu trước
            </motion.button>
          )}
          {currentIdx < total - 1 ? (
            <PrimaryButton onClick={() => goTo(currentIdx + 1)} glow={isAnswered} reduce={reduce} className="px-4">
              Câu hỏi tiếp theo <Chevron />
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={goSummary}
              glow={isAnswered}
              reduce={reduce}
              className="px-5 py-2 font-extrabold"
              style={{ background: 'linear-gradient(110deg,#1FBFA8,#3BB8F0 55%,#FF8A5B)' }}
            >
              Tiếp tục: Slide 10 Kết Thúc Báo Cáo <Chevron />
            </PrimaryButton>
          )}
        </div>
      </footer>

      {/* 5. Thẻ kết quả */}
      <AnimatePresence>
        {showResultCard && (
          <motion.div
            key="result"
            className="absolute inset-0 z-30 flex items-center justify-center p-4"
            style={{ background: 'rgba(18,52,59,.38)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Kết quả minigame"
          >
            <motion.div
              className="relative w-[min(520px,94%)] rounded-[34px] bg-white p-6 text-center shadow-2xl overflow-hidden"
              initial={reduce ? false : { scale: 0.88, y: 28, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <svg aria-hidden="true" className="absolute inset-x-0 top-0 w-full h-28" viewBox="0 0 520 112" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rs-top" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#1FBFA8" stopOpacity=".28" /><stop offset=".6" stopColor="#3BB8F0" stopOpacity=".25" /><stop offset="1" stopColor="#FFD166" stopOpacity=".35" />
                  </linearGradient>
                </defs>
                <path d="M0 0H520V70Q390 108 260 76T0 82Z" fill="url(#rs-top)" />
              </svg>

              <div className="relative flex justify-center">
                <ScoreRing id="rs-ring" value={correctCount} total={total} size={150} stroke={13} textSize={44} sub={`trên ${total} câu`} />
              </div>
              <h3 className="relative font-heading font-extrabold text-2xl mt-2" style={{ color: INK }}>{verdict.title}</h3>
              <p className="relative text-sm mt-1" style={{ color: MUTE }}>{verdict.text}</p>

              <div className="relative flex items-center justify-center gap-2 mt-4">
                {QUIZ_QUESTIONS.map((item, i) => {
                  const st = nodeState(item);
                  return (
                    <motion.svg
                      key={item.id}
                      viewBox="0 0 40 40"
                      className="w-8 h-8"
                      initial={reduce ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.25 + i * 0.07 }}
                    >
                      <circle cx="20" cy="20" r="18" fill={st === 'ok' ? '#1FBFA8' : '#EF4B5F'} />
                      <MarkPaths kind={st === 'ok' ? 'ok' : 'x'} reduce={reduce} />
                    </motion.svg>
                  );
                })}
              </div>

              <div className="relative flex flex-wrap items-center justify-center gap-2 mt-6">
                <motion.button
                  type="button"
                  onClick={() => { play('tick'); setShowResultCard(false); }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold"
                  style={{ color: INK }}
                >
                  Xem lại đáp án
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-xs font-bold border-2"
                  style={{ color: '#0F8F7D', borderColor: '#1FBFA8' }}
                >
                  Chơi lại
                </motion.button>
                <PrimaryButton onClick={goSummary} reduce={reduce} className="px-5 py-2">
                  Slide 10: Tổng kết <Chevron />
                </PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Slide10QuizArena;