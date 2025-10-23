import React from "react";
import bannerImage from "/pexels-julia-m-cameron-6994833.jpg";
import image1 from '../assets/37-ke-240922-cleanup-1.jpg';
import image2 from '../assets/National-Tree-Planting-Day-e1639.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-base-100 via-base-100 to-primary/5 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="md:w-10/12 mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 relative z-10 py-4 md:py-16 lg:py-20 xl:py-45">
        {/* Text Section - flex-1 */}
        <div className="flex-1 text-center lg:text-left w-full space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              🌟 Join Our Community
            </div>
            
            <h1 className="text-4xl sm:text-4xl md:text-5xl 2xl:text-7xl font-bold leading-tight">
              Discover{" "}
              <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                Amazing Events
              </span>{" "}
              Around You
            </h1>

            <p className="text-base sm:text-lg text-base-content/80 max-w-xl mx-auto lg:mx-0 leading-relaxed lg:text-xl xl:text-2xl">
              Connect with like-minded people, explore exciting activities, and create 
              unforgettable memories in your community.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button className="btn btn-primary px-6 py-2 text-base font-semibold rounded-full">
              Explore Events
            </button>
            <button className="btn btn-outline px-6 py-2 text-base font-semibold rounded-full">
              Create Event
            </button>
          </div>
        </div>

        {/* Swiper Section - fixed width for md and lg */}
        <div className="flex-1 w-full lg:max-w-lg 2xl:max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-base-100">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-64 sm:h-80 md:h-72 lg:h-80 xl:h-96"
              >
                <SwiperSlide>
                  <img
                    src={bannerImage}
                    alt="Community Event"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={image1}
                    alt="Cleanup Event"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={image2}
                    alt="Tree Planting Event"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;