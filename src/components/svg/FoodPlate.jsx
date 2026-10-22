import React from 'react';

export function FoodPlate({ size = 160, className = '' }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 200 200" width={size} height={size} className="overflow-visible drop-shadow-md">
        <defs>
          <radialGradient id="plateRim" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>
        </defs>

        {/* Outer Plate Rim */}
        <circle cx="100" cy="100" r="95" fill="url(#plateRim)" stroke="#CBD5E1" strokeWidth="3" />
        <circle cx="100" cy="100" r="78" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* 4 Quadrants */}
        {/* Q1: Tinh bột mềm (Cháo/Cơm) - Vàng */}
        <path d="M 100 100 L 100 24 A 76 76 0 0 1 176 100 Z" fill="#FEF3C7" stroke="#FFFFFF" strokeWidth="2" />
        <text x="135" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">Tinh bột</text>
        <text x="135" y="78" textAnchor="middle" fontSize="8" fill="#92400E">Cháo / cơm</text>

        {/* Q2: Rau củ hấp - Xanh lá */}
        <path d="M 100 100 L 176 100 A 76 76 0 0 1 100 176 Z" fill="#D1FAE5" stroke="#FFFFFF" strokeWidth="2" />
        <text x="135" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">Rau hấp</text>
        <text x="135" y="148" textAnchor="middle" fontSize="8" fill="#065F46">Chất xơ mềm</text>

        {/* Q3: Đạm nạc mềm (Cá/Ức gà) - Cam đào */}
        <path d="M 100 100 L 100 176 A 76 76 0 0 1 24 100 Z" fill="#FFEDD5" stroke="#FFFFFF" strokeWidth="2" />
        <text x="65" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#C2410C">Đạm nạc</text>
        <text x="65" y="148" textAnchor="middle" fontSize="8" fill="#9A3412">Cá / thịt mềm</text>

        {/* Q4: Nước ấm / Trái cây chín - Xanh biển */}
        <path d="M 100 100 L 24 100 A 76 76 0 0 1 100 24 Z" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="2" />
        <text x="65" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">Nước ấm</text>
        <text x="65" y="78" textAnchor="middle" fontSize="8" fill="#075985">Chuối / Táo</text>

        {/* Center circle */}
        <circle cx="100" cy="100" r="14" fill="#FFFFFF" stroke="#1FBFA8" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="4" fill="#1FBFA8" />
      </svg>
      <span className="text-[11px] font-bold text-[#12343B] mt-1.5">Đĩa ăn bảo vệ niêm mạc</span>
    </div>
  );
}

export default FoodPlate;
