 import React, { ReactNode } from "react";

interface HeroSectionProps {
  backgroundImage: string;
  brandName?: string;
  textSize?: string;
  textSpacing?: string;
  customStyle?: React.CSSProperties;
  children?: ReactNode;
  className?: string;
  brandNameStyle?: React.CSSProperties;
  ctaText?: string;
  ctaButton?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  brandName,
  children,
  className = "",
  ctaText,
  ctaButton,
  onCtaClick,
}) => {
  return (
    <section className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Background Image */}
      <div className="relative w-full flex justify-center items-start">
        <div
          className="w-full h-[66vh] md:h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
          }}
        ></div>
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 hidden md:block"
        style={{
          background: `linear-gradient(
          to right,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.9) 25%,
          rgba(0, 0, 0, 0.85) 40%,
          rgba(0, 0, 0, 0.7) 55%,
          rgba(0, 0, 0, 0.5) 70%,
          rgba(0, 0, 0, 0.3) 85%,
          transparent 100%
          )`}}></div>

      {/* Mobile View */}
<div className="md:hidden absolute bottom-[8%] left-1/2 transform -translate-x-1/2 text-center z-10 w-[90%] px-4">
  {brandName && (
    <h1 className="font-quicksand font-bold uppercase text-[#FFF8F5] text-3xl tracking-widest mb-4">
      {brandName}
    </h1>
  )}
  {children && (
    <p className="text-[#f3e9e5] text-base mb-4 leading-relaxed">
      Discover luxurious skincare & wellness essentials, handcrafted with care, curated for glow.
    </p>
  )}
  {ctaButton && (
    <button
      onClick={onCtaClick}
      className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-full text-sm shadow-md transition"
    >
      {ctaButton}
    </button>
  )}
</div>

      {/* Desktop View */}
      <div className="hidden md:flex absolute inset-0 items-center justify-start pl-16">
        <div className="absolute left-[5%] top-[30%] text-left text-white z-20 w-1/2 space-y-4">
          {brandName && (
            <h1
              className="uppercase font-quicksand text-white leading-tight tracking-wide"
              style={{
                fontSize: "9rem",
                whiteSpace: "nowrap",
              }}
            >
              {brandName}
            </h1>
          )}
          {children}
          {ctaText && (
            <p className="text-xl text-gray-300">{ctaText}</p>
          )}
          {ctaButton && (
            <button
              onClick={onCtaClick}
              className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg transition"
            >
              {ctaButton}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;