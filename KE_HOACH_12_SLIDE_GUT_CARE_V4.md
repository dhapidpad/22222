# 🌿 GUT CARE — KẾ HOẠCH 12 SLIDE (React + SVG + Antigravity)

> **Chủ đề:** Viêm loét dạ dày – tá tràng & Tiêu chảy cấp (nguyên nhân – triệu chứng – phòng ngừa)
> **Thương hiệu:** GUT CARE — *"Tiêu hóa khỏe mạnh, sống vui mỗi ngày"*
> **Ngôn ngữ:** 100% tiếng Việt
> **Công nghệ:** React 18 + Vite + Tailwind CSS + Framer Motion + lucide-react + SVG tự vẽ
> **Công cụ chạy:** Antigravity (agent tự research ảnh + nội dung, tự code, tự kiểm tra)
> **Phong cách:** Sáng – trong – mát – y tế thân thiện (glassmorphism nhẹ, bo góc lớn, nhiều SVG minh họa)

---

## 0. TỔNG QUAN NHANH

### 🎯 Câu hỏi nghiên cứu (trục xuyên suốt cả bài)
> **"Tìm hiểu nguyên nhân, triệu chứng và cách phòng bệnh về tiêu hóa thường gặp ở người (2 bệnh)."**

**Hai bệnh được chọn:** 🟠 **Bệnh 1 — Viêm loét dạ dày – tá tràng** · 🔵 **Bệnh 2 — Tiêu chảy cấp**.
Mỗi bệnh trả lời **đủ 3 ý, mỗi ý một slide riêng**:

| | ① NGUYÊN NHÂN | ② TRIỆU CHỨNG | ③ CÁCH PHÒNG BỆNH |
|---|---|---|---|
| 🟠 **Viêm loét dạ dày – tá tràng** | Slide 5 | Slide 6 | Slide 7 |
| 🔵 **Tiêu chảy cấp** | Slide 8 | Slide 9 | Slide 10 |

Slide 4 là kiến thức nền, Slide 11 so sánh 2 bệnh để chốt ý, Slide 12 trả lời câu hỏi nghiên cứu và kết thúc. **Không có mini game/quiz** — toàn bộ tập trung vào nội dung.

**Thanh điều hướng nội dung (làm ở `SlideShell`, hiện trên đầu slide 5–10):** một dải chip nhỏ `🟠 Bệnh 1 · Viêm loét  ›  [① Nguyên nhân] ② Triệu chứng ③ Phòng bệnh` (hoặc 🔵 Bệnh 2) — chip đang xem sáng lên để khán giả luôn biết mình đang ở đâu.

| # | Slide | Vai trò | Thời lượng nói |
|---|-------|---------|----------------|
| 1 | **Trang bìa** | Gây ấn tượng, nêu chủ đề | 0:30 |
| 2 | **Video giới thiệu** | Dẫn dắt "vì sao cần quan tâm tiêu hóa" | 1:00 |
| 3 | **Giới thiệu thành viên** | 9 người – 9 phần việc | 0:45 |
| 4 | **Hệ tiêu hóa & dạ dày – tá tràng** | Kiến thức nền, giải phẫu | 1:15 |
| 5 | **🟠 Viêm loét — ① Nguyên nhân** | H. pylori, thuốc NSAID, thói quen | 1:30 |
| 6 | **🟠 Viêm loét — ② Triệu chứng** | Nhận biết sớm + dấu hiệu nguy hiểm | 1:30 |
| 7 | **🟠 Viêm loét — ③ Phòng bệnh** | 4 "khiên" bảo vệ dạ dày | 1:30 |
| 8 | **🔵 Tiêu chảy cấp — ① Nguyên nhân** | Virus – vi khuẩn – ký sinh trùng, đường lây | 1:30 |
| 9 | **🔵 Tiêu chảy cấp — ② Triệu chứng** | Dấu hiệu, mức mất nước, khi nào nguy hiểm | 1:30 |
| 10 | **🔵 Tiêu chảy cấp — ③ Phòng bệnh** | Rửa tay, ăn chín uống sôi, vaccine, ORS | 1:30 |
| 11 | **So sánh 2 bệnh & khi nào đi khám** | Giao nhau – khác nhau, chốt ý | 1:15 |
| 12 | **Kết thúc** | Trả lời câu hỏi nghiên cứu, cảm ơn, nguồn | 0:45 |

**Tổng ≈ 14–15 phút.**
**Nếu thiếu thời gian:** gộp Slide 8 + 9 (tiêu chảy) thành 1 slide, rút Slide 4 còn 45 giây; vẫn đủ 3 ý cho cả 2 bệnh.

---

## 1. NGUYÊN TẮC THIẾT KẾ TỔNG THỂ

### 1.1 Cảm giác mong muốn
**Sáng, sạch, tươi, đáng tin** — như một ứng dụng sức khỏe cao cấp, KHÔNG u tối, KHÔNG phim kinh dị. Bệnh lý được minh họa bằng SVG hoạt hình dễ thương, rõ ràng, không máu me.

### 1.2 Bảng màu (sáng nhất – đẹp nhất)

| Vai trò | Tên | HEX | Dùng cho |
|---|---|---|---|
| Nền chính | Kem trắng ngọc | `#F7FCFB` | Background toàn slide |
| Nền phụ | Mint nhạt | `#E3F7F2` | Khối, thẻ, vùng nhấn |
| Chủ đạo 1 | Xanh ngọc | `#1FBFA8` | Nút, tiêu đề phụ, icon |
| Chủ đạo 2 | Xanh biển sáng | `#3BB8F0` | Nước, tiêu chảy, mất nước |
| Nhấn ấm 1 | Cam đào | `#FF8A5B` | Dạ dày, viêm, đau |
| Nhấn ấm 2 | Vàng nắng | `#FFD166` | Highlight, ngôi sao, mẹo hay |
| Nhấn hồng | Hồng san hô | `#FF6F91` | Cảnh báo nhẹ, tim, tim mạch |
| Cảnh báo | Đỏ tươi | `#EF4B5F` | CHỈ cho dấu hiệu nguy hiểm |
| Chữ đậm | Xanh than | `#12343B` | Tiêu đề, nội dung |
| Chữ phụ | Xám xanh | `#5B7B80` | Chú thích |

**Gradient chủ đạo:**
- `--grad-hero`: `linear-gradient(135deg, #E3F7F2 0%, #CFF1FF 50%, #FFF1D6 100%)`
- `--grad-brand`: `linear-gradient(135deg, #1FBFA8, #3BB8F0)`
- `--grad-warm`: `linear-gradient(135deg, #FF8A5B, #FFD166)`

**Quy tắc màu theo bệnh (xuyên suốt, giúp khán giả nhớ):**
- 🟠 **Cam đào** = viêm loét dạ dày – tá tràng
- 🔵 **Xanh biển** = tiêu chảy cấp / nước / ORS
- 🟢 **Xanh ngọc** = phòng ngừa, tích cực, GUT CARE
- 🔴 **Đỏ** = chỉ dấu hiệu nguy hiểm cần đi khám ngay

### 1.3 Chữ (hỗ trợ tiếng Việt đầy đủ)
- Tiêu đề: **Be Vietnam Pro** 800 / 700
- Nội dung: **Nunito** hoặc **Be Vietnam Pro** 400/500
- Số/nhãn: **Be Vietnam Pro** 600
- Cỡ chữ (canvas 1920×1080): H1 `96px`, H2 `64px`, H3 `40px`, body `28–32px`, caption `22px`
- Giới hạn: **mỗi slide tối đa ~40 từ chữ chính**, còn lại là hình/SVG/icon.

### 1.4 Hình khối & hiệu ứng nền
- Bo góc: `28px` (thẻ), `999px` (nút/chip)
- Bóng: `0 20px 60px rgba(31,191,168,.18)` (bóng mint mềm)
- Thẻ kính: `background: rgba(255,255,255,.65); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.8)`
- Nền động: 3–5 **blob** gradient trôi chậm (SVG `<circle>` + blur) + vài **bong bóng** nhỏ nổi lên
- Hạt mịn (noise) opacity 3% để nền không phẳng chết

### 1.5 Khung canvas & responsive
- **Desktop/Tablet ngang:** canvas thiết kế `1920×1080` (16:9), tự scale vừa khung bằng `FitStage` (transform scale, giữ letterbox mềm).
- **Mobile dọc (< 768px):** KHÔNG scale nhỏ lại — **tái bố cục một cột**, cuộn dọc trong từng slide, chữ ≥ 16px, nút ≥ 44px.
- Hook `useLayoutMode()` trả về `'desktop' | 'mobile'`; mỗi slide có 2 layout (xem từng slide bên dưới).
- Điều hướng: phím ← →, vuốt ngang (mobile), thanh chấm tiến độ, nút Prev/Next, phím `F` toàn màn hình.

---

## 2. KIẾN TRÚC DỰ ÁN

