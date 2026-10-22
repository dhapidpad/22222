import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import sfx from '../../audio/sfx';

/* ────────────────────────────────────────────────────────────
   Lát cắt niêm mạc dạ dày (viewBox 860 × 430)
   Từ trên xuống: lòng dạ dày → lớp nhầy → biểu mô bề mặt → mô đệm.
   Bên phải có một hố vị + tuyến vị (tế bào thành, tế bào chính, tế bào gốc).
──────────────────────────────────────────────────────────── */

const W = 860;
const H = 430;

const MUCUS_PATH =
  'M 0 110 C 70 100, 140 120, 220 109 S 360 100, 440 110 S 600 120, 680 108 S 800 100, 860 110 L 860 190 L 0 190 Z';
const MUCUS_TOP =
  'M 0 110 C 70 100, 140 120, 220 109 S 360 100, 440 110 S 600 120, 680 108 S 800 100, 860 110';

const PIT_PATH =
  'M 644 190 L 704 190 C 700 214 690 240 686 262 L 686 430 L 662 430 L 662 262 C 658 240 648 214 644 190 Z';

const CAPILLARY = 'M -10 308 C 100 298, 200 318, 300 308 S 500 298, 604 308';

const LAYERS = {
  lumen: {
    title: 'Lòng dạ dày',
    color: '#E8590C',
    text: 'HCl (pH 1,5–3,5) biến pepsinogen thành pepsin để cắt protein. Đủ mạnh để ăn mòn chính thành dạ dày nếu thiếu lớp bảo vệ.'
  },
  mucus: {
    title: 'Lớp chất nhầy',
    color: '#0E9F8A',
    text: 'Lớp gel dày khoảng 0,2 mm giữ ion HCO₃⁻ do tế bào tiết ra. pH tăng dần từ ~2 phía lòng đến ~7 sát bề mặt tế bào.'
  },
  epithelium: {
    title: 'Biểu mô bề mặt',
    color: '#D6336C',
    text: 'Tế bào liên tục tiết nhầy, nối với nhau bằng mối nối chặt nên axit không len được qua kẽ. Cả lớp được thay mới sau 3–5 ngày.'
  },
  gland: {
    title: 'Hố vị và tuyến vị',
    color: '#7C4DDB',
    text: 'Tế bào thành tiết HCl, tế bào chính tiết pepsinogen. Tế bào gốc ở cổ tuyến sinh ra tế bào biểu mô mới.'
  },
  lamina: {
    title: 'Mô đệm và mao mạch',
    color: '#E03131',
    text: 'Mao mạch dày đặc mang O₂, dưỡng chất và HCO₃⁻ đến nuôi niêm mạc; tế bào miễn dịch canh gác bên dưới.'
  }
};

function Pill({ x, y, text, color, bg = 'rgba(255,255,255,0.93)' }) {
  const w = text.length * 6.2 + 24;
  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      <rect width={w} height="22" rx="11" fill={bg} stroke={color} strokeWidth="1.2" />
      <text x="12" y="15" fontSize="11" fontWeight="800" fill={color}>
        {text}
      </text>
    </g>
  );
}

function EpiCell({ x, gid }) {
  return (
    <g transform={`translate(${x} 190)`}>
      <rect width="42" height="62" rx="10" fill={`url(#${gid})`} stroke="#FF8FA3" strokeWidth="1" />
      {/* hạt chất nhầy ở đỉnh tế bào */}
      {[
        [10, 11],
        [21, 8],
        [32, 12],
        [15, 19],
        [27, 18]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#fff" fillOpacity="0.85" stroke="#4FD1C5" strokeWidth="0.8" />
      ))}
      {/* nhân + hạt nhân */}
      <ellipse cx="21" cy="44" rx="9" ry="7" fill="#C9184A" fillOpacity="0.55" />
      <circle cx="19" cy="43" r="2.4" fill="#7A0F2E" fillOpacity="0.75" />
      {/* mối nối chặt */}
      <rect x="-3" y="0" width="6" height="5" rx="2" fill="#0E7A66" />
    </g>
  );
}

