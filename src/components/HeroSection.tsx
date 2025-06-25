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
      {/* <div className="absolute inset-0 z-10 hidden md:block"
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
          )`}}></div> */}

      {/* Mobile View */}
      <div className="md:hidden absolute bottom-[6%] left-1/2 transform -translate-x-1/2 z-10 w-[90%] rounded-3xl px-6 py-8 text-white bg-black/60 backdrop-blur-md shadow-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold leading-snug">
          Glowing Skin.<br />Zero Guesswork.<br />Delivered Monthly.
        </h1>
        <p className="text-sm text-gray-300">
          Dermatologist-backed, Afrocentric beauty kits, tailored to your skin.
        </p>
        <button
          onClick={onCtaClick}
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-6 py-3 rounded-full font-semibold transition shadow-md"
        >
          Start Your Ritual →
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex absolute inset-0 items-center justify-start pl-16">
        <div className="absolute left-[5%] top-[30%] z-20 w-1/2 space-y-4 text-white">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl px-8 py-6 border border-white/20 shadow-md max-w-fit">
            {brandName && (
              <h1
                className="uppercase font-quicksand text-boshan leading-tight tracking-wide"
                style={{
                  fontSize: "9rem",
                  whiteSpace: "nowrap",
                }}
              >
                {brandName}
              </h1>
            )}
            {children}
            {ctaText && <p className="text-xl text-gray-200">{ctaText}</p>}
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
      </div>
    </section>
  );
};

export default HeroSection;