```
gut-care/
├─ public/
│  ├─ assets/
│  │  ├─ images/        # ảnh tải về (đã nén .webp)
│  │  ├─ video/         # (tuỳ chọn) intro.mp4 + poster.jpg
│  │  └─ audio/         # nhạc nền nhẹ (tuỳ chọn), sfx
│  └─ favicon.svg
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx                      # điều hướng slide, FitStage
│  ├─ index.css                    # biến màu, font, tailwind
│  ├─ data/
│  │  ├─ presentationMetadata.js   # tên đề tài, nhóm, lớp, giáo viên
│  │  ├─ teamMembers.js            # 9 thành viên + phần việc
│  │  ├─ content.js                # TOÀN BỘ nội dung chữ từng slide
│  │  └─ sources.js                # danh sách nguồn tham khảo + ảnh (credit)
│  ├─ hooks/
│  │  ├─ useLayoutMode.js
│  │  ├─ useSlideNav.js
│  │  └─ useReducedMotion.js
│  ├─ components/
│  │  ├─ FitStage.jsx
│  │  ├─ SlideShell.jsx            # nền động + tiêu đề + footer chuẩn
│  │  ├─ GlassCard.jsx
│  │  ├─ Blobs.jsx  Bubbles.jsx
│  │  ├─ ProgressDots.jsx
│  │  ├─ Callout.jsx               # hộp "Bạn có biết?" / cảnh báo
│  │  └─ svg/
│  │     ├─ DigestiveSystem.jsx    # hệ tiêu hóa đầy đủ (có thể tách từng bộ phận)
│  │     ├─ Stomach.jsx            # dạ dày + ổ loét (có thể zoom)
│  │     ├─ HPylori.jsx            # vi khuẩn xoắn dễ thương
│  │     ├─ Pill.jsx  Cigarette.jsx  Coffee.jsx  Stress.jsx
│  │     ├─ WaterDrop.jsx  Bacteria.jsx  Virus.jsx  Toilet.jsx
│  │     ├─ Dehydration.jsx        # thang mất nước
│  │     ├─ HandWash.jsx           # 6 bước rửa tay
│  │     ├─ FoodPlate.jsx          # đĩa ăn nên/không nên
│  │     ├─ ORSBottle.jsx
│  │     ├─ Clock24h.jsx  Plate.jsx  Shield.jsx      # slide 7
│  │     └─ VennCompare.jsx  TopicChip.jsx           # slide 11, thanh điều hướng
│  ├─ slides/
│  │  ├─ Slide1Hero.jsx
│  │  ├─ Slide2Video.jsx
│  │  ├─ Slide3Team.jsx
│  │  ├─ Slide4Anatomy.jsx
│  │  ├─ Slide5UlcerCauses.jsx
│  │  ├─ Slide6UlcerSymptoms.jsx
│  │  ├─ Slide7UlcerPrevention.jsx
│  │  ├─ Slide8DiarrheaCauses.jsx
│  │  ├─ Slide9DiarrheaSymptoms.jsx
│  │  ├─ Slide10DiarrheaPrevention.jsx
│  │  ├─ Slide11Compare.jsx
│  │  └─ Slide12Closing.jsx
│  └─ audio/sfx.js
├─ .agents/skills/                 # skill cho Antigravity (responsive, svg, motion, research)
├─ KE_HOACH_12_SLIDE_GUT_CARE_V4.md # file này
└─ package.json
```

**Gói cài:** `react react-dom framer-motion lucide-react` + dev: `vite @vitejs/plugin-react tailwindcss postcss autoprefixer`.

---

## 3. PHÂN CÔNG — AI LÀM GÌ?

> Nhóm 9 người, 12 slide: mỗi người **sở hữu ít nhất 1 slide** (nội dung + kiểm chứng nguồn); TV4, TV7, TV9 nhận 2 slide. Người code chính và người thiết kế gánh thêm phần kỹ thuật chung. Điền tên thật vào cột "Thành viên" (đồng bộ với `data/teamMembers.js`).

| Slide | Thành viên phụ trách | Việc chính | Phối hợp |
|---|---|---|---|
| **1 – Bìa** | TV1 — *Trưởng nhóm / Thiết kế* | Chốt tên, slogan, bảng màu, chọn font; duyệt toàn bộ giao diện | TV9 |
| **2 – Video** | TV2 — *Dựng video / Motion* | Kịch bản 5 cảnh, voice-over/phụ đề, dựng animation SVG hoặc video | TV1 |
| **3 – Thành viên** | TV3 — *Quản lý dữ liệu nhóm* | Ảnh chân dung, vai trò, câu slogan mỗi người, `teamMembers.js` | Cả nhóm |
| **4 – Hệ tiêu hóa** | TV4 — *Nội dung hệ tiêu hóa* | Chức năng dạ dày – ruột, chú thích SVG | TV1 |
| **5 – Loét: Nguyên nhân** | TV5 — *Bệnh loét* | H. pylori, NSAID, rượu, thuốc lá, stress; tìm nguồn | TV6 |
| **6 – Loét: Triệu chứng** | TV6 — *Bệnh loét* | Triệu chứng, dấu hiệu báo động, phân biệt dạ dày/tá tràng | TV5 |
| **7 – Loét: Phòng bệnh** | TV4 — *Hệ tiêu hóa & dinh dưỡng* | 4 khiên bảo vệ, đĩa ăn, đồng hồ 24h | TV5 |
| **8 – Tiêu chảy: Nguyên nhân** | TV7 — *Bệnh tiêu chảy* | Tác nhân, đường lây phân–miệng, nhóm nguy cơ | TV8 |
| **9 – Tiêu chảy: Triệu chứng** | TV8 — *Bệnh tiêu chảy* | Triệu chứng, thang mất nước, dấu hiệu nguy hiểm | TV7 |
| **10 – Tiêu chảy: Phòng bệnh** | TV7 — *Bệnh tiêu chảy* | Rửa tay 6 bước, ăn chín uống sôi, vaccine, ORS | TV8 |
| **11 – So sánh 2 bệnh** | TV9 — *Tổng hợp / Thuyết trình* | Venn, bảng so sánh, khi nào đi khám | TV5, TV7 |
| **12 – Kết thúc** | TV9 — *Tổng hợp / Thuyết trình* | Trả lời câu hỏi nghiên cứu, nguồn tham khảo, Q&A dự kiến | TV1 |

**Vai trò xuyên suốt (kiêm nhiệm):**
- **Người điều khiển Antigravity (Code Lead):** TV1 hoặc TV2 — chạy prompt, review code, merge.
- **Kiểm duyệt y khoa:** TV5 + TV6 cho bệnh loét; TV7 + TV8 cho bệnh tiêu chảy — mọi con số/khẳng định phải có nguồn trong `sources.js`.
- **Kiểm thử thiết bị (QA):** TV3 + TV9 — test trên điện thoại thật, máy chiếu, Chrome/Safari.

**Dây chuyền làm việc (mỗi slide đi qua 5 trạm):**
`① Research (Antigravity) → ② Duyệt nội dung (chủ slide) → ③ Code + SVG (Antigravity) → ④ Review thẩm mỹ (TV1) → ⑤ QA đa thiết bị (TV3/TV9)`

**Lịch gợi ý (5 ngày):**
| Ngày | Việc |
|---|---|
| 1 | Chốt kế hoạch, dựng khung (App, FitStage, theme, SlideShell, TopicChip), research tổng |
| 2 | Slide 1, 2, 3 + SVG hệ tiêu hóa |
| 3 | **Bệnh 1:** Slide 4, 5, 6, 7 |
| 4 | **Bệnh 2:** Slide 8, 9, 10 |
| 5 | Slide 11, 12 → polish animation, test mobile, tập thuyết trình |

---

## 4. CHI TIẾT TỪNG SLIDE

> Ký hiệu bố cục: `█` khối chữ · `◐` SVG/hình · `▢` thẻ · `→` hướng animation. Canvas desktop 1920×1080.

---

### 🎬 SLIDE 1 — TRANG BÌA "TIÊU HÓA KHỎE MẠNH"

**Mục tiêu:** 3 giây đầu khán giả phải thốt lên "đẹp quá" và hiểu ngay chủ đề.

