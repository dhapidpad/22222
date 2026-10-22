import React, { useState, useCallback } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Award,
  HeartHandshake,
  Flame,
  Droplets,
  Activity,
  BookOpen,
} from 'lucide-react';

/* ==========================================
   HỆ THỐNG ÂM THANH TƯƠNG TÁC (WEB AUDIO API)
   ========================================== */
const sfx = {
  tick: () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {}
  },
  whoosh: () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {}
  },
  success: () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.24);
      });
    } catch (e) {}
  },
};

/* ==========================================
   SVG KHIÊN VÀNG BẢO VỆ HỆ TIÊU HÓA (ĐA LỚP)
   ========================================== */
function GutHealthShieldSVG({ completedCount, onClick }) {
  const ratio = completedCount / 5;
  const circumference = 2 * Math.PI * 42;

  return (
    <svg
      viewBox="0 0 110 110"
      onClick={onClick}
      className="w-24 h-24 md:w-28 md:h-28 cursor-pointer select-none transition-transform duration-300 hover:scale-105 shrink-0"
    >
      <defs>
        <radialGradient id="auraGlow12" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldCore12" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="55%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="goldEdge12" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      <circle cx="55" cy="55" r="52" fill="url(#auraGlow12)" />

      {/* Vòng tiến độ 5T */}
      <circle cx="55" cy="55" r="42" fill="none" stroke="#E2E8F0" strokeWidth="4" />
      <circle
        cx="55"
        cy="55"
        r="42"
        fill="none"
        stroke="url(#goldEdge12)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - ratio)}
        transform="rotate(-90 55 55)"
      />

      {/* Thân Khiên */}
      <path
        d="M 55 20 L 82 30 L 82 54 C 82 73, 70 85, 55 92 C 40 85, 28 73, 28 54 L 28 30 Z"
        fill="url(#shieldCore12)"
        stroke="url(#goldEdge12)"
        strokeWidth="2.5"
      />

      {/* Biểu tượng chữ thập bảo vệ & tiến độ */}
      <circle cx="55" cy="48" r="9" fill="#FEF3C7" />
      <path
        d="M 55 43.5 L 55 52.5 M 50.5 48 L 59.5 48"
        stroke="#0F766E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x="55"
        y="74"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="9.5"
        fontWeight="900"
      >
        5T: {completedCount}/5
      </text>
    </svg>
  );
}

/* ==========================================
   3 THÔNG ĐIỆP VÀNG TỔNG KẾT CHUYÊN ĐỀ
   ========================================== */
const CORE_TAKEAWAYS = [
  {
    id: 1,
    title: '1. Dạ dày – Tá tràng: Giữ cân bằng Bảo vệ & Tấn công',
    badge: 'Đường tiêu hóa trên',
    color: '#EA580C',
    bgClass: 'bg-orange-50/75 border-orange-200/80',
    icon: Flame,
    desc: 'Bảo toàn lớp nhầy Mucin – HCO₃⁻ bằng cách ăn đúng giờ, không nằm sau ăn 2–3 giờ. Tuyệt đối không tự ý uống thuốc giảm đau NSAID và chỉ diệt H. pylori khi có chỉ định bác sĩ.',
  },
  {
    id: 2,
    title: '2. Tiêu chảy cấp: Bù Oresol 245 mOsm/L chuẩn tỷ lệ',
    badge: 'Đường tiêu hóa dưới',
    color: '#0284C7',
    bgClass: 'bg-sky-50/75 border-sky-200/80',
    icon: Droplets,
    desc: 'Tiêu chảy là phản xạ tống xuất độc tố; nguy cơ tử vong chính là mất nước & điện giải. Bù ngay Oresol pha đúng 100% tỷ lệ nước + Kẽm; cấm tự uống thuốc cầm Loperamide.',
  },
  {
    id: 3,
    title: '3. Phòng bệnh từ gốc: Cắt đứt chu trình Phân – Miệng',
    badge: 'Dự phòng chủ động',
    color: '#0D9488',
    bgClass: 'bg-emerald-50/75 border-emerald-200/80',
    icon: Activity,
    desc: 'Rửa tay 6 bước với xà phòng ≥ 30 giây, thực hiện "Ăn chín, uống sôi", dùng đũa gắp riêng và tiêm chủng đầy đủ vaccine Rotavirus cho trẻ nhỏ.',
  },
];

