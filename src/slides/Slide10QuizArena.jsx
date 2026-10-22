import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  Trophy,
  Sparkles,
  Gamepad2,
  Award,
  Zap,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';
import sfx from '../audio/sfx';

export const QUIZ_QUESTIONS = [
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

export function Slide10QuizArena({ onSelectSlide }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qId]: optionIndex }
  const [showResultCard, setShowResultCard] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];
  const answeredIdx = selectedAnswers[q.id];
  const isAnswered = answeredIdx !== undefined;

  const handleSelectOption = (optIdx) => {
    if (isAnswered) return;

    const isCorrect = q.options[optIdx].correct;
    const nextAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (isCorrect) {
      sfx.success();
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sfx.pop();
    }

    // Check if finished all questions
    if (Object.keys(nextAnswers).length === QUIZ_QUESTIONS.length) {
      setShowResultCard(true);
      setTimeout(() => {
        sfx.success();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#1FBFA8', '#3BB8F0', '#FFD166', '#FF8A5B', '#EF4B5F']
          });
        } catch (e) {}
      }, 600);
    }
  };

  const handleReset = () => {
    sfx.tick();
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResultCard(false);
  };

  const correctCount = QUIZ_QUESTIONS.filter(
    (item) => selectedAnswers[item.id] !== undefined && item.options[selectedAnswers[item.id]].correct
  ).length;

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-10 py-1.5 select-none overflow-hidden">
      {/* 1. Header Bar: Tiêu đề & Bảng thành tích */}
      <div className="flex items-center justify-between gap-3 mb-1 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3BB8F0] via-[#1FBFA8] to-[#FFD166] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-[#3BB8F0]/20 shrink-0">
            09
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-[#3BB8F0] tracking-widest uppercase flex items-center gap-1.5">
                <Gamepad2 size={14} />
                <span>SLIDE 09 · ĐẤU TRÍ SINH HỌC TOÀN DIỆN</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBFA8]"></span>
              <span className="text-[11px] text-[#5B7B80] font-semibold">Minigame Củng Cố Kiến Thức (6 Câu)</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B] leading-tight">
              Thử Thách Đấu Trí: Nhận Biết & Phòng Ngừa 2 Bệnh Tiêu Hóa
            </h2>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/90 border border-white shadow-sm">
            <Trophy size={16} className="text-[#FFD166]" />
            <div className="text-xs font-bold text-[#12343B]">
              Điểm: <span className="text-[#1FBFA8] font-black text-sm">{correctCount}</span> / {QUIZ_QUESTIONS.length}
            </div>
          </div>

          <button
            onClick={() => {
              sfx.whoosh();
              if (onSelectSlide) onSelectSlide(10);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white font-heading font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>Slide 10 Tổng Kết</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Question Navigation Tabs (6 Câu hỏi với chỉ báo đúng/sai) */}
      <div className="grid grid-cols-6 gap-1.5 mb-1 flex-shrink-0">
        {QUIZ_QUESTIONS.map((item, idx) => {
          const isCurrent = currentIdx === idx;
          const isAns = selectedAnswers[item.id] !== undefined;
          const isCor = isAns && item.options[selectedAnswers[item.id]].correct;

          return (
            <button
              key={item.id}
              onClick={() => {
                sfx.tick();
                setCurrentIdx(idx);
              }}
              className={`p-1.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                isCurrent
                  ? 'bg-white border-[#3BB8F0] shadow-md ring-2 ring-[#3BB8F0]/20 font-extrabold text-[#12343B] scale-102'
                  : isAns
                  ? isCor
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-white/60 border-white/80 text-[#5B7B80] hover:bg-white/80'
              }`}
            >
              <div className="text-[10px] font-bold uppercase truncate w-full">
                {idx < 3 ? '🟠 Loét' : '🔵 Tiêu chảy'}
              </div>
              <div className="text-xs font-extrabold flex items-center gap-1">
                <span>Câu {idx + 1}</span>
                {isAns && (
                  <span className={isCor ? 'text-emerald-600' : 'text-rose-600'}>
                    {isCor ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Main Interactive Question Area */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto my-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22 }}
            className="p-4 md:p-6 rounded-[28px] bg-white/95 backdrop-blur-md border border-white shadow-xl flex flex-col justify-between"
          >
            {/* Top Question Tag */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#3BB8F0] text-white flex items-center justify-center font-heading font-extrabold text-xs">
                  {q.id}
                </span>
                <span className="text-xs font-extrabold text-[#3BB8F0] uppercase tracking-wider">
                  Chủ đề: {q.topic}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#5B7B80]">
                Câu {currentIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-heading font-extrabold text-sm md:text-lg text-[#12343B] leading-snug mb-3">
              {q.question}
            </h3>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
              {q.options.map((opt, optIdx) => {
                const isSelected = answeredIdx === optIdx;
                const isCorrect = opt.correct;

                let optClass = 'bg-white hover:bg-sky-50/60 text-[#12343B] border-gray-200';
                if (isAnswered) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 text-emerald-950 border-emerald-400 font-bold shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 text-rose-950 border-rose-300 font-bold';
                  } else {
                    optClass = 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-3 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between group cursor-pointer ${optClass}`}
                  >
                    <span className="leading-snug">{opt.text}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clinical Explanation Box (Appears after answer) */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-2xl bg-[#EAF6FD] border border-[#3BB8F0]/30 text-xs text-[#0284C7] leading-relaxed"
              >
                <div className="font-bold flex items-center gap-1.5 mb-0.5 text-[#0369A1]">
                  <Stethoscope size={14} />
                  <span>Phân tích sinh lý bệnh y khoa:</span>
                </div>
                <span>{q.explanation}</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Bottom Controls & Action Bar */}
      <div className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-sm text-xs flex-shrink-0">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#5B7B80] transition-colors"
        >
          <RotateCcw size={13} />
          <span>Làm lại từ đầu</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIdx > 0 && (
            <button
              onClick={() => {
                sfx.tick();
                setCurrentIdx((prev) => prev - 1);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#12343B] font-bold"
            >
              Câu trước
            </button>
          )}

          {currentIdx < QUIZ_QUESTIONS.length - 1 ? (
            <button
              onClick={() => {
                sfx.tick();
                setCurrentIdx((prev) => prev + 1);
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
                if (onSelectSlide) onSelectSlide(10);
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#1FBFA8] via-[#3BB8F0] to-[#FF8A5B] text-white font-extrabold shadow-md hover:scale-105 transition-transform"
            >
              <span>Tiếp tục: Slide 10 Kết Thúc Báo Cáo</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slide10QuizArena;