**Bố cục desktop (chia 55/45):**
```
┌──────────────────────────────────────────────────────────────┐
│ [logo GUT CARE 🌿]                         [Nhóm · Lớp · Năm]│
│                                                              │
│   ┌────────────────────────┐        ◐◐◐◐◐◐◐◐◐◐◐◐◐◐◐        │
│   │ █ BÁO CÁO SỨC KHỎE     │      ◐   HỆ TIÊU HÓA SVG   ◐    │
│   │ █████████████████████  │      ◐  (to, trung tâm,    ◐    │
│   │ █ TIÊU HÓA             │      ◐   nổi bóng + các    ◐    │
│   │ █ KHỎE MẠNH            │      ◐   vòng sáng quay)   ◐    │
│   │ ─────────────────────  │       ◐   bong bóng, lá     ◐   │
│   │ Viêm loét dạ dày–tá    │        ◐◐◐◐◐◐◐◐◐◐◐◐◐◐◐       │
│   │ tràng & Tiêu chảy cấp  │                                 │
│   │ [▶ BẮT ĐẦU] [Giới thiệu│    ▢ chip: Nguyên nhân          │
│   │            nhóm]       │    ▢ chip: Triệu chứng          │
│   └────────────────────────┘    ▢ chip: Phòng ngừa           │
│ ~~~~~~~~~ sóng mint + xanh biển chạy ngang đáy ~~~~~~~~~~~~~ │
└──────────────────────────────────────────────────────────────┘
```
- Cột trái: tiêu đề 2 dòng (H1 96px, gradient chữ mint→xanh biển, từ "KHỎE MẠNH" có gạch chân vẽ tay màu vàng nắng), phụ đề, 2 nút (nút chính gradient brand + bóng; nút phụ viền).
- Cột phải: **`DigestiveSystem` SVG** lớn, 3 chip nổi xung quanh trỏ vào bộ phận tương ứng (dạ dày → "Nguyên nhân", ruột non → "Triệu chứng", ruột già → "Phòng ngừa").

**Bố cục mobile:** logo trên → SVG hệ tiêu hóa (cao 40vh) → tiêu đề → phụ đề → nút to full-width → 3 chip xếp ngang cuộn được.

**Màu:** nền `--grad-hero`; tiêu đề chữ gradient brand; nút chính brand; điểm nhấn vàng nắng.

**SVG cần vẽ:** `DigestiveSystem` (thực quản, dạ dày cam đào, gan nâu nhạt, ruột non hồng san hô cuộn, ruột già xanh ngọc), lá cây nhỏ, bong bóng, sóng đáy.

**Animation:**
1. 0–0.6s: nền blob mờ dần hiện, logo rơi nhẹ.
2. 0.6–1.6s: tiêu đề hiện từng chữ (stagger 40ms, trượt lên + blur→rõ).
3. 1–3s: hệ tiêu hóa **tự vẽ nét (stroke-dashoffset)** rồi tô màu từng bộ phận theo thứ tự: miệng → thực quản → dạ dày → ruột non → ruột già.
4. Liên tục: các hạt "thức ăn" (chấm vàng) chạy dọc đường ống tiêu hóa, dạ dày co bóp nhẹ (scale 1→1.04 mỗi 2s), blob trôi, sóng đáy chạy.
5. Hover/chạm vào bộ phận → phát sáng + tooltip tên (1 câu).
6. Nút "BẮT ĐẦU": hiệu ứng ripple + sfx tick, chuyển slide dạng "lan nước".

**Nội dung chữ:**
- Nhãn nhỏ: `BÁO CÁO SỨC KHỎE CỘNG ĐỒNG`
- H1: `TIÊU HÓA KHỎE MẠNH`
- Phụ đề: `Viêm loét dạ dày – tá tràng & Tiêu chảy cấp: Nguyên nhân · Triệu chứng · Phòng ngừa`
- Footer: `Nhóm [tên nhóm] · Lớp [..] · [Năm học]`

**Ảnh/research:** không bắt buộc ảnh thật (dùng SVG). Có thể thêm 1 ảnh texture lá xanh làm họa tiết mờ.

**Tiêu chí hoàn thành:** tải < 2s, không giật, chữ đọc rõ trên máy chiếu, mobile không tràn.

---

### 🎞️ SLIDE 2 — VIDEO GIỚI THIỆU CHỦ ĐỀ

**Mục tiêu:** Dẫn dắt cảm xúc: *"Mỗi ngày bụng ta làm việc không nghỉ — nhưng ta có đang chăm sóc nó?"* Dài 45–60 giây.

**Hai phương án (Antigravity làm A, B là dự phòng):**
- **A. Video tự dựng bằng code (khuyên dùng):** timeline 5 cảnh SVG + chữ chạy + nhạc nền nhẹ → nhẹ, sắc nét, không phụ thuộc file.
- **B. Video file:** `public/assets/video/intro.mp4` (1080p, H.264, < 25MB) + `poster.jpg`; hoặc nhúng YouTube *unlisted*.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 02 · GIỚI THIỆU                              ● ● ○ ○ ○ ○ ○ ○ ○│
│                                                              │
│  ╔══════════════════════════════════════════╗  ▢ "Bạn có biết?"│
│  ║                                          ║  ▢ Số liệu 1     │
│  ║      KHUNG VIDEO 16:9 bo góc 32px        ║  ▢ Số liệu 2     │
│  ║      (viền gradient + bóng mint,         ║  ▢ Số liệu 3     │
│  ║       hơi nghiêng 3D khi hover)          ║                  │
│  ╚══════════════════════════════════════════╝                  │
│  [⏮] [▶/⏸] ━━━━━━●━━━━━━━ 0:23/0:55 [🔊] [CC] [⛶]            │
│  Cảnh: ① Một ngày của bụng ② Thói quen xấu ③ Cơn đau ④ Nước ⑤ GUT CARE│
└──────────────────────────────────────────────────────────────┘
```
- Khung video chiếm ~68% chiều ngang, cột phải là 3 thẻ "con số gây chú ý" (hiện lần lượt theo cảnh).

**Bố cục mobile:** video full-width trên cùng → thanh điều khiển → thẻ "con số" xếp dọc → tên cảnh dạng chip.

**Kịch bản 5 cảnh (≈ 55s):**
| Cảnh | Giây | Hình SVG/animation | Lời/phụ đề |
|---|---|---|---|
| ① Một ngày của bụng | 0–10 | Hoạt hình bữa sáng–trưa–tối, thức ăn chạy vào hệ tiêu hóa | "Mỗi ngày, hệ tiêu hóa của bạn làm việc không ngừng nghỉ." |
| ② Thói quen xấu | 10–20 | Cà phê, trà đá, đồ cay, bỏ bữa, thức khuya, thuốc giảm đau, rượu bia hiện dần, dạ dày nhăn mặt | "Ăn trễ, bỏ bữa, stress, rượu bia… dạ dày âm thầm chịu đựng." |
| ③ Cơn đau | 20–32 | Zoom vào dạ dày, xuất hiện ổ loét (vòng cam đỏ), vi khuẩn xoắn lắc lư | "Viêm loét dạ dày – tá tràng ảnh hưởng nhiều người, nhưng dễ bị xem nhẹ." |
| ④ Nước & ruột | 32–44 | Giọt nước, vi khuẩn/virus, ruột co thắt, giọt nước cạn dần | "Tiêu chảy cấp có thể gây mất nước nhanh, nhất là ở trẻ em và người già." |
| ⑤ GUT CARE | 44–55 | Rửa tay, ăn chín uống sôi, ORS, trái tim mint lan sáng, logo hiện | "Hiểu đúng – phòng sớm – chăm sóc đúng cách. Cùng GUT CARE!" |

**Số liệu cột phải:** Antigravity **research số liệu chính thống (WHO, Bộ Y tế VN, NIDDK/Mayo Clinic)**, ghi rõ năm + nguồn; nếu không tìm được số chắc chắn thì dùng câu định tính, **không bịa số**.

**Animation/hiệu ứng:** chuyển cảnh kiểu "giọt nước loang" (clip-path circle), chữ phụ đề trượt mượt, thanh tiến độ gradient, nền nhạc piano nhẹ (volume 25%, có nút tắt), tự động play khi vào slide **chỉ sau 1 lần chạm** (do trình duyệt chặn autoplay có tiếng) — hiện nút to "▶ XEM GIỚI THIỆU".

**Yêu cầu kỹ thuật:** `Slide2Video.jsx` có `useTimeline` (mảng cảnh + thời điểm), play/pause/seek, phụ đề bật/tắt, `prefers-reduced-motion` → hiện ảnh tĩnh từng cảnh.

**Ảnh/clip research (nếu dùng phương án B hoặc làm nền):** Pexels/Pixabay/Unsplash/Wikimedia Commons (giấy phép cho dùng + ghi nguồn); từ khóa: *healthy breakfast*, *stomach ache*, *drinking water*, *washing hands*, *fresh vegetables*.

---

### 👥 SLIDE 3 — GIỚI THIỆU THÀNH VIÊN

**Mục tiêu:** Cho thấy nhóm 9 người, mỗi người một phần việc, thân thiện – chuyên nghiệp. Tiêu đề: **"9 người, một dây chuyền chăm sóc tiêu hóa"**.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 03 · ĐỘI NGŨ                                                 │
│        █ 9 NGƯỜI · MỘT DÂY CHUYỀN CHĂM SÓC TIÊU HÓA          │
│                                                              │
│  ┌─────────────────────────┐   ┌──────┬──────┬──────┐       │
│  │  THẺ THÀNH VIÊN ĐANG    │   │ ◉ 01 │ ◉ 02 │ ◉ 03 │       │
│  │  CHỌN (lớn)             │   ├──────┼──────┼──────┤       │
│  │  ◐ ảnh tròn lớn         │   │ ◉ 04 │ ◉ 05 │ ◉ 06 │       │
│  │  Họ tên · vai trò       │   ├──────┼──────┼──────┤       │
│  │  "Slogan 1 câu"         │   │ ◉ 07 │ ◉ 08 │ ◉ 09 │       │
│  │  Phụ trách: Slide N     │   └──────┴──────┴──────┘       │
│  └─────────────────────────┘   (lưới avatar 3×3, bấm chọn)   │
│  ●─────●─────●─────●─────●─────●─────●─────●─────●  dây chuyền│
│  Research → Nội dung → Thiết kế → Code → Kiểm thử → Trình bày │
└──────────────────────────────────────────────────────────────┘
```
- Trái: **thẻ lớn** của người đang chọn (tự chuyển mỗi 4s, bấm để chọn).
- Phải: **lưới 3×3 avatar** (ảnh tròn viền gradient; người đang chọn phóng to + vòng sáng).
- Đáy: **dây chuyền làm việc** 9 điểm nối nhau, điểm của người đang chọn sáng lên.