function Parietal({ cx, cy, gid }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="20" fill={`url(#${gid})`} stroke="#B02A4F" strokeWidth="1.8" />
      {/* tiểu quản tiết axit hướng về lòng tuyến */}
      <path
        d="M 8 -10 C 15 -6, 15 0, 8 4 M 6 5 C 13 9, 13 13, 6 15"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="-7" cy="0" r="6" fill="#8A1538" fillOpacity="0.75" />
      {[
        [-12, -10],
        [-12, 10],
        [0, -14],
        [0, 14]
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3.2" ry="1.8" fill="#FFB86B" />
      ))}
    </g>
  );
}

function Chief({ cx, cy, gid }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="16" fill={`url(#${gid})`} stroke="#6B4BB5" strokeWidth="1.6" />
      {[
        [-8, -6],
        [-9, 3],
        [-5, 9],
        [-3, -10],
        [-10, -1]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#F5E6FF" stroke="#8E6BD8" strokeWidth="0.8" />
      ))}
      <ellipse cx="7" cy="3" rx="5" ry="4" fill="#4B2F8C" fillOpacity="0.75" />
    </g>
  );
}

export function StomachMucosa({ className = '' }) {
  const [acidActive, setAcidActive] = useState(false);
  const [hover, setHover] = useState(null);
  const timer = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => () => clearTimeout(timer.current), []);

  const triggerAcidAttack = () => {
    if (acidActive) return;
    sfx.pop();
    setAcidActive(true);
    timer.current = setTimeout(() => setAcidActive(false), 2800);
  };

  const uid = useId().replace(/:/g, '');
  const id = (n) => `${uid}-${n}`;
  const url = (n) => `url(#${id(n)})`;
  const loop = reduce ? {} : { repeat: Infinity };

  const layer = (k) => ({
    onMouseEnter: () => setHover(k),
    onMouseLeave: () => setHover(null),
    style: { opacity: hover && hover !== k ? 0.55 : 1, transition: 'opacity .25s', cursor: 'help' }
  });

  const info = hover ? LAYERS[hover] : null;

  const hPlus = [
    [70, 62], [170, 84], [270, 56], [390, 86], [500, 60], [610, 84], [720, 58]
  ];
  const clMinus = [
    [120, 70], [330, 70], [450, 88], [560, 74], [675, 90]
  ];
  const pepsin = [
    [220, 90], [430, 58], [640, 64], [770, 88]
  ];
  const bubbles = [
    [60, 18], [150, 14], [250, 18], [360, 40], [470, 36], [570, 40], [760, 34]
  ];
  const attackX = [90, 210, 330, 450, 570, 690, 790];

  return (
    <div
      className={`p-4 rounded-3xl bg-white/80 backdrop-blur-md border border-white shadow-sm flex flex-col items-center ${className}`}
    >
      <div className="w-full flex items-center justify-between gap-3 mb-3 px-2">
        <div className="font-heading font-bold text-sm text-[#12343B] flex items-center gap-2">
          <span>🔬</span>
          <span>LÁT CẮT PHÓNG TO NIÊM MẠC DẠ DÀY: CƠ CHẾ "LÁ CHẮN BẢO VỆ"</span>
        </div>
        <button
          onClick={triggerAcidAttack}
          disabled={acidActive}
          className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF8A5B]/15 text-[#FF8A5B] hover:bg-[#FF8A5B] hover:text-white transition-all border border-[#FF8A5B]/30 disabled:opacity-80 disabled:cursor-wait"
        >
          {acidActive ? 'Axit đang tấn công...' : '▶ Thử nghiệm Axit HCl'}
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-2xl"
        role="img"
        aria-label="Lát cắt niêm mạc dạ dày: lòng dạ dày, lớp nhầy, biểu mô, tuyến vị và mao mạch"
      >
        <defs>
          <linearGradient id={id('lumen')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9468" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFC9AE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD9C6" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={id('mucus')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC2A0" />
            <stop offset="45%" stopColor="#A6EBD9" />
            <stop offset="100%" stopColor="#2FC9B1" />
          </linearGradient>
          <linearGradient id={id('pit')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9AE8D6" />
            <stop offset="100%" stopColor="#FFC9AA" />
          </linearGradient>
          <linearGradient id={id('cell')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE9EE" />
            <stop offset="100%" stopColor="#FFC8D4" />
          </linearGradient>
          <linearGradient id={id('lamina')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF5EF" />
            <stop offset="100%" stopColor="#FFE4DA" />
          </linearGradient>
          <linearGradient id={id('ph')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A45" />
            <stop offset="100%" stopColor="#1FBFA8" />
          </linearGradient>
          <radialGradient id={id('hp')} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFC09F" />
            <stop offset="100%" stopColor="#FF6B3D" />
          </radialGradient>
          <radialGradient id={id('pc')} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#FF9DB3" />
            <stop offset="100%" stopColor="#E0446A" />
          </radialGradient>
          <radialGradient id={id('cc')} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#D9C4FF" />
            <stop offset="100%" stopColor="#8E6BD8" />
          </radialGradient>
          <filter id={id('glow')} filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={id('clip')}>
            <rect width={W} height={H} rx="18" />
          </clipPath>
          <path id={id('cap')} d={CAPILLARY} fill="none" />
        </defs>

        <g clipPath={url('clip')}>
          {/* ═════ 1. LÒNG DẠ DÀY ═════ */}
          <g {...layer('lumen')}>
            <rect width={W} height="124" fill={url('lumen')} />
            <Pill x={14} y={12} text="LÒNG DẠ DÀY · HCl (pH 1,5–3,5) + men pepsin" color="#C2410C" />

            {/* Cl⁻ */}
            {clMinus.map(([x, y], i) => (
              <g key={`cl${i}`} transform={`translate(${x} ${y})`}>
                <motion.g
                  animate={{ y: acidActive ? [0, 8, -3, 0] : [0, -4, 0] }}
                  transition={{ duration: acidActive ? 0.7 : 3 + i * 0.3, ...loop, ease: 'easeInOut' }}
                >
                  <circle r="7.5" fill="#FFD166" stroke="#E0A926" strokeWidth="1.2" />
                  <text y="2.8" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#5C4400">
                    Cl⁻
                  </text>
                </motion.g>
              </g>
            ))}

            {/* Men pepsin (hình "cái miệng" ăn protein) */}
            {pepsin.map(([x, y], i) => (
              <g key={`pp${i}`} transform={`translate(${x} ${y})`}>
                <motion.g
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  animate={{ rotate: [-14, 14, -14], y: [0, -4, 0] }}
                  transition={{ duration: 2.6 + i * 0.4, ...loop, ease: 'easeInOut' }}
                >
                  <path d="M 0 0 L 9 -6 A 11 11 0 1 0 9 6 Z" fill="#8E6BD8" stroke="#6B4BB5" strokeWidth="1.2" strokeLinejoin="round" />
                  <circle cx="-3" cy="-5" r="1.8" fill="#fff" />
                </motion.g>
              </g>
            ))}

            {/* H⁺ */}
            {hPlus.map(([x, y], i) => (
              <g key={`h${i}`} transform={`translate(${x} ${y})`}>
                <motion.g
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  animate={
                    acidActive
                      ? { y: [0, 14, -4, 0], scale: [1, 1.3, 0.95, 1] }
                      : { y: [0, -5, 0] }
                  }
                  transition={{
                    duration: acidActive ? 0.8 : 2.4 + (i % 3) * 0.4,
                    delay: i * 0.1,
                    ...loop,
                    ease: 'easeInOut'
                  }}
                >
                  <circle r="8.5" fill={url('hp')} stroke="#D9480F" strokeWidth="1.2" />
                  <text y="3" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">
                    H⁺
                  </text>
                </motion.g>
              </g>
            ))}
          </g>

          {/* ═════ 5. MÔ ĐỆM + MAO MẠCH + TẾ BÀO MIỄN DỊCH ═════ */}
          <g {...layer('lamina')}>
            <rect y="252" width={W} height={H - 252} fill={url('lamina')} />
            {/* sợi collagen */}
            {[
              'M 0 372 C 120 360, 220 392, 340 376 S 560 366, 612 384',
              'M 0 412 C 140 398, 260 420, 400 404 S 560 400, 620 414',
              'M 0 276 C 90 270, 200 284, 300 276 S 520 270, 620 282'
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#F0BFB0" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="1 5" strokeLinecap="round" />
            ))}

            {/* mao mạch */}
            <path d={CAPILLARY} fill="none" stroke="#D9506A" strokeWidth="28" strokeLinecap="round" />
            <path d={CAPILLARY} fill="none" stroke="#FFB8C4" strokeWidth="23" strokeLinecap="round" />
            <path d={CAPILLARY} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" transform="translate(0 -6)" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={reduce ? `translate(${40 + i * 100} 308)` : undefined}>
                <ellipse rx="7.5" ry="4.5" fill="#E63946" stroke="#B3202E" strokeWidth="0.8" />
                <ellipse rx="3" ry="1.7" fill="#FF8FA3" fillOpacity="0.85" />
                {!reduce && (
                  <>
                    <animateMotion dur="10s" begin={`${-i * 1.7}s`} repeatCount="indefinite" calcMode="paced">
                      <mpath href={`#${id('cap')}`} />
                    </animateMotion>
                  </>
                )}
              </g>
            ))}

            {/* tế bào miễn dịch */}
            {[
              [330, 392],
              [470, 372]
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="12" fill="#DDE3FF" stroke="#6366F1" strokeWidth="1.4" />
                <circle cx="-1" cy="1" r="7.5" fill="#6366F1" fillOpacity="0.8" />
                <circle cx="-3" cy="-1" r="2" fill="#fff" fillOpacity="0.5" />
              </g>
            ))}

            <Pill x={14} y={326} text="MAO MẠCH · mang O₂ và HCO₃⁻ nuôi niêm mạc" color="#C2255C" />
            <Pill x={14} y={396} text="MÔ ĐỆM · tế bào miễn dịch canh gác" color="#4C51BF" />

            {/* nhãn tế bào thành */}
            <g pointerEvents="none">
              <text x="606" y="342" textAnchor="end" fontSize="10.5" fontWeight="800" fill="#B02A4F">
                Tế bào thành
              </text>
              <text x="606" y="355" textAnchor="end" fontSize="9.5" fontWeight="600" fill="#8A4B5D">
                tiết HCl
              </text>
            </g>
          </g>

          {/* ═════ 4. HỐ VỊ + TUYẾN VỊ ═════ */}
          <g {...layer('gland')}>
            <path d={PIT_PATH} fill={url('pit')} />
            <path d="M 662 262 L 662 430 M 686 262 L 686 430" stroke="#C084A0" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
            {[292, 344, 396].map((y) => (
              <Parietal key={y} cx={640} cy={y} gid={id('pc')} />
            ))}
            {[295, 342, 389].map((y) => (
              <Chief key={y} cx={708} cy={y} gid={id('cc')} />
            ))}

            {/* HCl và pepsinogen đi lên theo lòng tuyến */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={`up${i}`}
                cx={674 + (i % 2 ? 4 : -4)}
                r={i % 2 ? 3 : 3.6}
                fill={i % 2 ? '#8E6BD8' : '#FF7A45'}
                initial={{ cy: 410, opacity: 0 }}
                animate={{ cy: [410, 200], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.6, delay: i * 0.72, ...loop, ease: 'easeOut', times: undefined }}
              />
            ))}

            {/* nhãn bên phải */}
            <g pointerEvents="none">
              <line x1="706" y1="250" x2="734" y2="272" stroke="#E0A926" strokeWidth="1.2" strokeDasharray="2 3" />
              <circle cx="740" cy="274" r="4" fill="#FFD166" stroke="#E0A926" />
              <text x="750" y="272" fontSize="10.5" fontWeight="800" fill="#8A6A00">Tế bào gốc</text>
              <text x="750" y="285" fontSize="9.5" fontWeight="600" fill="#8A6A00">tái tạo biểu mô</text>

              <circle cx="740" cy="342" r="4" fill="#8E6BD8" stroke="#6B4BB5" />
              <text x="750" y="340" fontSize="10.5" fontWeight="800" fill="#5B3FB0">Tế bào chính</text>
              <text x="750" y="353" fontSize="9.5" fontWeight="600" fill="#5B3FB0">tiết pepsinogen</text>
            </g>
          </g>

          {/* ═════ 3. BIỂU MÔ BỀ MẶT ═════ */}
          <g {...layer('epithelium')}>
            <rect y="190" width={W} height="62" fill="#F7A9BB" />
            {Array.from({ length: 14 }).map((_, i) => (
              <EpiCell key={`l${i}`} x={i * 46} gid={id('cell')} />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <EpiCell key={`r${i}`} x={712 + i * 46} gid={id('cell')} />
            ))}
            {/* thành hố vị */}
            <rect x="640" y="190" width="68" height="72" fill={url('cell')} />
            <ellipse cx="650" cy="228" rx="5" ry="7" fill="#C9184A" fillOpacity="0.5" />
            <ellipse cx="698" cy="228" rx="5" ry="7" fill="#C9184A" fillOpacity="0.5" />
            <circle cx="649" cy="249" r="7" fill="#FFD166" stroke="#E0A926" strokeWidth="1.3" />
            <circle cx="699" cy="249" r="7" fill="#FFD166" stroke="#E0A926" strokeWidth="1.3" />
            <circle cx="649" cy="249" r="2.6" fill="#B8860B" />
            <circle cx="699" cy="249" r="2.6" fill="#B8860B" />
            {/* phần lòng hố vị đè lên thành */}
            <path d={PIT_PATH} fill={url('pit')} />
            {/* màng đáy */}
            <path d="M 0 252 L 640 252 M 708 252 L 860 252" stroke="#E58AA0" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
            <Pill x={14} y={258} text="TẾ BÀO BIỂU MÔ BỀ MẶT · thay mới mỗi 3–5 ngày" color="#C2255C" />
            {/* nhãn đỉnh hố vị */}
            <g pointerEvents="none">
              <text x="726" y="236" fontSize="9.5" fontWeight="700" fill="#A61E4D">Hố vị</text>
            </g>
          </g>

          {/* ═════ 2. LỚP CHẤT NHẦY ═════ */}
          <g {...layer('mucus')}>
            <path d={MUCUS_PATH} fill={url('mucus')} />
            <path d={MUCUS_TOP} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.2" />
            {/* sợi mucin */}
            {[
              'M 0 138 C 120 128, 240 150, 380 138 S 620 130, 860 142',
              'M 0 160 C 140 150, 280 172, 420 160 S 660 152, 860 164',
              'M 0 178 C 160 170, 320 184, 480 176 S 700 172, 860 180'
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" />
            ))}

            {/* HCO₃⁻ tiết ra từ tế bào */}
            {bubbles.map(([x, amp], i) => (
              <g key={i} transform={`translate(${x} 168)`}>
                <motion.g
                  initial={{ opacity: reduce ? 0.85 : 0 }}
                  animate={reduce ? undefined : { y: [0, -amp], opacity: [0, 0.95, 0.95, 0] }}
                  transition={{ duration: 4.2, delay: i * 0.55, ...loop, ease: 'easeOut' }}
                >
                  <circle r="11" fill="#fff" fillOpacity="0.55" stroke="#fff" strokeWidth="1" />
                  <text y="3" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0B4A41">
                    HCO₃⁻
                  </text>
                </motion.g>
              </g>
            ))}

            <Pill x={14} y={124} text="🛡 LỚP CHẤT NHẦY · giàu HCO₃⁻ trung hòa axit" color="#0B7A69" />
          </g>

          {/* ═════ Lớp phủ: thang pH + hiệu ứng axit tấn công ═════ */}
          <g pointerEvents="none">
            <rect x="838" y="22" width="9" height="162" rx="4.5" fill={url('ph')} stroke="#fff" strokeWidth="1" />
            <text x="832" y="18" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#B93A0B">pH ≈ 2</text>
            <text x="832" y="198" textAnchor="end" fontSize="9.5" fontWeight="800" fill="#0B7A69">pH ≈ 7</text>

            {acidActive && (
              <>
                {/* lá chắn nhấp nháy */}
                <motion.line
                  x1="0" x2={W} y1="190" y2="190"
                  stroke="#E6FFFA" strokeWidth="4"
                  filter={url('glow')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.3, 1, 0] }}
                  transition={{ duration: 2.4, ease: 'easeInOut' }}
                />
                {attackX.map((x, i) => (
                  <React.Fragment key={x}>
                    <motion.g
                      initial={{ x, y: 56, opacity: 0 }}
                      animate={{ x, y: [56, 150], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.1, delay: i * 0.12, ease: 'easeIn', times: [0, 0.15, 0.85, 1] }}
                    >
                      <circle r="8.5" fill={url('hp')} stroke="#D9480F" strokeWidth="1.2" />
                      <text y="3" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">H⁺</text>
                    </motion.g>
                    {/* vụ trung hòa */}
                    <g transform={`translate(${x} 152)`}>
                      <motion.g
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: [0.3, 1.7], opacity: [0, 0.9, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.12 + 1.0, ease: 'easeOut' }}
                      >
                        <circle r="12" fill="none" stroke="#fff" strokeWidth="3" />
                        <circle r="6" fill="#fff" fillOpacity="0.6" />
                      </motion.g>
                      {i % 2 === 0 && (
                        <motion.text
                          y="-14"
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="800"
                          fill="#0B4A41"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 1, 0], y: [-8, -20] }}
                          transition={{ duration: 1, delay: i * 0.12 + 1.05 }}
                        >
                          H₂O
                        </motion.text>
                      )}
                    </g>
                  </React.Fragment>
                ))}
                {/* thông báo an toàn */}
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                >
                  <rect x="330" y="258" width="262" height="22" rx="11" fill="#E6FCF5" stroke="#12B886" strokeWidth="1.2" />
                  <text x="461" y="273" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0B7A5A">
                    ✔ Axit bị trung hòa, tế bào vẫn an toàn
                  </text>
                </motion.g>
              </>
            )}
          </g>
        </g>
      </svg>

      {/* Chú thích theo lớp đang rê chuột */}
      <div className="w-full mt-3 px-4 py-2.5 rounded-2xl bg-white/70 border border-white text-xs text-[#12343B] leading-relaxed min-h-[52px] flex items-start gap-2.5">
        <span
          className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: info ? info.color : '#9CC9C2' }}
        />
        <p>
          {info ? (
            <>
              <b style={{ color: info.color }}>{info.title}.</b> {info.text}
            </>
          ) : (
            'Rê chuột vào từng lớp của lát cắt để xem chi tiết, hoặc bấm nút để cho axit "tấn công".'
          )}
        </p>
      </div>
    </div>
  );
}

export default StomachMucosa;