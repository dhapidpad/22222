# GUT CARE — Báo Cáo Chuyên Đề Sinh Học 11

> **Chuyên đề:** Tìm hiểu nguyên nhân, triệu chứng và cách phòng bệnh về tiêu hóa thường gặp ở người (Viêm loét dạ dày – tá tràng & Tiêu chảy cấp).  
> **Thực hiện:** Nhóm 2 · Lớp 11A5  
> **Năm học:** 2025 – 2026

---

## 🌟 Giới thiệu dự án

Bộ slide thuyết trình tương tác cao cấp dành cho báo cáo chuyên đề Sinh học 11, xây dựng trên nền tảng **React + Vite + TailwindCSS + Framer Motion**.

* **Chuẩn 10 Slide toàn diện:**
  1. Trang bìa Chuyên đề GUT CARE
  2. Video dẫn nhập sinh động (43s)
  3. Đội ngũ 9 thành viên Nhóm 2 – 11A5
  4. Giải phẫu & Sinh lý dạ dày (Cấu trúc 4 lớp, HCl, Pepsin)
  5. Viêm loét dạ dày – tá tràng: Căn nguyên (*H. pylori*, NSAIDs, stress)
  6. Viêm loét dạ dày: Triệu chứng & Dấu hiệu cờ đỏ cấp cứu
  7. Phòng bệnh viêm loét & Chế độ sinh hoạt khoa học
  8. Tiêu chảy cấp toàn diện (Dấu hiệu, Căn nguyên lây lan, Phác đồ Oresol, Tổng kết)
  9. Đấu trí y khoa (Minigame Arena 6 câu hỏi tương tác)
  10. Tổng kết, Vấn đáp Q&A, Cam kết 5T & Danh mục nguồn trích dẫn y khoa (Bộ Y tế, WHO)

---

## 🛠️ Cài đặt & Chạy dưới Local

```bash
# Cài đặt thư viện
npm install

# Khởi chạy máy chủ phát triển
npm run dev

# Biên dịch sản phẩm đóng gói
npm run build

# Xem trước bản đóng gói
npm run preview
```

---

## 🚀 Triển khai (Deploy) lên Render

Dự án đã tích hợp sẵn file cấu hình `render.yaml`.
* **Loại dịch vụ:** Static Site
* **Build Command:** `npm install && npm run build`
* **Publish Directory:** `dist`
* **Rewrite Rule:** `/*` -> `/index.html`
