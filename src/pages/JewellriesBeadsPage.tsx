import React from "react";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";

const JewellriesBeads: React.FC = () => {
  const sampleProducts = [
    { id: 1, name: "Luxury Necklace", price: 499.99, image: "/images/31343C.svg" },
    { id: 2, name: "Elegant Watch", price: 899.99, image: "/images/31343C.svg" },
    { id: 3, name: "Gift Box Set", price: 299.99, image: "/images/31343C.svg" },
  ];

  return (
    <main>
      {/* Customized Hero Section */}
      <HeroSection
        backgroundImage="/images/HP_Hero-FullBleed-Desktop_Gucci-SOFTBIT-Mar25-GUCCI-PREFALL-DETAILS-29-INDIGO-LEWIN_001_Default.avif"
        className="h-[20vh]"
      >
        <div className="max-w-[70%] mx-auto p-6 rounded-lg">
          <h2 className="text-3xl md:text-5xl font-bold">
          Elegant, handcrafted pieces designed to shine.
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-black text-lg rounded-lg hover:bg-gray-300 transition">
            Explore Jewellry Options
          </button>
        </div>
      </HeroSection>

      <ProductGrid products={sampleProducts} />
    </main>
  );
};

export default JewellriesBeads;
