import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import content from '../data/content';
import sfx from '../audio/sfx';

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question: "Biến chứng nguy hiểm đe dọa trực tiếp tính mạng người bệnh trong tiêu chảy cấp là gì?",
    options: [
      { text: "A. Tăng đường huyết đột ngột", correct: false },
      { text: "B. Mất nước và rối loạn điện giải dẫn đến sốc giảm thể tích", correct: true },
      { text: "C. Đau rát bỏng họng kéo dài", correct: false },
      { text: "D. Thiếu vitamin D mạn tính", correct: false }
    ],
    explanation: "Chính xác! Việc đi ngoài phân lỏng xối xả làm kiệt nước và các ion điện giải quan trọng (Na+, K+, HCO3-) trong cơ thể cực nhanh, dẫn đến tụt huyết áp, trụy mạch và tử vong nếu không bù kịp thời."
  },
  {
    id: 2,
    question: "Dấu hiệu nếp véo da bụng phẳng 'rất chậm' (mất > 2 giây) kèm mắt rất trũng, li bì báo hiệu điều gì?",
    options: [
      { text: "A. Da bị lão hóa thông thường", correct: false },
      { text: "B. Mất nước mức độ nặng (Phác đồ C) — Cần cấp cứu truyền dịch tĩnh mạch ngay!", correct: true },
      { text: "C. Không mất nước, chỉ cần nghỉ ngơi", correct: false },
      { text: "D. Ngộ độc vitamin A", correct: false }
    ],
    explanation: "Chính xác! Khi mất trên 10% trọng lượng cơ thể do mất nước nặng, da mất hoàn toàn tính đàn hồi khiến nếp véo da tồn tại trên 2 giây. Đây là dấu hiệu cờ đỏ phải nhập viện cấp cứu khẩn cấp!"
  },
  {
    id: 3,
    question: "Quy tắc vàng khi pha gói dung dịch bù nước Oresol theo chuẩn WHO và Bộ Y tế là gì?",
    options: [
      { text: "A. Pha thêm đường hoặc sữa cho trẻ dễ uống", correct: false },
      { text: "B. Pha thật đặc với ít nước để nhanh khỏi", correct: false },
      { text: "C. Pha đúng 100% thể tích nước sạch ghi trên vỏ gói (áp lực 245 mOsm/L), uống từng ngụm nhỏ", correct: true },
      { text: "D. Đun sôi dung dịch Oresol sau khi đã pha xong", correct: false }
    ],
    explanation: "Chính xác! Gói Oresol giảm áp lực thẩm thấu (245 mOsm/L) phải được pha đủ 100% lượng nước sôi để nguội. Pha đặc hoặc thêm đường/sữa sẽ hút ngược nước vào lòng ruột, gây co giật và tử vong do tăng áp lực thẩm thấu!"
  }
];

const STATUS = ['Còn khô cạn', 'Đã bù được một ít', 'Gần đủ nước', 'Đủ nước rồi'];

/* ------------------------------------------------------------------ */
/*  SVG tự vẽ                                                          */
/* ------------------------------------------------------------------ */

const DROP_PATH = 'M12 1.5 C12 1.5 3 11.5 3 17.2 a9 9 0 0 0 18 0 C21 11.5 12 1.5 12 1.5 Z';

function DropShape({ size = 16, fill = 'currentColor', stroke = 'none' }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 24 28" aria-hidden="true">
      <path d={DROP_PATH} fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

/* Dấu tick / dấu nhân vẽ bằng nét, chạy theo pathLength */
function Mark({ kind, size = 18, color }) {
  const d = kind === 'ok' ? 'M4 10.5 L8.5 15 L16.5 5.5' : 'M5 5 L15 15 M15 5 L5 15';
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </svg>
  );
}

