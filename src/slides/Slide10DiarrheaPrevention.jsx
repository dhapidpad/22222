import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Droplet, Syringe, AlertCircle } from 'lucide-react';
import HandWash from '../components/svg/HandWash';
import content from '../data/content';
import sfx from '../audio/sfx';

export function Slide10DiarrheaPrevention() {
  const data = content.slide10;
  const [activeTab, setActiveTab] = useState('handwash'); // 'handwash' | 'food' | 'water' | 'vaccine'

  const tabDetails = {
    handwash: {
      title: 'Trụ 1: Rửa tay 6 bước với xà phòng',
      desc: 'Rửa tay thường quy theo quy trình 6 bước của Bộ Y tế trong tối thiểu 30 giây. Rửa trước khi ăn, trước khi chuẩn bị thức ăn, sau khi đi vệ sinh và sau khi thay tã cho trẻ.',
      img: '/assets/images/slide10/slide10-rua-tay-xa-phong-01.webp',
      imgCaption: 'Rửa tay kỹ với xà phòng dưới vòi nước sạch'
    },
    food: {
      title: 'Trụ 2: Ăn chín uống sôi triệt để',
      desc: 'Nấu chín kỹ thực phẩm (thịt, cá, trứng, hải sản), không ăn đồ sống tái (tiết canh, gỏi). Bảo quản thức ăn trong tủ lạnh, đậy kín chống ruồi; tách biệt dao thớt đồ sống và chín.',
      img: '/assets/images/slide10/slide10-nau-chin-thuc-an-03.webp',
      imgCaption: 'Nấu chín kỹ thức ăn sôi bốc hơi trên bếp sạch'
    },
    water: {
      title: 'Trụ 3: Nguồn nước sạch & Vệ sinh môi trường',
      desc: 'Uống nước đun sôi để nguội hoặc nước đóng chai đạt chuẩn kiểm định. Giữ gìn nhà tiêu hợp vệ sinh, không phóng uế bừa bãi ra môi trường ao hồ xung quanh.',
      img: '/assets/images/slide10/slide10-rot-nuoc-sach-02.webp',
      imgCaption: 'Rót nước lọc sạch đạt chuẩn vào cốc trong lành'
    },
    vaccine: {
      title: 'Trụ 4: Vaccine phòng Rotavirus & Bú sữa mẹ',
      desc: 'Cho trẻ uống đủ 2 liều vaccine Rotavirus (bắt đầu từ 2 tháng tuổi, hoàn thành trước 6 tháng tuổi) trong Chương trình Tiêm chủng mở rộng. Cho trẻ bú mẹ hoàn toàn trong 6 tháng đầu đời.',
      img: '/assets/images/slide2/slide2-trai-cay-rau-cu-tuoi-01.webp',
      imgCaption: 'Miễn dịch chủ động và dinh dưỡng tự nhiên bảo vệ ruột'
    }
  };

  const current = tabDetails[activeTab];

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-12 py-2">
      {/* Slide Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-[#3BB8F0] tracking-widest uppercase">
            {data.tag}
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-[#12343B]">
            {data.title}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-medium max-w-lg text-right">
          "Rửa tay 6 bước, ăn chín uống sôi, vaccine Rotavirus và nguyên tắc vàng bù Oresol."
        </p>
      </div>

      {/* Main 4 Pillars Interactive Tabs */}
      <div className="grid grid-cols-12 gap-5 items-stretch flex-1 my-1">
        {/* Left Column: 4 Pillar Navigation & Detail (Col 1-5) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { id: 'handwash', name: '🧼 Rửa tay 6 bước' },
              { id: 'food', name: '🍲 Ăn chín uống sôi' },
              { id: 'water', name: '🚰 Nước & Vệ sinh' },
              { id: 'vaccine', name: '💉 Vaccine Rotavirus' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  sfx.tick();
                  setActiveTab(p.id);
                }}
                className={`p-2.5 rounded-2xl text-xs font-bold text-left transition-all border ${
                  activeTab === p.id
                    ? 'bg-gradient-to-r from-[#1FBFA8] to-[#3BB8F0] text-white shadow-md border-transparent scale-102'
                    : 'bg-white/70 text-[#12343B] hover:bg-white border-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Pillar Active Content Card with Real Image */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-white shadow-sm flex flex-col justify-between flex-1"
          >
            <div>
              <h3 className="font-heading font-extrabold text-sm text-[#12343B] mb-1.5">
                {current.title}
              </h3>
              <p className="text-xs text-[#5B7B80] leading-relaxed mb-3">
                {current.desc}
              </p>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl bg-gray-50 border border-gray-100">
              <img
                src={current.img}
                alt={current.imgCaption}
                className="w-20 h-14 rounded-xl object-cover shadow-sm shrink-0"
                loading="lazy"
              />
              <span className="text-[11px] font-semibold text-[#12343B]">
                {current.imgCaption}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Handwashing Component Visual (Col 6-12) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          <HandWash />
        </div>
      </div>

      {/* Bottom Management Banner: XỬ TRÍ BAN ĐẦU KHI BỊ TIÊU CHẢY */}
      <div className="w-full p-3 rounded-2xl bg-gradient-to-r from-[#E3F7F2] to-[#EAF6FD] border border-[#1FBFA8]/30 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="font-heading font-extrabold text-[#12343B] flex items-center gap-1.5 shrink-0">
          <span className="w-6 h-6 rounded-lg bg-[#1FBFA8] text-white flex items-center justify-center text-xs">
            ORS
          </span>
          <span>XỬ TRÍ BAN ĐẦU:</span>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-[#12343B]">
          <div className="flex items-start gap-1.5">
            <span className="text-[#1FBFA8] font-bold">①</span>
            <span><strong>Bù Oresol:</strong> Pha đúng thể tích nước ghi trên gói (245 mOsm/L), uống từng ngụm nhỏ rải rác.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#3BB8F0] font-bold">②</span>
            <span><strong>Ăn nhẹ liên tục:</strong> Cháo loãng, súp nạc, chuối chín; trẻ bú mẹ tiếp tục bú — không nhịn ăn.</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-[#EF4B5F] font-bold">③</span>
            <span><strong>Không tự ý:</strong> Dùng thuốc cầm ỉa (loperamide) hoặc kháng sinh khi chưa có đơn bác sĩ!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide10DiarrheaPrevention;