**Bố cục mobile:** thẻ lớn trên → dải avatar cuộn ngang (rail) → dây chuyền thu gọn dạng danh sách dọc.

**Dữ liệu:** `../data/teamMembers` (`teamMembers`, `teamInfo`, `groups`) — mỗi người có: `id, name, role, slide, slogan, avatar, color`.

**Màu:** mỗi người một màu nhấn lấy từ bảng chủ đạo (xoay vòng mint, xanh biển, cam đào, vàng nắng, hồng san hô).

**Animation:** avatar bay vào theo hình cung (stagger), thẻ lớn lật 3D nhẹ khi đổi người, dây chuyền "chạy điện sáng" từ trái sang phải, `sfx.tick` khi chọn.

**Ảnh:** ảnh chân dung thật do nhóm cung cấp (`/public/assets/images/team/01.webp`…). Nếu chưa có → avatar SVG hoạt hình (tròn, màu nền theo người) làm chỗ giữ chỗ.

---

### 🫁 SLIDE 4 — HỆ TIÊU HÓA & DẠ DÀY – TÁ TRÀNG (KIẾN THỨC NỀN)

**Mục tiêu:** Hiểu "chuyện gì xảy ra trong bụng" để các slide sau dễ hiểu. Thông điệp: *"Dạ dày có lớp niêm mạc bảo vệ — khi lớp này yếu đi, axit sẽ gây tổn thương."*

**Bố cục desktop (tâm là SVG tương tác):**
```
┌──────────────────────────────────────────────────────────────┐
│ 04 · KIẾN THỨC NỀN        █ HÀNH TRÌNH CỦA BỮA ĂN           │
│                                                              │
│ ▢ Thực quản ─────┐                    ┌───── ▢ Gan – Mật      │
│ ▢ Dạ dày ────────┤     ◐◐◐◐◐◐◐◐       ├───── ▢ Tụy           │
│   (cam đào)      │   ◐  HỆ TIÊU HÓA ◐ │                       │
│ ▢ Tá tràng ──────┤   ◐   SVG LỚN     ◐ ├───── ▢ Ruột non      │
│                  │     ◐◐◐◐◐◐◐◐       └───── ▢ Ruột già      │
│                                                              │
│ ┌──────────── PHÓNG TO LỚP NIÊM MẠC DẠ DÀY ────────────┐     │
│ │ ◐ lát cắt: Axit HCl ↔ lớp chất nhầy ↔ tế bào niêm mạc │     │
│ └──────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```
- Giữa: hệ tiêu hóa SVG lớn; 6 nhãn có đường dẫn chỉ vào bộ phận (hover/chạm → bộ phận sáng, các bộ phận khác mờ đi, hiện thẻ chức năng 1–2 câu).
- Dải đáy: **lát cắt phóng to thành dạ dày** — 3 lớp: chất nhầy (xanh ngọc, "lá chắn"), tế bào niêm mạc (hồng), axit (cam, giọt nhỏ bị chặn lại bên ngoài).

**Bố cục mobile:** SVG hệ tiêu hóa phía trên (chạm bộ phận → thẻ chức năng dưới) → lát cắt niêm mạc dạng thẻ riêng ở dưới.

**Nội dung cần research & xác minh:** vị trí/chức năng dạ dày, tá tràng (đoạn đầu ruột non), vai trò axit HCl + pepsin, lớp chất nhầy bảo vệ; thời gian thức ăn ở dạ dày (ghi khoảng, có nguồn).

**Màu:** dạ dày cam đào `#FF8A5B`, tá tràng vàng nắng `#FFD166`, ruột non hồng san hô, ruột già xanh ngọc, gan nâu nhạt `#C98A6B`, nền kem.

**Animation:** nhấn "▶ Hành trình bữa ăn" → hạt thức ăn đi từ miệng → thực quản → dạ dày (axit bắn nhẹ bong bóng) → tá tràng → ruột non → ruột già; mỗi trạm dừng 1s + chú thích hiện ra. Trong lát cắt: giọt axit đập vào lớp chất nhầy rồi trượt đi (minh họa "lá chắn").

---

### 🔥 SLIDE 5 — 🟠 VIÊM LOÉT DẠ DÀY – TÁ TRÀNG: ① NGUYÊN NHÂN

**Mục tiêu:** Nhớ được **3 nhóm nguyên nhân chính**. Màu chủ đạo **cam đào**.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 05 · VIÊM LOÉT · NGUYÊN NHÂN    █ AI "PHÁ" LÁ CHẮN DẠ DÀY?   │
│                                                              │
│  ┌────────────────────┐   ◐◐◐◐◐◐◐   ┌─────────────────────┐ │
│  │ ① VI KHUẨN H.PYLORI│  ◐ DẠ DÀY ◐ │ ③ THUỐC & THÓI QUEN │ │
│  │ ◐ vi khuẩn xoắn    │  ◐ SVG TO ◐ │ ◐ 💊 NSAID           │ │
│  │ "Tác nhân hàng đầu"│  ◐ có ổ   ◐ │ ◐ 🍺 rượu bia        │ │
│  └────────────────────┘  ◐  loét  ◐ │ ◐ 🚬 thuốc lá        │ │
│  ┌────────────────────┐   ◐◐◐◐◐◐◐   │ ◐ ☕ cà phê quá mức   │ │
│  │ ② THUỐC GIẢM ĐAU   │             └─────────────────────┘ │
│  │ (aspirin, ibuprofen│   ▢ ④ Stress, ăn trễ, đồ cay chua:   │
│  │  dùng lâu/ liều cao)│     "yếu tố làm nặng thêm"          │
│  └────────────────────┘                                      │
└──────────────────────────────────────────────────────────────┘
```
- **Dạ dày SVG ở giữa** với ổ loét đang "hình thành"; mỗi nguyên nhân là một thẻ có dây nối vào dạ dày. Bấm thẻ → dạ dày phản ứng (ví dụ H. pylori: vi khuẩn chui vào lớp nhầy; NSAID: lớp nhầy mỏng đi; axit: tăng).
- Chốt chính xác (Antigravity phải kiểm chứng nguồn): **H. pylori** và **thuốc kháng viêm không steroid (NSAID)** là hai nguyên nhân phổ biến nhất; rượu bia, thuốc lá, stress, thức ăn cay… là **yếu tố làm tăng nguy cơ/làm nặng**, không ghi là "nguyên nhân duy nhất".

**Bố cục mobile:** dạ dày SVG nhỏ ở trên → 4 thẻ nguyên nhân dạng accordion (mở/đóng) kèm icon.

**SVG:** `HPylori` (xoắn dễ thương có lông roi, mắt tròn nhưng nhấn "xấu" nhẹ), `Pill`, `Cigarette`, `Coffee`, `Stress` (đám mây bão nhỏ), `Stomach` có 3 trạng thái (khỏe / niêm mạc mỏng / có ổ loét).

**Animation:** mỗi nguyên nhân "tấn công" dạ dày bằng hiệu ứng riêng: H. pylori bơi xoắn vào lớp nhầy; viên thuốc tan thành hạt làm lớp nhầy rạn; khói bay lên. Thanh "Mức bảo vệ niêm mạc" tụt dần 100% → 40% khi bật thêm yếu tố (chỉ minh họa, có chú thích "minh họa").

**Ảnh research:** sơ đồ H. pylori, ảnh nội soi minh họa (chỉ dùng ảnh có giấy phép CC/Public Domain, **tránh ảnh máu/gây sốc**); ưu tiên SVG tự vẽ.

---

### 🩺 SLIDE 6 — 🟠 VIÊM LOÉT DẠ DÀY – TÁ TRÀNG: ② TRIỆU CHỨNG & DẤU HIỆU NGUY HIỂM

**Mục tiêu:** Nhận biết sớm + biết lúc nào phải đi khám ngay. Màu **cam đào** (triệu chứng) + **đỏ** (báo động).

**Bố cục desktop (3 cột):**
```
┌──────────────────────────────────────────────────────────────┐
│ 06 · VIÊM LOÉT · TRIỆU CHỨNG    █ CƠ THỂ ĐANG "NÓI" GÌ?      │
│                                                              │
│ ┌────────────┐ ┌──────────────────────┐ ┌─────────────────┐ │
│ │ TRIỆU CHỨNG│ │   ◐ HÌNH NGƯỜI SVG   │ │ ⚠ DẤU HIỆU      │ │
│ │ THƯỜNG GẶP │ │   có vùng thượng vị  │ │   BÁO ĐỘNG      │ │
│ │ ✔ Đau vùng │ │   nhấp nháy cam      │ │ (nền đỏ nhạt)   │ │
│ │  thượng vị │ │   + thang đau 0–10   │ │ • Nôn ra máu    │ │
│ │ ✔ Ợ chua   │ │                      │ │ • Phân đen      │ │
│ │ ✔ Đầy bụng │ │  ┌────────┬────────┐ │ │ • Đau dữ dội    │ │
│ │ ✔ Buồn nôn │ │  │DẠ DÀY  │TÁ TRÀNG│ │ │ • Sụt cân nhanh │ │
│ │            │ │  │đau sau │đau lúc │ │ │ → ĐI KHÁM NGAY  │ │
│ │            │ │  │khi ăn  │đói/đêm │ │ │   (nút đỏ)      │ │
│ │            │ │  └────────┴────────┘ │ │                 │ │
│ └────────────┘ └──────────────────────┘ └─────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```
- Giữa: **hình người SVG** (nhân vật tối giản, dễ thương) — vùng thượng vị nhấp nháy; công tắc 2 chế độ **"Loét dạ dày" ↔ "Loét tá tràng"** làm biểu đồ thời điểm đau (sau ăn vs lúc đói/ban đêm, đỡ khi ăn) đổi theo.
- Phải: khung **báo động** nền đỏ nhạt `#FFE9EC`, viền đỏ `#EF4B5F`, icon cảnh báo rung nhẹ.

