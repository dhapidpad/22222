import React, { useState, useCallback } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Utensils,
  Clock,
  Pill,
  Sparkles,
  HeartHandshake,
  Activity,
  Flame,
  Droplets,
  Moon,
  HelpCircle,
  RotateCcw,
  Award,
  XCircle,
  Info,
} from 'lucide-react';

/* ==========================================
   HỆ THỐNG ÂM THANH TƯƠNG TÁC (WEB AUDIO API)
   Tự động hoạt động độc lập trên Canvas & App
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
      osc.frequency.setValueAtTime(860, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Bỏ qua nếu trình duyệt chặn autoplay trước tương tác
    }
  },
  whoosh: () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {
      // Bỏ qua lỗi audio
    }
  },
};

/* ==========================================
   SVG MINH HỌA VECTOR ĐA LỚP 4 TRỤ CỘT DẠ DÀY
   ========================================== */
function PillarVector({ type, size = 48 }) {
  if (type === 'diet') {
    // Trụ cột 1: Dinh dưỡng khoa học & Nhịp sinh học
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <radialGradient id="dietGrad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>
        </defs>
        {/* Đĩa thức ăn cân bằng & Vòng nhịp sinh học */}
        <circle cx="50" cy="50" r="38" fill="url(#dietGrad)" opacity="0.16" />
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="#ECFDF5"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeDasharray="6 3"
        />
        <circle cx="50" cy="50" r="24" fill="url(#dietGrad)" stroke="#A7F3D0" strokeWidth="2" />
        {/* Lá rau xanh Vitamin U & Giọt kiềm HCO3- */}
        <path
          d="M 40 56 C 38 42, 52 34, 62 38 C 60 50, 50 60, 40 56 Z"
          fill="#ECFDF5"
          opacity="0.95"
        />
        <path
          d="M 41 55 Q 50 47 59 40"
          stroke="#059669"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Kim đồng hồ đúng giờ */}
        <circle cx="72" cy="28" r="11" fill="#065F46" stroke="#A7F3D0" strokeWidth="2" />
        <path
          d="M 72 23 L 72 28 L 76 30"
          stroke="#ECFDF5"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (type === 'hygiene') {
    // Trụ cột 2: Vệ sinh ăn uống & Tiệt trừ H. pylori
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="hpShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        {/* Khiên bảo vệ niêm mạc */}
        <path
          d="M 50 14 L 80 26 L 80 50 C 80 70, 66 83, 50 90 C 34 83, 20 70, 20 50 L 20 26 Z"
          fill="url(#hpShieldGrad)"
          stroke="#BAE6FD"
          strokeWidth="2.5"
        />
        {/* Hình xoắn khuẩn H. pylori có chùm lông roi bị khóa */}
        <path
          d="M 37 48 Q 44 40 50 48 T 63 48"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 63 46 C 70 40, 74 44, 77 39 M 63 50 C 71 50, 74 54, 78 51"
          fill="none"
          stroke="#FDE047"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Vòng tròn cấm / chặn vi khuẩn HP */}
        <circle cx="50" cy="49" r="18" fill="none" stroke="#F87171" strokeWidth="3" />
        <line x1="38" y1="37" x2="62" y2="61" stroke="#F87171" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'medication') {
    // Trụ cột 3: An toàn thuốc NSAID & Bảo vệ hàng rào Prostaglandin
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="55%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2.5" />
        {/* Viên thuốc con nhộng nghiêng 45 độ */}
        <g transform="rotate(-35 50 50)">
          <rect x="36" y="24" width="28" height="52" rx="14" fill="url(#medGrad)" stroke="#FFEDD5" strokeWidth="2" />
          <path d="M 36 50 L 64 50 L 64 62 A 14 14 0 0 1 36 62 Z" fill="#FFFFFF" opacity="0.92" />
        </g>
        {/* Huy hiệu chữ thập y tế xanh bảo vệ */}
        <circle cx="70" cy="68" r="13" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M 70 62 L 70 74 M 64 68 L 76 68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // Trụ cột 4: Kiểm soát Stress (Trục Não - Ruột) & Tư thế ngủ chống trào ngược
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      <defs>
        <radialGradient id="lifeGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="34" fill="url(#lifeGrad)" stroke="#FEF3C7" strokeWidth="2.5" />
      {/* Trăng khuyết giấc ngủ trước 23h & Sóng thần kinh Vagus êm dịu */}
      <path
        d="M 56 28 A 18 18 0 1 0 72 56 A 14 14 0 1 1 56 28 Z"
        fill="#FFFBEB"
      />
      <path
        d="M 28 66 Q 38 60 48 66 T 68 66"
        fill="none"
        stroke="#FFFBEB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="38" cy="40" r="3" fill="#FFFBEB" />
    </svg>
  );
}

/* ==========================================
   SVG MÔ PHỎNG HÀNG RÀO NIÊM MẠC DẠ DÀY TƯƠNG TÁC
   Hiển thị trực quan độ dày lớp nhầy Mucin - HCO3-
   ========================================== */
