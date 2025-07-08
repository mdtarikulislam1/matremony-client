import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  const images = [
    "https://i.postimg.cc/TYTm86cg/couple-standing-together-hand-hand-beach.jpg",
    "https://i.postimg.cc/XvN43sz2/silhouette-sweet-couple-kissing-sunset-background.jpg",
    "https://i.postimg.cc/RFMRgHqJ/closeup-woman-sitting-man-s-back-looking-happy.jpg",
  ];

  return (
    <div  className="max-w-7xl mx-auto px-0 rounded-b-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] sm:h-[650px] md:h-[800px] object-cover rounded-b-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
