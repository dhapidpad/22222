import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Award,
  Sparkles,
  Gamepad2,
  ChevronLeft,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import content from '../data/content';
import sfx from '../audio/sfx';

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    question: "Tác nhân virus hàng đầu gây tiêu chảy cấp nặng, nguy cơ mất nước tử vong cao ở trẻ em dưới 5 tuổi là gì?",
    options: [
      { text: "A. Virus Viêm gan B", correct: false },
      { text: "B. Rotavirus (Capsid kép hình nan hoa bánh xe)", correct: true },
      { text: "C. Virus Cúm mùa H1N1", correct: false },
      { text: "D. Adenovirus gây viêm họng", correct: false }
    ],
    explanation: "Chính xác! Theo WHO, Rotavirus là nguyên nhân số 1 gây tiêu chảy cấp mất nước nặng ở trẻ nhỏ. Trẻ cần được uống đủ 2 liều vaccine Rotavirus trước 6 tháng tuổi để phòng bệnh."
  },
  {
    id: 2,
    question: "Chu trình lây truyền phổ biến nhất của các mầm bệnh tiêu chảy nhiễm trùng (vi khuẩn, virus, ký sinh trùng) là gì?",
    options: [
      { text: "A. Chu trình Phân – Miệng (Fecal-Oral Route)", correct: true },
      { text: "B. Lây qua đường máu và tiêm chích", correct: false },
      { text: "C. Lây qua giọt bắn đường hô hấp khi hắt hơi", correct: false },
      { text: "D. Lây qua vết thương hở ngoài da", correct: false }
    ],
    explanation: "Chính xác! Mầm bệnh từ phân bài xuất ra ngoài phát tán qua nguồn nước bẩn, bàn tay không rửa xà phòng, ruồi nhặng trung gian và thức ăn ôi thiu rồi đi vào miệng người lành."
  },
  {
    id: 3,
    question: "Khi bị tiêu chảy nhiễm trùng, hành vi nào sau đây là SAI LẦM NGUY HIỂM cần tuyệt đối tránh?",
    options: [
      { text: "A. Uống từng ngụm nhỏ dung dịch bù nước Oresol", correct: false },
      { text: "B. Tự ý uống ngay thuốc cầm tiêu chảy (Loperamide) làm liệt ruột", correct: true },
      { text: "C. Rửa tay 6 bước với xà phòng sau khi đi vệ sinh", correct: false },
      { text: "D. Đưa đi bệnh viện khi thấy nếp véo da lâu phẳng (>2s)", correct: false }
    ],
    explanation: "Chính xác! Thuốc cầm tiêu chảy (Loperamide) làm tê liệt nhu động ruột, giữ ứ độc tố và vi khuẩn lại bên trong dẫn đến biến chứng viêm ruột hoại tử, sốc nhiễm độc cực kỳ nguy hiểm!"
  }
];

export function Slide8Quiz({ onSelectSlide, onSelectView }) {
  const data = content.slide8 || {};
  const questions = data.questions && data.questions.length > 0 ? data.questions : FALLBACK_QUESTIONS;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qId]: optionIndex }

  const q = questions[currentQuestionIndex] || questions[0];
  const answeredIndex = selectedAnswers[q.id];
  const hasAnswered = answeredIndex !== undefined;

  const handleSelectOption = (optIdx) => {
    if (hasAnswered) return; // Prevent re-answering current question

    const isCorrect = q.options[optIdx]?.correct;
    const nextAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (isCorrect) {
      sfx.success();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sfx.pop();
    }

    // Check if finished all questions
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

  // Count correct answers
  const correctCount = questions.filter(
    (item) => selectedAnswers[item.id] !== undefined && item.options[selectedAnswers[item.id]]?.correct
  ).length;

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 py-2 select-none overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-1 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {onSelectView && (
            <button
              onClick={() => {
                sfx.tick();
                onSelectView(0); // Return to Lesson F1
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#12343B] font-bold text-xs border border-gray-200 shadow-sm transition-all"
              title="Quay lại bài học lý thuyết"
            >
              <ChevronLeft size={16} />
              <span>Bài học F1</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-lg bg-[#3BB8F0]/15 text-[#0284C7]">
                <Gamepad2 size={16} />
              </span>
              <span className="text-[11px] font-extrabold text-[#0284C7] tracking-widest uppercase">
                MINIGAME TRẮC NGHIỆM CỦNG CỐ
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-lg md:text-2xl text-[#12343B]">
              Đấu Trí Sinh Học: 3 Câu Hỏi Về Căn Nguyên Tiêu Chảy
            </h2>
          </div>
        </div>

        {/* Question Selector Tabs & Score */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-sm">
            {questions.map((item, idx) => {
              const isCurrent = currentQuestionIndex === idx;
              const isAns = selectedAnswers[item.id] !== undefined;
              const isCor = isAns && item.options[selectedAnswers[item.id]]?.correct;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sfx.tick();
                    setCurrentQuestionIndex(idx);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white shadow-sm'
                      : isAns
                      ? isCor
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                      : 'text-[#5B7B80] hover:text-[#12343B]'
                  }`}
                >
                  <span>Câu {idx + 1}</span>
                  {isAns && (isCor ? '✓' : '✗')}
                </button>
              );
            })}
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-white/90 border border-white shadow-sm text-xs font-bold text-[#12343B] flex items-center gap-1.5">
            <Trophy size={14} className="text-[#FFD166]" />
            <span>Điểm:</span>
            <span className="text-[#1FBFA8] font-extrabold text-sm">{correctCount}</span>
            <span>/{questions.length}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Question Card */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto my-1 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-5 md:p-6 rounded-[28px] bg-white/95 backdrop-blur-md border border-white shadow-xl flex flex-col justify-between"
          >
            {/* Question Text */}
            <div className="mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3BB8F0] mb-1">
                <HelpCircle size={15} />
                <span>CÂU HỎI {currentQuestionIndex + 1} / {questions.length}:</span>
              </div>
              <h3 className="font-heading font-extrabold text-base md:text-xl text-[#12343B] leading-snug">
                {q.question}
              </h3>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = answeredIndex === optIdx;
                const isCorrect = opt.correct;

                let optClass = 'bg-white hover:bg-sky-50/60 text-[#12343B] border-gray-200';
                if (hasAnswered) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 text-rose-900 border-rose-300 font-bold';
                  } else {
                    optClass = 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-3 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between group ${optClass}`}
                  >
                    <span className="leading-snug">{opt.text}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-2" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box (Appears after answer) */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-[#EAF6FD] border border-[#3BB8F0]/30 text-xs text-[#0284C7] leading-relaxed"
              >
                <div className="font-bold flex items-center gap-1.5 mb-0.5 text-[#0369A1]">
                  <span>💡 Giải thích chuyên môn y khoa:</span>
                </div>
                <span>{q.explanation}</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation & Reset Bar */}
      <div className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs flex-shrink-0">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#5B7B80] transition-colors"
        >
          <RotateCcw size={13} />
          <span>Làm lại từ đầu</span>
        </button>

        <div className="flex items-center gap-2">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => {
                sfx.tick();
                setCurrentQuestionIndex((prev) => prev + 1);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-bold shadow-sm hover:opacity-95"
            >
              <span>Câu hỏi tiếp theo</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={() => {
                sfx.whoosh();
                if (onSelectSlide) onSelectSlide(9);
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#1FBFA8] via-[#3BB8F0] to-[#FF8A5B] text-white font-extrabold shadow-md hover:scale-105 transition-transform"
            >
              <span>Tiếp tục: Slide 09 Triệu chứng</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slide8Quiz;