**Bố cục mobile:** hình người + công tắc trên → thẻ "Thường gặp" → thẻ **báo động** đỏ nổi bật, nút "Khi nào cần đi khám?" bấm mở bottom-sheet.

**Nội dung (Antigravity kiểm chứng nguồn y khoa):**
- Thường gặp: đau/nóng rát vùng thượng vị, ợ hơi, ợ chua, đầy bụng, buồn nôn, nhanh no.
- Phân biệt đau (mang tính **tham khảo**, ghi chú "mỗi người có thể khác nhau").
- Dấu hiệu nguy hiểm: nôn ra máu/dịch như bã cà phê, đi ngoài phân đen, đau bụng dữ dội đột ngột, chóng mặt/xanh xao, sụt cân không rõ lý do → **đi khám/cấp cứu ngay**.
- Câu chốt: *"Chẩn đoán chính xác cần bác sĩ (thường qua nội soi và xét nghiệm H. pylori)."*

**Animation:** thang đau trượt từ 0 → mức trung bình; vùng thượng vị "đập" theo nhịp; khung báo động hiện bằng hiệu ứng rung nhẹ 1 lần (không gây khó chịu), tôn trọng `prefers-reduced-motion`.

**Tránh:** ảnh máu thật, nội soi gây sốc; chỉ dùng biểu tượng và SVG nhẹ nhàng.

---

### 🛡️ SLIDE 7 — 🟠 VIÊM LOÉT DẠ DÀY – TÁ TRÀNG: ③ CÁCH PHÒNG BỆNH

**Mục tiêu:** Khán giả nhớ **4 "khiên" bảo vệ dạ dày**. Nền xanh ngọc sáng, điểm nhấn cam đào.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 🟠 Bệnh 1 › ① Nguyên nhân ② Triệu chứng [③ Phòng bệnh]       │
│                  █ 4 KHIÊN BẢO VỆ DẠ DÀY                      │
│ ┌──────────────┐                        ┌──────────────┐     │
│ │ 🛡① SẠCH     │     ◐◐◐◐◐◐◐◐◐◐◐        │ 🛡② DÙNG     │     │
│ │ NGUỒN H.PYLORI│    ◐  DẠ DÀY SVG  ◐   │ THUỐC ĐÚNG   │     │
│ └──────────────┘    ◐  mặt cười,    ◐   └──────────────┘     │
│ ┌──────────────┐    ◐  khiên bao    ◐   ┌──────────────┐     │
│ │ 🛡③ ĂN ĐÚNG  │     ◐◐◐◐◐◐◐◐◐◐◐        │ 🛡④ SỐNG LÀNH│     │
│ └──────────────┘   [thanh MỨC BẢO VỆ ▰▰▰▰▱]└──────────────┘     │
│ ┌─ ĐĨA ĂN (SVG) ─┐ ┌─ ĐỒNG HỒ 24H (SVG) ─┐ ▢ Bạn có biết?    │
└──────────────────────────────────────────────────────────────┘
```
- Giữa: **dạ dày SVG** mặt cười. Bấm từng khiên → khiên màu xanh ngọc "gắn" quanh dạ dày, thanh **mức bảo vệ** tăng dần (chỉ là minh họa).
- Dải dưới: **đĩa ăn SVG** (chia 4 ô) + **đồng hồ 24h SVG** (các bữa nhỏ, đều giờ) + thẻ "Bạn có biết?".

**Nội dung 4 khiên (Antigravity xác minh nguồn: WHO / Bộ Y tế / NIDDK / Mayo Clinic):**
1. **Sạch nguồn H. pylori:** ăn chín, uống nước sạch, rửa tay trước ăn/sau đi vệ sinh, không dùng chung bát đũa khi có người nhiễm; đi khám & điều trị khi bác sĩ chỉ định (kể cả người trong gia đình).
2. **Dùng thuốc đúng:** không tự dùng thuốc giảm đau – kháng viêm (NSAID) kéo dài; dùng theo chỉ dẫn, báo bác sĩ nếu phải dùng lâu hoặc có tiền sử loét.
3. **Ăn đúng:** ăn đúng giờ, chia bữa vừa phải, ưu tiên món mềm – nấu chín – ít dầu mỡ; hạn chế rượu bia, đồ quá cay/chua/chiên, cà phê đậm nếu thấy khó chịu. *Ghi rõ: không cần kiêng quá mức, tránh thứ làm chính mình khó chịu.*
4. **Sống lành:** bỏ thuốc lá, hạn chế rượu bia, ngủ đủ, giảm căng thẳng, vận động nhẹ.

**Thẻ "Bạn có biết?" (xoay vòng 2 ý):**
- *"Hết đau chưa chắc đã hết bệnh — uống đủ liệu trình bác sĩ kê."*
- *"Loét không chỉ do ăn cay hay stress — H. pylori và thuốc NSAID là nguyên nhân hàng đầu."*

**Bố cục mobile:** dạ dày + thanh mức bảo vệ ở trên → 4 khiên dạng accordion → đĩa ăn → đồng hồ 24h thu nhỏ.

**Animation:** khiên bay vào ôm dạ dày theo hình cung (stagger 0.15s), dạ dày đổi từ nhăn mặt → mỉm cười khi đủ 4 khiên; thanh mức bảo vệ chạy gradient; thức ăn bay vào đĩa; kim đồng hồ quay chậm, các "múi" bữa ăn sáng lần lượt.

---

### 🦠 SLIDE 8 — 🔵 TIÊU CHẢY CẤP: ① NGUYÊN NHÂN & ĐƯỜNG LÂY

**Mục tiêu:** Hiểu tiêu chảy cấp là gì, do đâu, **lây bằng cách nào**. Màu chủ đạo **xanh biển**.

**Định nghĩa (xác minh theo WHO/Bộ Y tế):** đi ngoài phân lỏng hoặc nhiều nước **từ 3 lần trở lên trong 24 giờ**; tiêu chảy cấp thường kéo dài **dưới 14 ngày**.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 🔵 Bệnh 2 › [① Nguyên nhân] ② Triệu chứng ③ Phòng bệnh        │
│                  █ KHI RUỘT "XẢ NƯỚC": DO ĐÂU?                │
│ ┌─────────────────────────┐   ┌───────────────────────────┐  │
│ │ 3 NHÓM TÁC NHÂN (tab)   │   │ VÒNG ĐƯỜNG LÂY PHÂN–MIỆNG │  │
│ │ 🦠 Virus: rotavirus,    │   │     ◐ phân                │  │
│ │    norovirus            │   │  ◐ ruột ➜ ◐ tay bẩn/ruồi  │  │
│ │ 🧫 Vi khuẩn: E. coli,   │   │  ◐ miệng ◀ ◐ thức ăn,nước │  │
│ │    Salmonella, Shigella,│   │  (mũi tên chạy vòng,      │  │
│ │    phẩy khuẩn tả        │   │   hover trạm: cách ngắt)  │  │
│ │ 🪱 Ký sinh trùng        │   └───────────────────────────┘  │
│ └─────────────────────────┘   ┌───────────────────────────┐  │
│ ▢ Khác: không dung nạp thức   │ NHÓM NGUY CƠ CAO: trẻ nhỏ,│  │
│   ăn, tác dụng phụ thuốc      │ người già, nước/vệ sinh kém│  │
│                               └───────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```
**Bố cục mobile:** 3 tab (Virus | Vi khuẩn | Ký sinh trùng) → vòng đường lây thu nhỏ (chạm trạm xem cách ngắt) → thẻ nhóm nguy cơ.