/* ==========================================
   5 CAM KẾT HÀNH ĐỘNG 5T (CHECKLIST TƯƠNG TÁC)
   ========================================== */
const PLEDGE_5T = [
  {
    id: 't1',
    code: 'T1',
    title: 'Tay Sạch Toàn Diện',
    action: 'Rửa tay xà phòng 6 bước ≥ 30 giây trước khi ăn & sau vệ sinh',
    icon: '🧼',
    color: '#10B981',
  },
  {
    id: 't2',
    code: 'T2',
    title: 'Thức Ăn Nấu Chín',
    action: 'Ăn chín uống sôi, đũa gắp riêng; nói không với tiết canh, đồ tái sống',
    icon: '🍲',
    color: '#EA580C',
  },
  {
    id: 't3',
    code: 'T3',
    title: 'Thuốc Đúng Chỉ Định',
    action: 'Không tự ý dùng NSAID, kháng sinh hay thuốc cầm tiêu chảy Loperamide',
    icon: '💊',
    color: '#EF4444',
  },
  {
    id: 't4',
    code: 'T4',
    title: 'Thói Quen Điều Độ',
    action: 'Ăn đúng giờ, nhai kỹ, ngủ trước 23h & không nằm ngay sau ăn 2–3 giờ',
    icon: '⏰',
    color: '#0284C7',
  },
  {
    id: 't5',
    code: 'T5',
    title: 'Tủ Thuốc Có Oresol',
    action: 'Luôn sẵn gói Oresol 245 mOsm/L & pha chuẩn 100% thể tích nước sạch',
    icon: '💧',
    color: '#D97706',
  },
];

/* ==========================================
   SLIDE 12 CLOSING: BỐ CỤC 12 CỘT GỌN, ĐẸP, HIỆN ĐẠI
   ========================================== */