function MucosalBarrierSVG({ shieldCount, activePillarColor }) {
  const ratio = shieldCount / 5;
  const mucusHeight = Math.round(12 + ratio * 22); // 12px (mỏng/tổn thương) -> 34px (dày chuẩn)
  const isHealthy = shieldCount >= 4;

  return (
    <svg viewBox="0 0 420 118" className="w-full h-24 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-inner overflow-hidden">
      <defs>
        <linearGradient id="acidLumen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="mucusGel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Tầng 1: Lòng dạ dày chứa Acid HCl & Pepsin (pH 1.5 - 2.0) */}
      <rect x="0" y="0" width="420" height="52" fill="url(#acidLumen)" />
      <text x="12" y="16" fill="#FCA5A5" fontSize="9.5" fontWeight="800">
        LÒNG DẠ DÀY: HCl + Pepsin (pH 1.5–2.0) {shieldCount < 3 ? '⚠️ ĐANG XÂM Thực' : '🛡️ ĐÃ BỊ CHẶN'}
      </text>

      {/* Các hạt Acid H+ và Pepsin tấn công từ trên xuống */}
      {[45, 115, 190, 265, 340, 390].map((cx, i) => {
        const blocked = i < shieldCount + 1;
        const cy = blocked ? 30 : 62;
        return (
          <g key={i}>
            <line
              x1={cx}
              y1="18"
              x2={cx}
              y2={cy}
              stroke={blocked ? '#38BDF8' : '#F87171'}
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <circle
              cx={cx}
              cy={cy}
              r={blocked ? 5 : 6}
              fill={blocked ? '#0284C7' : '#EF4444'}
              stroke="#FFFFFF"
              strokeWidth="1"
            />
            <text x={cx - 4} y={cy + 3} fill="#FFFFFF" fontSize="6.5" fontWeight="bold">
              H+
            </text>
          </g>
        );
      })}

      {/* Tầng 2: Lớp nhầy Mucin & Đệm Bicarbonate HCO3- (pH trung tính 7.0) */}
      <rect
        x="0"
        y={82 - mucusHeight}
        width="420"
        height={mucusHeight}
        fill="url(#mucusGel)"
        rx="4"
      />
      <path
        d={`M 0 ${82 - mucusHeight} Q 52 ${77 - mucusHeight} 105 ${82 - mucusHeight} T 210 ${82 - mucusHeight} T 315 ${82 - mucusHeight} T 420 ${82 - mucusHeight}`}
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="2.5"
      />
      <text x="12" y={82 - mucusHeight / 2 + 3} fill="#FFFFFF" fontSize="9" fontWeight="800">
        HÀNG RÀO NHẦY MUCIN &amp; ĐỆM HCO₃⁻ (Độ dày: {Math.round(ratio * 100)}% • pH bề mặt ~7.0)
      </text>

      {/* Tầng 3: Hàng tế bào biểu mô trụ đơn & Mao mạch máu (Prostaglandin E2) */}
      <g transform="translate(0, 82)">
        {[...Array(14)].map((_, idx) => {
          const x = idx * 30;
          const damaged = !isHealthy && (idx === 4 || idx === 9);
          return (
            <g key={idx}>
              <rect
                x={x + 1}
                y="0"
                width="28"
                height="24"
                rx="5"
                fill={damaged ? '#FCA5A5' : '#FDE68A'}
                stroke={damaged ? '#EF4444' : '#F59E0B'}
                strokeWidth="1.2"
              />
              <circle
                cx={x + 15}
                cy="13"
                r="4"
                fill={damaged ? '#B91C1C' : '#D97706'}
              />
            </g>
          );
        })}
        {/* Dòng máu nuôi dưỡng dưới niêm mạc */}
        <rect x="0" y="25" width="420" height="11" fill="#991B1B" />
        <text x="12" y="33" fill="#FECACA" fontSize="8" fontWeight="700">
          TUẦN HOÀN MÁU DƯỚI NIÊM MẠC &amp; PROSTAGLANDIN E2 (Tái tạo tế bào biểu mô mỗi 3–5 ngày)
        </text>
      </g>
    </svg>
  );
}

/* ==========================================
   DỮ LIỆU Y KHOA CHI TIẾT 4 TRỤ CỘT BẢO VỆ DẠ DÀY
   ========================================== */