**SVG:** `Virus`, `Bacteria`, `Parasite`, `WaterDrop`, `Toilet`, vòng đường lây 5 trạm (*phân → tay bẩn/ruồi → thức ăn, nước uống → miệng → ruột*).

**Nội dung cần xác minh:** tác nhân phổ biến theo nhóm; đường lây phân–miệng; yếu tố nguy cơ (nước/thực phẩm nhiễm bẩn, vệ sinh kém, mùa mưa lũ…, trẻ nhỏ); nhắc ngắn: *tiêu chảy do virus rất phổ biến — kháng sinh không có tác dụng với virus*.

**Animation:** vi khuẩn/virus trôi trong "dòng nước" của ruột (đường ống SVG gợn sóng); vòng đường lây chạy tuần hoàn, hover trạm → trạm sáng + hiện biểu tượng "chặn" (ví dụ ✋ rửa tay).

---

### 🌡️ SLIDE 9 — 🔵 TIÊU CHẢY CẤP: ② TRIỆU CHỨNG & MỨC MẤT NƯỚC

**Mục tiêu:** Nhận biết triệu chứng và **mức mất nước** — vì mất nước mới là nguy hiểm chính. Xanh biển + đỏ (báo động).

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 🔵 Bệnh 2 › ① Nguyên nhân [② Triệu chứng] ③ Phòng bệnh        │
│                  █ CƠ THỂ ĐANG MẤT NƯỚC TỚI ĐÂU?              │
│ ┌────────────┐ ┌────────────────────────────┐ ┌────────────┐ │
│ │TRIỆU CHỨNG │ │ ◐ NHÂN VẬT SVG đổ màu       │ │ ⚠ BÁO ĐỘNG │ │
│ │ ✔ Phân lỏng│ │   theo mức (kéo thanh trượt)│ │ (nền đỏ nhạt)│ │
│ │ ≥3 lần/ngày│ │ ──●────────────────────     │ │ • Sốt cao  │ │
│ │ ✔ Đau quặn │ │ NHẸ    VỪA        NẶNG      │ │ • Phân có  │ │
│ │ ✔ Buồn nôn,│ │ khát,  mắt trũng, li bì,    │ │   máu      │ │
│ │   nôn      │ │ tiểu ít môi khô   tiểu rất ít│ │ • Nôn liên │ │
│ │ ✔ Sốt nhẹ, │ │ ◐ giọt nước cạn dần         │ │   tục      │ │
│ │   mệt      │ │                             │ │ • Trẻ nhỏ, │ │
│ └────────────┘ └────────────────────────────┘ │ người già  │ │
│ ▢ Gợi ý phân biệt: phân nước (hay do virus) · có máu/nhầy + sốt cao (cần khám) │
└──────────────────────────────────────────────────────────────┘
```
**Bố cục mobile:** nhân vật + thanh trượt mất nước trên → thẻ triệu chứng → khung báo động đỏ ghim nổi → thẻ gợi ý phân biệt.

**Nội dung cần xác minh:** triệu chứng thường gặp; 3 mức mất nước và dấu hiệu từng mức (khát, tiểu ít, môi khô, mắt trũng, li bì…); dấu hiệu cần đi khám ngay (sốt cao, phân có máu, nôn nhiều không uống được, mất nước nặng, đặc biệt trẻ nhỏ/người già/bệnh nền). Cách phân biệt chỉ ghi là **tham khảo**, chẩn đoán do bác sĩ.

**Animation:** kéo thanh trượt → nhân vật đổi sắc xanh biển nhạt dần, mắt trũng nhẹ, giọt nước trong bình cạn; khung báo động rung nhẹ 1 lần (tôn trọng `prefers-reduced-motion`).

---

### 🧼 SLIDE 10 — 🔵 TIÊU CHẢY CẤP: ③ CÁCH PHÒNG BỆNH & XỬ TRÍ BAN ĐẦU

**Mục tiêu:** Ra về với **hành động cụ thể**. Màu chủ đạo **xanh ngọc + xanh biển** (sáng nhất).

**Bố cục desktop (4 trụ + 1 dải):**
```
┌──────────────────────────────────────────────────────────────┐
│ 🔵 Bệnh 2 › ① Nguyên nhân ② Triệu chứng [③ Phòng bệnh]        │
│                  █ 4 TRỤ NGĂN TIÊU CHẢY                       │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ 🧼 RỬA TAY │ │ 🍲 ĂN CHÍN │ │ 🚰 NƯỚC &  │ │ 💉 VACCINE │ │
│ │ 6 bước     │ │ UỐNG SÔI   │ │ VỆ SINH    │ │ & SỮA MẸ   │ │
│ │ ◐ hoạt hình│ │ ◐ nồi/ly   │ │ ◐ vòi nước,│ │ ◐ giọt     │ │
│ │ từng bước  │ │ nước sôi   │ │ nhà vệ sinh│ │ vaccine,   │ │
│ │            │ │ bảo quản   │ │ diệt ruồi  │ │ bé bú mẹ   │ │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│ ╔═══ KHI ĐÃ BỊ TIÊU CHẢY: XỬ TRÍ BAN ĐẦU ═══════════════════╗ │
│ ║ ◐ORS  ① Bù nước (ORS)  ② Tiếp tục ăn nhẹ  ③ Theo dõi dấu  ║ │
│ ║       ④ Đi khám khi có dấu hiệu nguy hiểm (slide 9)       ║ │
│ ╚═══════════════════════════════════════════════════════════╝ │
└──────────────────────────────────────────────────────────────┘
```
- **Rửa tay 6 bước:** hoạt hình từng bước, bấm số để chạy (số bước xác minh theo hướng dẫn Bộ Y tế).
- **Ăn chín uống sôi:** rửa thực phẩm, nấu chín kỹ, bảo quản lạnh đúng cách, không để thức ăn sống–chín lẫn nhau.
- **Nước & vệ sinh:** dùng nước sạch/đun sôi, nhà vệ sinh hợp vệ sinh, che đậy thức ăn, diệt ruồi.
- **Vaccine rotavirus & sữa mẹ:** cho trẻ nhỏ theo lịch của cơ sở y tế; nuôi con bằng sữa mẹ.
- **Dải xử trí ban đầu:** bù nước bằng **ORS theo hướng dẫn trên bao bì/nhân viên y tế**; **tiếp tục ăn nhẹ** (trẻ bú mẹ vẫn bú); **không tự dùng kháng sinh hoặc thuốc cầm tiêu chảy** khi chưa có ý kiến chuyên môn.
- ⚠ Không ghi liều lượng cụ thể nếu chưa có nguồn chính thống.

**Thẻ "Bạn có biết?":** *"Nước ngọt, nước tăng lực không thay được Oresol"* và *"Bị tiêu chảy không cần nhịn ăn"* (có nguồn).

**Bố cục mobile:** 4 trụ dạng tab nằm ngang → nội dung tab → dải xử trí ban đầu ghim phía dưới dạng thẻ.

**Animation:** 4 trụ mọc lên như cột (scale-Y từ dưới); rửa tay: bọt xà phòng bay, từng bước sáng theo số; nước chảy đầy chai ORS, sóng xanh biển; các bước xử trí sáng lần lượt.

---

### ⚖️ SLIDE 11 — SO SÁNH 2 BỆNH & KHI NÀO ĐI KHÁM

**Mục tiêu:** Chốt ý bằng **một hình Venn** + bảng so sánh: hai bệnh khác nhau chỗ nào, giống nhau chỗ nào. Cam đào ⟷ xanh biển, phần giao nhau **xanh ngọc**.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│ 11 · TỔNG KẾT                  █ HAI BỆNH, MỘT GỐC "VỆ SINH"  │
│                                                              │
│   ╭──────────────╮╭────────╮╭──────────────╮   ┌───────────┐ │
│   │ 🟠 VIÊM LOÉT ││ GIAO   ││ 🔵 TIÊU CHẢY │   │ KHI NÀO   │ │
│   │ • H. pylori  ││ NHAU   ││ • Virus/vi   │   │ ĐI KHÁM?  │ │
│   │ • NSAID,rượu ││ • Ăn   ││   khuẩn/KST  │   │ 🟠 Nôn ra │ │
│   │ • Đau thượng ││   uống ││ • Phân lỏng, │   │ máu, phân │ │
│   │   vị, ợ chua ││   mất  ││   mất nước   │   │ đen, đau  │ │
│   │              ││   vệ   ││              │   │ dữ dội    │ │
│   │              ││   sinh ││              │   │ 🔵 Mất    │ │
│   │              ││ • Rửa  ││              │   │ nước nặng,│ │
│   │              ││   tay  ││              │   │ phân máu  │ │
│   ╰──────────────╯╰────────╯╰──────────────╯   └───────────┘ │
│ ┌────────────┬───────────────┬───────────────┬──────────────┐ │
│ │            │ ① Nguyên nhân │ ② Triệu chứng │ ③ Phòng bệnh │ │
│ │ 🟠 Loét    │ (1 dòng)      │ (1 dòng)      │ (1 dòng)     │ │
│ │ 🔵 Tiêu chảy│ (1 dòng)     │ (1 dòng)      │ (1 dòng)     │ │
│ └────────────┴───────────────┴───────────────┴──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```
- **Venn SVG:** hai vòng tròn mờ chồng nhau; bấm vòng/giao → nội dung chi tiết phóng to ở giữa. Phần giao: *ăn uống – vệ sinh, rửa tay, nguồn nước, đi khám khi có dấu hiệu nguy hiểm*.
- **Bảng 2×3** ở đáy: mỗi ô **một dòng ngắn** + icon, bấm ô → nhảy về slide tương ứng (5–10).
- **Cột "Khi nào đi khám":** 2 khung nhỏ (cam/xanh biển) tóm gọn dấu hiệu nguy hiểm đã nêu ở slide 6 và 9.

