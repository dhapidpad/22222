/**
 * GUT CARE — NỘI DUNG CHỮ THUYẾT TRÌNH (10 SLIDE)
 * 100% Tiếng Việt có dấu, chuẩn ngữ pháp y khoa (Bộ Y tế, WHO, Cleveland Clinic, Mayo Clinic)
 */

export const content = {
  // ==========================================
  // SLIDE 1: TRANG BÌA
  // ==========================================
  slide1: {
    tag: "BÁO CÁO CHUYÊN ĐỀ SINH HỌC",
    title: "CÁC BỆNH VỀ DẠ DÀY",
    subtitle: "Tìm hiểu Vai trò · Viêm dạ dày cấp tính · Trào ngược thực quản & Cách phòng tránh",
    items: [
      {
        id: "chip-roles",
        label: "① Vai trò dạ dày",
        color: "teal",
        desc: "Chứa đựng, nhào trộn thức ăn và tiết dịch vị axit HCl diệt khuẩn"
      },
      {
        id: "chip-gastritis",
        label: "② Viêm dạ dày cấp",
        color: "orange",
        desc: "Viêm sưng niêm mạc bùng phát sau kích thích (thuốc NSAID, rượu bia, vi khuẩn)"
      },
      {
        id: "chip-gerd",
        label: "③ Trào ngược GERD",
        color: "blue",
        desc: "Axit trào ngược lên thực quản gây ợ nóng, ợ chua và tổn thương niêm mạc"
      }
    ],
    callouts: [
      "Đề tài: Tìm hiểu nguyên nhân, triệu chứng và giải pháp phòng tránh các bệnh về dạ dày thường gặp ở người.",
      "Thông điệp GUT CARE: Dạ dày khỏe mạnh — Nền tảng sống vui mỗi ngày."
    ]
  },

  // ==========================================
  // SLIDE 2: VIDEO GIỚI THIỆU CHỦ ĐỀ (INTRO)
  // ==========================================
  slide2: {
    tag: "VIDEO HOẠT HÌNH (55 GIÂY)",
    title: "DẠ DÀY CỦA BẠN ĐANG LÀM VIỆC NHƯ THẾ NÀO?",
    subtitle: "Dạ dày là trái tim của hệ tiêu hóa — cơ quan nhào trộn và tiêu hóa thức ăn không ngừng nghỉ suốt 24 giờ.",
    scenes: [
      {
        id: 1,
        time: "0:00 – 0:10",
        name: "Vai trò dạ dày",
        heading: "TRUNG TÂM TIÊU HÓA & TIẾT AXIT DIỆT KHUẨN",
        caption: "Dạ dày là cơ quan nhào trộn và tiêu hóa đạm quan trọng nhất: tiếp nhận 1–2 lít thức ăn, tiết axit HCl diệt khuẩn nuôi sống cơ thể."
      },
      {
        id: 2,
        time: "0:10 – 0:20",
        name: "Áp lực hiện đại",
        heading: "LÁ CHẮN BẢO VỆ BỊ BÀO MÒN ÂM THẦM",
        caption: "Bỏ bữa, ăn trễ, stress, rượu bia, đồ cay nóng và thuốc giảm đau NSAID khiến niêm mạc dạ dày âm thầm chịu tổn thương."
      },
      {
        id: 3,
        time: "0:20 – 0:32",
        name: "Viêm dạ dày cấp",
        heading: "CƠN ĐAU RÁT THƯỢNG VỊ & BUỒN NÔN",
        caption: "Viêm dạ dày cấp tính bùng phát đột ngột gây đau cồn cào vùng thượng vị, buồn nôn, và nguy cơ chảy máu nếu chủ quan!"
      },
      {
        id: 4,
        time: "0:32 – 0:44",
        name: "Trào ngược GERD",
        heading: "Ợ NÓNG & AXIT TRÀO LÊN CỔ HỌNG",
        caption: "Trào ngược dạ dày thực quản (GERD) khiến axit trào ngược gây cảm giác nóng rát sau xương ức, khàn tiếng và ho kéo dài."
      },
      {
        id: 5,
        time: "0:44 – 0:55",
        name: "Đồng hành GUT CARE",
        heading: "ĂN ĐÚNG GIỜ • KHÔNG NẰM SAU ĂN • KHÔNG LẠM DỤNG THUỐC",
        caption: "Hiểu đúng vai trò – nhận diện sớm triệu chứng – phòng bệnh chủ động cùng GUT CARE!"
      }
    ]
  },

  // ==========================================
  // SLIDE 3: GIỚI THIỆU THÀNH VIÊN NHÓM
  // ==========================================
  slide3: {
    tag: "ĐỘI NGŨ THỰC HIỆN ĐỀ TÀI",
    title: "NHÓM THỰC HIỆN DỰ ÁN GUT CARE",
    subtitle: "Sự phối hợp chặt chẽ giữa 9 thành viên qua 6 công đoạn từ nghiên cứu, thiết kế đến lập trình và kiểm duyệt.",
    workflow: [
      'Research y khoa',
      'Xây dựng nội dung',
      'Thiết kế giao diện',
      'Lập trình tương tác',
      'Kiểm duyệt y tế',
      'Thuyết trình báo cáo'
    ]
  },

  // ==========================================
  // SLIDE 4: VAI TRÒ CỦA DẠ DÀY
  // ==========================================
  slide4: {
    tag: "GIẢI PHẪU & SINH LÝ HỌC",
    title: "VAI TRÒ SINH HỌC CỐT LÕI CỦA DẠ DÀY",
    subtitle: "Dạ dày (Gaster) là đoạn phình to nhất của ống tiêu hóa, đóng 4 vai trò sống còn trong quá trình chuyển hóa dinh dưỡng.",
    roles: [
      {
        id: "role-store",
        title: "1. Chứa đựng & Dự trữ thức ăn",
        icon: "🥣",
        badge: "Dung tích 1 – 1.5 Lít",
        color: "#1FBFA8",
        desc: "Dạ dày tiếp nhận thức ăn từ thực quản, các nếp gấp niêm mạc giãn nở linh hoạt để chứa lượng thức ăn của bữa ăn lớn mà không làm tăng áp lực đột ngột."
      },
      {
        id: "role-churn",
        title: "2. Tiêu hóa cơ học (Nghiền & Nhào trộn)",
        icon: "🔄",
        badge: "Nhu động 3 chu kỳ/phút",
        color: "#3BB8F0",
        desc: "3 lớp cơ (cơ vòng, cơ dọc, cơ chéo) co bóp nhịp nhàng, nghiền nát thức ăn và trộn đều với dịch vị, biến thức ăn thô thành nhũ chấp lỏng (vị chấp/chyme)."
      },
      {
        id: "role-acid",
        title: "3. Tiêu hóa hóa học & Diệt khuẩn",
        icon: "⚗️",
        badge: "Axit HCl (pH 1.5 – 3.5)",
        color: "#FF8A5B",
        desc: "Tiết Axit HCl có tính khử trùng cực mạnh giúp tiêu diệt hầu hết vi khuẩn theo thức ăn vào; hoạt hóa men Pepsinogen thành enzym Pepsin để cắt nhỏ chuỗi Protein."
      },
      {
        id: "role-protect",
        title: "4. Tiết chất nhầy bảo vệ & Hấp thu",
        icon: "🛡️",
        badge: "Màng chắn Mucin & Bicarbonat",
        color: "#FFD166",
        desc: "Tiết lớp gel nhầy Mucin và ion HCO₃⁻ ngăn axit tự ăn mòn thành dạ dày; tiết Yếu tố nội (Intrinsic factor) hấp thu vitamin B12; hấp thu một phần nước và rượu."
      }
    ]
  },

  // ==========================================
  // SLIDE 5: TỔNG QUAN CÁC BỆNH VỀ DẠ DÀY
  // ==========================================
  slide5: {
    tag: "TOÀN CẢNH BỆNH HỌC DẠ DÀY",
    title: "CÁC BỆNH VỀ DẠ DÀY THƯỜNG GẶP Ở NGƯỜI",
    subtitle: "Dạ dày liên tục tiếp xúc với axit và hóa chất, nên rất dễ mắc các tổn thương từ cấp tính đến mạn tính.",
    diseases: [
      {
        id: "dis-acute",
        name: "Viêm dạ dày cấp tính",
        severity: "Phổ biến nhất • Khởi phát nhanh",
        color: "#FF8A5B",
        desc: "Niêm mạc dạ dày bị xung huyết, phù nề, viêm sưng đột ngột sau khi ăn đồ kích thích, uống rượu bia hoặc dùng thuốc giảm đau.",
        focus: true
      },
      {
        id: "dis-gerd",
        name: "Trào ngược dạ dày thực quản (GERD)",
        severity: "Rất phổ biến • Tái phát nhiều",
        color: "#3BB8F0",
        desc: "Cơ thắt thực quản dưới đóng không kín khiến dịch axit trào ngược lên ngực và họng, gây ợ nóng, ợ chua, tổn thương ống thực quản.",
        focus: true
      },
      {
        id: "dis-ulcer",
        name: "Viêm loét dạ dày – tá tràng",
        severity: "Mạn tính • Ăn sâu vào cơ niêm",
        color: "#EF4B5F",
        desc: "Tổn thương mất chất ăn sâu qua lớp niêm mạc, thủ phạm hàng đầu là nhiễm khuẩn H. pylori và dùng thuốc NSAID kéo dài.",
        focus: false
      },
      {
        id: "dis-bleed",
        name: "Xuất huyết dạ dày (Chảy máu)",
        severity: "CẤP CỨU Y KHOA NGUY CẤP",
        color: "#DC2626",
        desc: "Ổ loét hoặc viêm trợt ăn đứt mạch máu dạ dày dẫn đến nôn ra máu tươi/bã cà phê và đại tiện phân đen hôi tanh.",
        focus: false
      },
      {
        id: "dis-pyloric",
        name: "Hẹp môn vị dạ dày",
        severity: "Ứ trệ thức ăn",
        color: "#B45309",
        desc: "Cửa thoát thức ăn từ dạ dày xuống ruột non bị xơ sẹo co kéo làm hẹp lại, gây ứ đọng thức ăn cũ và nôn sau ăn.",
        focus: false
      },
      {
        id: "dis-cancer",
        name: "Ung thư dạ dày",
        severity: "Bệnh lý ác tính",
        color: "#6B7280",
        desc: "Khối u ác tính khởi phát từ tế bào biểu mô niêm mạc dạ dày, cần tầm soát nội soi định kỳ để phát hiện ở giai đoạn sớm.",
        focus: false
      }
    ]
  },

  // ==========================================
  // SLIDE 6: VIÊM DẠ DÀY CẤP TÍNH
  // ==========================================
  slide6: {
    tag: "BỆNH LÝ TRỌNG TÂM 1",
    title: "VIÊM DẠ DÀY CẤP TÍNH (ACUTE GASTRITIS)",
    subtitle: "Khởi phát đột ngột — Niêm mạc dạ dày sưng đỏ, xung huyết dưới tác động kích thích mạnh.",
    causes: [
      {
        title: "Thuốc giảm đau chống viêm (NSAID / Aspirin)",
        desc: "Uống thuốc lúc đói ức chế enzym COX-1, làm suy giảm prostaglandin bảo vệ lớp màng nhầy niêm mạc.",
        badge: "Thủ phạm #1 dùng thuốc"
      },
      {
        title: "Rượu bia, cà phê đậm đặc & Thức ăn cay nóng",
        desc: "Cồn phá hủy trực tiếp màng lipid tế bào; ớt tiêu cay kích thích dạ dày tăng tiết ồ ạt axit HCl.",
        badge: "Kích thích hóa học"
      },
      {
        title: "Nhiễm khuẩn cấp & Ngộ độc thực phẩm",
        desc: "Ăn thức ăn ôi thiu nhiễm vi khuẩn E. coli, Salmonella hoặc bùng phát vi khuẩn H. pylori.",
        badge: "Nhiễm trùng thức ăn"
      },
      {
        title: "Căng thẳng (Stress) cấp nghiêm trọng",
        desc: "Sang chấn tâm lý mạnh, chấn thương hoặc sau phẫu thuật làm co thắt mạch máu nuôi niêm mạc.",
        badge: "Yếu tố thần kinh"
      }
    ],
    symptoms: [
      {
        title: "Đau cồn cào / Quặn rát thượng vị",
        desc: "Cơn đau xuất hiện đột ngột ở vùng trên rốn, dưới xương ức; đau tăng lên sau khi ăn thức ăn kích thích.",
        icon: "🔥"
      },
      {
        title: "Buồn nôn & Nôn mửa liên tục",
        desc: "Nôn ra thức ăn vừa ăn, dịch vị trong chua rát cổ, nôn dịch mật vàng hoặc có tia máu tươi.",
        icon: "🤢"
      },
      {
        title: "Đầy trướng bụng, ợ chua & Chán ăn",
        desc: "Cảm giác bụng ậm ạch, căng tức khó chịu, miệng đắng, chán ăn, người mệt mỏi.",
        icon: "⚡"
      },
      {
        title: "Dấu hiệu cảnh báo cấp cứu (Cờ đỏ)",
        desc: "Nôn ra máu tươi, chất nôn nâu đen bã cà phê, hoặc đi ngoài phân đen sệt như nhựa đường.",
        icon: "🚨"
      }
    ]
  },

  // ==========================================
  // SLIDE 7: TRÀO NGƯỢC DẠ DÀY THỰC QUẢN (GERD)
  // ==========================================
  slide7: {
    tag: "BỆNH LÝ TRỌNG TÂM 2",
    title: "TRÀO NGƯỢC DẠ DÀY THỰC QUẢN (GERD)",
    subtitle: "Dịch vị mang tính axit trào ngược từ dạ dày lên thực quản, gây bỏng rát và tổn thương niêm mạc.",
    causes: [
      {
        title: "Suy yếu cơ thắt thực quản dưới (Van LES)",
        desc: "Cơ vòng ở đoạn nối thực quản - dạ dày bị giãn nhão bất thường, không đóng kín được sau khi nuốt thức ăn.",
        badge: "Cơ chế chính"
      },
      {
        title: "Áp lực ổ bụng gia tăng",
        desc: "Thừa cân, béo phì, mang thai, hoặc mặc quần áo thắt quá chặt chèn ép dạ dày đẩy dịch vị lên.",
        badge: "Áp lực cơ học"
      },
      {
        title: "Thói quen nằm ngay sau khi ăn no",
        desc: "Trọng lực không còn giữ được thức ăn dưới dạ dày; dịch axit dễ dàng tràn ngược lên ống thực quản.",
        badge: "Sai lầm thói quen"
      },
      {
        title: "Thực phẩm kích thích & Thuốc lá",
        desc: "Đồ chiên rán dầu mỡ, sô-cô-la, bạc hà, nước ngọt có gas và nicotine làm van LES càng giãn yếu.",
        badge: "Chất kích thích"
      }
    ],
    symptoms: [
      {
        title: "Ợ nóng (Heartburn) — Triệu chứng kinh điển",
        desc: "Cảm giác nóng rát như thiêu đốt sau xương ức, lan dần từ vùng thượng vị lên tận ngực và cổ họng.",
        icon: "🔥"
      },
      {
        title: "Ợ chua, trớ thức ăn & Đắng miệng",
        desc: "Axit trào lên khoang miệng gây vị chua rát hoặc vị đắng ngắt (do có lẫn dịch mật).",
        icon: "🍋"
      },
      {
        title: "Khàn tiếng, ho ban đêm & Viêm họng mạn",
        desc: "Hơi axit kích thích thanh quản và dây thanh âm, gây khàn tiếng vào buổi sáng và ho kéo dài.",
        icon: "🗣️"
      },
      {
        title: "Nuốt vướng, nghẹn cổ & Đau tức ngực",
        desc: "Cảm giác có khối u vướng ở họng, đau tức ngực dễ nhầm lẫn với cơn đau thắt ngực do bệnh tim.",
        icon: "⚠️"
      }
    ]
  },

  // ==========================================
  // SLIDE 8: BỆNH 2: TIÊU CHẢY CẤP TOÀN DIỆN
  // ==========================================
  slide8: {
    tag: "BỆNH 2 · TIÊU CHẢY CẤP TOÀN DIỆN",
    title: "TIÊU CHẢY CẤP: DẤU HIỆU, CĂN NGUYÊN & PHÒNG NGỪA",
    subtitle: "Nhận biết sớm 3 mức độ mất nước, cắt đứt chu trình lây truyền phân - miệng và nguyên tắc vàng bù Oresol.",
    symptoms: {
      tag: "BỆNH 2 · DẤU HIỆU & 3 CẤP ĐỘ MẤT NƯỚC",
      title: "DẤU HIỆU LÂM SÀNG TIÊU CHẢY CẤP",
      subtitle: "Nguy hiểm lớn nhất của tiêu chảy là mất nước và điện giải. Nhận biết đúng 3 mức độ để xử trí kịp thời."
    },
    prevention: {
      tag: "BỆNH 2 · 4 TRỤ CỘT PHÒNG BỆNH & BÙ NƯỚC",
      title: "GIẢI PHÁP PHÒNG BỆNH TIÊU CHẢY CẤP & NGUYÊN TẮC ORESOL",
      subtitle: "Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol."
    }
  },

  // Alias cho module Phòng bệnh tiêu chảy cấp
  slide10: {
    tag: "BỆNH 2 · 4 TRỤ CỘT PHÒNG BỆNH & BÙ NƯỚC",
    title: "GIẢI PHÁP PHÒNG BỆNH TIÊU CHẢY CẤP & NGUYÊN TẮC ORESOL",
    subtitle: "Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol."
  },

  // ==========================================
  // SLIDE 9: MINIGAME ĐẤU TRÍ Y KHOA (6 CÂU)
  // ==========================================
  slide9: {
    tag: "09 · ĐẤU TRÍ SINH HỌC TOÀN DIỆN",
    title: "THỬ THÁCH ĐẤU TRÍ: BẢO VỆ ĐƯỜNG TIÊU HÓA",
    subtitle: "Trắc nghiệm 6 câu hỏi củng cố kiến thức toàn diện về cả Viêm loét dạ dày và Tiêu chảy cấp."
  },

  // ==========================================
  // SLIDE 10: TỔNG KẾT & LỜI CẢM ƠN
  // ==========================================
  slide12: {
    tag: "10 · TỔNG KẾT & CAM KẾT HÀNH ĐỘNG",
    title: "TIÊU HÓA KHỎE MẠNH, SỐNG VUI MỖI NGÀY",
    subtitle: "Cảm ơn quý thầy cô và các bạn đã lắng nghe báo cáo chuyên đề Sinh học của Nhóm 2 - Lớp 11A5.",
    items: [
      {
        id: "takeaway-ulcer",
        title: "Hiểu rõ Loét dạ dày & H. pylori",
        desc: "Không tự ý lạm dụng thuốc NSAID. Tuân thủ phác đồ điều trị của bác sĩ và kiên trì uống đủ liệu trình."
      },
      {
        id: "takeaway-diarrhea",
        title: "Bù nước kịp thời trong Tiêu chảy",
        desc: "Luôn có sẵn Oresol trong tủ thuốc gia đình. Pha đúng tỷ lệ nước sạch (245 mOsm/L), không tự ý uống thuốc cầm."
      },
      {
        id: "takeaway-lifestyle",
        title: "Chăm sóc từ thói quen mỗi ngày",
        desc: "Thực hiện rửa tay 6 bước với xà phòng, ăn chín uống sôi triệt để và duy trì lối sống lành mạnh."
      }
    ],
    qa: [
      {
        q: "Nhiễm vi khuẩn H. pylori có nhất thiết phải dùng kháng sinh diệt ngay không?",
        a: "Không phải ai nhiễm H. pylori cũng cần điều trị tiệt trừ. Bác sĩ chỉ chỉ định phác đồ diệt H. pylori khi có ổ loét dạ dày – tá tràng, viêm teo niêm mạc, hoặc có tiền sử gia đình ung thư dạ dày."
      },
      {
        q: "Oresol có vị lợ khó uống, có thể pha thêm chút đường hay sữa cho dễ uống không?",
        a: "Tuyệt đối KHÔNG! Việc pha thêm đường, sữa hay nước ngọt sẽ làm tăng áp lực thẩm thấu, kéo nước vào lòng ruột khiến tiêu chảy nặng hơn và tăng nguy cơ co giật do ngộ độc muối."
      },
      {
        q: "Vừa bị tiêu chảy có nên uống ngay viên thuốc cầm tiêu chảy (Loperamide) không?",
        a: "Không nên tự ý uống. Tiêu chảy là phản xạ tự nhiên tống xuất độc tố ra ngoài. Thuốc cầm tiêu chảy làm liệt ruột, giữ độc tố lại bên trong dễ dẫn đến viêm ruột hoại tử và nhiễm độc cấp."
      },
      {
        q: "Dấu hiệu đau bụng nào cảnh báo nguy hiểm cần gọi cấp cứu ngay?",
        a: "Đau bụng dữ dội như dao đâm (thủng ổ loét), nôn ra máu, đi ngoài phân đen hôi khẳm, hoặc tiêu chảy mất nước nặng kèm li bì, hôn mê, tụt huyết áp."
      }
    ]
  }
};

export default content;
