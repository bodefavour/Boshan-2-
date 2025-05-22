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
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-300" style={{ width: "100%" }}></div>

      {/* Mobile View */}
      <div className="md:hidden absolute bottom-[13%] left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full">
        {children}
      </div>

      {brandName && (
        <h1
          className="md:hidden absolute font-extralight uppercase font-phudu text-white"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="text-[3rem] tracking-[0.1em]">{brandName}</span>
        </h1>
      )}

      {/* Desktop View */}
      <div className="hidden md:flex absolute inset-0 items-center justify-start pl-16">
        <div className="absolute left-[5%] top-[30%] text-left text-white z-20 w-1/2 space-y-4">
          {brandName && (
            <h1
              className="font-extralight uppercase font-sans text-white leading-tight"
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