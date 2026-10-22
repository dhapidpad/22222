import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────────────────
   Hình học các cơ quan (viewBox 0 0 500 660)
   Các đường "FLOW" nối liền nhau thành một lộ trình duy nhất
   từ thực quản → dạ dày → tá tràng → ruột non → ruột già → trực tràng
   để các hạt thức ăn chạy đúng theo giải phẫu.
──────────────────────────────────────────────────────────── */
const TORSO =
  'M 222 8 L 222 44 C 222 58 190 62 165 72 C 140 82 132 110 130 160 C 128 230 126 300 132 380 C 136 470 142 540 165 600 Q 250 660 335 600 C 358 540 364 470 368 380 C 374 300 372 230 370 160 C 368 110 360 82 335 72 C 310 62 278 58 278 44 L 278 8 Z';

const LUNG_L =
  'M 146 95 C 160 78 205 80 228 100 C 238 130 236 170 226 182 C 190 184 150 178 142 150 C 138 125 140 105 146 95 Z';
const LUNG_R =
  'M 344 95 C 330 78 285 80 262 100 C 252 130 254 170 264 182 C 300 184 340 178 348 150 C 352 125 350 105 344 95 Z';

const ESO = 'M 256 26 C 252 80, 258 130, 256 160 C 255 175, 255 190, 256 208';

const STOMACH =
  'M 254 198 C 300 188 346 226 340 276 C 334 326 290 352 245 336 C 226 329 222 312 232 305 C 246 298 258 285 260 262 C 262 240 256 220 254 198 Z';

const LIVER =
  'M 252 196 C 224 184 170 188 146 212 C 136 228 138 254 158 268 C 186 286 226 282 250 262 C 258 240 258 214 252 196 Z';
const GALLBLADDER =
  'M 206 270 C 198 270 194 282 198 292 C 201 300 211 300 214 292 C 218 282 214 270 206 270 Z';

const PANCREAS =
  'M 212 346 C 240 340 285 342 318 336 C 330 340 326 352 310 356 C 280 364 240 368 214 364 C 205 360 205 351 212 346 Z';

const DUODENUM = 'M 230 314 C 205 318, 190 335, 196 355 C 200 372, 222 378, 244 388';

const SI_FLOW =
  'C 266 392, 296 396, 296 405 C 296 416, 276 416, 252 416 C 226 416, 208 420, 208 428 C 208 440, 232 440, 254 440 C 278 440, 296 444, 296 452 C 296 464, 276 464, 252 464 C 228 464, 208 468, 208 476 C 208 488, 232 488, 254 488 C 278 488, 296 492, 296 500 C 296 512, 276 512, 252 512 C 228 512, 208 516, 208 524 C 208 536, 232 536, 254 536 C 276 536, 292 540, 292 548 C 292 560, 272 560, 252 560 C 232 560, 214 562, 200 570';
const SMALL_INT = `M 244 388 ${SI_FLOW}`;

const COL_BODY =
  'L 174 410 C 172 380, 196 372, 222 380 C 244 387, 260 387, 282 380 C 306 372, 330 378, 330 408 L 330 510 C 330 548, 322 582, 296 588 C 276 592, 262 598, 256 610 L 252 628';
const COLON = `M 186 572 ${COL_BODY}`;

const FOOD_PATH = [
  ESO,
  'C 258 240, 300 250, 304 290 C 308 322, 272 332, 246 322 C 238 318, 234 314, 230 314',
  'C 205 318, 190 335, 196 355 C 200 372, 222 378, 244 388',
  SI_FLOW,
  `L 186 572 ${COL_BODY}`
].join(' ');

/* Dữ liệu từng bộ phận (giữ nguyên key để Slide1Hero không phải sửa) */
const PARTS = {
  esophagus: {
    name: 'Thực quản',
    color: '#3BB8F0',
    desc: 'Ống dẫn thức ăn từ miệng xuống dạ dày bằng các đợt sóng nhu động.'
  },
  stomach: {
    name: 'Dạ dày',
    color: '#FF8A5B',
    desc: 'Nhào trộn cơ học, tiết axit HCl (pH 1.5–3.5) và men pepsin tiêu hóa protein.'
  },
  duodenum: {
    name: 'Tá tràng',
    color: '#FFB300',
    desc: 'Đoạn đầu ruột non dài 25 cm, đón dịch mật và dịch tụy kiềm để trung hòa axit.'
  },
  liver: {
    name: 'Gan – Mật',
    color: '#C98A6B',
    desc: 'Gan tiết mật và túi mật dự trữ dịch mật để nhũ hóa chất béo.'
  },
  pancreas: {
    name: 'Tụy',
    color: '#F4A261',
    desc: 'Tiết dịch tụy giàu enzym tiêu hóa và ion bicarbonat kiềm.'
  },
  smallIntestine: {
    name: 'Ruột non',
    color: '#FF6F91',
    desc: 'Hấp thu hầu hết chất dinh dưỡng vào máu qua mạng lưới vi nhung mao.'
  },
  largeIntestine: {
    name: 'Ruột già',
    color: '#1FBFA8',
    desc: 'Tái hấp thu nước và chất điện giải, cô đặc chất cặn bã thành phân.'
  }
};