**Bố cục mobile:** Venn thu nhỏ ở trên → bảng so sánh dạng thẻ dọc (mỗi bệnh một thẻ, 3 dòng) → khung "Khi nào đi khám" ghim cuối.

**Animation:** hai vòng tròn trượt từ hai bên rồi giao nhau, phần giao sáng xanh ngọc; các dòng bảng hiện lần lượt; icon dấu hiệu nguy hiểm nháy nhẹ 1 lần.

---

### 🌅 SLIDE 12 — KẾT THÚC

**Mục tiêu:** **Trả lời câu hỏi nghiên cứu** bằng 1 câu gọn (2 bệnh × nguyên nhân – triệu chứng – phòng bệnh), tạo cảm xúc tích cực, cảm ơn, nêu nguồn.

**Bố cục desktop:**
```
┌──────────────────────────────────────────────────────────────┐
│  (nền bình minh: gradient vàng nắng → mint → xanh biển)       │
│                                                              │
│        ◐ hệ tiêu hóa SVG nhỏ, mỉm cười, phát sáng ◐          │
│                                                              │
│            █ CẢM ƠN QUÝ THẦY CÔ VÀ CÁC BẠN ĐÃ LẮNG NGHE      │
│                                                              │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│   │ 🟠 Hiểu rõ │ │ 🔵 Bù nước │ │ 🟢 Phòng   │  3 thông điệp │
│   │ loét dạ dày│ │ kịp thời   │ │ ngừa từ    │              │
│   │ & H. pylori│ │ khi tiêu   │ │ thói quen  │              │
│   │            │ │ chảy       │ │ hằng ngày  │              │
│   └────────────┘ └────────────┘ └────────────┘              │
│   [ ❓ Hỏi – đáp ]  [ 📚 Nguồn tham khảo ]  [ 🔁 Xem lại ]    │
│   ⚠ Nội dung mang tính giáo dục, không thay thế tư vấn y tế  │
│   Nhóm [..] · logo GUT CARE · 9 thành viên (avatar nhỏ)      │
└──────────────────────────────────────────────────────────────┘
```
- Bấm **"Nguồn tham khảo"** → mở panel trượt từ phải: danh sách nguồn từ `sources.js` (tên + tổ chức + năm + link).
- Bấm **"Hỏi – đáp"** → hiện 3–5 câu hỏi dự kiến + trả lời ngắn (do TV9 soạn).
- Dưới cùng: hàng **avatar 9 thành viên** nhỏ nối nhau (nhắc lại slide 3).

**Bố cục mobile:** SVG nhỏ → lời cảm ơn → 3 thông điệp dạng thẻ dọc → 3 nút full-width → disclaimer.

**Animation:** nền chuyển sắc như bình minh, hệ tiêu hóa SVG "nở" và phát sáng, 3 thẻ rơi vào lần lượt, **pháo giấy nhẹ (confetti mint/vàng)** 1 lần, bong bóng nổi chậm; nhạc kết nhẹ (có nút tắt).

---

## 5. HỆ THỐNG ANIMATION CHUNG (Framer Motion)

| Tên | Mô tả | Dùng ở |
|---|---|---|
| `fadeUp` | `y: 24→0`, opacity 0→1, 0.6s, easing `[0.22,1,0.36,1]` | mọi khối chữ |
| `stagger` | children delay 0.08s | danh sách, thẻ |
| `drawPath` | `pathLength 0→1` 1.2s | SVG hệ tiêu hóa, mũi tên |
| `floatSlow` | `y: ±10`, lặp 6s ease-in-out | bong bóng, SVG nhỏ |
| `pulseSoft` | scale 1→1.04→1, 2s | dạ dày, vùng thượng vị |
| `ripple` | vòng tròn lan ra khi bấm | nút |
| `waterWipe` | `clip-path: circle()` mở rộng | chuyển slide |
| `shakeOnce` | rung nhẹ 1 lần | khung cảnh báo |
| `confetti` | hạt màu mint/vàng/hồng san hô | slide 12 |

**Quy tắc:**
- Chỉ animate `transform` và `opacity` (GPU), tránh animate `width/height/top/left`.
- Mỗi slide có tổng thời lượng "vào cảnh" ≤ 2.5s để không làm người nói chờ.
- Bọc `useReducedMotion()` → tắt hiệu ứng mạnh, giữ fade đơn giản.
- Mục tiêu 60fps trên laptop thường; giảm số phần tử SVG động > 40 cùng lúc.

---

## 6. ÂM THANH (NHẸ, TUỲ CHỌN)

- `sfx.tick` (chọn), `sfx.whoosh` (chuyển slide), `sfx.pop` (bong bóng), `sfx.success` (kết thúc) — tạo bằng **Web Audio API** (không cần file).
- Nhạc nền: 1 bản piano/ambient **không bản quyền** (Pixabay Music/YouTube Audio Library), volume ≤ 25%, nút bật/tắt cố định góc phải trên, **mặc định tắt cho tới khi người dùng bấm**.

---

## 7. QUY TRÌNH RESEARCH CHO ANTIGRAVITY

### 7.1 Nguồn nội dung được phép (ưu tiên từ trên xuống)
1. **WHO** (Tổ chức Y tế Thế giới) — tiêu chảy, H. pylori
2. **Bộ Y tế Việt Nam** — hướng dẫn chẩn đoán điều trị tiêu chảy, loét dạ dày–tá tràng
3. **NIDDK/NIH, Mayo Clinic, Cleveland Clinic, MSD Manual** — bệnh loét dạ dày, H. pylori
4. Bệnh viện/trường y đáng tin cậy ở VN (Bạch Mai, Chợ Rẫy, ĐH Y Hà Nội, ĐH Y Dược TP.HCM…)
5. **Không dùng:** blog bán thực phẩm chức năng, diễn đàn, nguồn không rõ tác giả.

### 7.2 Quy tắc "không bịa"
- Mỗi số liệu/khẳng định y khoa → ghi vào `sources.js` với: `{id, claim, source, organization, year, url}`.
- Nếu hai nguồn mâu thuẫn → dùng cách nói thận trọng ("thường", "một số trường hợp") và nêu trong báo cáo.
- Không đưa ra liều thuốc cho cá nhân, không khuyên dùng/ngừng thuốc → luôn "theo chỉ dẫn của bác sĩ".

### 7.3 Quy tắc ảnh
- Ưu tiên **SVG tự vẽ** (sắc nét, nhẹ, đúng màu thương hiệu).
- Ảnh thật: chỉ từ **Unsplash / Pexels / Pixabay / Wikimedia Commons** (giấy phép cho phép dùng); ghi **tác giả + nguồn + giấy phép** vào `sources.js`.
- **Cấm** ảnh máu, nội soi chảy máu, người bệnh nhận diện được, hình nhạy cảm.
- Tải về → đổi sang `.webp`, ≤ 300KB/ảnh, đặt `alt` tiếng Việt, `loading="lazy"`.
- Từ khóa gợi ý: `healthy food bowl`, `drinking water glass`, `washing hands soap`, `fresh vegetables market`, `yoga relax morning`, `rice porridge`.