const PREVENTION_PILLARS = [
  {
    id: 'diet',
    badge: 'Dinh dưỡng & Nhịp sinh học',
    shortName: 'Ăn Uống',
    title: 'Trụ cột 1: Ăn Đúng Giờ • Nhai Kỹ • Trung Hòa Acid',
    sub: 'Đồng bộ hóa phản xạ tiết dịch vị & giảm tải cơ học cho hang vị',
    stat: '-65%',
    statLabel: 'nguy cơ quá tải acid & loét tái phát',
    color: '#10B981',
    mechanism:
      'Dạ dày tiết HCl theo nhịp sinh học (phản xạ có điều kiện qua dây thần kinh X). Ăn đúng giờ giúp thức ăn làm chất đệm trung hòa acid đúng lúc; nhai kỹ kích thích nước bọt tiết HCO₃⁻ và yếu tố tăng trưởng biểu bì (EGF) bảo vệ niêm mạc.',
    tips: [
      {
        head: 'Quy tắc Đúng Giờ & Vừa Đủ (70–80% dung tích)',
        detail:
          'Ăn cố định khung giờ sáng – trưa – tối. Không nhịn đói quá 5 giờ (acid tự ăn mòn lớp nhầy) và không ăn quá no làm căng thành hang vị gây tăng tiết hormone Gastrin.',
        tag: 'Đồng hồ sinh học',
      },
      {
        head: 'Ăn Chậm Nhai Kỹ (20–30 lần) & Thức Ăn Mềm Ấm',
        detail:
          'Nhai kỹ giúp nghiền nhỏ thực phẩm <2mm trước khi qua môn vị, tăng tiết Mucin và Amylase nước bọt; ưu tiên món hấp, luộc, súp ấm (37–42°C).',
        tag: 'Giảm tải co bóp',
      },
      {
        head: 'Tăng Thực Phẩm Bọc Nhầy – Tránh Kích Ứng Mạnh',
        detail:
          'Bổ sung bắp cải xanh (giàu Vitamin U lành ổ loét), nghệ vàng (Curcumin), chuối chín, khoai lang, bánh mì; tránh rượu bia, đồ chua (pH <3), ớt tiêu và đồ chiên ngập dầu.',
        tag: 'Thực phẩm đệm kiềm',
      },
    ],
    clinicalAlert:
      'LƯU Ý LÂM SÀNG: Uống sữa ấm hoặc ăn vài lát bánh mì/bánh quy lạt khi bắt đầu có cảm giác cồn cào giúp trung hòa nhanh acid tự do trong lòng dạ dày.',
  },
  {
    id: 'hygiene',
    badge: 'Kiểm soát H. pylori',
    shortName: 'Diệt Khuẩn HP',
    title: 'Trụ cột 2: Cắt Đường Lây & Tiệt Trừ Vi Khuẩn H. pylori',
    sub: 'Ngăn chặn thủ phạm gây 80% ca loét dạ dày và 90% ca loét hành tá tràng',
    stat: '75–80%',
    statLabel: 'ca loét liên quan xoắn khuẩn H. pylori',
    color: '#0284C7',
    mechanism:
      'Vi khuẩn Helicobacter pylori tiết enzyme Urease phân hủy Ure thành NH₃ tạo đám mây kiềm quanh thân, đồng thời tiết độc tố CagA/VacA phá vỡ liên kết chặt (Tight Junctions) của biểu mô, mở đường cho HCl và Pepsin khoét sâu tạo ổ loét.',
    tips: [
      {
        head: 'Cắt Đứt Đường Lây Miệng – Miệng & Dùng Chung Bát Chấm',
        detail:
          'HP tồn tại trong mảng bám răng, nước bọt và dịch vị. Hãy dùng đũa/muỗng公 (đũa gắp riêng), bát nước chấm riêng và tuyệt đối KHÔNG mớm thức ăn cho trẻ nhỏ.',
        tag: 'Chặn lây gia đình',
      },
      {
        head: 'Thực Hiện "Ăn Chín, Uống Sôi" & Rửa Tay Xà Phòng',
        detail:
          'Chặn đường lây Phân – Miệng qua nguồn nước chưa đun sôi, rau sống bón phân tươi hoặc bàn tay nhiễm bẩn sau khi đi vệ sinh.',
        tag: 'Vệ sinh dịch tễ',
      },
      {
        head: 'Tuân Thủ Tuyệt Đối Phác Đồ Tiệt Trừ HP (10–14 Ngày)',
        detail:
          'Khi có chỉ định diệt HP (loét tiến triển, tiền sử K dạ dày gia đình), phải uống đúng giờ – đủ liều kháng sinh phối hợp PPI + Bismuth; bỏ dở sẽ gây kháng thuốc rất khó trị.',
        tag: 'Chống kháng thuốc',
      },
    ],
    clinicalAlert:
      'KHUYẾN CÁO HỘI TIÊU HÓA (VNAGE): Kiểm tra lại H. pylori bằng Test thở (Urea Breath Test) sau khi ngưng kháng sinh ít nhất 4 tuần và ngưng PPI ít nhất 2 tuần.',
  },
  {
    id: 'medication',
    badge: 'An toàn dược lý',
    shortName: 'Thuốc An Toàn',
    title: 'Trụ cột 3: Không Tự Ý Lạm Dụng Thuốc Giảm Đau NSAID',
    sub: 'Bảo vệ dòng máu nuôi niêm mạc & nguồn tổng hợp Prostaglandin E2 nội sinh',
    stat: 'x4–5 lần',
    statLabel: 'nguy cơ xuất huyết tiêu hóa do NSAID',
    color: '#EA580C',
    mechanism:
      'Thuốc kháng viêm giảm đau NSAID (Ibuprofen, Aspirin, Meloxicam, Diclofenac, Naproxen) ức chế enzyme COX-1, làm ngừng sản xuất Prostaglandin E2 (PGE2) — chất giữ vai trò sống còn trong việc tiết nhầy Mucin, tiết HCO₃⁻ và giãn mạch nuôi niêm mạc.',
    tips: [
      {
        head: 'Tuyệt Đối Không Tự Mua NSAID Khi Đau Đầu, Đau Khớp',
        detail:
          'Nếu chỉ đau hoặc sốt thông thường, ưu tiên Paracetamol (Acetaminophen) đúng liều thay vì Ibuprofen/Aspirin/Piroxicam nếu đang có tiền sử viêm loét dạ dày.',
        tag: 'Tránh ức chế COX-1',
      },
      {
        head: 'Cảnh Giác "Thuốc Đông Y Gia Truyền / Thuốc Khớp Giảm Đau Nhanh"',
        detail:
          'Tránh xa các loại thuốc bột, viên hoàn không nhãn mác quảng cáo "hết đau xương khớp tức thì" vì thường trộn ngầm Corticoid + NSAID liều cao gây thủng dạ dày cấp.',
        tag: 'Cảnh giác Corticoid',
      },
      {
        head: 'Nguyên Tắc Bảo Vệ Kép Khi Bắt Buộc Dùng Kháng Viêm',
        detail:
          'Luôn uống thuốc giảm đau/kháng kết tập tiểu cầu ngay sau bữa ăn no và dùng kèm thuốc ức chế bơm proton (PPI) bảo vệ niêm mạc theo đúng toa bác sĩ.',
        tag: 'Đồng điều trị PPI',
      },
    ],
    clinicalAlert:
      'CẢNH BÁO ĐỎ: Loét dạ dày do NSAID thường "câm lặng" (do thuốc đã làm mất cảm giác đau), biến chứng đầu tiên phát hiện có thể là nôn ra máu hoặc đi ngoài phân đen!',
  },
  {
    id: 'lifestyle',
    badge: 'Trục Não – Ruột & Tư thế',
    shortName: 'Sinh Hoạt',
    title: 'Trụ cột 4: Không Nằm Ngay Sau Ăn • Kiểm Soát Stress & Giấc Ngủ',
    sub: 'Điều hòa dây thần kinh phế vị (Vagus) & ngăn trào ngược acid – dịch mật',
    stat: '2–3 giờ',
    statLabel: 'khoảng cách vàng từ bữa ăn đến lúc nằm',
    color: '#D97706',
    mechanism:
      'Stress tâm lý và thức khuya kích hoạt trục Hạ đồi – Tuyến yên – Thượng thận (tăng Cortisol) và dây thần kinh X (tăng Acetylcholine + Histamin), làm dạ dày tăng tiết acid dữ dội về đêm đồng thời gây co mạch thiếu máu cục bộ niêm mạc.',
    tips: [
      {
        head: 'Quy Tắc Bất Di Bất Dịch: Không Nằm Trong 2–3 Giờ Sau Ăn',
        detail:
          'Dạ dày cần 2–3 giờ để làm rỗng 80% thức ăn xuống tá tràng. Nằm sớm khiến thức ăn và acid đè lên cơ vòng thực quản dưới (LES) gây trào ngược GERD và viêm thực quản.',
        tag: 'Chống trào ngược',
      },
      {
        head: 'Ngủ Trước 23:00 & Nằm Nghiêng Trái / Kê Cao Đầu 15–20cm',
        detail:
          'Biểu mô dạ dày tái tạo mạnh nhất từ 23:00–02:00 sáng. Tư thế nằm nghiêng trái giúp bờ cong lớn dạ dày nằm thấp hơn tâm vị, giữ dịch vị không trào lên cổ họng.',
        tag: 'Tái tạo niêm mạc đêm',
      },
      {
        head: 'Giải Tỏa Stress, Đi Bộ Nhẹ & Ngưng Tuyệt Đối Thuốc Lá',
        detail:
          'Nicotine trong khói thuốc làm giãn cơ thắt thực quản dưới, giảm tiết HCO₃⁻ tuyến tụy và làm chậm lành ổ loét gấp 3 lần; duy trì thở cơ hoành 15 phút/ngày.',
        tag: 'Điều hòa thần kinh X',
      },
    ],
    clinicalAlert:
      'MẸO SINH LÝ HỌC: Đi bộ thong thả 10–15 phút sau bữa tối giúp kích thích nhu động làm rỗng dạ dày tự nhiên, nhưng tuyệt đối không tập thể dục cường độ cao ngay sau ăn!',
  },
];