export function Slide12Closing({ onSelectSlide }) {
  const [checkedIds, setCheckedIds] = useState(['t1', 't2', 't3', 't4', 't5']);

  const togglePledge = useCallback((id) => {
    sfx.tick();
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length === PLEDGE_5T.length) {
        sfx.success();
      }
      return next;
    });
  }, []);

  const checkAll = useCallback(() => {
    sfx.success();
    setCheckedIds(PLEDGE_5T.map((p) => p.id));
  }, []);

  const allCompleted = checkedIds.length === PLEDGE_5T.length;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-8 py-2.5 gap-2 select-none bg-gradient-to-br from-[#ECFDF5] via-[#F8FAFC] to-[#EFF6FF] rounded-3xl overflow-hidden border border-white/90 shadow-sm text-[#12343B]">
      {/* 1. HEADER BAR: Gọn, rõ ràng, đồng bộ toàn bộ bộ Slide */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 flex-shrink-0">
        <div>
          <span className="text-[11px] font-extrabold text-[#059669] tracking-widest uppercase flex items-center gap-1.5">
            <span>🟢 SLIDE 12 • TỔNG KẾT CHUYÊN ĐỀ &amp; CAM KẾT HÀNH ĐỘNG (TỔ 2 – 11A5)</span>
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B] leading-tight">
            Tiêu Hóa Khỏe Mạnh — Khởi Nguồn Cuộc Sống Vui Tươi
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-extrabold shadow-2xs">
            Chuẩn Bộ Y tế &amp; WHO
          </span>
          <button
            type="button"
            onClick={() => {
              sfx.whoosh();
              if (typeof onSelectSlide === 'function') onSelectSlide(1);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#12343B] font-heading font-extrabold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <RotateCcw size={13} className="text-[#059669]" />
            <span>Chiếu lại từ đầu</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN STAGE: GRID 12 CỘT ĐỐI XỨNG (KHÔNG TAB RƯỜM RÀ, KHÔNG MODAL THỪA) */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        {/* NỬA TRÁI (6 Cột): KHIÊN BẢO VỆ & 3 THÔNG ĐIỆP VÀNG CỐT LÕI */}
        <div className="col-span-12 lg:col-span-6 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Đầu thẻ: Khiên SVG + 3 Chỉ số Vàng */}
          <div className="flex items-center gap-3.5 pb-2.5 border-b border-slate-100 flex-shrink-0">
            <GutHealthShieldSVG completedCount={checkedIds.length} onClick={checkAll} />

            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Tổng kết cốt lõi
                </span>
                <h3 className="font-heading font-black text-base md:text-lg text-[#12343B] leading-tight mt-0.5">
                  3 Thông Điệp Vàng Bảo Vệ Hệ Tiêu Hóa
                </h3>
              </div>

              {/* 3 Con số biết nói */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-1.5 rounded-xl bg-orange-50 border border-orange-200/70">
                  <div className="font-heading font-black text-sm text-[#EA580C]">2–3 giờ</div>
                  <div className="text-[9.5px] font-bold text-slate-600">Không nằm sau ăn</div>
                </div>
                <div className="p-1.5 rounded-xl bg-sky-50 border border-sky-200/70">
                  <div className="font-heading font-black text-sm text-[#0284C7]">245</div>
                  <div className="text-[9.5px] font-bold text-slate-600">mOsm/L Oresol</div>
                </div>
                <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200/70">
                  <div className="font-heading font-black text-sm text-[#059669]">≥ 30 giây</div>
                  <div className="text-[9.5px] font-bold text-slate-600">Rửa tay 6 bước</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Thẻ Thông Điệp Vàng */}
          <div className="flex-1 flex flex-col justify-around py-1 space-y-2 min-h-0 overflow-y-auto">
            {CORE_TAKEAWAYS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border ${item.bgClass} transition-all flex items-start gap-3`}
                >
                  <div
                    className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5"
                    style={{ color: item.color }}
                  >
                    <IconComponent size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-extrabold text-xs md:text-sm text-[#12343B]">
                        {item.title}
                      </h4>
                      <span
                        className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-white border shrink-0"
                        style={{ color: item.color, borderColor: `${item.color}40` }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NỬA PHẢI (6 Cột): CHECKLIST CAM KẾT 5T GUT CARE TƯƠNG TÁC */}
        <div className="col-span-12 lg:col-span-6 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Header nửa phải */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#10B981] to-[#0284C7] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                <Award size={15} />
              </span>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#12343B]">
                  Cam Kết Hành Động 5T Bảo Vệ Đường Tiêu Hóa
                </h3>
                <p className="text-[10.5px] font-medium text-slate-500">
                  Nhấp chọn từng nguyên tắc để xác nhận cam kết thực hành mỗi ngày
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600">
                Đạt: <strong className="text-[#059669]">{checkedIds.length}/5</strong>
              </span>
              {!allCompleted ? (
                <button
                  type="button"
                  onClick={checkAll}
                  className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer"
                >
                  + Chọn 5/5
                </button>
              ) : (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  ✓ Hoàn thành 5T
                </span>
              )}
            </div>
          </div>

          {/* 5 Mục Cam Kết 5T Xếp Tầng Gọn Đẹp */}
          <div className="flex-1 flex flex-col justify-around py-1 space-y-1.5 min-h-0 overflow-y-auto">
            {PLEDGE_5T.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => togglePledge(item.id)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                      : 'bg-slate-50/80 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-2xs flex-shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.code}
                        </span>
                        <span className="font-heading font-extrabold text-xs text-[#12343B] truncate">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-600 mt-0.5 truncate">
                        {item.action}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold flex items-center gap-1 shrink-0 transition-all ${
                      isChecked
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    <span>{isChecked ? 'Cam kết' : 'Chọn'}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Dòng bảo chứng nguồn y khoa gọn dưới đáy nửa phải */}
          <div className="p-2 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 flex items-center justify-between text-[10.5px] text-[#047857] font-bold flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <BookOpen size={13} className="shrink-0" />
              <span>
                Nguồn tham khảo: <strong>Bộ Y tế (QĐ 4121 &amp; 462/QĐ-BYT) • WHO • CDC • SGK Sinh học 11</strong>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. FOOTER SLOGAN & LỜI CẢM ƠN */}
      <div className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-[#12343B] via-[#0F766E] to-[#0284C7] text-white flex items-center justify-between gap-3 text-xs flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-2 font-semibold">
          <HeartHandshake size={16} className="text-[#FFD166] shrink-0" />
          <span>
            <strong>Thông điệp kết thúc:</strong> “Yêu thương bản thân bắt đầu từ việc chăm sóc đúng cách cho hệ tiêu hóa mỗi ngày!”
          </span>
        </div>
        <span className="text-[10.5px] font-extrabold px-3 py-0.5 rounded-full bg-white/15 uppercase tracking-wider shrink-0">
          Cảm ơn Cô &amp; Các bạn đã lắng nghe • Tổ 2 – 11A5
        </span>
      </div>
    </div>
  );
}

export default Slide12Closing;