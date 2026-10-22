import React from 'react';
import { AlertTriangle, Droplets, Activity } from 'lucide-react';
import DehydrationScale from '../components/svg/DehydrationScale';
import content from '../data/content';

export function Slide9DiarrheaSymptoms({ onSelectView, onSelectSlide }) {
  const data = content.slide8?.symptoms || {
    tag: 'BỆNH 2 · DẤU HIỆU & 3 CẤP ĐỘ MẤT NƯỚC',
    title: 'DẤU HIỆU LÂM SÀNG TIÊU CHẢY CẤP'
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-3 md:px-8 lg:px-10 pt-2 pb-16 md:pb-20 select-none overflow-hidden text-[#12343B]">
      {/* Slide Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-[#3BB8F0] tracking-widest uppercase">
              {data.tag}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3BB8F0]"></span>
            <span className="text-[11px] text-[#5B7B80] font-semibold">
              Đánh giá mất nước theo phác đồ Bộ Y tế & WHO
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl text-[#12343B] leading-tight">
            {data.title}
          </h2>
        </div>
        <p className="text-xs text-[#5B7B80] font-medium max-w-md text-right hidden sm:block">
          "Nguy hiểm lớn nhất của tiêu chảy là mất nước và điện giải. Nhận biết đúng 3 mức độ để xử trí kịp thời."
        </p>
      </div>

      {/* Main 3 Columns Grid */}
      <div className="grid grid-cols-12 gap-3.5 items-stretch flex-1 min-h-0 my-1 overflow-hidden">
        {/* Col 1: Common Clinical Symptoms (Col 1-3) */}
        <div className="col-span-12 lg:col-span-3 p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5 border-b border-gray-100 pb-2">
              <span className="p-1 rounded-lg bg-[#EAF6FD] text-[#3BB8F0]">
                <Activity size={16} />
              </span>
              <h3 className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#12343B]">
                Triệu chứng khởi phát
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-[#334155]">
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
                <span><strong>Buồn nôn & nôn:</strong> Tăng nguy cơ kiệt nước cấp tính.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#3BB8F0] font-bold mt-0.5">✔</span>
                <span><strong>Mệt mỏi toàn thân:</strong> Môi khô, khát nước dữ dội, uể oải.</span>
              </li>
            </ul>
          </div>

          <div className="mt-2 p-2.5 rounded-2xl bg-[#EAF6FD] border border-[#3BB8F0]/30 text-[11px] text-[#0284C7] font-semibold leading-relaxed">
            💡 <strong>Phân biệt:</strong> Phân toàn nước hay do Rotavirus/tả; phân có máu/nhầy kèm sốt cao do vi khuẩn xâm lấn.
          </div>
        </div>

        {/* Col 2: Interactive WHO Dehydration Scale (Col 4-8) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center min-h-0">
          <DehydrationScale />
        </div>

        {/* Col 3: Danger Red Flag Box (Col 9-12) */}
        <div className="col-span-12 lg:col-span-3 p-4 rounded-3xl bg-[#FFE9EC]/90 backdrop-blur-xl border border-[#EF4B5F]/40 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 border-b border-rose-200 pb-2">
              <span className="p-1 rounded-lg bg-[#EF4B5F] text-white animate-pulse">
                <AlertTriangle size={16} />
              </span>
              <h3 className="font-heading font-extrabold text-xs uppercase tracking-wide text-[#EF4B5F]">
                DẤU HIỆU CẦN CẤP CỨU 115
              </h3>
            </div>

            <p className="text-[11px] text-[#12343B] font-semibold mb-2">
              Đưa người bệnh đến bệnh viện ngay khi có:
            </p>

            <ul className="space-y-2 text-xs text-[#12343B]">
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-sm shrink-0">🚨</span>
                <span className="leading-snug"><strong>Mất nước nặng:</strong> Li bì, khó đánh thức, mắt rất trũng, véo da lâu phẳng (&gt;2s).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-sm shrink-0">🚨</span>
                <span className="leading-snug"><strong>Phân có lẫn máu:</strong> Nghi ngờ nhiễm khuẩn lỵ trực trùng hoặc lỵ amip.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-sm shrink-0">🚨</span>
                <span className="leading-snug"><strong>Nôn liên tục:</strong> Nôn tất cả mọi thứ vừa uống, không thể uống Oresol được.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4B5F] font-bold text-sm shrink-0">🚨</span>
                <span className="leading-snug"><strong>Sốt cao liên tục:</strong> Nhiệt độ ≥ 38.5°C khó hạ kèm thở gấp, co giật.</span>
              </li>
            </ul>
          </div>

          <div className="mt-2 p-2 rounded-2xl bg-[#EF4B5F] text-white text-center font-heading font-extrabold text-xs shadow-xs">
            🚑 NHẬP VIỆN TRUYỀN DỊCH TĨNH MẠCH NGAY
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide9DiarrheaSymptoms;