/* ==========================================
   5 MỐC THỜI GIAN BẢO VỆ DẠ DÀY 24 GIỜ (BÊN PHẢI)
   ========================================== */
const DAILY_SHIELD_STATIONS = [
  {
    id: 1,
    time: '06:30 – 07:30',
    title: 'Mốc 1: Khởi động buổi sáng',
    name: 'Uống 200ml nước ấm & Ăn sáng đúng giờ',
    icon: '🌅',
    riskIfOpen: 'Nhịn ăn sáng + uống cà phê đen lúc đói làm HCl đặc ăn mòn niêm mạc',
    barrier: 'Nước ấm rửa trôi dịch vị tồn đọng; bữa sáng ấm trung hòa acid sớm',
    impact: '-42% cơn đau thượng vị sáng',
  },
  {
    id: 2,
    time: '11:30 – 12:30',
    title: 'Mốc 2: Bữa trưa chuẩn sinh lý',
    name: 'Ăn chậm nhai kỹ ≥20 lần & Dùng đũa gắp riêng',
    icon: '🥗',
    riskIfOpen: 'Vừa ăn vừa làm việc căng thẳng, nuốt vội và lây nhiễm chéo H. pylori',
    barrier: 'Tăng tiết HCO₃⁻ nước bọt, giảm tải nghiền cơ học cho hang vị & chặn HP',
    impact: '-55% đầy bụng khó tiêu sau ăn',
  },
  {
    id: 3,
    time: '15:00 – 17:00',
    title: 'Mốc 3: Kiểm soát thuốc & Đồ uống',
    name: 'Không tự uống NSAID lúc đói • Tránh trà đặc, rượu bia',
    icon: '💊',
    riskIfOpen: 'Tự uống thuốc giảm đau Ibuprofen/Aspirin làm mất lớp nhầy PGE2',
    barrier: 'Bảo toàn 100% lớp nhầy Mucin-HCO₃⁻ và tuần hoàn máu nuôi niêm mạc',
    impact: '-80% nguy cơ xuất huyết cấp',
  },
  {
    id: 4,
    time: '18:30 – 19:30',
    title: 'Mốc 4: Quy tắc vàng sau bữa tối',
    name: 'Ăn tối nhẹ vừa đủ & Không nằm ngay sau ăn 2–3 giờ',
    icon: '🚶',
    riskIfOpen: 'Ăn khuya no căng rồi nằm xem điện thoại gây trào ngược acid-mật',
    barrier: 'Dạ dày kịp làm rỗng >80% thức ăn trước khi ngủ, bảo vệ tâm vị',
    impact: '-72% trào ngược dạ dày đêm',
  },
  {
    id: 5,
    time: '22:00 – 23:00',
    title: 'Mốc 5: Giấc ngủ tái tạo niêm mạc',
    name: 'Ngủ trước 23h • Nằm nghiêng trái & Kê đầu 15–20cm',
    icon: '🌙',
    riskIfOpen: 'Thức khuya stress làm tăng vọt Cortisol & tiết acid đỉnh điểm lúc 1h sáng',
    barrier: 'Tế bào biểu mô niêm mạc phân chia tái tạo mới hoàn chỉnh trong giấc ngủ sâu',
    impact: 'x2.4 tốc độ lành tổn thương',
  },
];