const LABELS = [
  { key: 'esophagus', name: 'Thực quản', sub: 'Esophagus', side: 'right', tx: 257, ty: 122, y: 88 },
  { key: 'stomach', name: 'Dạ dày', sub: 'Stomach', side: 'right', tx: 322, ty: 252, y: 226 },
  { key: 'pancreas', name: 'Tụy', sub: 'Pancreas', side: 'right', tx: 316, ty: 349, y: 318 },
  { key: 'largeIntestine', name: 'Ruột già', sub: 'Large intestine', side: 'right', tx: 330, ty: 450, y: 440 },
  { key: 'liver', name: 'Gan – Mật', sub: 'Liver & bile', side: 'left', tx: 150, ty: 232, y: 206 },
  { key: 'duodenum', name: 'Tá tràng', sub: 'Duodenum', side: 'left', tx: 193, ty: 347, y: 336 },
  { key: 'smallIntestine', name: 'Ruột non', sub: 'Small intestine', side: 'left', tx: 208, ty: 480, y: 480 }
];

/* Ống tạng: viền + thân + vân cơ + vệt sáng */
function Tube({ d, w, outline, fill, dash, dashColor = '#000', dashOpacity = 0.16 }) {
  const t = { transition: 'stroke-width .25s ease' };
  const common = { d, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', style: t };
  return (
    <>
      <path {...common} stroke={outline} strokeWidth={w + 3} />
      <path {...common} stroke={fill} strokeWidth={w} />
      {dash && (
        <path
          {...common}
          stroke={dashColor}
          strokeOpacity={dashOpacity}
          strokeWidth={w}
          strokeLinecap="butt"
          strokeDasharray={dash}
        />
      )}
      <path
        {...common}
        stroke="#fff"
        strokeOpacity="0.38"
        strokeWidth={Math.max(2, w * 0.22)}
        transform={`translate(${-w * 0.18} ${-w * 0.18})`}
      />
    </>
  );
}

function Label({ item, hovered }) {
  const { name, sub, side, tx, ty, y, key } = item;
  const color = PARTS[key].color;
  const w = Math.max(name.length * 7.6, sub.length * 5.6) + 26;
  const x = side === 'right' ? 388 : 112 - w;
  const ex = side === 'right' ? 388 : 112;
  return (
    <g style={{ transition: 'opacity .3s' }} opacity={hovered === false ? 0.45 : 1}>
      <line x1={tx} y1={ty} x2={ex} y2={y} stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx={tx} cy={ty} r="4" fill={color} stroke="#fff" strokeWidth="1.5" />
      <rect
        x={x}
        y={y - 17}
        width={w}
        height="34"
        rx="12"
        fill={hovered ? color : 'rgba(255,255,255,0.93)'}
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={y - 1}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={hovered ? '#fff' : '#12343B'}
      >
        {name}
      </text>
      <text
        x={x + w / 2}
        y={y + 11}
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="600"
        fill={hovered ? '#fff' : '#5B7B80'}
        opacity="0.85"
      >
        {sub}
      </text>
    </g>
  );
}

export function DigestiveSystem({
  activePart = null,
  onSelectPart = null,
  showLabels = true,
  interactive = true,
  className = '',
  width = 540,
  height = 680
}) {
  const [hoveredPart, setHoveredPart] = useState(null);
  const currentHover = activePart || hoveredPart;

  // id duy nhất cho mỗi instance (tránh trùng gradient/filter khi render nhiều lần)
  const uid = useId().replace(/:/g, '');
  const id = (n) => `${uid}-${n}`;
  const url = (n) => `url(#${id(n)})`;

  const dim = (key) => (currentHover && currentHover !== key ? 0.3 : 1);
  const glow = (key) => (currentHover === key ? url('glow') : undefined);

  const ip = (key, extraStyle = {}) =>
    interactive
      ? {
          onMouseEnter: () => setHoveredPart(key),
          onMouseLeave: () => setHoveredPart(null),
          onClick: () => onSelectPart && onSelectPart(key),
          style: { cursor: 'pointer', opacity: dim(key), transition: 'opacity .3s', ...extraStyle }
        }
      : { style: { opacity: dim(key), ...extraStyle } };

  const hit = (d, w = 28) => (
    <path d={d} fill="none" stroke="transparent" strokeWidth={w} pointerEvents="stroke" strokeLinecap="round" />
  );

  const hov = (k) => currentHover === k;

  const foodColors = ['#FFD166', '#FFB36B', '#FFC98A'];

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 660"
        width={width}
        height={height}
        className="overflow-visible"
        role="img"
        aria-label="Sơ đồ hệ tiêu hóa người"
      >
        <defs>
          <radialGradient id={id('aura')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1FBFA8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1FBFA8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id('torso')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FDFC" />
            <stop offset="100%" stopColor="#D5F0EA" />
          </linearGradient>
          <linearGradient id={id('lung')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F9D3E1" />
            <stop offset="100%" stopColor="#EBA7C4" />
          </linearGradient>
          <radialGradient id={id('stomach')} cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#FFC8AA" />
            <stop offset="55%" stopColor="#FF8A5B" />
            <stop offset="100%" stopColor="#E4572E" />
          </radialGradient>
          <linearGradient id={id('liver')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DCA689" />
            <stop offset="100%" stopColor="#A96648" />
          </linearGradient>
          <linearGradient id={id('gall')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8BE6AB" />
            <stop offset="100%" stopColor="#2F9E64" />
          </linearGradient>
          <linearGradient id={id('pancreas')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE490" />
            <stop offset="100%" stopColor="#F2A93B" />
          </linearGradient>
          <linearGradient id={id('si')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB9CB" />
            <stop offset="100%" stopColor="#FF5C86" />
          </linearGradient>
          <linearGradient id={id('colon')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3CE0C5" />
            <stop offset="100%" stopColor="#13967F" />
          </linearGradient>

          <filter id={id('glow')} filterUnits="userSpaceOnUse" x="0" y="0" width="500" height="660">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={id('shadow')} filterUnits="userSpaceOnUse" x="0" y="0" width="500" height="660">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0B4A41" floodOpacity="0.22" />
          </filter>

          <clipPath id={id('stomachClip')}>
            <path d={STOMACH} />
          </clipPath>
          <clipPath id={id('liverClip')}>
            <path d={LIVER} />
          </clipPath>

          <path id={id('food')} d={FOOD_PATH} fill="none" />
        </defs>

        {/* ── Nền: hào quang + thân người ── */}
        <ellipse cx="250" cy="340" rx="230" ry="320" fill={url('aura')} />
        <path d={TORSO} fill={url('torso')} fillOpacity="0.9" />
        <path
          d={TORSO}
          fill="none"
          stroke="#1FBFA8"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeOpacity="0.45"
        />
        {/* đường viền trong tạo chiều sâu */}
        <path
          d="M 150 120 C 146 230 146 330 152 420 C 156 500 162 550 180 585"
          fill="none"
          stroke="#1FBFA8"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <path
          d="M 350 120 C 354 230 354 330 348 420 C 344 500 338 550 320 585"
          fill="none"
          stroke="#1FBFA8"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />

        {/* ── Phổi, khí quản, cơ hoành (trang trí) ── */}
        <g
          pointerEvents="none"
          style={{ transition: 'opacity .3s' }}
          opacity={currentHover ? 0.22 : 0.6}
        >
          <path d={LUNG_L} fill={url('lung')} stroke="#D98AAE" strokeWidth="1.5" />
          <path d={LUNG_R} fill={url('lung')} stroke="#D98AAE" strokeWidth="1.5" />
          <path d="M 160 105 C 178 118 196 138 206 168" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
          <path d="M 330 105 C 312 118 294 138 284 168" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
          <path d="M 236 100 C 232 118 220 125 206 134" fill="none" stroke="#B7CFDC" strokeWidth="6" strokeLinecap="round" />
          <path d="M 236 100 C 240 118 256 124 278 134" fill="none" stroke="#B7CFDC" strokeWidth="6" strokeLinecap="round" />
          <Tube d="M 236 26 L 236 102" w={11} outline="#8AA4B5" fill="#D3E6F0" dash="2 5" dashOpacity="0.2" />
          <path
            d="M 132 205 C 150 170 215 160 250 184 C 285 160 350 170 368 205"
            fill="none"
            stroke="#1FBFA8"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        </g>

        <g filter={url('shadow')}>
          {/* ── Gan + túi mật + ống mật ── */}
          <g {...ip('liver')} filter={glow('liver')}>
            <path
              d={LIVER}
              fill={url('liver')}
              stroke="#8D553C"
              strokeWidth={hov('liver') ? 3 : 1.8}
              strokeLinejoin="round"
            />
            <g clipPath={url('liverClip')} pointerEvents="none">
              {/* dây chằng liềm chia thùy */}
              <path d="M 234 188 C 224 220 212 250 198 280" fill="none" stroke="#7A4630" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
              {/* vân thùy gan */}
              <path d="M 180 205 C 190 230 188 250 176 266" fill="none" stroke="#7A4630" strokeOpacity="0.22" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 160 220 C 166 238 164 252 158 262" fill="none" stroke="#7A4630" strokeOpacity="0.22" strokeWidth="1.6" strokeLinecap="round" />
              {/* vệt sáng */}
              <path d="M 166 212 C 182 198 208 196 226 204" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" />
            </g>
            <path d="M 206 298 C 204 310 206 318 210 324" fill="none" stroke="#2F9E64" strokeWidth="3" strokeLinecap="round" />
            <path d={GALLBLADDER} fill={url('gall')} stroke="#2F855A" strokeWidth="1.5" />
            <ellipse cx="204" cy="278" rx="3" ry="5" fill="#fff" opacity="0.45" />
          </g>

          {/* ── Tụy (nằm sau dạ dày) ── */}
          <g {...ip('pancreas')} filter={glow('pancreas')}>
            <path
              d={PANCREAS}
              fill={url('pancreas')}
              stroke="#D9951F"
              strokeWidth={hov('pancreas') ? 3 : 1.6}
              strokeLinejoin="round"
            />
            <path
              d="M 318 347 C 280 353, 240 355, 212 354"
              fill="none"
              stroke="#B8740F"
              strokeOpacity="0.4"
              strokeWidth="6"
              strokeDasharray="1 4"
              strokeLinecap="round"
              pointerEvents="none"
            />
            <path
              d="M 316 346 C 280 352, 240 354, 208 351"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              pointerEvents="none"
            />
          </g>

          {/* ── Tá tràng (khung chữ C ôm đầu tụy) ── */}
          <g {...ip('duodenum')} filter={glow('duodenum')}>
            {hit(DUODENUM)}
            <Tube
              d={DUODENUM}
              w={hov('duodenum') ? 13 : 10}
              outline="#E09100"
              fill="#FFC933"
              dash="1.5 5"
            />
          </g>

          {/* ── Thực quản ── */}
          <g {...ip('esophagus')} filter={glow('esophagus')}>
            {hit(ESO, 26)}
            <Tube
              d={ESO}
              w={hov('esophagus') ? 15 : 11}
              outline="#1E88E5"
              fill="#7AD0F7"
              dash="1.5 7"
            />
          </g>

          {/* ── Dạ dày (hình chữ J, nếp niêm mạc, cơ vòng môn vị) ── */}
          <motion.g
            {...ip('stomach', { transformBox: 'fill-box', transformOrigin: 'center' })}
            filter={glow('stomach')}
            animate={{ scale: hov('stomach') ? 1.05 : [1, 1.025, 1] }}
            transition={
              hov('stomach')
                ? { duration: 0.3 }
                : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <path
              d={STOMACH}
              fill={url('stomach')}
              stroke="#C8431A"
              strokeWidth={hov('stomach') ? 3.5 : 2}
              strokeLinejoin="round"
            />
            <g clipPath={url('stomachClip')} pointerEvents="none">
              {/* nếp gấp niêm mạc */}
              <path d="M 270 240 C 300 245 318 262 316 290" fill="none" stroke="#fff" strokeOpacity="0.38" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 262 262 C 290 270 303 290 298 312" fill="none" stroke="#fff" strokeOpacity="0.34" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 282 224 C 312 230 330 250 331 274" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M 258 300 C 274 314 288 322 304 324" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2.4" strokeLinecap="round" />
              {/* vệt sáng đáy vị */}
              <path d="M 272 204 C 300 198 326 214 334 242" fill="none" stroke="#fff" strokeOpacity="0.32" strokeWidth="6" strokeLinecap="round" />
              {/* bóng khí và dịch vị */}
              {[
                [292, 262, 0],
                [310, 288, 0.9],
                [298, 236, 1.7],
                [276, 300, 2.4]
              ].map(([cx, cy, delay], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={2.4}
                  fill="#fff"
                  initial={{ opacity: 0 }}
                  animate={{ cy: [cy, cy - 14, cy], opacity: [0, 0.65, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, delay, ease: 'easeInOut' }}
                />
              ))}
            </g>
            {/* tâm vị (cardia) & môn vị (pylorus) */}
            <circle cx="256" cy="205" r="5.5" fill="#FF7043" stroke="#B33A12" strokeWidth="1.8" pointerEvents="none" />
            <circle cx="231" cy="311" r="6.5" fill="#FF7043" stroke="#B33A12" strokeWidth="2" pointerEvents="none" />
            <circle cx="231" cy="311" r="2.4" fill="#7A2308" opacity="0.55" pointerEvents="none" />
          </motion.g>

          {/* ── Ruột non (cuộn, vân nhung mao, mạc treo) ── */}
          <g {...ip('smallIntestine')} filter={glow('smallIntestine')}>
            <path
              d="M 204 394 C 250 384 300 392 302 440 C 304 500 300 556 258 566 C 222 574 202 556 204 530 C 202 470 202 430 204 394 Z"
              fill="#FFC2D1"
              opacity="0.28"
              pointerEvents="none"
            />
            {hit(SMALL_INT, 24)}
            <Tube
              d={SMALL_INT}
              w={hov('smallIntestine') ? 14 : 11}
              outline="#D83C6B"
              fill={url('si')}
              dash="1 4.5"
              dashColor="#8E1038"
              dashOpacity="0.26"
            />
          </g>

          {/* ── Ruột già: manh tràng, đại tràng lên/ngang/xuống, sigma, trực tràng, ruột thừa ── */}
          <g {...ip('largeIntestine')} filter={glow('largeIntestine')}>
            {hit(COLON, 30)}
            <path
              d="M 178 580 C 166 592 168 608 182 606"
              fill="none"
              stroke="#0E7A66"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 178 580 C 166 592 168 608 182 606"
              fill="none"
              stroke="#2CD1B8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <Tube
              d={COLON}
              w={hov('largeIntestine') ? 22 : 18}
              outline="#0E7A66"
              fill={url('colon')}
              dash="2 14"
              dashColor="#04483C"
              dashOpacity="0.34"
            />
            {/* manh tràng */}
            <circle cx="185" cy="568" r="13" fill="#17A88F" stroke="#0E7A66" strokeWidth="2.5" pointerEvents="none" />
            <circle cx="181" cy="564" r="4" fill="#fff" opacity="0.3" pointerEvents="none" />
            {/* hậu môn */}
            <circle cx="252" cy="632" r="4.5" fill="#0E7A66" opacity="0.8" pointerEvents="none" />
          </g>
        </g>

        {/* ── Hạt thức ăn chạy dọc toàn bộ ống tiêu hóa ── */}
        <g pointerEvents="none">
          {[0, 1, 2].map((i) => (
            <circle key={i} r={5 - i * 0.7} fill={foodColors[i]} stroke="#FF8A5B" strokeWidth="1.4">
              <animateMotion
                dur="18s"
                begin={`${-i * 6}s`}
                repeatCount="indefinite"
                calcMode="paced"
              >
                <mpath href={`#${id('food')}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur="18s"
                begin={`${-i * 6}s`}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes="0;0.03;0.97;1"
              />
              <animate
                attributeName="fill"
                dur="18s"
                begin={`${-i * 6}s`}
                repeatCount="indefinite"
                values={`${foodColors[i]};#FF8A5B;#FF6F91;#B9855A`}
                keyTimes="0;0.3;0.65;1"
              />
            </circle>
          ))}
        </g>

        {/* ── Nhãn + đường chỉ ── */}
        {showLabels && (
          <g pointerEvents="none">
            {LABELS.map((item) => (
              <Label
                key={item.key}
                item={item}
                hovered={currentHover ? currentHover === item.key : undefined}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Tooltip thông tin khi hover */}
      <AnimatePresence>
        {currentHover && PARTS[currentHover] && (
          <motion.div
            key={currentHover}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white text-center max-w-sm pointer-events-none z-30"
          >
            <div
              className="font-heading font-bold text-sm flex items-center justify-center gap-1.5"
              style={{ color: PARTS[currentHover].color }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: PARTS[currentHover].color }}
              />
              {PARTS[currentHover].name}
            </div>
            <div className="text-xs text-[#12343B] mt-1 leading-relaxed">
              {PARTS[currentHover].desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DigestiveSystem;