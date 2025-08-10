import React from "react";
import bannerImage from "/pexels-julia-m-cameron-6994833.jpg";
import image1 from '../assets/37-ke-240922-cleanup-1.jpg';
import image2 from '../assets/National-Tree-Planting-Day-e1639.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay  } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TypeWrite from "./TypeWrite";


const Banner = () => {
  return (
    <div
      className=" w-full md:h-[600px] brightness-75"
    >
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <img
            src={bannerImage}
            alt="Image 1"
            className="w-full md:h-[600px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image1}
            alt="Image 2"
            className="w-full md:h-[600px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            alt="Image 3"
            className="w-full md:h-[600px]"
          />
        </SwiperSlide>
      </Swiper>
      
    </div>
  );
};

export default Banner;