/* ==========================================
   BẢNG ĐÈN GIAO THÔNG THỰC PHẨM & TÁC NHÂN DẠ DÀY
   ========================================== */
const GASTRIC_TRAFFIC_LIGHT = [
  {
    zone: 'ĐÈN XANH • NÊN DÙNG HẰNG NGÀY (Bảo vệ & Tái tạo niêm mạc)',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cardClass: 'bg-emerald-50/70 border-emerald-200',
    dotColor: '#10B981',
    items: [
      {
        name: 'Bắp cải xanh, bông cải & rau lá mềm',
        mechanism: 'Giàu Vitamin U (S-Methylmethionine) kích thích tái tạo biểu mô và làm lành vết trợt loét.',
      },
      {
        name: 'Nghệ vàng (Curcumin) & Mật ong chuẩn',
        mechanism: 'Kháng viêm tự nhiên, ức chế yếu tố NF-κB, hỗ trợ kìm hãm H. pylori và bọc ổ viêm.',
      },
      {
        name: 'Bánh mì nướng, yến mạch, khoai lang, chuối chín',
        mechanism: 'Đóng vai trò lớp bọt biển thấm hút acid dư thừa, cung cấp Pectin bảo vệ lớp nhầy.',
      },
      {
        name: 'Cá hấp, ức gà, đậu phụ & Sữa chua ấm',
        mechanism: 'Đạm dễ tiêu hóa, lưu lại dạ dày ngắn; lợi khuẩn Lactobacillus cạnh tranh vị trí bám với HP.',
      },
    ],
  },
  {
    zone: 'ĐÈN VÀNG • DÙNG ĐIỀU ĐỘ & ĐÚNG CÁCH (Không dùng lúc bụng rỗng)',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    cardClass: 'bg-amber-50/70 border-amber-200',
    dotColor: '#F59E0B',
    items: [
      {
        name: 'Cam, chanh, bưởi, dứa (Trái cây giàu acid hữu cơ)',
        mechanism: 'Chỉ dùng lượng nhỏ sau bữa ăn no; ăn lúc đói làm giảm pH dịch vị đột ngột gây đau rát.',
      },
      {
        name: 'Cà phê & Trà xanh loãng',
        mechanism: 'Caffeine kích thích tế bào thành tiết HCl và làm giãn cơ vòng thực quản dưới; tuyệt đối không uống sáng sớm lúc đói.',
      },
    ],
  },
  {
    zone: 'ĐÈN ĐỎ • TUYỆT ĐỐI TRÁNH (Phá hủy hàng rào nhầy & Gây xuất huyết)',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    cardClass: 'bg-rose-50/75 border-rose-200',
    dotColor: '#EF4444',
    items: [
      {
        name: 'Thuốc giảm đau NSAID tự ý & Thuốc khớp trôi nổi',
        mechanism: 'Ibuprofen, Aspirin, Diclofenac, Meloxicam xóa sổ Prostaglandin E2 làm bục hàng rào nhầy.',
      },
      {
        name: 'Rượu bia, đồ uống có cồn & Nước ngọt có gas',
        mechanism: 'Ethanol hòa tan trực tiếp lớp nhầy Mucin, gây xung huyết phù nề và xuất huyết niêm mạc cấp.',
      },
      {
        name: 'Ớt cay, tiêu đen liều cao, dưa cà muối chua & đồ chiên rán',
        mechanism: 'Capsaicin kích hoạt thụ thể đau TRPV1; đồ muối chua giàu Nitrosamine và acid làm sâu thêm ổ loét.',
      },
    ],
  },
];

/* ==========================================
   3 CÂU HỎI KIỂM TRA KIẾN THỨC NHANH (MODAL SLIDE 9 PREVIEW)
   ========================================== */
