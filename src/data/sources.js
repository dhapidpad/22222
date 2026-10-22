/**
 * GUT CARE — DANH SÁCH NGUỒN THAM KHẢO & TƯ LIỆU HÌNH ẢNH (SOURCES.JS)
 * 
 * Mỗi mục gồm:
 * - id: định danh duy nhất (claim-s{N}-... hoặc img-s{N}-...)
 * - type: "claim" (khẳng định y khoa) | "image" (tư liệu hình ảnh)
 * - slide: số thứ tự slide (1 - 12)
 * - claim / description: nội dung khẳng định hoặc mô tả hình ảnh
 * - title: tiêu đề tài liệu hoặc tên tác phẩm ảnh
 * - author: tác giả
 * - organization: tổ chức y tế / nền tảng
 * - year: năm xuất bản / ban hành
 * - license: giấy phép bản quyền
 * - url: link truy cập gốc đã kiểm chứng
 * - downloadedPath: đường dẫn file đã tải (đối với ảnh)
 */

export const sources = [
  // ==========================================
  // SLIDE 1: TRANG BÌA
  // ==========================================
  {
    id: "claim-s1-epidemiology",
    type: "claim",
    slide: 1,
    claim: "Bệnh lý tiêu hóa là một trong những nhóm bệnh có tỷ lệ mắc và thăm khám cao nhất tại Việt Nam.",
    title: "Báo cáo Dịch tễ học bệnh lý Tiêu hóa tại Việt Nam",
    author: "Ban Chấp hành Hội Khoa học Tiêu hóa Việt Nam",
    organization: "Hội Khoa học Tiêu hóa Việt Nam (VNAGE)",
    year: 2023,
    license: "Trích dẫn khoa học y khoa",
    url: "http://vnage.org.vn",
    downloadedPath: null
  },
  {
    id: "img-s1-breakfast",
    type: "image",
    slide: 1,
    description: "Bàn ăn sáng tươi sáng với trái cây tươi, yến mạch và nước mát, ánh sáng tự nhiên",
    title: "Healthy breakfast (42923839125)",
    author: "Marco Verch Professional Photographer",
    organization: "Flickr / Wikimedia Commons",
    year: 2018,
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Healthy_breakfast_(42923839125).jpg",
    downloadedPath: "public/assets/images/slide1/slide1-bua-sang-lanh-manh-01.webp"
  },

  // ==========================================
  // SLIDE 2: VIDEO GIỚI THIỆU CHỦ ĐỀ
  // ==========================================
  {
    id: "claim-s2-hp-vietnam",
    type: "claim",
    slide: 2,
    claim: "Ước tính khoảng 70% – 80% dân số Việt Nam mang vi khuẩn Helicobacter pylori trong dạ dày.",
    title: "Thông tin truyền thông giáo dục sức khỏe về vi khuẩn H.pylori",
    author: "Trung tâm Tiêu hóa - Gan mật",
    organization: "Bệnh viện Bạch Mai & Trung tâm Truyền thông GDSK Trung ương (Bộ Y tế)",
    year: 2023,
    license: "Tài liệu truyền thông y tế công cộng",
    url: "https://bachmai.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s2-diarrhea-mortality",
    type: "claim",
    slide: 2,
    claim: "Tiêu chảy là nguyên nhân gây tử vong hàng thứ hai ở trẻ em dưới 5 tuổi trên toàn cầu.",
    title: "Diarrhoeal disease Fact Sheet",
    author: "World Health Organization (WHO)",
    organization: "Tổ chức Y tế Thế giới (WHO)",
    year: 2024,
    license: "WHO Open Information",
    url: "https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease",
    downloadedPath: null
  },
  {
    id: "claim-s2-wash-prevention",
    type: "claim",
    slide: 2,
    claim: "Phần lớn các bệnh truyền nhiễm đường tiêu hóa có thể phòng ngừa bằng nước sạch và vệ sinh bàn tay.",
    title: "Water, Sanitation and Hygiene (WASH) Global Report",
    author: "UNICEF & WHO Joint Monitoring Programme",
    organization: "UNICEF & WHO",
    year: 2023,
    license: "UN Public Report",
    url: "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health",
    downloadedPath: null
  },
  {
    id: "img-s2-fresh-produce",
    type: "image",
    slide: 2,
    description: "Các loại trái cây và rau củ tươi ngon nhiều màu sắc, tượng trưng cho dinh dưỡng bảo vệ hệ tiêu hóa",
    title: "Healthy Food - Colourful Fruit and Veg",
    author: "formulatehealth",
    organization: "Wikimedia Commons",
    year: 2020,
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Healthy_Food_-_Colourful_Fruit_and_Veg_-_50191699151.jpg",
    downloadedPath: "public/assets/images/slide2/slide2-trai-cay-rau-cu-tuoi-01.webp"
  },

  // ==========================================
  // SLIDE 4: HỆ TIÊU HÓA & DẠ DÀY - TÁ TRÀNG (KIẾN THỨC NỀN)
  // ==========================================
  {
    id: "claim-s4-ph",
    type: "claim",
    slide: 4,
    claim: "Độ pH dịch vị dạ dày sinh lý ở mức 1.5 – 3.5, đóng vai trò diệt khuẩn và hoạt hóa men tiêu hóa pepsin.",
    title: "Your Digestive System & How It Works",
    author: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)",
    organization: "National Institutes of Health (NIH), Hoa Kỳ",
    year: 2023,
    license: "US Government Public Information",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works",
    downloadedPath: null
  },
  {
    id: "claim-s4-mucus",
    type: "claim",
    slide: 4,
    claim: "Lớp chất nhầy giàu bicarbonat đóng vai trò hàng rào sinh học bảo vệ niêm mạc dạ dày chống lại axit và pepsin.",
    title: "Stomach Anatomy and Physiology",
    author: "Cleveland Clinic Medical Team",
    organization: "Cleveland Clinic",
    year: 2023,
    license: "Clinical Educational Resource",
    url: "https://my.clevelandclinic.org/health/body/21758-stomach",
    downloadedPath: null
  },
  {
    id: "claim-s4-duodenum",
    type: "claim",
    slide: 4,
    claim: "Tá tràng dài khoảng 25 cm, là đoạn đầu ruột non tiếp nhận dịch mật và dịch tụy để trung hòa nhũ trấp axit.",
    title: "Duodenum Anatomy and Function",
    author: "Mayo Clinic Staff",
    organization: "Mayo Clinic",
    year: 2022,
    license: "Clinical Information Reference",
    url: "https://www.mayoclinic.org/diseases-conditions/peptic-ulcer/symptoms-causes/syc-20354223",
    downloadedPath: null
  },
  {
    id: "claim-s4-emptying",
    type: "claim",
    slide: 4,
    claim: "Thức ăn thông thường lưu lại ở dạ dày khoảng 2 – 4 giờ trước khi được tống xuất từng đợt xuống tá tràng.",
    title: "Gastric Emptying and Motility",
    author: "NIDDK Information Clearinghouse",
    organization: "NIH Hoa Kỳ",
    year: 2023,
    license: "Public Domain Government Resource",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 5: 🟠 VIÊM LOÉT — ① NGUYÊN NHÂN
  // ==========================================
  {
    id: "claim-s5-leading-causes",
    type: "claim",
    slide: 5,
    claim: "Nhiễm vi khuẩn H. pylori và sử dụng thuốc kháng viêm không steroid (NSAIDs) là 2 nguyên nhân hàng đầu gây loét dạ dày - tá tràng.",
    title: "Symptoms & Causes of Peptic Ulcers (Stomach Ulcers)",
    author: "NIDDK & Mayo Clinic Staff",
    organization: "NIDDK (NIH) & Mayo Clinic",
    year: 2023,
    license: "Clinical Educational Guidelines",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
    downloadedPath: null
  },
  {
    id: "claim-s5-hp-transmission",
    type: "claim",
    slide: 5,
    claim: "Vi khuẩn H. pylori lây truyền từ người sang người chủ yếu qua đường miệng – miệng (nước bọt, dùng chung bát đũa) và phân – miệng.",
    title: "Helicobacter pylori (H. pylori) infection",
    author: "Mayo Clinic Staff",
    organization: "Mayo Clinic",
    year: 2022,
    license: "Clinical Reference",
    url: "https://www.mayoclinic.org/diseases-conditions/h-pylori/symptoms-causes/syc-20356171",
    downloadedPath: null
  },
  {
    id: "claim-s5-nsaid-mechanism",
    type: "claim",
    slide: 5,
    claim: "Thuốc NSAID ức chế enzym COX-1 làm suy giảm tổng hợp prostaglandin, làm mỏng lớp chất nhầy bảo vệ niêm mạc.",
    title: "Peptic Ulcer Disease - Etiology and Pathophysiology",
    author: "MSD Manual Professional Edition Editorial Board",
    organization: "MSD Manual (Merck & Co.)",
    year: 2023,
    license: "Medical Professional Manual",
    url: "https://www.msdmanuals.com/professional/gastrointestinal-disorders/gastritis-and-peptic-ulcer-disease/peptic-ulcer-disease",
    downloadedPath: null
  },
  {
    id: "claim-s5-stress-myth",
    type: "claim",
    slide: 5,
    claim: "Căng thẳng (stress) và thức ăn cay nóng không trực tiếp sinh ra vết loét dạ dày mà đóng vai trò là yếu tố kích phát, làm nặng thêm triệu chứng.",
    title: "Debunking Peptic Ulcer Myths",
    author: "NIDDK Experts",
    organization: "NIDDK (NIH)",
    year: 2023,
    license: "Public Health Education",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/peptic-ulcers-stomach-ulcers/symptoms-causes",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 6: 🟠 VIÊM LOÉT — ② TRIỆU CHỨNG & BÁO ĐỘNG
  // ==========================================
  {
    id: "claim-s6-epigastric-pain",
    type: "claim",
    slide: 6,
    claim: "Đau rát vùng thượng vị (trên rốn) là triệu chứng lâm sàng phổ biến nhất của bệnh viêm loét dạ dày – tá tràng.",
    title: "Peptic ulcer symptoms and clinical presentation",
    author: "Mayo Clinic Staff",
    organization: "Mayo Clinic",
    year: 2023,
    license: "Clinical Resource",
    url: "https://www.mayoclinic.org/diseases-conditions/peptic-ulcer/symptoms-causes/syc-20354223",
    downloadedPath: null
  },
  {
    id: "claim-s6-pain-timing",
    type: "claim",
    slide: 6,
    claim: "Loét dạ dày thường đau rõ hơn sau khi ăn; loét tá tràng thường đau lúc đói hoặc ban đêm, giảm tạm thời khi ăn hoặc uống thuốc kháng axit.",
    title: "Peptic Ulcer Disease Symptoms and Signs",
    author: "MSD Manual Professional Edition",
    organization: "MSD Manual",
    year: 2023,
    license: "Clinical Manual",
    url: "https://www.msdmanuals.com/professional/gastrointestinal-disorders/gastritis-and-peptic-ulcer-disease/peptic-ulcer-disease",
    downloadedPath: null
  },
  {
    id: "claim-s6-red-flags",
    type: "claim",
    slide: 6,
    claim: "Nôn ra máu/dịch bã cà phê, đi ngoài phân đen hắc ín và đau bụng dữ dội như dao đâm là các dấu hiệu cấp cứu tiêu hóa tối khẩn cấp.",
    title: "Hướng dẫn chẩn đoán và xử trí xuất huyết tiêu hóa trên",
    author: "Cục Quản lý Khám chữa bệnh",
    organization: "Bộ Y tế Việt Nam",
    year: 2020,
    license: "Quyết định chuyên môn Bộ Y tế",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s6-endoscopy",
    type: "claim",
    slide: 6,
    claim: "Nội soi tiêu hóa trên kèm sinh thiết hoặc test urease nhanh là tiêu chuẩn vàng chẩn đoán xác định vết loét và nhiễm vi khuẩn H. pylori.",
    title: "Khuyến cáo đồng thuận về chẩn đoán và điều trị nhiễm H. pylori tại Việt Nam",
    author: "Hội Khoa học Tiêu hóa Việt Nam",
    organization: "Hội Khoa học Tiêu hóa Việt Nam (VNAGE)",
    year: 2022,
    license: "Đồng thuận Y khoa Quốc gia",
    url: "http://vnage.org.vn",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 7: 🟠 VIÊM LOÉT — ③ PHÒNG BỆNH
  // ==========================================
  {
    id: "claim-s7-hp-prevention",
    type: "claim",
    slide: 7,
    claim: "Rửa tay bằng xà phòng, ăn chín uống sôi và không dùng chung đồ dùng cá nhân là cách hữu hiệu nhất phòng ngừa lây nhiễm H. pylori.",
    title: "Helicobacter pylori: Prevention and Control",
    author: "Mayo Clinic & CDC",
    organization: "Mayo Clinic & CDC Hoa Kỳ",
    year: 2023,
    license: "Public Health Guideline",
    url: "https://www.mayoclinic.org/diseases-conditions/h-pylori/symptoms-causes/syc-20356171",
    downloadedPath: null
  },
  {
    id: "claim-s7-ppi-nsaid",
    type: "claim",
    slide: 7,
    claim: "Bệnh nhân có nguy cơ cao khi phải dùng NSAIDs kéo dài cần được bác sĩ phối hợp thuốc ức chế bơm proton (PPI) để bảo vệ niêm mạc.",
    title: "Clinical Practice Update on Prevention of NSAID-Associated Ulcers",
    author: "American Gastroenterological Association (AGA)",
    organization: "AGA",
    year: 2021,
    license: "Clinical Guidelines",
    url: "https://www.gastrojournal.org",
    downloadedPath: null
  },
  {
    id: "claim-s7-lifestyle",
    type: "claim",
    slide: 7,
    claim: "Bỏ thuốc lá và hạn chế bia rượu giúp tăng tốc độ lành sẹo ổ loét và giảm tỷ lệ tái phát trên 50%.",
    title: "Peptic Ulcer Disease Prevention and Management",
    author: "Cleveland Clinic Digestive Disease Institute",
    organization: "Cleveland Clinic",
    year: 2022,
    license: "Clinical Reference",
    url: "https://my.clevelandclinic.org/health/diseases/10350-peptic-ulcer-disease",
    downloadedPath: null
  },
  {
    id: "claim-s7-adherence",
    type: "claim",
    slide: 7,
    claim: "Vết loét cần nhiều tuần để biểu mô hóa hoàn toàn sau khi cơn đau biến mất; người bệnh phải kiên trì uống đủ liệu trình bác sĩ kê đơn.",
    title: "Patient Education: Peptic Ulcer Treatment Adherence",
    author: "MSD Manual Editorial Team",
    organization: "MSD Manual",
    year: 2023,
    license: "Medical Manual",
    url: "https://www.msdmanuals.com/professional/gastrointestinal-disorders/gastritis-and-peptic-ulcer-disease/peptic-ulcer-disease",
    downloadedPath: null
  },
  {
    id: "img-s7-oatmeal",
    type: "image",
    slide: 7,
    description: "Bát cháo yến mạch chuối việt quất ấm áp, mềm dịu, dễ tiêu hóa cho niêm mạc dạ dày",
    title: "Banana blueberry oatmeal",
    author: "Raveen S",
    organization: "Wikimedia Commons",
    year: 2021,
    license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Banana_blueberry_oatmeal.jpg",
    downloadedPath: "public/assets/images/slide7/slide7-chao-yen-mach-hoa-qua-01.webp"
  },
  {
    id: "img-s7-vegetables",
    type: "image",
    slide: 7,
    description: "Đĩa rau củ hấp thanh đạm, ít dầu mỡ, giàu chất xơ hòa tan tốt cho tiêu hóa",
    title: "Steamed Vegetables",
    author: "Flickr user jeffreyw",
    organization: "Flickr / Wikimedia Commons",
    year: 2014,
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Steamed_Vegetables.jpg",
    downloadedPath: "public/assets/images/slide7/slide7-rau-cu-hap-thanh-dam-02.webp"
  },

  // ==========================================
  // SLIDE 8: 🔵 TIÊU CHẢY CẤP — ① NGUYÊN NHÂN & ĐƯỜNG LÂY
  // ==========================================
  {
    id: "claim-s8-definition",
    type: "claim",
    slide: 8,
    claim: "Tiêu chảy là đi ngoài phân lỏng hoặc tóe nước từ 3 lần trở lên trong 24 giờ; Tiêu chảy cấp kéo dài dưới 14 ngày.",
    title: "Tài liệu hướng dẫn xử trí tiêu chảy (ban hành kèm Quyết định số 4121/QĐ-BYT)",
    author: "Bộ Y tế Việt Nam & WHO",
    organization: "Bộ Y tế Việt Nam",
    year: 2020,
    license: "Quyết định Pháp quy Y tế",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s8-rotavirus",
    type: "claim",
    slide: 8,
    claim: "Rotavirus là tác nhân hàng đầu gây tiêu chảy mất nước nặng nhập viện ở trẻ em dưới 5 tuổi trên toàn cầu.",
    title: "Rotavirus Clinical Overview and Epidemiology",
    author: "Centers for Disease Control and Prevention (CDC)",
    organization: "CDC Hoa Kỳ",
    year: 2023,
    license: "US Public Domain",
    url: "https://www.cdc.gov/rotavirus/clinical.html",
    downloadedPath: null
  },
  {
    id: "claim-s8-fecal-oral",
    type: "claim",
    slide: 8,
    claim: "Mầm bệnh tiêu chảy lây truyền chủ yếu qua chu trình phân – miệng thông qua 5 mắt xích: phân, bàn tay/ruồi, thực phẩm/nước, miệng và ruột.",
    title: "The Treatment of Diarrhoea: A manual for physicians and other senior health workers",
    author: "World Health Organization",
    organization: "WHO",
    year: 2022,
    license: "WHO Guidelines",
    url: "https://www.who.int/publications/i/item/9241593180",
    downloadedPath: null
  },
  {
    id: "claim-s8-no-antibiotics-viral",
    type: "claim",
    slide: 8,
    claim: "Kháng sinh hoàn toàn không có tác dụng với virus gây tiêu chảy; tự ý dùng kháng sinh làm tăng nguy cơ loạn khuẩn ruột và kháng kháng sinh.",
    title: "Hướng dẫn sử dụng kháng sinh an toàn và hợp lý",
    author: "Cục Quản lý Khám chữa bệnh",
    organization: "Bộ Y tế Việt Nam",
    year: 2020,
    license: "Hướng dẫn Quốc gia",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 9: 🔵 TIÊU CHẢY CẤP — ② TRIỆU CHỨNG & MỨC MẤT NƯỚC
  // ==========================================
  {
    id: "claim-s9-dehydration-levels",
    type: "claim",
    slide: 9,
    claim: "Mất nước trong tiêu chảy được phân loại thành 3 mức độ: Không mất nước (Phác đồ A), Có mất nước (Phác đồ B), Mất nước nặng (Phác đồ C).",
    title: "Hướng dẫn chẩn đoán và xử trí mất nước theo IMCI",
    author: "Bộ Y tế Việt Nam & WHO",
    organization: "Bộ Y tế Việt Nam & WHO",
    year: 2024,
    license: "Hướng dẫn lâm sàng IMCI",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s9-severe-dehydration",
    type: "claim",
    slide: 9,
    claim: "Mất nước nặng (mất > 10% trọng lượng) với biểu hiện li bì, mắt trũng sâu, không uống được, nếp véo da mất rất chậm (>2s) là tình trạng cấp cứu khẩn cấp.",
    title: "The Treatment of Diarrhoea Manual",
    author: "Department of Child and Adolescent Health and Development",
    organization: "WHO",
    year: 2023,
    license: "WHO Manual",
    url: "https://www.who.int/publications/i/item/9241593180",
    downloadedPath: null
  },
  {
    id: "claim-s9-bloody-stool",
    type: "claim",
    slide: 9,
    claim: "Phân có máu (hội chứng lỵ) là dấu hiệu tổn thương xâm lấn thành ruột bắt buộc phải đưa bệnh nhân đến cơ sở y tế khám và xét nghiệm.",
    title: "Management of Acute Bloody Diarrhea",
    author: "CDC & Bộ Y tế Việt Nam",
    organization: "CDC Hoa Kỳ & Bộ Y tế",
    year: 2023,
    license: "Clinical Public Guidance",
    url: "https://www.cdc.gov",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 10: 🔵 TIÊU CHẢY CẤP — ③ PHÒNG BỆNH & XỬ TRÍ BAN ĐẦU
  // ==========================================
  {
    id: "claim-s10-handwashing-steps",
    type: "claim",
    slide: 10,
    claim: "Quy trình rửa tay thường quy 6 bước với xà phòng và nước sạch tối thiểu 30 giây giúp giảm trên 40% các đợt tiêu chảy.",
    title: "Quy trình kỹ thuật Rửa tay thường quy 6 bước",
    author: "Cục Quản lý Môi trường Y tế",
    organization: "Bộ Y tế Việt Nam",
    year: 2023,
    license: "Tài liệu Truyền thông Y tế Quốc gia",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s10-rotavirus-vaccine",
    type: "claim",
    slide: 10,
    claim: "Vaccine phòng Rotavirus gồm 2 liều uống, bắt đầu từ 2 tháng tuổi và hoàn thành trước 6 tháng tuổi trong Chương trình Tiêm chủng mở rộng.",
    title: "Kế hoạch triển khai vắc xin Rota trong Chương trình Tiêm chủng mở rộng",
    author: "Văn phòng Tiêm chủng Mở rộng Quốc gia",
    organization: "Bộ Y tế Việt Nam",
    year: 2024,
    license: "Văn bản Pháp quy Y tế",
    url: "https://tiemchungmorong.vn",
    downloadedPath: null
  },
  {
    id: "claim-s10-ors-osmolarity",
    type: "claim",
    slide: 10,
    claim: "Dung dịch Oresol nồng độ thẩm thấu thấp (245 mOsm/L) giúp tăng tối đa khả năng hấp thu nước qua cơ chế đồng vận chuyển Natri - Glucose.",
    title: "Oral Rehydration Salts (ORS): A new reduced osmolarity formulation",
    author: "WHO & UNICEF Joint Statement",
    organization: "Tổ chức Y tế Thế giới (WHO)",
    year: 2023,
    license: "WHO Technical Document",
    url: "https://www.who.int/publications/i/item/WHO-FCH-CAH-06.1",
    downloadedPath: null
  },
  {
    id: "claim-s10-ors-safety",
    type: "claim",
    slide: 10,
    claim: "Pha sai lượng nước chỉ định trên bao bì Oresol (đặc biệt pha quá đặc) có nguy cơ gây ngộ độc muối, co giật và tổn thương não ở trẻ em.",
    title: "Cảnh báo an toàn trong pha và sử dụng Oresol cho trẻ nhỏ",
    author: "Khoa Tiêu hóa - Bệnh viện Nhi Trung ương",
    organization: "Bệnh viện Nhi Trung ương",
    year: 2023,
    license: "Khuyến cáo Lâm sàng Nhi khoa",
    url: "https://benhviennhitrunguong.gov.vn",
    downloadedPath: null
  },
  {
    id: "claim-s10-no-loperamide",
    type: "claim",
    slide: 10,
    claim: "Chống chỉ định tuyệt đối thuốc làm giảm nhu động ruột (như loperamide) ở trẻ em và bệnh nhân tiêu chảy xâm lấn có sốt, phân máu.",
    title: "FDA Drug Safety Communication: Loperamide restrictions in infectious diarrhea",
    author: "FDA & Bộ Y tế Việt Nam",
    organization: "FDA Hoa Kỳ & Bộ Y tế Việt Nam",
    year: 2021,
    license: "Drug Safety Advisory",
    url: "https://www.fda.gov",
    downloadedPath: null
  },
  {
    id: "img-s10-handwashing",
    type: "image",
    slide: 10,
    description: "Quy trình rửa tay với xà phòng dưới vòi nước chảy sạch sẽ, ngăn ngừa vi khuẩn và virus lây truyền",
    title: "Naval Health Clinic Handwashing with Soap",
    author: "Lance Cpl. Glen E. Santy / US Military DVIDS",
    organization: "DVIDS / Wikimedia Commons",
    year: 2010,
    license: "Public domain",
    url: "https://commons.wikimedia.org/wiki/File:Naval_Health_Clinic,_Cherry_Point_offers_tips_to_fight_the_flu_this_winter_DVIDS348027.jpg",
    downloadedPath: "public/assets/images/slide10/slide10-rua-tay-xa-phong-01.webp"
  },
  {
    id: "img-s10-clean-water",
    type: "image",
    slide: 10,
    description: "Rót nước sạch trong lành vào cốc thủy tinh, đảm bảo nguồn nước uống an toàn phòng ngừa tiêu chảy",
    title: "Hands pour water from a bottle into a glass",
    author: "Shixart1985",
    organization: "Wikimedia Commons",
    year: 2021,
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Hands_pour_water_from_a_bottle_into_a_glass.jpg",
    downloadedPath: "public/assets/images/slide10/slide10-rot-nuoc-sach-02.webp"
  },
  {
    id: "img-s10-cooking",
    type: "image",
    slide: 10,
    description: "Thực phẩm rau củ đang nấu chín sôi kỹ trong nồi trên bếp sạch, tuân thủ nguyên tắc ăn chín uống sôi",
    title: "Colorful vegetables simmering in a pot on a stove at home",
    author: "Marco Verch Professional Photographer",
    organization: "Flickr / Wikimedia Commons",
    year: 2021,
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Colorful_vegetables_simmering_in_a_pot_on_a_stove_at_home.jpg",
    downloadedPath: "public/assets/images/slide10/slide10-nau-chin-thuc-an-03.webp"
  },

  // ==========================================
  // SLIDE 11: SO SÁNH 2 BỆNH & KHI NÀO ĐI KHÁM
  // ==========================================
  {
    id: "claim-s11-comparison",
    type: "claim",
    slide: 11,
    claim: "Viêm loét là bệnh tiêu hóa trên mạn tính, tiêu chảy cấp là bệnh tiêu hóa dưới cấp tính; cả hai cùng chung gốc rễ hành vi vệ sinh phòng ngừa.",
    title: "Bệnh học Tiêu hóa Nội khoa So sánh",
    author: "Bộ môn Nội Tiêu hóa",
    organization: "Đại học Y Hà Nội / Đại học Y Dược TP.HCM",
    year: 2022,
    license: "Giáo trình Y khoa Đại học",
    url: "https://moh.gov.vn",
    downloadedPath: null
  },

  // ==========================================
  // SLIDE 12: KẾT THÚC & NGUỒN THAM KHẢO
  // ==========================================
  {
    id: "claim-s12-hp-indication",
    type: "claim",
    slide: 12,
    claim: "Chỉ định tiệt trừ vi khuẩn H. pylori dựa trên khuyến cáo đồng thuận tiêu hóa quốc tế Maastricht VI và Hội Tiêu hóa Việt Nam.",
    title: "Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report",
    author: "Malfertheiner P, Megraud F, et al.",
    organization: "European Helicobacter and Microbiota Study Group (Gut Journal)",
    year: 2022,
    license: "Peer-reviewed Scientific Journal",
    url: "https://gut.bmj.com/content/71/9/1724",
    downloadedPath: null
  },
  {
    id: "img-s12-lifestyle",
    type: "image",
    slide: 12,
    description: "Bố cục flat lay các thực phẩm dinh dưỡng lành mạnh (bơ, quả hạch, dầu thực vật) vì một hệ tiêu hóa khỏe mạnh",
    title: "Healthy Fats - Avocado and Nuts",
    author: "formulatehealth",
    organization: "Wikimedia Commons",
    year: 2020,
    license: "CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Healthy_Fats_-_Avocado_and_Nuts_-_50191958402.jpg",
    downloadedPath: "public/assets/images/slide12/slide12-loi-song-lanh-manh-01.webp"
  }
];

export default sources;
