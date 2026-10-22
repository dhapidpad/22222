import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Utensils,
  Droplets,
  Syringe,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Thermometer,
  Baby,
  Sparkles
} from 'lucide-react';
import HandWash from '../components/svg/HandWash';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide10DiarrheaPrevention() {
  const data = content.slide10 || content.slide8?.prevention || {
    tag: 'BỆNH 2 · 4 TRỤ CỘT PHÒNG BỆNH & BÙ NƯỚC',
    title: 'GIẢI PHÁP PHÒNG BỆNH TIÊU CHẢY CẤP & NGUYÊN TẮC ORESOL',
    subtitle: 'Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol.'
  };

  const [activeTab, setActiveTab] = useState('handwash'); // 'handwash' | 'food' | 'water' | 'vaccine'

  const tabDetails = {
    handwash: {
      id: 'handwash',
      title: 'Trụ 1: Rửa tay 6 bước với xà phòng',
      desc: 'Rửa tay thường quy theo quy trình 6 bước của Bộ Y tế trong tối thiểu 30 giây. Thực hiện trước khi ăn, trước khi chuẩn bị thức ăn, sau khi đi vệ sinh và sau khi chạm bề mặt bẩn.',
      img: '/assets/images/slide10/slide10-rua-tay-xa-phong-01.webp',
      imgCaption: 'Rửa tay kỹ với xà phòng dưới vòi nước sạch',
      badge: 'Cắt đứt lây lan 45%',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    food: {
      id: 'food',
      title: 'Trụ 2: Ăn chín uống sôi triệt để',
      desc: 'Nấu chín kỹ thực phẩm (thịt, cá, trứng, hải sản), không ăn đồ sống tái (tiết canh, gỏi, nem chua). Bảo quản thức ăn trong tủ lạnh, đậy kín lồng bàn chống ruồi; tách biệt dao thớt đồ sống và chín.',
      img: '/assets/images/slide10/slide10-nau-chin-thuc-an-03.webp',
      imgCaption: 'Nấu chín kỹ thức ăn sôi bốc hơi trên bếp sạch',
      badge: 'An toàn thực phẩm WHO',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    water: {
      id: 'water',
      title: 'Trụ 3: Nguồn nước sạch & Vệ sinh môi trường',
      desc: 'Uống nước đun sôi để nguội hoặc nước đóng chai đạt chuẩn kiểm định. Giữ gìn nhà tiêu hợp vệ sinh, không phóng uế bừa bãi ra môi trường ao hồ xung quanh; khử trùng Cloramin B khi có bão lũ.',
      img: '/assets/images/slide10/slide10-rot-nuoc-sach-02.webp',
      imgCaption: 'Rót nước lọc sạch đạt chuẩn vào cốc trong lành',
      badge: 'Kiểm định nguồn nước',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    vaccine: {
      id: 'vaccine',
      title: 'Trụ 4: Vaccine Rotavirus & Sữa mẹ hoàn toàn',
      desc: 'Cho trẻ uống đủ 2 liều vaccine phòng Rotavirus (bắt đầu từ 2 tháng tuổi, hoàn thành trước 6 tháng tuổi). Nuôi con bằng sữa mẹ hoàn toàn trong 6 tháng đầu để truyền kháng thể sIgA tự nhiên bảo vệ niêm mạc ruột.',
      img: '/assets/images/slide2/slide2-trai-cay-rau-cu-tuoi-01.webp',
      imgCaption: 'Miễn dịch chủ động và dinh dưỡng tự nhiên bảo vệ ruột',
      badge: 'Phòng ngừa chủ động',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  };

  const current = tabDetails[activeTab];

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 lg:px-10 pt-2 pb-16 md:pb-20 select-none overflow-hidden text-[#12343B]">
      {/* 1. Slide Header */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-[#3BB8F0] tracking-widest uppercase">
              {data.tag}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3BB8F0]"></span>
            <span className="text-[11px] text-[#5B7B80] font-semibold">
              Chiến lược y tế dự phòng (Bộ Y tế & WHO)
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B] leading-tight">
            {data.title}
          </h2>
        </div>
        <p className="text-xs text-[#5B7B80] font-medium max-w-md text-right hidden sm:block">
          "Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol."
        </p>
      </div>

      {/* 2. Main 4 Pillars Interactive Layout */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0 my-1 overflow-hidden">
        {/* Left Column: 4 Pillar Navigation & Mini Detail (Col 1-5) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {[
              { id: 'handwash', name: '🧼 Rửa tay 6 bước', desc: 'Quy trình Bộ Y tế' },
              { id: 'food', name: '🍲 Ăn chín uống sôi', desc: '5 Chìa khóa WHO' },
              { id: 'water', name: '🚰 Nước & Vệ sinh', desc: 'Kiểm soát nguồn nước' },
              { id: 'vaccine', name: '💉 Vaccine Rotavirus', desc: 'Miễn dịch chủ động' }
            ].map((p) => {
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sfx.tick();
                    setActiveTab(p.id);
                  }}
                  className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white shadow-md border-transparent scale-101'
                      : 'bg-white/80 hover:bg-white text-[#12343B] border-white/80 shadow-2xs'
                  }`}
                >
                  <div className="font-heading font-extrabold text-xs truncate">
                    {p.name}
                  </div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-white/90' : 'text-[#5B7B80]'}`}>
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pillar Active Content Card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between flex-1 min-h-0"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
                  {current.badge}
                </span>
                <span className="text-[10px] text-gray-400 font-mono uppercase">
                  Trụ cột phòng bệnh
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-sm text-[#12343B] mb-1.5 leading-snug">
                {current.title}
              </h3>
              <p className="text-xs text-[#5B7B80] leading-relaxed mb-2.5">
                {current.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={current.img}
                alt={current.imgCaption}
                className="w-18 h-12 rounded-xl object-cover shadow-2xs shrink-0"
                loading="lazy"
              />
              <span className="text-[11px] font-semibold text-[#12343B] leading-snug">
                {current.imgCaption}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Interactive Display (Col 6-12) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center min-h-0 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            {/* View A: Handwash */}
            {activeTab === 'handwash' && (
              <motion.div
                key="handwash-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <HandWash />
              </motion.div>
            )}

            {/* View B: Food Safety */}
            {activeTab === 'food' && (
              <motion.div
                key="food-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
                  <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                    <Utensils size={16} className="text-[#FF8A5B]" />
                    5 NGUYÊN TẮC VÀNG AN TOÀN THỰC PHẨM (WHO)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF2EB] text-[#FF8A5B]">
                    Tiêu chuẩn Y tế Quốc tế
                  </span>
                </div>

                <div className="space-y-2 flex-1 text-xs">
                  <div className="p-2.5 rounded-2xl bg-[#FFF2EB]/80 border border-[#FF8A5B]/20 flex items-start gap-2.5">
                    <span className="text-base shrink-0">🍳</span>
                    <div>
                      <strong className="text-[#D35400] font-heading">1. Nấu chín kỹ thức ăn:</strong>
                      <span className="text-[#5B7B80] block text-[11px] mt-0.5">
                        Nhiệt độ tâm thực phẩm phải đạt trên 70°C để tiêu diệt triệt để vi khuẩn *Salmonella*, *E. coli*, *Campylobacter*. Tuyệt đối không ăn tiết canh, gỏi sống, nem chua.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-2.5">
                    <span className="text-base shrink-0">🔪</span>
                    <div>
                      <strong className="text-amber-800 font-heading">2. Tách biệt thực phẩm sống và chín:</strong>
                      <span className="text-[#5B7B80] block text-[11px] mt-0.5">
                        Dùng dao, thớt, hộp chứa riêng biệt cho thịt sống và đồ ăn đã chín để ngăn ngừa lây nhiễm chéo vi sinh vật.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 flex items-start gap-2.5">
                    <span className="text-base shrink-0">❄️</span>
                    <div>
                      <strong className="text-emerald-800 font-heading">3. Bảo quản ở nhiệt độ an toàn:</strong>
                      <span className="text-[#5B7B80] block text-[11px] mt-0.5">
                        Không để thức ăn chín ở nhiệt độ phòng quá 2 giờ. Bảo quản trong ngăn mát tủ lạnh (&lt; 5°C) và đậy kín lồng bàn chống ruồi nhặng trung gian.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-blue-50/80 border border-blue-200/60 flex items-start gap-2.5">
                    <span className="text-base shrink-0">🥬</span>
                    <div>
                      <strong className="text-blue-800 font-heading">4. Chọn nguyên liệu tươi sạch & Nước sạch:</strong>
                      <span className="text-[#5B7B80] block text-[11px] mt-0.5">
                        Ngâm rửa rau củ nhiều lần dưới vòi nước chảy; chỉ mua thực phẩm có nguồn gốc xuất xứ rõ ràng, còn hạn sử dụng.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View C: Safe Water & Sanitation */}
            {activeTab === 'water' && (
              <motion.div
                key="water-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
                  <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                    <Droplets size={16} className="text-[#3BB8F0]" />
                    QUẢN LÝ NGUỒN NƯỚC SẠCH & VỆ SINH MÔI TRƯỜNG
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF6FD] text-[#3BB8F0]">
                    Phòng dịch cấp bách
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 flex-1 text-xs">
                  <div className="p-3 rounded-2xl bg-[#EAF6FD]/80 border border-[#3BB8F0]/30 flex flex-col justify-between">
                    <div>
                      <div className="font-heading font-extrabold text-xs text-[#0284C7] mb-1 flex items-center gap-1.5">
                        <span>💧</span>
                        <span>Nước uống đạt chuẩn</span>
                      </div>
                      <p className="text-[11px] text-[#5B7B80] leading-relaxed">
                        • Triệt để uống nước đã đun sôi để nguội.<br />
                        • Dùng nước máy hoặc nước giếng đã qua lõi lọc RO/khử khuẩn.<br />
                        • Không uống nước lã từ sông suối, kênh rạch chưa xử lý.
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] font-bold text-[#0284C7] bg-white/80 p-1.5 rounded-xl border border-[#3BB8F0]/20">
                      Quy chuẩn QCVN 01-1:2018/BYT
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 flex flex-col justify-between">
                    <div>
                      <div className="font-heading font-extrabold text-xs text-emerald-800 mb-1 flex items-center gap-1.5">
                        <span>🚽</span>
                        <span>Nhà tiêu hợp vệ sinh</span>
                      </div>
                      <p className="text-[11px] text-[#5B7B80] leading-relaxed">
                        • Sử dụng nhà tiêu tự hoại hoặc bán tự hoại.<br />
                        • Tuyệt đối không phóng uế bừa bãi ra đồng ruộng, ao hồ.<br />
                        • Thu gom và xử lý tã lót trẻ em vào thùng rác có nắp đậy.
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-white/80 p-1.5 rounded-xl border border-emerald-200">
                      Chặn nguồn phát tán mầm bệnh
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200/60 col-span-1 md:col-span-2">
                    <div className="font-heading font-extrabold text-xs text-purple-800 mb-1 flex items-center gap-1.5">
                      <span>🧪</span>
                      <span>Xử lý nước khi bão lũ, thiên tai (Khuyến cáo Bộ Y tế)</span>
                    </div>
                    <p className="text-[11px] text-[#5B7B80] leading-relaxed">
                      Làm trong nước bằng phèn chua (1g phèn cho 20 lít nước), sau đó khử trùng bằng viên <strong>Cloramin B 0,25g</strong> (chờ 30 phút sau khi hòa tan mới đun sôi để uống).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View D: Vaccine Rotavirus */}
            {activeTab === 'vaccine' && (
              <motion.div
                key="vaccine-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4.5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
                  <span className="font-heading font-extrabold text-xs text-[#12343B] flex items-center gap-1.5">
                    <Syringe size={16} className="text-purple-600" />
                    MIỄN DỊCH CHỦ ĐỘNG: VACCINE ROTAVIRUS & KHÁNG THỂ SỮA MẸ
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                    Bảo vệ trẻ nhỏ
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 text-xs">
                  <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-extrabold">
                      Rx
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs text-purple-900 mb-0.5">
                        Uống đủ 2 – 3 liều Vaccine phòng Rotavirus
                      </h4>
                      <p className="text-[11px] text-[#5B7B80] leading-relaxed">
                        • Liều đầu tiên uống từ <strong>tuần thứ 6 – 8</strong> sau sinh.<br />
                        • Hoàn thành toàn bộ phác đồ trước khi trẻ tròn <strong>6 tháng tuổi</strong>.<br />
                        • Hiệu quả bảo vệ: Giảm tới <strong>85 – 95%</strong> ca tiêu chảy nặng phải nhập viện cấp cứu!
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-pink-50/80 border border-pink-200/70 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0">
                      <Baby size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-xs text-pink-900 mb-0.5">
                        Nuôi con bằng sữa mẹ hoàn toàn 6 tháng đầu
                      </h4>
                      <p className="text-[11px] text-[#5B7B80] leading-relaxed">
                        Sữa mẹ cung cấp lượng lớn kháng thể <strong>sIgA</strong>, lysozyme và lactoferrin giúp bao bọc và bảo vệ nhung mao ruột non, ngăn vi khuẩn, virus bám dính vào niêm mạc.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-[#5B7B80]">
                  <span>💡 Khuyến nghị WHO: Bổ sung <strong>Kẽm (Zinc)</strong> 10-14 ngày giúp tái tạo biểu mô ruột.</span>
                  <span className="font-mono text-[10px] text-purple-600 font-bold">TCMR 2024</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Bottom Management Banner: NGUYÊN TẮC VÀNG BÙ ORESOL CHUẨN WHO */}
      <div className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-[#EAF6FD] to-white border border-[#1FBFA8]/30 flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs shadow-xs shrink-0">
        <div className="font-heading font-extrabold text-[#12343B] flex items-center gap-1.5 shrink-0">
          <span className="w-6 h-6 rounded-lg bg-[#1FBFA8] text-white flex items-center justify-center text-xs font-black shadow-2xs">
            ORS
          </span>
          <span className="text-[11.5px] tracking-tight">XỬ TRÍ BÙ NƯỚC:</span>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-[#12343B]">
          <div className="flex items-start gap-1.5">
            <span className="text-[#1FBFA8] font-black">①</span>
            <span><strong>Bù Oresol:</strong> Pha đúng 100% tỷ lệ nước (245 mOsm/L), uống từng ngụm nhỏ, không pha đường/sữa.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#3BB8F0] font-black">②</span>
            <span><strong>Ăn nhẹ liên tục:</strong> Cháo loãng, chuối chín; trẻ bú mẹ tiếp tục bú bình thường — không nhịn ăn.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#EF4B5F] font-black">③</span>
            <span><strong>Không tự ý:</strong> Dùng thuốc cầm (Loperamide) làm liệt ruột, hoặc tự mua kháng sinh uống bừa bãi!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide10DiarrheaPrevention;