const MINI_QUIZ_QUESTIONS = [
  {
    q: 'Câu 1: Vì sao người bệnh đau dạ dày tuyệt đối KHÔNG nên tự ý uống thuốc giảm đau nhóm NSAID (Ibuprofen, Aspirin, Meloxicam)?',
    options: [
      'A. Vì thuốc làm tăng nhiệt độ trong lòng dạ dày',
      'B. Vì NSAID ức chế COX-1 làm mất Prostaglandin E2 — khiến lớp nhầy Mucin và HCO₃⁻ biến mất, acid ăn mòn trực tiếp niêm mạc',
      'C. Vì NSAID làm vi khuẩn H. pylori nhân đôi nhanh gấp 10 lần',
    ],
    correct: 1,
    explain:
      'Chính xác! NSAID ức chế enzyme COX-1 làm ngừng tổng hợp Prostaglandin E2, xóa bỏ lớp nhầy bảo vệ và giảm tưới máu niêm mạc, dẫn tới loét và xuất huyết tiêu hóa.',
  },
  {
    q: 'Câu 2: Khoảng thời gian tối thiểu từ sau khi ăn tối đến khi nằm ngủ để ngăn ngừa trào ngược và bảo vệ dạ dày là bao lâu?',
    options: [
      'A. Nằm nghỉ ngay sau ăn 15 phút để máu dồn về dạ dày',
      'B. Ít nhất 2 – 3 giờ sau ăn mới được nằm, kết hợp ngủ trước 23:00',
      'C. Chỉ cần chờ 30 phút sau khi ăn no',
    ],
    correct: 1,
    explain:
      'Chính xác! Dạ dày cần 2–3 giờ để làm rỗng >80% thức ăn xuống tá tràng. Nằm sớm khi dạ dày còn đầy sẽ làm bung cơ vòng thực quản dưới gây trào ngược acid.',
  },
  {
    q: 'Câu 3: Biện pháp nào sau đây giúp cắt đứt đường lây truyền vi khuẩn H. pylori hiệu quả nhất trong gia đình?',
    options: [
      'A. Ăn chín uống sôi, rửa tay xà phòng, dùng đũa gắp riêng/bát chấm riêng và không mớm cơm cho trẻ',
      'B. Uống nước chanh đậm đặc mỗi sáng lúc bụng đói để diệt khuẩn',
      'C. Tự mua kháng sinh uống 2 ngày mỗi khi thấy đầy bụng',
    ],
    correct: 0,
    explain:
      'Chính xác! H. pylori lây chủ yếu qua đường Miệng – Miệng và Phân – Miệng. Dùng đũa gắp riêng, không mớm thức ăn, ăn chín uống sôi và rửa tay xà phòng là chìa khóa phòng bệnh.',
  },
];

/* ==========================================
   COMPONENT CHÍNH: SLIDE 8 PREVENTION MASTER
   ========================================== */
