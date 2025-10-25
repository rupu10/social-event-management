"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ReviewsSection() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:7000/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const SectionHeaderSkeleton = () => (
    <div className="lg:container mx-auto px-6 text-center mb-8 sm:mb-10 animate-pulse">
      <div className="skeleton bg-gray-300 h-10 w-48 sm:h-12 sm:w-64 mx-auto rounded-lg mb-3 sm:mb-4"></div>
      <div className="skeleton bg-gray-300 h-4 w-64 sm:w-80 mx-auto rounded"></div>
    </div>
  );

  const ReviewCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-[250px] animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="skeleton bg-gray-200 w-12 h-12 rounded-full"></div>
        <div className="flex-1">
          <div className="skeleton bg-gray-200 h-4 w-32 rounded mb-2"></div>
          <div className="skeleton bg-gray-200 h-3 w-24 rounded"></div>
        </div>
      </div>
      <div className="skeleton bg-gray-200 h-4 w-20 rounded mb-3"></div>
      <div className="space-y-2">
        <div className="skeleton bg-gray-200 h-3 w-full rounded"></div>
        <div className="skeleton bg-gray-200 h-3 w-5/6 rounded"></div>
        <div className="skeleton bg-gray-200 h-3 w-4/6 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="relative mt-12 sm:mt-16">
        <SectionHeaderSkeleton />
        <div className="relative py-16 sm:py-20 lg:py-24 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative lg:container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}

  return (
    <section className="relative mt-12 sm:mt-16">
      <div className="md:w-10/12 mx-auto px-6 text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-urbanist">
          What Our <span className="text-primary"> Say</span>
        </h2>
        <p className="text-base sm:text-lg mt-2 max-w-2xl mx-auto font-poppins">
          Read genuine reviews from our community members
        </p>
      </div>

      <div
        className="relative py-16 sm:py-20 lg:py-24 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/ynqjGpBj/zainul-yasni-Qi-Ixg-q2vh0-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative lg:container mx-auto px-6">
          <div className="relative">
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={{ nextEl: ".review-swiper-next", prevEl: ".review-swiper-prev" }}
              loop={true}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review._id || index}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-[250px] flex flex-col">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        <img className='rounded-full w-full h-full object-cover' src={review.photo} alt={review.reviewerName} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{review.reviewerName || 'Anonymous'}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.reviewDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={`text-lg ${
                              starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-lg font-bold text-gray-900">{review.rating}.0</span>
                    </div>

                    {/* Review Comment */}
                    <p className="text-gray-700 leading-relaxed flex-1 line-clamp-3">
                      "{review.comment}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button className="review-swiper-prev w-10 h-10 rounded-full bg-white text-primary shadow hover:bg-primary hover:text-white transition text-2xl flex items-center justify-center">
                <FaChevronLeft/>
              </button>
              <button className="review-swiper-next w-10 h-10 rounded-full bg-white text-primary shadow hover:bg-primary hover:text-white transition text-2xl flex items-center justify-center">
                <FaChevronRight/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}