### 7.4 Đầu ra research mỗi slide
Antigravity tạo file `research/slide-N.md` gồm: ① 5–8 ý chính đã kiểm chứng ② số liệu + nguồn ③ danh sách ảnh đề xuất + link + giấy phép ④ câu hỏi còn chưa chắc. **Chủ slide duyệt** rồi mới sang bước code.

---

## 8. PROMPT SẴN DÙNG CHO ANTIGRAVITY

### 8.1 PROMPT GỐC (dán đầu phiên)
```
Bạn là Frontend Lead + Motion Designer + Biên tập viên y khoa.
Hãy xây web thuyết trình 12 slide tên "GUT CARE – Tiêu hóa khỏe mạnh" bằng
React 18 + Vite + Tailwind + Framer Motion + lucide-react, 100% tiếng Việt.
Trọng tâm: "Tìm hiểu nguyên nhân, triệu chứng và cách phòng bệnh về tiêu hóa thường gặp ở người (2 bệnh)"
= Viêm loét dạ dày–tá tràng + Tiêu chảy cấp; mỗi bệnh đủ 3 slide (nguyên nhân – triệu chứng – phòng bệnh).
KHÔNG làm mini game/quiz.

ĐỌC KỸ file KE_HOACH_9_SLIDE_GUT_CARE_V2.md và tuân thủ tuyệt đối:
- Bảng màu, font, bố cục desktop 1920x1080 và bố cục mobile một cột.
- Mỗi slide một component riêng trong src/slides, nội dung chữ để trong src/data/content.js.
- Ưu tiên SVG tự vẽ, nhiều hình trực quan, animation mượt 60fps, chỉ animate transform/opacity.
- Giao diện SÁNG, sạch, thân thiện; không ảnh máu/gây sốc.
- Mọi khẳng định y khoa phải có nguồn trong src/data/sources.js; không bịa số liệu.
- Hỗ trợ prefers-reduced-motion, phím ←/→, vuốt trên mobile, toàn màn hình (phím F).
- Làm từng slide một; sau mỗi slide tự chạy `npm run build` và kiểm tra lỗi,
  chụp ảnh màn hình desktop (1920x1080) và mobile (390x844), đối chiếu với mô tả trong plan,
  tự sửa tới khi khớp rồi mới sang slide tiếp theo.
```

### 8.2 PROMPT RESEARCH (mỗi slide)
```
Nhiệm vụ: nghiên cứu nội dung cho SLIDE {N} – {TÊN}.
1) Tìm tối thiểu 3 nguồn chính thống (WHO, Bộ Y tế VN, NIDDK/Mayo Clinic...).
2) Viết research/slide-{N}.md: ý chính đã kiểm chứng, số liệu kèm nguồn+năm+link,
   danh sách ảnh miễn phí (Unsplash/Pexels/Pixabay/Wikimedia) kèm giấy phép + tác giả.
3) Tuyệt đối không bịa số liệu; không chắc thì ghi "chưa xác minh".
4) Không ảnh máu/nhạy cảm. Cuối file liệt kê câu hỏi cần người duyệt.
Chưa viết code ở bước này.
```

### 8.3 PROMPT CODE (mỗi slide)
```
Dựa trên research/slide-{N}.md đã duyệt và mục "SLIDE {N}" trong plan,
hãy tạo src/slides/Slide{N}{Name}.jsx:
- Bố cục desktop đúng sơ đồ, bố cục mobile đúng mô tả.
- Vẽ các SVG cần thiết trong src/components/svg/.
- Đủ animation/hiệu ứng như plan; có trạng thái hover/chạm; có reduced-motion.
- Dữ liệu chữ lấy từ src/data/content.js, nguồn từ sources.js.
- Sau khi xong: build, chụp ảnh 1920x1080 và 390x844, tự rà lỗi tràn chữ/chồng hình.
```

### 8.4 PROMPT NÂNG CẤP/POLISH
```
Rà soát toàn bộ 12 slide: đồng nhất khoảng cách (hệ 8px), độ đậm chữ, bóng đổ,
tốc độ animation; kiểm tra tương phản chữ (WCAG AA); giảm giật (kiểm Performance);
tối ưu ảnh .webp; kiểm tra điều hướng bàn phím và cảm ứng; sửa mọi lỗi console.
```

---

## 9. YÊU CẦU KỸ THUẬT & HIỆU NĂNG

- Lighthouse (desktop): Performance ≥ 90, Accessibility ≥ 95.
- Bundle chính < 500KB gzip (tách chunk mỗi slide bằng `React.lazy` + `Suspense`).
- Font: self-host hoặc preconnect Google Fonts, `font-display: swap`.
- SVG: gom `<defs>` dùng chung (gradient, filter); tránh filter blur nặng trên mobile.
- Ảnh: `.webp`, có `width/height`, `loading="lazy"` (trừ slide 1).
- Truy cập: `aria-label` cho SVG tương tác, điều hướng bằng Tab, nút ≥ 44px, tương phản chữ/nền đạt AA.
- Chạy offline sau lần tải đầu (tuỳ chọn: PWA đơn giản) để phòng mạng yếu khi thuyết trình.
- Máy yếu: nếu `navigator.hardwareConcurrency <= 4` → tự giảm số hạt/bong bóng và blur.

---

## 10. CHECKLIST NGHIỆM THU

**Thiết kế**
- [ ] Nền sáng, bảng màu đúng, không có màu tối/đen nặng nề
- [ ] Mỗi slide có ≥ 1 SVG trực quan chính, ≤ 40 từ chữ chính
- [ ] Màu theo bệnh nhất quán (cam = loét, xanh biển = tiêu chảy, xanh ngọc = phòng ngừa, đỏ = báo động)
- [ ] Không có ảnh máu/gây sốc

**Nội dung**
- [ ] Mỗi bệnh đủ 3 phần: nguyên nhân – triệu chứng – phòng bệnh (slide 5–10)
- [ ] 100% tiếng Việt, đúng chính tả, có dấu
- [ ] Mọi số liệu có nguồn trong `sources.js`
- [ ] Có câu "không thay thế tư vấn y tế" ở slide 12
- [ ] Không khuyên liều thuốc cá nhân

**Kỹ thuật**
- [ ] Desktop 1920×1080 và 1366×768 hiển thị đủ, không tràn
- [ ] Mobile 390×844: một cột, không cuộn ngang, nút ≥ 44px
- [ ] 60fps ổn định, không lỗi console
- [ ] Phím ←/→, vuốt, toàn màn hình hoạt động
- [ ] `prefers-reduced-motion` được tôn trọng
- [ ] `npm run build` sạch lỗi

**Trình bày**
- [ ] Tập thuyết trình 14–15 phút, mỗi người nói đúng slide mình phụ trách
- [ ] Có sẵn bản dự phòng (PDF xuất từ trình duyệt + video quay màn hình)
- [ ] Đã chuẩn bị 5 câu hỏi–đáp dự kiến

---

## 11. RỦI RO & PHƯƠNG ÁN DỰ PHÒNG

| Rủi ro | Cách xử lý |
|---|---|
| Antigravity/Gemini Flash viết SVG phức tạp bị lệch | Chia nhỏ từng SVG, dựng hình cơ bản trước, thêm chi tiết/animation sau |
| Video autoplay bị chặn | Nút "▶ XEM GIỚI THIỆU" rõ ràng; có phương án ảnh tĩnh theo cảnh |
| Máy chiếu màu nhạt, mất tương phản | Dùng chữ `#12343B` trên nền sáng, kiểm tra thử trước giờ trình bày |
| Mạng yếu tại phòng thuyết trình | Build tĩnh, mở bằng `npm run preview`; ảnh/font nằm trong dự án |
| Số liệu sai/lỗi thời | Fact-checker (TV5 + TV7) rà lần cuối, ghi năm của từng số liệu |
| Trễ tiến độ | Gộp slide 8 + 9 thành 1, rút slide 4; vẫn đủ 3 ý cho cả 2 bệnh |

---

## 12. THỨ TỰ LÀM ĐỀ XUẤT CHO ANTIGRAVITY

1. Khung dự án: Vite + Tailwind + theme màu + font + `FitStage` + `useLayoutMode` + `SlideShell` + điều hướng.
2. `DigestiveSystem` SVG (dùng cho slide 1, 4, 12) — làm thật kỹ vì tái sử dụng.
3. Slide 1 → Slide 12 (bìa và kết sớm để có "khung xương" chạy được).
4. Slide 3 (cần dữ liệu thành viên).
5. Slide 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 (nội dung).
6. Slide 2 (video tự dựng — dùng lại các SVG đã vẽ).
7. Polish animation, âm thanh, tối ưu hiệu năng.
8. Slide 11 (so sánh – tổng kết, làm sau khi đủ nội dung các slide trước) → QA đa thiết bị → xuất bản dự phòng.

---

*Kế hoạch này là bản "một nguồn sự thật" cho cả nhóm và Antigravity. Mọi thay đổi bố cục/màu/nội dung → sửa tại file này trước, rồi mới yêu cầu agent code lại.* 🌿