export function Slide8Prevention({ onSelectSlide }) {
  const [activePillar, setActivePillar] = useState(0);
  const [rightMode, setRightMode] = useState('timeline'); // 'timeline' | 'traffic'
  const [activeShields, setActiveShields] = useState([1, 2, 3, 4]); // Mặc định bật 4/5 mốc
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});

  const pillar = PREVENTION_PILLARS[activePillar];
  const allShieldsActive = activeShields.length === DAILY_SHIELD_STATIONS.length;
  const protectionScore = Math.round((activeShields.length / DAILY_SHIELD_STATIONS.length) * 100);

  const toggleShield = useCallback((id) => {
    sfx.tick();
    setActiveShields((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const activateAllShields = useCallback(() => {
    sfx.whoosh();
    setActiveShields(DAILY_SHIELD_STATIONS.map((s) => s.id));
  }, []);

  const resetShieldsDemo = useCallback(() => {
    sfx.tick();
    setActiveShields([1]);
  }, []);

  const handleNextSlideClick = () => {
    sfx.whoosh();
    if (typeof onSelectSlide === 'function') {
      onSelectSlide(9);
    }
    setShowQuizModal(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-4 md:px-7 py-2.5 gap-2 select-none bg-gradient-to-br from-[#ECFDF5] via-[#F8FAFC] to-[#EFF6FF] rounded-3xl overflow-hidden border border-white/90 shadow-sm">
      {/* 1. HEADER BAR: Tiêu đề chuẩn Y khoa & Huy hiệu sinh lý */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 flex-shrink-0">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-extrabold text-[#059669] tracking-widest uppercase flex items-center gap-1.5">
              <span>🟢 SLIDE 08 • BỆNH LÝ 1: VIÊM LOÉT DẠ DÀY – TÁ TRÀNG (④ DỰ PHÒNG &amp; BẢO VỆ NIÊM MẠC)</span>
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-xl md:text-3xl text-[#12343B] leading-tight mt-0.5">
            4 Trụ Cột Bảo Vệ Dạ Dày &amp; Phác Đồ Sinh Hoạt 24 Giờ
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold flex-shrink-0">
          <span className="px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-2xs">
            Giảm &gt;70% tái phát ổ loét
          </span>
          <span className="px-3 py-1 rounded-full bg-sky-100/90 text-sky-800 border border-sky-300 shadow-2xs">
            Bảo toàn hàng rào Mucin – HCO₃⁻
          </span>
          <span className="hidden xl:inline text-[11.5px] text-[#5B7B80] font-semibold italic">
            “Phòng bệnh hơn chữa bệnh — Thay đổi từ thói quen nhỏ nhất”
          </span>
        </div>
      </div>

      {/* 2. MAIN STAGE: BỐ CỤC 12 CỘT ĐỐI XỨNG CHUYÊN SÂU */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        {/* NỬA TRÁI (6 Cột): 4 TRỤ CỘT BẢO VỆ DẠ DÀY & CƠ CHẾ SINH LÝ BỆNH */}
        <div className="col-span-12 lg:col-span-6 p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Thanh chọn 4 Trụ Cột có Vector Art đa lớp */}
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex-shrink-0">
            {PREVENTION_PILLARS.map((pil, idx) => {
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pil.id}
                  type="button"
                  onClick={() => {
                    sfx.tick();
                    setActivePillar(idx);
                  }}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-md scale-[1.02] font-extrabold'
                      : 'hover:bg-white/60 text-slate-600'
                  }`}
                  style={{
                    borderBottom: isSelected ? `3px solid ${pil.color}` : '3px solid transparent',
                  }}
                >
                  <div className="transform scale-75 -my-1.5">
                    <PillarVector type={pil.id} size={38} />
                  </div>
                  <span
                    className={`text-[11px] mt-0.5 tracking-tight truncate max-w-full ${
                      isSelected ? 'text-[#12343B]' : 'text-slate-600'
                    }`}
                  >
                    {pil.shortName}
                  </span>
                  <span className="text-[9.5px] font-mono font-bold" style={{ color: pil.color }}>
                    {pil.stat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Nội dung chi tiết Trụ Cột đang chọn */}
          <div className="flex-1 flex flex-col justify-between my-2 overflow-y-auto pr-0.5 space-y-2">
            {/* Header Trụ Cột */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs flex-shrink-0">
                  <PillarVector type={pillar.id} size={46} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${pillar.color}18`,
                        color: pillar.color,
                      }}
                    >
                      {pillar.badge}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Trụ cột #{activePillar + 1}/4
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-sm md:text-base text-[#12343B] leading-snug mt-0.5 truncate">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 truncate">
                    {pillar.sub}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span
                  className="font-heading font-black text-xl md:text-2xl leading-none"
                  style={{ color: pillar.color }}
                >
                  {pillar.stat}
                </span>
                <div className="text-[9.5px] font-bold text-slate-500 max-w-[110px]">
                  {pillar.statLabel}
                </div>
              </div>
            </div>

            {/* Hộp Giải thích Cơ chế Sinh lý bệnh học */}
            <div className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed">
              <span className="font-extrabold text-[#12343B] uppercase tracking-wider text-[10px] mr-1.5">
                🔬 Cơ chế bảo vệ niêm mạc:
              </span>
              {pillar.mechanism}
            </div>

            {/* 3 Nguyên tắc thực hành lâm sàng của Trụ cột */}
            <div className="space-y-1.5">
              {pillar.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-2xl bg-slate-50/85 hover:bg-white border border-slate-200/70 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                      <CheckCircle2 size={13} style={{ color: pillar.color }} className="flex-shrink-0" />
                      <span>{tip.head}</span>
                    </span>
                    <span
                      className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-white border flex-shrink-0"
                      style={{
                        color: pillar.color,
                        borderColor: `${pillar.color}40`,
                      }}
                    >
                      {tip.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed pl-5">
                    {tip.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Cảnh báo Lâm sàng của Trụ cột */}
            <div
              className="p-2.5 rounded-2xl border text-[11px] font-bold flex items-start gap-2 flex-shrink-0"
              style={{
                backgroundColor: `${pillar.color}12`,
                borderColor: `${pillar.color}38`,
                color: pillar.color,
              }}
            >
              <ShieldAlert size={15} className="shrink-0 mt-0.5" />
              <span className="leading-snug">{pillar.clinicalAlert}</span>
            </div>
          </div>
        </div>

        {/* NỬA PHẢI (6 Cột): LỊCH TRÌNH KHIÊN CHẮN 24H & ĐÈN GIAO THÔNG THỰC PHẨM */}
        <div className="col-span-12 lg:col-span-6 p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Header nửa phải + Nút chuyển 2 chế độ: Chu trình 24h vs Đèn giao thông thực phẩm */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  sfx.tick();
                  setRightMode('timeline');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  rightMode === 'timeline'
                    ? 'bg-white text-[#12343B] shadow-xs'
                    : 'text-slate-600 hover:text-[#12343B]'
                }`}
              >
                <Clock size={12} className="text-emerald-600" />
                <span>5 Lá Chắn Sinh Hoạt 24h</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sfx.tick();
                  setRightMode('traffic');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  rightMode === 'traffic'
                    ? 'bg-white text-[#12343B] shadow-xs'
                    : 'text-slate-600 hover:text-[#12343B]'
                }`}
              >
                <Utensils size={12} className="text-amber-600" />
                <span>Đèn Giao Thông Thực Phẩm &amp; Thuốc</span>
              </button>
            </div>

            {/* Chỉ số bảo vệ niêm mạc */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600">
                Chỉ số bảo vệ:{' '}
                <strong className={protectionScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                  {protectionScore}% ({activeShields.length}/5)
                </strong>
              </span>
              {allShieldsActive ? (
                <button
                  type="button"
                  onClick={resetShieldsDemo}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer"
                >
                  ✓ Tối ưu • Thử phá vỡ
                </button>
              ) : (
                <button
                  type="button"
                  onClick={activateAllShields}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 hover:bg-sky-200 transition-colors cursor-pointer"
                >
                  + Bật đủ 5 lá chắn
                </button>
              )}
            </div>
          </div>

          {/* Mô phỏng trực quan lớp nhầy Mucin - HCO3- theo số lá chắn */}
          <div className="my-1.5 flex-shrink-0">
            <MucosalBarrierSVG shieldCount={activeShields.length} activePillarColor={pillar.color} />
          </div>

          {/* Nội dung chế độ bên phải */}
          {rightMode === 'timeline' ? (
            <div className="flex-1 flex flex-col justify-around space-y-1.5 overflow-y-auto pr-0.5 min-h-0">
              {DAILY_SHIELD_STATIONS.map((st) => {
                const isProtected = activeShields.includes(st.id);
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleShield(st.id)}
                    className={`p-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                      isProtected
                        ? 'bg-emerald-50/75 border-emerald-300 shadow-2xs'
                        : 'bg-rose-50/50 hover:bg-white border-rose-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-2xs flex-shrink-0 transition-colors ${
                          isProtected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-slate-700 border border-rose-200'
                        }`}
                      >
                        {st.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[9.5px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700">
                            {st.time}
                          </span>
                          <span className="font-heading font-extrabold text-xs text-[#12343B] truncate">
                            {st.name}
                          </span>
                        </div>

                        <div className="text-[10.5px] font-medium mt-0.5 truncate">
                          {isProtected ? (
                            <span className="text-emerald-800 font-semibold flex items-center gap-1">
                              <CheckCircle2 size={11} className="text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{st.barrier}</span>
                            </span>
                          ) : (
                            <span className="text-rose-700 font-semibold flex items-center gap-1">
                              <AlertTriangle size={11} className="text-rose-600 flex-shrink-0" />
                              <span className="truncate">Nguy cơ: {st.riskIfOpen}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                          isProtected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isProtected ? (
                          <>
                            <ShieldCheck size={11} />
                            <span>Đã bật</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={11} />
                            <span>Đang hở</span>
                          </>
                        )}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">{st.impact}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Chế độ 2: Bảng Đèn Giao Thông Thực Phẩm & Thuốc */
            <div className="flex-1 flex flex-col justify-between space-y-2 overflow-y-auto pr-0.5 min-h-0">
              {GASTRIC_TRAFFIC_LIGHT.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className={`p-2.5 rounded-2xl border ${group.cardClass} space-y-1.5`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${group.badgeClass}`}
                    >
                      {group.zone}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {group.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-2 rounded-xl bg-white/90 border border-white shadow-2xs"
                      >
                        <div className="font-heading font-extrabold text-[11px] text-[#12343B] flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: group.dotColor }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                          {item.mechanism}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Thanh ghi chú cuối nửa phải */}
          <div className="mt-1.5 p-2 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200/80 flex items-center justify-between text-[10.5px] text-[#047857] font-bold flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>
                Nhấp vào từng mốc giờ hoặc chuyển sang <strong>Đèn Giao Thông Thực Phẩm</strong> để tra cứu nhanh!
              </span>
            </span>
            <span className="text-[9.5px] font-mono text-slate-500">ACG / WGO Guidelines</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SUMMARY BAR & NÚT CHUYỂN SLIDE 9 (KIỂM TRA KIẾN THỨC) */}
      <div className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-[#EAF6FD] to-[#FFF3DC] border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs flex-shrink-0">
        <div className="flex items-center gap-2 text-[#12343B] font-semibold">
          <span className="text-base flex-shrink-0">🌿</span>
          <span className="leading-snug">
            <strong>Nguyên tắc vàng bảo vệ dạ dày:</strong> “Ăn đúng giờ, nhai kỹ • Không nằm ngay sau ăn ít nhất 2–3 giờ • Tuyệt đối không tự ý lạm dụng thuốc giảm đau NSAID &amp; Corticoid!”
          </span>
        </div>

        <button
          type="button"
          onClick={handleNextSlideClick}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#0284C7] text-white text-xs font-extrabold shadow-sm hover:opacity-95 transition-all shrink-0 cursor-pointer"
        >
          <span>Kiểm tra kiến thức: 3 Câu hỏi (Slide 9)</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* MODAL MINI-QUIZ 3 CÂU HỎI KHI XEM ĐỘC LẬP TRÊN CANVAS */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 border border-slate-200 shadow-2xl space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                  SLIDE 09 PREVIEW • LƯỢNG GIÁ NHANH
                </span>
                <h3 className="font-heading font-extrabold text-lg text-[#12343B]">
                  Kiểm Tra Kiến Thức: 3 Câu Hỏi Cốt Lõi Bảo Vệ Dạ Dày
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuizModal(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Đóng ✕
              </button>
            </div>

            <div className="space-y-3">
              {MINI_QUIZ_QUESTIONS.map((item, qIdx) => {
                const selected = quizAnswers[qIdx];
                return (
                  <div key={qIdx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <p className="font-heading font-extrabold text-xs text-[#12343B]">{item.q}</p>
                    <div className="space-y-1.5">
                      {item.options.map((opt, oIdx) => {
                        const isPicked = selected === oIdx;
                        const isRight = item.correct === oIdx;
                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                        if (selected !== undefined) {
                          if (isRight) {
                            btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                          } else if (isPicked) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                          }
                        }
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => {
                              sfx.tick();
                              setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {selected !== undefined && (
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                        💡 {item.explain}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slide7Prevention;