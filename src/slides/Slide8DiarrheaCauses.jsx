import React, { useState, useCallback } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Microscope,
  Table2,
  RotateCcw,
  Droplets,
  Activity,
} from 'lucide-react';

/* ==========================================
   HỆ THỐNG ÂM THANH TƯƠNG TÁC (WEB AUDIO API)
   Tự động hoạt động mượt mà trên Canvas & App
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
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Bỏ qua nếu trình duyệt chặn autoplay
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
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.14);
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
   SVG MINH HỌA VECTOR ĐA LỚP Y HỌC CAO CẤP
   ========================================== */
function PathogenVector({ type, size = 64 }) {
  if (type === 'virus') {
    // Rotavirus: Cấu trúc bánh xe 3 lớp vỏ Capsid (VP2, VP6, VP7) & Gai VP4
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <radialGradient id="rotaGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="60%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
          <filter id="rotaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 12 Gai Protein VP4/VP7 nhô ra ngoài bám thụ thể Enterocyte */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <line x1="50" y1="18" x2="50" y2="7" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="6" r="3.5" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1" />
            </g>
          );
        })}

        {/* Thân bánh xe ngoài (Outer Capsid VP7) */}
        <circle cx="50" cy="50" r="32" fill="url(#rotaGrad)" filter="url(#rotaGlow)" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#E0F2FE" strokeWidth="2.5" strokeDasharray="5 3" />

        {/* Lớp vỏ trung gian (Intermediate Capsid VP6) */}
        <circle cx="50" cy="50" r="21" fill="#0284C7" stroke="#7DD3FC" strokeWidth="2" />

        {/* 11 Phân đoạn dsRNA lõi & Độc tố ruột NSP4 */}
        <g transform="translate(50, 50) rotate(25) translate(-50, -50)">
          <path d="M 42 42 Q 50 36 58 42 Q 50 52 42 42 Z" fill="#F0FDFA" opacity="0.9" />
          <path d="M 44 58 Q 50 64 56 58 Q 50 48 44 58 Z" fill="#F0FDFA" opacity="0.9" />
          <circle cx="50" cy="50" r="4.5" fill="#38BDF8" />
        </g>
      </svg>
    );
  }

  if (type === 'bacteria') {
    // Trực khuẩn Gram âm (E. coli / Salmonella / Shigella): Thân que, Pili bám dính & Flagella
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="bactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>

        {/* Lông nhung bám dính (Fimbriae / Pili) li ti quanh thân */}
        {[...Array(10)].map((_, i) => {
          const angle = (i * 360) / 10;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 26 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FB923C"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.75"
            />
          );
        })}

        {/* 3 Roi đuôi dài (Flagella) uốn lượn vận động */}
        <path
          d="M 24 50 C 14 38, 4 60, -6 46 S -18 64, -28 50"
          fill="none"
          stroke="#EA580C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 26 44 C 16 28, 6 48, -4 34 S -14 52, -24 38"
          fill="none"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 26 56 C 16 68, 8 52, -2 66 S -12 50, -22 62"
          fill="none"
          stroke="#C2410C"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Thân trực khuẩn hình viên nhộng (Màng ngoài LPS) */}
        <rect
          x="28"
          y="35"
          width="44"
          height="30"
          rx="15"
          fill="url(#bactGrad)"
          stroke="#FED7AA"
          strokeWidth="2.5"
        />

        {/* Vệt sáng bóng & Nhiễm sắc thể ADN + Plasmid độc tố */}
        <path
          d="M 36 41 Q 50 37 64 41"
          stroke="#FFEDD5"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 38 52 Q 43 47 48 52 T 58 52 T 62 50"
          fill="none"
          stroke="#FFEDD5"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    );
  }

  // Ký sinh trùng Giardia lamblia (Thể hoạt động Trophozoite có đĩa hút bụng & 2 nhân)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      <defs>
        <radialGradient id="giardiaGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="60%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </radialGradient>
      </defs>

      {/* 4 Đôi roi bơi đối xứng */}
      <path d="M 50 82 C 44 94, 38 102, 28 108" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 82 C 56 94, 62 102, 72 108" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 34 50 C 18 56, 10 44, 2 54" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M 66 50 C 82 56, 90 44, 98 54" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />

      {/* Thân hình giọt nước / quả lê đặc trưng */}
      <path
        d="M 50 14 C 74 14, 76 44, 64 68 C 58 80, 52 86, 50 88 C 48 86, 42 80, 36 68 C 24 44, 26 14, 50 14 Z"
        fill="url(#giardiaGrad)"
        stroke="#CCFBF1"
        strokeWidth="2.5"
      />

      {/* 2 Nhân tế bào đối xứng giống 2 mắt */}
      <ellipse cx="42" cy="38" rx="6.5" ry="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1.5" />
      <circle cx="43" cy="37" r="3" fill="#CCFBF1" />
      <ellipse cx="58" cy="38" rx="6.5" ry="8" fill="#134E4A" stroke="#99F6E4" strokeWidth="1.5" />
      <circle cx="57" cy="37" r="3" fill="#CCFBF1" />

      {/* Sợi trục axoneme dọc sống lưng */}
      <line x1="50" y1="28" x2="50" y2="84" stroke="#5EEAD4" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