function Stroke({ d, size = 14, w = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CHEVRON_LEFT = 'M10 3 L5 8 L10 13';
const ARROW_RIGHT = 'M2.5 8 H13 M9 4 L13 8 L9 12';
const UNDO = 'M3 7 A5 5 0 1 1 4.6 11.2 M3 3 V7 H7';

/* Cốc đong: nước dâng theo số câu đúng */
const INNER = 'M25 20 V166 Q25 180 39 180 H81 Q95 180 95 166 V20 Z';
const GLASS = 'M25 14 V166 Q25 180 39 180 H81 Q95 180 95 166 V14';

function wavePath(amp) {
  let d = `M20 0 Q37.5 ${-amp} 55 0`;
  for (let x = 90; x <= 300; x += 35) d += ` T${x} 0`;
  return `${d} V200 H20 Z`;
}
const WAVE_FRONT = wavePath(5);
const WAVE_BACK = wavePath(7);

const levelToY = (f) => 180 - 160 * (0.05 + 0.95 * f);

function Beaker({ level, reduce }) {
  const top = levelToY(level);
  const depth = 180 - top;
  const loop = (from, to, duration) =>
    reduce
      ? {}
      : { animate: { x: [from, to] }, transition: { duration, ease: 'linear', repeat: Infinity } };

  return (
    <svg viewBox="0 0 120 200" className="h-full w-full" role="img" aria-label={`Mức nước ${Math.round(level * 100)}%`}>
      <defs>
        <clipPath id="s9-clip">
          <path d={INNER} />
        </clipPath>
        <linearGradient id="s9-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5CCBF5" />
          <stop offset="1" stopColor="#1FBFA8" />
        </linearGradient>
        <linearGradient id="s9-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3BB8F0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1FBFA8" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="s9-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <path d={INNER} fill="url(#s9-glass)" />

      <g clipPath="url(#s9-clip)">
        <motion.g initial={{ y: 180 }} animate={{ y: top }} transition={{ type: 'spring', stiffness: 60, damping: 16 }}>
          <motion.path d={WAVE_BACK} fill="url(#s9-back)" initial={{ x: 0 }} {...loop(-70, 0, 4.2)} />
          <motion.path d={WAVE_FRONT} fill="url(#s9-front)" initial={{ x: 0 }} {...loop(0, -70, 3)} />
          {!reduce && level > 0.1 &&
            [46, 62, 78].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                r={2 + (i % 2)}
                fill="#fff"
                initial={{ cy: depth - 8, opacity: 0 }}
                animate={{ cy: [depth - 8, 10], opacity: [0, 0.7, 0] }}
                transition={{ duration: 3 + i * 0.7, delay: i * 0.9, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
        </motion.g>
      </g>

      {/* vạch chia */}
      {[1 / 3, 2 / 3, 1].map((f, i) => {
        const y = levelToY(f);
        return (
          <line key={i} x1="95" x2={i === 2 ? 80 : 86} y1={y} y2={y} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
        );
      })}

      <path d={GLASS} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 14 H101" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 34 V150" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Slide9Quiz({ onSelectSlide, onSelectView }) {
  const data = content.slide9 || {};
  const questions = data.questions && data.questions.length > 0 ? data.questions : FALLBACK_QUESTIONS;
  const reduce = useReducedMotion();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qId]: optionIndex }

  const q = questions[currentQuestionIndex] || questions[0];
  const answeredIndex = selectedAnswers[q.id];
  const hasAnswered = answeredIndex !== undefined;
  const answeredCorrectly = hasAnswered && q.options[answeredIndex]?.correct;

  const handleSelectOption = (optIdx) => {
    if (hasAnswered) return;

    const isCorrect = q.options[optIdx]?.correct;
    const nextAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (isCorrect) {
      sfx.success();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      sfx.pop();
    }

    const answeredCount = Object.keys(nextAnswers).length;
    if (answeredCount === questions.length) {
      const correctTotal = questions.filter(
        (item) => nextAnswers[item.id] !== undefined && item.options[nextAnswers[item.id]]?.correct
      ).length;
      if (correctTotal === questions.length) {
        setTimeout(() => {
          sfx.success();
          try {
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#1FBFA8', '#3BB8F0', '#FFD166', '#FF8A5B']
            });
          } catch (e) {}
        }, 500);
      }
    }
  };

  const handleReset = () => {
    sfx.tick();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  const correctCount = questions.filter(
    (item) => selectedAnswers[item.id] !== undefined && item.options[selectedAnswers[item.id]]?.correct
  ).length;
  const level = correctCount / questions.length;
  const statusText = STATUS[Math.min(3, Math.round(level * 3))];

  // Dữ liệu giải thích luôn bắt đầu bằng "Chính xác!" — thay lời mở đầu theo kết quả thật
  const explanationBody = (q.explanation || '').replace(/^Chính xác!\s*/, '');

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2 px-3 md:px-8 py-2 select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {onSelectView && (
            <button
              onClick={() => {
                sfx.tick();
                onSelectView(0);
              }}
              className="flex items-center gap-1 pl-2 pr-3 py-1.5 rounded-full bg-white hover:bg-sky-50 text-[#12343B] font-bold text-xs border border-[#12343B]/10 shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3BB8F0]"
              title="Quay lại bài học lý thuyết"
            >
              <Stroke d={CHEVRON_LEFT} size={14} />
              <span>Bài học F1</span>
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0284C7]">
              <DropShape size={11} fill="#3BB8F0" />
              <span>Minigame trắc nghiệm củng cố</span>
            </div>
            <h2 className="font-heading font-extrabold text-lg md:text-2xl text-[#12343B] leading-tight truncate">
              Đấu Trí Sinh Học: {questions.length} Câu Hỏi Về Mất Nước &amp; Oresol
            </h2>
          </div>
        </div>

        {/* Tabs giọt nước */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-end gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-sm" role="tablist" aria-label="Chọn câu hỏi">
            {questions.map((item, idx) => {
              const isCurrent = currentQuestionIndex === idx;
              const isAns = selectedAnswers[item.id] !== undefined;
              const isCor = isAns && item.options[selectedAnswers[item.id]]?.correct;
              const fill = isAns ? (isCor ? '#10B981' : '#F43F5E') : isCurrent ? 'url(#s9-tab)' : '#EAF6FD';
              const textColor = isAns || isCurrent ? '#fff' : '#5B7B80';

              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Câu ${idx + 1}${isAns ? (isCor ? ', đúng' : ', sai') : ''}`}
                  onClick={() => {
                    sfx.tick();
                    setCurrentQuestionIndex(idx);
                  }}
                  className="relative p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3BB8F0] rounded-lg"
                >
                  <motion.svg
                    width="30"
                    height="35"
                    viewBox="0 0 24 28"
                    animate={{ scale: isCurrent ? 1.12 : 1, y: isCurrent ? -1 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <defs>
                      <linearGradient id="s9-tab" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#1FBFA8" />
                        <stop offset="1" stopColor="#3BB8F0" />
                      </linearGradient>
                    </defs>
                    <path d={DROP_PATH} fill={fill} stroke={isCurrent ? '#12343B' : '#B9D9E6'} strokeWidth={isCurrent ? 1.6 : 1.2} />
                    {isAns ? (
                      <path
                        d={isCor ? 'M8 16.5 L11 19.5 L16.5 13' : 'M9 13 L15 19 M15 13 L9 19'}
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ) : (
                      <text x="12" y="20.5" textAnchor="middle" fontSize="10" fontWeight="800" fill={textColor}>
                        {idx + 1}
                      </text>
                    )}
                  </motion.svg>
                </button>
              );
            })}
          </div>

          <div className="md:hidden px-3 py-1.5 rounded-full bg-white/90 border border-white shadow-sm text-xs font-bold text-[#12343B]">
            <span className="text-[#1FBFA8] font-extrabold text-sm">{correctCount}</span>/{questions.length}
          </div>
        </div>
      </div>

      {/* Thân: cốc đong + câu hỏi */}
      <div className="flex-1 min-h-0 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[148px_1fr] gap-3 md:gap-4">
        {/* Bảng mức nước */}
        <div className="hidden md:flex relative flex-col items-center justify-between rounded-[28px] p-4 bg-gradient-to-b from-[#12343B] to-[#0B5560] shadow-xl overflow-hidden">
          <div
            className="absolute inset-x-0 top-1/4 h-40 pointer-events-none transition-opacity duration-700"
            style={{
              opacity: 0.15 + level * 0.55,
              background: 'radial-gradient(closest-side, rgba(59,184,240,0.55), transparent)'
            }}
          />
          <div className="relative text-[11px] font-bold text-sky-200/80 self-start">Mức bù nước</div>
          <div className="relative flex-1 min-h-0 w-full py-2">
            <Beaker level={level} reduce={reduce} />
          </div>
          <div className="relative text-center">
            <div className="font-heading font-extrabold text-white text-3xl leading-none">
              {correctCount}
              <span className="text-sky-200/70 text-base">/{questions.length}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold text-sky-100/90">{statusText}</div>
          </div>
        </div>

        {/* Thẻ câu hỏi */}
        <div className="min-h-0 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-5 md:p-6 rounded-[28px] bg-white/95 backdrop-blur-md border border-white shadow-xl"
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] mb-1.5">
                  <svg width="26" height="8" viewBox="0 0 26 8" aria-hidden="true">
                    <path d="M0 4 Q3.25 0 6.5 4 T13 4 T19.5 4 T26 4" fill="none" stroke="#3BB8F0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>
                    Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-base md:text-xl text-[#12343B] leading-snug">{q.question}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answeredIndex === optIdx;
                  const isCorrect = opt.correct;
                  const m = opt.text.match(/^\s*([A-Da-d])[.)]\s*([\s\S]*)$/);
                  const letter = m ? m[1].toUpperCase() : String.fromCharCode(65 + optIdx);
                  const label = m ? m[2] : opt.text;

                  let btn = 'bg-white hover:bg-sky-50/70 hover:border-[#3BB8F0]/60 text-[#12343B] border-gray-200';
                  let badge = 'bg-sky-50 text-[#0284C7] border-sky-200';
                  if (hasAnswered) {
                    if (isCorrect) {
                      btn = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold shadow-sm';
                      badge = 'bg-emerald-500 text-white border-emerald-500';
                    } else if (isSelected) {
                      btn = 'bg-rose-50 text-rose-900 border-rose-300 font-bold';
                      badge = 'bg-rose-500 text-white border-rose-500';
                    } else {
                      btn = 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
                      badge = 'bg-gray-100 text-gray-400 border-gray-200';
                    }
                  }

                  return (
                    <motion.button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(optIdx)}
                      animate={!reduce && hasAnswered && isSelected && !isCorrect ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileTap={hasAnswered ? undefined : { scale: 0.98 }}
                      className={`p-3 rounded-2xl border text-left text-xs md:text-sm transition-colors flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3BB8F0] ${btn}`}
                    >
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-extrabold transition-colors ${badge}`}
                      >
                        {letter}
                      </span>
                      <span className="leading-snug flex-1">{label}</span>
                      {hasAnswered && isCorrect && <Mark kind="ok" color="#10B981" />}
                      {hasAnswered && isSelected && !isCorrect && <Mark kind="no" color="#F43F5E" />}
                    </motion.button>
                  );
                })}
              </div>

              {hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 pl-4 rounded-2xl border-l-4 text-xs leading-relaxed ${
                    answeredCorrectly
                      ? 'bg-emerald-50/80 border-emerald-400 text-emerald-900'
                      : 'bg-[#EAF6FD] border-[#3BB8F0] text-[#0369A1]'
                  }`}
                >
                  <div className="font-bold mb-0.5">
                    {answeredCorrectly ? 'Chính xác!' : 'Chưa đúng.'} Giải thích chuyên môn y khoa
                  </div>
                  <span>{explanationBody}</span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs flex-shrink-0">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 pl-3 pr-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#5B7B80] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3BB8F0]"
        >
          <Stroke d={UNDO} size={13} w={1.8} />
          <span>Làm lại từ đầu</span>
        </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={() => {
              sfx.tick();
              setCurrentQuestionIndex((prev) => prev + 1);
            }}
            className="flex items-center gap-1.5 pl-5 pr-4 py-2 rounded-full bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-bold shadow-sm hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#12343B]"
          >
            <span>Câu hỏi tiếp theo</span>
            <Stroke d={ARROW_RIGHT} size={14} />
          </button>
        ) : (
          <button
            onClick={() => {
              sfx.whoosh();
              if (onSelectSlide) onSelectSlide(10);
            }}
            className="flex items-center gap-1.5 pl-6 pr-5 py-2 rounded-full bg-gradient-to-r from-[#1FBFA8] via-[#3BB8F0] to-[#FF8A5B] text-white font-extrabold shadow-md hover:scale-105 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#12343B]"
          >
            <span>Tiếp tục: Slide 10 Tổng Kết Master</span>
            <Stroke d={ARROW_RIGHT} size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Slide9Quiz;