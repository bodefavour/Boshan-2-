import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const carouselItems = [
    { id: 1, name: "Elegant Earrings", image: "/images/Cosmetic_Tube_3.png" },
    { id: 2, name: "Luxury Bag", image: "/images/Boshan_Beauty_Products.png" },
    { id: 3, name: "Classic Watch", image: "/images/Cosmetic_Tube.png" },
    { id: 4, name: "Designer Cup", image: "/images/Cup.png" },
    { id: 5, name: "Luxury Foundation", image: "/images/Foundation.png" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {carouselItems.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <div className="relative group w-full max-w-xs bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                  {item.name}
                </h3>
                <button className="mt-3 px-4 py-2 text-sm font-medium text-white bg-black rounded-md transition duration-300 hover:bg-gray-800">
                  View Details
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