/* ==========================================
   SVG MÔ PHỎNG TỔN THƯƠNG NHUNG MAO RUỘT THEO TÁC NHÂN
   ========================================== */
function IntestinalVilliSVG({ activeTab }) {
  const config = {
    virus: {
      title: 'SINH BỆNH HỌC VIRUS: Cụt nhung mao đỉnh + Độc tố NSP4 (Tiêu chảy Thẩm thấu & Xuất tiết)',
      accent: '#38BDF8',
      sub: 'Mất men Lactase bờ bàn chải → Đường Lactose ứ đọng kéo nước ồ ạt vào lòng ruột (Phân tóe nước, chua)',
    },
    bacteria: {
      title: 'SINH BỆNH HỌC VI KHUẨN: Độc tố ruột (cAMP/cGMP) & Xâm lấn loét đại tràng (Shiga Toxin)',
      accent: '#FB923C',
      sub: 'Bơm Cl⁻ và H₂O ồ ạt ra lòng ruột (ETEC/Tả) hoặc phá hủy niêm mạc gây xuất huyết, mủ máu (Shigella/EHEC)',
    },
    parasite: {
      title: 'SINH BỆNH HỌC KÝ SINH TRÙNG: Đĩa hút Giardia phủ kín vi nhung mao & Loét hình bình thắt (Amip)',
      accent: '#2DD4BF',
      sub: 'Cản trở cơ học hấp thu lipid/vitamin tan trong dầu hoặc loạn khuẩn Clostridioides sau lạm dụng kháng sinh',
    },
  }[activeTab];

  return (
    <svg
      viewBox="0 0 440 86"
      className="w-full h-20 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-inner overflow-hidden flex-shrink-0"
    >
      {/* Tiêu đề cơ chế trên nền tối */}
      <text x="10" y="15" fill={config.accent} fontSize="8.8" fontWeight="800">
        🔬 {config.title}
      </text>
      <text x="10" y="27" fill="#CBD5E1" fontSize="8" fontWeight="600">
        {config.sub}
      </text>

      {/* Minh họa 3 nhung mao khỏe mạnh bên trái (Bình thường) */}
      <text x="12" y="42" fill="#86EFAC" fontSize="7.5" fontWeight="800">
        NHUNG MAO BÌNH THƯỜNG (Kênh SGLT-1 bảo tồn)
      </text>
      {[24, 62, 100, 138].map((x, idx) => (
        <g key={idx}>
          <path
            d={`M ${x - 12} 80 C ${x - 12} 46, ${x + 12} 46, ${x + 12} 80 Z`}
            fill="#10B981"
            fillOpacity="0.35"
            stroke="#34D399"
            strokeWidth="1.5"
          />
          <line x1={x} y1="45" x2={x} y2="62" stroke="#A7F3D0" strokeWidth="1.2" />
        </g>
      ))}

      {/* Mũi tên chuyển sang vùng tổn thương bên phải */}
      <path d="M 178 62 L 204 62" stroke={config.accent} strokeWidth="2" strokeLinecap="round" />
      <polygon points="204,58 212,62 204,66" fill={config.accent} />

      {/* Minh họa vùng nhung mao bị tấn công bên phải */}
      <text x="222" y="42" fill="#FCA5A5" fontSize="7.5" fontWeight="800">
        VÙNG TỔN THƯƠNG ({activeTab === 'virus' ? 'Cùn nhung mao + Mất nước' : activeTab === 'bacteria' ? 'Loét xâm lấn + Bạch cầu/Hồng cầu' : 'Phủ kín bề mặt + Kém hấp thu'})
      </text>
      {[245, 290, 335, 380].map((x, idx) => {
        const heightTop = activeTab === 'virus' ? 62 : activeTab === 'bacteria' ? 65 : 54;
        return (
          <g key={idx}>
            <path
              d={`M ${x - 14} 80 C ${x - 14} ${heightTop}, ${x + 14} ${heightTop}, ${x + 14} 80 Z`}
              fill={activeTab === 'bacteria' ? '#EF4444' : '#F59E0B'}
              fillOpacity="0.35"
              stroke={activeTab === 'bacteria' ? '#F87171' : '#FBBF24'}
              strokeWidth="1.5"
              strokeDasharray={activeTab === 'bacteria' ? '3 2' : 'none'}
            />
            {/* Luồng nước H2O + Điện giải Na+/Cl-/K+ thoát ồ ạt ra lòng ruột */}
            <circle cx={x} cy={heightTop - 7} r="4" fill={config.accent} />
            <text x={x - 5} y={heightTop - 5} fill="#0F172A" fontSize="5.5" fontWeight="900">
              H₂O
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ==========================================
   CẤU HÌNH DỮ LIỆU 3 TÁC NHÂN VI SINH HỌC
   ========================================== */
const PATHOGENS = {
  virus: {
    id: 'virus',
    name: 'Virus đường ruột',
    sub: 'Tác nhân #1 gây mất nước cấp nhập viện',
    stat: '>70%',
    statLabel: 'ca tiêu chảy cấp ở trẻ <5 tuổi',
    color: '#0284C7',
    badge: 'Chiếm đa số tuyệt đối',
    stoolFeature: 'Phân toàn nước trong/đục, mùi chua, bọt, KHÔNG nhầy máu',
    targets: [
      {
        name: 'Rotavirus (Nguy hiểm nhất)',
        detail:
          'Phá hủy nhung mao ruột non & tiết độc tố NSP4, gây sốt, nôn ói dữ dội và tiêu chảy tóe nước 10–20 lần/ngày.',
        highlight: 'Uống đủ 2 liều vaccine trước 6 tháng tuổi',
      },
      {
        name: 'Norovirus (Bùng dịch cộng đồng)',
        detail:
          'Khả năng lây nhiễm cực mạnh (chỉ cần 18 hạt virus), gây dịch lớn ở trường học, bếp ăn tập thể, bệnh viện.',
        highlight: 'Bền vững với cồn rửa tay thông thường',
      },
      {
        name: 'Adenovirus (Typ 40/41) & Astrovirus',
        detail:
          'Gây tiêu chảy kéo dài 7–10 ngày kèm sốt nhẹ, viêm đường hô hấp trên và viêm kết mạc ở trẻ nhỏ.',
        highlight: 'Chỉ điều trị hỗ trợ bù nước, không kháng sinh',
      },
    ],
    rxWarning:
      'CẢNH BÁO TỐI QUAN TRỌNG: Kháng sinh HOÀN TOÀN KHÔNG DIỆT ĐƯỢC VIRUS! Tự ý uống kháng sinh làm chết sạch lợi khuẩn, khiến tiêu chảy trầm trọng hơn.',
  },
  bacteria: {
    id: 'bacteria',
    name: 'Vi khuẩn xâm lấn & Sinh độc tố',
    sub: 'Nhiễm trùng từ thực phẩm ôi thiu & ngộ độc',
    stat: '15–20%',
    statLabel: 'ca tiêu chảy nhiễm khuẩn',
    color: '#EA580C',
    badge: 'Độc tố ruột & Phân máu',
    stoolFeature: 'Phân tanh hôi, nhầy mủ hoặc máu tươi (Hội chứng lỵ), mót rặn',
    targets: [
      {
        name: 'E. coli (ETEC / EHEC) & Vibrio cholerae',
        detail:
          'ETEC tiết độc tố ruột gây tiêu chảy du lịch tóe nước; EHEC tiết Shiga toxin gây xuất huyết đại tràng và suy thận HUS.',
        highlight: 'Thường từ nước uống và rau sống nhiễm bẩn',
      },
      {
        name: 'Salmonella non-typhi & Campylobacter',
        detail:
          'Xâm lấn biểu mô hồi – đại tràng, gây sốt cao rét run, đau quặn bụng từng cơn quanh rốn và phân tanh nhầy.',
        highlight: 'Nhiễm từ thịt gia cầm, trứng, sữa chưa tiệt trùng',
      },
      {
        name: 'Shigella (Lỵ trực trùng)',
        detail:
          'Độc tố Shiga độc lực cao làm loét sâu niêm mạc đại tràng, gây sốt cao, đau quặn mót rặn và phân có nhầy máu.',
        highlight: 'BẮT BUỘC khám bác sĩ để dùng kháng sinh đúng',
      },
    ],
    rxWarning:
      'Chỉ dùng kháng sinh (Ciprofloxacin, Azithromycin hoặc Ceftriaxone) khi có xét nghiệm phân hoặc bác sĩ chẩn đoán hội chứng lỵ (sốt, phân máu), tả hoặc nhiễm khuẩn xâm lấn.',
  },
  parasite: {
    id: 'parasite',
    name: 'Ký sinh trùng & Loạn khuẩn ruột',
    sub: 'Nguồn nước ô nhiễm & Tác dụng phụ thuốc',
    stat: '5–10%',
    statLabel: 'ca tiêu chảy mạn / đặc thù',
    color: '#0D9488',
    badge: 'Bào nang & Suy kiệt vi sinh',
    stoolFeature: 'Phân sống lổn nhổn váng mỡ (Giardia) hoặc nhầy máu bầm (Amip)',
    targets: [
      {
        name: 'Giardia lamblia (Trùng roi thìa)',
        detail:
          'Bào nang bám chặt che phủ vi nhung mao tá tràng, cản trở hấp thu chất béo gây phân sống nhiều mỡ, sụt cân.',
        highlight: 'Lây qua nước ao hồ, nước suối chưa đun sôi',
      },
      {
        name: 'Entamoeba histolytica (Lỵ amip)',
        detail:
          'Amip ăn mòn niêm mạc đại tràng tạo các ổ loét hình bình cổ hẹp, gây đau quặn dọc khung đại tràng và phân nhầy máu.',
        highlight: 'Điều trị bằng phác đồ diệt amip chuyên khoa',
      },
      {
        name: 'Loạn khuẩn do kháng sinh (C. difficile)',
        detail:
          'Kháng sinh phổ rộng tiêu diệt hệ vi sinh vật có lợi, tạo điều kiện cho vi khuẩn Clostridioides bùng phát gây viêm đại tràng giả mạc.',
        highlight: 'Bổ sung men vi sinh và ngưng kháng sinh sai',
      },
    ],
    rxWarning:
      'Đun sôi nước uống (≥100°C) và nấu chín kỹ thức ăn là biện pháp duy nhất tiêu diệt triệt để các bào nang ký sinh trùng đề kháng clo.',
  },
};

/* ==========================================
   BẢNG PHÂN BIỆT LÂM SÀNG 3 NHÓM TÁC NHÂN
   ========================================== */
const CLINICAL_COMPARISON_ROWS = [
  {
    criterion: '1. Triệu chứng khởi phát',
    virus: 'Nôn ói dữ dội xuất hiện trước 6–12h, sau đó tiêu chảy tóe nước, sốt nhẹ/vừa',
    bacteria: 'Sốt cao 39–40°C, rét run, đau quặn bụng dữ dội, mót rặn (Hội chứng lỵ)',
    parasite: 'Đau âm ỉ vùng thượng vị/đại tràng, ít sốt, tiêu chảy kéo dài >14 ngày',
  },
  {
    criterion: '2. Tính chất phân',
    virus: 'Toàn nước đục/vàng nhạt, nhiều bọt, mùi chua, KHÔNG nhầy máu',
    bacteria: 'Phân ít nhưng nhầy mủ + máu tươi hoặc phân đục như nước vo gạo (Tả)',
    parasite: 'Phân sống nổi váng mỡ (Giardia) hoặc nhầy máu như máu cá (Amip)',
  },
  {
    criterion: '3. Soi phân (Bạch cầu / Hồng cầu)',
    virus: 'Âm tính (Không có Hồng cầu, không có Bạch cầu đa nhân)',
    bacteria: 'Dương tính mạnh (Dày đặc Bạch cầu đa nhân trung tính & Hồng cầu)',
    parasite: 'Thấy Kén/Thể hoạt động Giardia hoặc Amip ăn hồng cầu',
  },
  {
    criterion: '4. Phác đồ điều trị chuẩn',
    virus: 'Oresol 245 mOsm/L + Kẽm (10–20mg x 10–14 ngày) • CẤM KHÁNG SINH',
    bacteria: 'Oresol + Kẽm + Kháng sinh đặc hiệu theo chỉ định (Azithromycin/Cipro)',
    parasite: 'Oresol + Thuốc diệt ký sinh trùng (Metronidazole / Tinidazole)',
  },
];

/* ==========================================
   5 TRẠM CHU TRÌNH PHÂN – MIỆNG & ĐIỂM CHẶN
   ========================================== */
const TRANSMISSION_STATIONS = [
  {
    id: 1,
    title: 'Trạm 1: Nguồn thải mầm bệnh',
    name: 'Phân người / Động vật mang trùng',
    icon: '🚽',
    accent: '#64748B',
    barrier: 'Quản lý nhà tiêu tự hoại hợp vệ sinh, xử lý tã bỉm trẻ bệnh an toàn',
    actionLabel: 'Xây dựng nhà vệ sinh chuẩn',
    efficacy: '-36% nguồn mầm bệnh',
  },
  {
    id: 2,
    title: 'Trạm 2: Véc-tơ trung gian',
    name: 'Bàn tay bẩn & Ruồi nhặng',
    icon: '🪰',
    accent: '#EA580C',
    barrier: 'Rửa tay thường quy 6 bước với xà phòng ≥ 30 giây; đậy kín lồng bàn',
    actionLabel: 'Rửa tay xà phòng 6 bước',
    efficacy: '-48% nguy cơ mắc (WHO)',
  },
  {
    id: 3,
    title: 'Trạm 3: Môi trường tiếp nhận',
    name: 'Nguồn nước & Thực phẩm ô nhiễm',
    icon: '🍲',
    accent: '#0284C7',
    barrier: 'Thực hiện nghiêm ngặt "Ăn chín, uống sôi", dùng nước sạch kiểm định',
    actionLabel: 'Ăn chín · Uống sôi',
    efficacy: 'Diệt 99.9% mầm bệnh',
  },
  {
    id: 4,
    title: 'Trạm 4: Cửa ngõ xâm nhập',
    name: 'Khoang miệng & Thói quen ăn uống',
    icon: '👄',
    accent: '#DB2777',
    barrier: 'Không mút tay, khử khuẩn đồ chơi trẻ nhỏ, giữ bình sữa & bát đũa khô sạch',
    actionLabel: 'Vệ sinh dụng cụ ăn uống',
    efficacy: '-45% tái nhiễm ở trẻ',
  },
  {
    id: 5,
    title: 'Trạm 5: Cơ quan tổn thương',
    name: 'Đường ruột (Nhung mao viêm cấp)',
    icon: '🫁',
    accent: '#0D9488',
    barrier: 'Uống đủ 2 liều vaccine Rotavirus trước 6 tháng tuổi, nuôi con bằng sữa mẹ',
    actionLabel: 'Vaccine Rota & Sữa mẹ',
    efficacy: '>85% ngừa nhập viện nặng',
  },
];

/* ==========================================
   SLIDE 8: THIẾT KẾ MASTER HOÀN THIỆN NÂNG CẤP
   ========================================== */
export function Slide8DiarrheaCauses({ onSelectView, onSelectSlide }) {
  const [activeTab, setActiveTab] = useState('virus');
  const [leftView, setLeftView] = useState('detail'); // 'detail' | 'matrix'
  const [blockedStations, setBlockedStations] = useState([2, 3]); // Mặc định chặn tay & ăn chín

  const pathogen = PATHOGENS[activeTab];

  const toggleStationBlock = useCallback((id) => {
    sfx.tick();
    setBlockedStations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const blockAllStations = useCallback(() => {
    sfx.whoosh();
    setBlockedStations(TRANSMISSION_STATIONS.map((s) => s.id));
  }, []);

  const unblockAllStations = useCallback(() => {
    sfx.tick();
    setBlockedStations([]);
  }, []);

  const allBlocked = blockedStations.length === TRANSMISSION_STATIONS.length;
  const riskPercent = Math.round(
    ((TRANSMISSION_STATIONS.length - blockedStations.length) / TRANSMISSION_STATIONS.length) * 100
  );

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-7 py-2.5 gap-2 select-none bg-gradient-to-br from-[#F0F9FF] via-[#F8FAFC] to-[#ECFEFF] rounded-3xl overflow-hidden border border-white/90 shadow-sm">
      {/* 1. Header Bar: Tiêu đề & Nhãn dịch tễ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-1.5 flex-shrink-0">
        <div>
          <span className="text-[11px] font-extrabold text-[#0284C7] tracking-widest uppercase flex items-center gap-1.5">
            <span>🔵 SLIDE 08 • BỆNH LÝ 2: TIÊU CHẢY CẤP (① CĂN NGUYÊN BỆNH HỌC &amp; ĐƯỜNG LÂY)</span>
          </span>
          <h2 className="font-heading font-extrabold text-xl md:text-3xl text-[#12343B] leading-tight mt-0.5">
            Khi Ruột &quot;Xả Nước&quot;: 3 Nhóm Tác Nhân &amp; Chu Trình Phân – Miệng
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold flex-shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#0284C7]/15 text-[#0284C7] border border-[#0284C7]/30 shadow-2xs">
            ≥ 3 lần phân lỏng / 24h
          </span>
          <span className="text-[#5B7B80]">•</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
            Cấp tính: &lt; 14 ngày
          </span>
          <span className="hidden xl:inline px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs">
            Bù Oresol 245 mOsm/L + Kẽm
          </span>
        </div>
      </div>

      {/* 2. Main Stage (Grid 12 Cột Đối Xứng Hoàn Mỹ) */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0">
        {/* NỬA TRÁI (6 Cột): PHÒNG THÍ NGHIỆM 3 NHÓM TÁC NHÂN VI SINH & BẢNG PHÂN BIỆT */}
        <div className="col-span-12 lg:col-span-6 p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Thanh điều khiển: 3 Tab Tác Nhân + Nút Bảng So Sánh Lâm Sàng */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 flex-1">
              {Object.keys(PATHOGENS).map((key) => {
                const p = PATHOGENS[key];
                const isSelected = activeTab === key && leftView === 'detail';
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      sfx.tick();
                      setActiveTab(key);
                      setLeftView('detail');
                    }}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-md scale-[1.02] font-extrabold'
                        : 'hover:bg-white/60 text-slate-600'
                    }`}
                    style={{
                      borderBottom: isSelected ? `3px solid ${p.color}` : '3px solid transparent',
                    }}
                  >
                    <div className="transform scale-75 -my-1.5">
                      <PathogenVector type={p.id} size={36} />
                    </div>
                    <span
                      className={`text-[11px] mt-0.5 tracking-tight ${
                        isSelected ? 'text-[#12343B]' : 'text-slate-600'
                      }`}
                    >
                      {p.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>
                      {p.stat}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                sfx.tick();
                setLeftView((prev) => (prev === 'detail' ? 'matrix' : 'detail'));
              }}
              className={`px-2.5 py-2 rounded-2xl border text-[10.5px] font-extrabold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shrink-0 ${
                leftView === 'matrix'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-white'
              }`}
            >
              <Table2 size={15} />
              <span>So Sánh</span>
            </button>
          </div>

          {leftView === 'detail' ? (
            /* CHI TIẾT TÁC NHÂN ĐANG CHỌN */
            <div className="flex-1 flex flex-col justify-between my-1.5 overflow-y-auto pr-0.5 space-y-1.5">
              {/* Header card tác nhân */}
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs flex-shrink-0">
                    <PathogenVector type={activeTab} size={46} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${pathogen.color}18`,
                          color: pathogen.color,
                        }}
                      >
                        {pathogen.badge}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-base text-[#12343B] leading-tight mt-0.5 truncate">
                      {pathogen.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500 truncate">
                      {pathogen.sub} • <strong className="text-slate-700">{pathogen.stoolFeature}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span
                    className="font-heading font-black text-2xl md:text-3xl leading-none"
                    style={{ color: pathogen.color }}
                  >
                    {pathogen.stat}
                  </span>
                  <div className="text-[9.5px] font-bold text-slate-500">{pathogen.statLabel}</div>
                </div>
              </div>

              {/* Mô phỏng SVG tổn thương nhung mao ruột theo từng tác nhân */}
              <IntestinalVilliSVG activeTab={activeTab} />

              {/* Danh sách 3 mầm bệnh trọng tâm */}
              <div className="space-y-1.5">
                {pathogen.targets.map((tgt, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-2xl bg-slate-50/85 hover:bg-slate-50 border border-slate-200/70 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading font-extrabold text-xs text-[#12343B]">
                        {tgt.name}
                      </span>
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-white text-[#0284C7] border border-slate-200 shrink-0">
                        {tgt.highlight}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {tgt.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hộp Cảnh Báo Kháng Sinh Đỏ/Xanh */}
              <div
                className="p-2 rounded-2xl border text-[11px] font-bold flex items-start gap-2 flex-shrink-0"
                style={{
                  backgroundColor: `${pathogen.color}10`,
                  borderColor: `${pathogen.color}35`,
                  color: pathogen.color,
                }}
              >
                <ShieldAlert size={15} className="shrink-0 mt-0.5" />
                <span className="leading-snug">{pathogen.rxWarning}</span>
              </div>
            </div>
          ) : (
            /* CHẾ ĐỘ BẢNG PHÂN BIỆT LÂM SÀNG & XÉT NGHIỆM PHÂN */
            <div className="flex-1 flex flex-col justify-between my-2 overflow-y-auto pr-0.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#12343B]">
                    Bảng Phân Biệt Lâm Sàng &amp; Chỉ Định Điều Trị (Bộ Y Tế)
                  </h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">
                    Giúp phân biệt nhanh tiêu chảy do Virus (không kháng sinh) và Vi khuẩn xâm lấn
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLeftView('detail')}
                  className="text-[10.5px] font-extrabold text-[#0284C7] hover:underline cursor-pointer"
                >
                  ← Quay lại 3 tác nhân
                </button>
              </div>

              <div className="space-y-2 my-1.5">
                {CLINICAL_COMPARISON_ROWS.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                  >
                    <div className="font-heading font-extrabold text-[11px] text-[#12343B]">
                      {row.criterion}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                      <div className="p-1.5 rounded-xl bg-sky-50/90 border border-sky-200/70 text-sky-950">
                        <span className="font-extrabold text-[#0284C7] block">🔵 Virus (&gt;70%):</span>
                        {row.virus}
                      </div>
                      <div className="p-1.5 rounded-xl bg-orange-50/90 border border-orange-200/70 text-orange-950">
                        <span className="font-extrabold text-[#EA580C] block">🟠 Vi khuẩn (15–20%):</span>
                        {row.bacteria}
                      </div>
                      <div className="p-1.5 rounded-xl bg-teal-50/90 border border-teal-200/70 text-teal-950">
                        <span className="font-extrabold text-[#0D9488] block">🟢 Ký sinh trùng:</span>
                        {row.parasite}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* NỬA PHẢI (6 Cột): BẢN ĐỒ CHU TRÌNH PHÂN – MIỆNG 5 MẮT XÍCH & LÁ CHẮN TƯƠNG TÁC */}
        <div className="col-span-12 lg:col-span-6 p-3.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-md flex flex-col justify-between overflow-hidden">
          {/* Header nửa phải */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#14B8A6] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                🔄
              </span>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#12343B]">
                  Chu Trình Lây Truyền Phân – Miệng &amp; Lá Chắn
                </h3>
                <p className="text-[10.5px] font-medium text-slate-500">
                  Nhấp vào từng trạm để <strong className="text-emerald-700">Kích hoạt lá chắn ngắt mắt xích</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-600">
                Đã chặn: <strong className="text-[#0284C7]">{blockedStations.length}/5</strong>
              </span>
              {allBlocked ? (
                <button
                  type="button"
                  onClick={unblockAllStations}
                  className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer"
                >
                  ✓ An toàn tuyệt đối! (Thử mở)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={blockAllStations}
                  className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 hover:bg-sky-200 transition-colors cursor-pointer"
                >
                  + Chặn toàn bộ 5/5
                </button>
              )}
            </div>
          </div>

          {/* Thanh đo mức độ nguy cơ lây nhiễm dịch tễ */}
          <div className="my-1 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="text-[10.5px] font-extrabold text-slate-700 shrink-0">
              Nguy cơ lây nhiễm:{' '}
              <span className={riskPercent === 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {riskPercent}%
              </span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${100 - riskPercent}%`,
                  backgroundColor: allBlocked ? '#10B981' : '#0284C7',
                }}
              />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 shrink-0">
              Bảo vệ: {100 - riskPercent}%
            </span>
          </div>

          {/* Sơ đồ 5 Mắt xích Xếp Tầng Trực Quan */}
          <div className="flex-1 flex flex-col justify-around py-0.5 space-y-1.5 min-h-0 overflow-y-auto">
            {TRANSMISSION_STATIONS.map((st) => {
              const isBlocked = blockedStations.includes(st.id);
              return (
                <div
                  key={st.id}
                  onClick={() => toggleStationBlock(st.id)}
                  className={`p-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isBlocked
                      ? 'bg-emerald-50/75 border-emerald-300 shadow-2xs'
                      : 'bg-slate-50/85 hover:bg-white border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {/* Trái: Icon & Tên Trạm */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-2xs flex-shrink-0 transition-colors ${
                        isBlocked
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {st.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-slate-200/80 text-slate-600">
                          {st.title.split(':')[0]}
                        </span>
                        <span className="font-heading font-extrabold text-xs text-[#12343B] truncate">
                          {st.name}
                        </span>
                      </div>

                      <div className="text-[11px] font-medium text-slate-600 mt-0.5 truncate">
                        {isBlocked ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{st.barrier}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            Chạm để dựng lá chắn: <strong>{st.actionLabel}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phải: Trạng Thái Toggle Chặn & Hiệu quả dịch tễ */}
                  <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all ${
                        isBlocked
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <ShieldCheck size={11} />
                          <span>Đã chặn</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={11} />
                          <span>Đang hở</span>
                        </>
                      )}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500">{st.efficacy}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dòng tóm lược dưới nửa phải */}
          <div className="p-2 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 flex items-center justify-between text-[11px] text-[#0284C7] font-bold flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>
                Chỉ cần ngắt <strong>ít nhất 1 trong 5 mắt xích</strong>, chu trình lây truyền bệnh sẽ bị bẻ gãy hoàn toàn!
              </span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">WHO 2024</span>
          </div>
        </div>
      </div>

      {/* 3. Fact Box Y Tế Vàng Cốt Tử Dưới Đáy (Không che khuất, đúng chuẩn Bộ Y tế) */}
      <div className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-[#EFF6FF] via-[#F0FDF4] to-[#FFFBEB] border border-sky-200/80 flex items-center justify-between gap-3 text-xs flex-shrink-0 shadow-2xs">
        <div className="flex items-center gap-2.5 text-[#0369A1] font-bold">
          <span className="text-base flex-shrink-0">💡</span>
          <span className="leading-snug">
            <strong>Ghi nhớ lâm sàng (Bộ Y tế &amp; WHO):</strong> Tiêu chảy là phản xạ tống xuất mầm bệnh. Tuyệt đối{' '}
            <strong>KHÔNG tự ý dùng thuốc cầm tiêu chảy (Loperamide)</strong> hay kháng sinh khi chưa có chỉ định — thuốc cầm sẽ giữ độc tố lại trong ruột, gây biến chứng liệt ruột, phình đại tràng nhiễm độc!
          </span>
        </div>
        <span className="text-[10.5px] text-[#0369A1]/80 font-black whitespace-nowrap hidden md:inline flex-shrink-0">
          QĐ 4121/QĐ-BYT • WHO Guidelines
        </span>
      </div>
    </div>
  );
}

export default Slide8DiarrheaCauses;