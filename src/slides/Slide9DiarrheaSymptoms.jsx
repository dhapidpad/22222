import React from 'react';
import { AlertTriangle, Droplets, Activity } from 'lucide-react';
import DehydrationScale from '../components/svg/DehydrationScale';
import content from '../data/content';

export function Slide9DiarrheaSymptoms({ onSelectView, onSelectSlide }) {
  const data = content.slide9;

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 md:px-12 py-2">
      {/* Slide Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-[#3BB8F0] tracking-widest uppercase">
            {data.tag}
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-[#12343B]">
            {data.title}
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5B7B80] font-medium max-w-lg text-right">
          "Nguy hiểm lớn nhất của tiêu chảy là mất nước và điện giải. Nhận biết đúng 3 mức độ để xử trí kịp thời."
        </p>
      </div>

      {/* Main 3 Columns Grid */}
      <div className="grid grid-cols-12 gap-6 items-stretch flex-1 my-2">
        {/* Col 1: Common Clinical Symptoms (Col 1-3) */}
        <div className="col-span-12 lg:col-span-3 p-5 rounded-[28px] bg-white/85 backdrop-blur-md border border-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-[#EAF6FD] text-[#3BB8F0]">
                <Activity size={18} />
              </span>
              <h3 className="font-heading font-extrabold text-base text-[#12343B]">
                Triệu chứng thường gặp
              </h3>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-[#12343B]">
              <li className="flex items-start gap-2">
                <span className="text-[#3BB8F0] font-bold mt-0.5">✔</span>
                <span><strong>Phân lỏng / tóe nước:</strong> Đi ngoài từ 3 lần trở lên trong 24 giờ.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3BB8F0] font-bold mt-0.5">✔</span>
                <span><strong>Đau quặn bụng:</strong> Co thắt từng cơn dọc khung đại tràng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3BB8F0] font-bold mt-0.5">✔</span>
                <span><strong>Buồn nôn & nôn:</strong> Dễ gây tăng nguy cơ kiệt nước cấp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3BB8F0] font-bold mt-0.5">✔</span>
                <span><strong>Mệt mỏi toàn thân:</strong> Há hốc miệng, khô môi, uể oải.</span>
              </li>
            </ul>
          </div>

          <div className="mt-3 p-3 rounded-2xl bg-[#EAF6FD] border border-[#3BB8F0]/30 text-[11px] text-[#0288D1] font-semibold">
            💡 Định hướng: Phân toàn nước đục hay do virus/tả; phân có máu/nhầy + sốt cao hay do vi khuẩn xâm lấn.
          </div>
        </div>

        {/* Col 2: Interactive WHO Dehydration Scale (Col 4-8) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
          <DehydrationScale />
        </div>

        {/* Col 3: Danger Red Flag Box (Col 9-12) */}
        <div className="col-span-12 lg:col-span-3 p-5 rounded-[28px] bg-[#FFE9EC]/90 backdrop-blur-md border border-[#EF4B5F]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-[#EF4B5F] text-white animate-pulse">
                <AlertTriangle size={18} />
              </span>
              <h3 className="font-heading font-extrabold text-base text-[#EF4B5F]">
                CẢNH BÁO CẦN NHẬP VIỆN
              </h3>
            </div>

            <p className="text-xs text-[#12343B] font-semibold mb-3">
              Đưa người bệnh đến bệnh viện ngay khi xuất hiện:
            </p>

            <ul className="space-y-2.5 text-xs text-[#12343B]">
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-base mt-[-2px]">🚨</span>
                <span><strong>Mất nước nặng:</strong> Li bì, lơ mơ khó đánh thức, mắt rất trũng, véo da lâu phẳng (&gt;2s).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-base mt-[-2px]">🚨</span>
                <span><strong>Phân có lẫn máu:</strong> Nghi ngờ nhiễm khuẩn lỵ trực trùng hoặc lỵ amip.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-base mt-[-2px]">🚨</span>
                <span><strong>Nôn liên tục:</strong> Nôn tất cả mọi thứ vừa uống, không thể uống Oresol được.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-base mt-[-2px]">🚨</span>
                <span><strong>Sốt cao liên tục:</strong> Nhiệt độ ≥ 38.5°C khó hạ kèm thở gấp.</span>
              </li>
            </ul>
          </div>

          <div className="mt-3 p-3 rounded-2xl bg-[#EF4B5F] text-white text-center font-heading font-extrabold text-xs shadow-md">
            🚑 CẤP CỨU TRUYỀN DỊCH TĨNH MẠCH NGAY
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide9DiarrheaSymptoms;
