import React from 'react';

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  onClick = null,
  hover = true
}) {
  const variantStyles = {
    default: 'bg-white/75 border border-white/85 shadow-mint-glow text-[#12343B]',
    mint: 'bg-[#E3F7F2]/80 border border-[#1FBFA8]/25 shadow-mint-glow text-[#12343B]',
    warm: 'bg-[#FFF2EB]/80 border border-[#FF8A5B]/30 shadow-warm-glow text-[#12343B]',
    ocean: 'bg-[#EAF6FD]/80 border border-[#3BB8F0]/30 shadow-ocean-glow text-[#12343B]',
    danger: 'bg-[#FFE9EC]/85 border border-[#EF4B5F]/40 shadow-[0_16px_40px_rgba(239,75,95,0.15)] text-[#12343B]'
  };

  const hoverEffect = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
    : '';

  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-md rounded-[28px] ${variantStyles[variant] || variantStyles.default} ${hoverEffect} ${className}`}
    >
      {children}
    </div>
  );
}

export default GlassCard;
