"use client";
import { useState, useEffect } from "react";
import { FaHandsHelping, FaHeartbeat, FaTshirt, FaUtensils, FaUserFriends, FaBook, FaClinicMedical, FaHandHoldingHeart } from "react-icons/fa";

const OurWork = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "Community Cleanup",
      description: "Organizing neighborhood cleanups to maintain clean and healthy public spaces for everyone.",
      icon: <FaHandsHelping className="w-7 h-7" />
    },
    {
      title: "Blood Donation Camp",
      description: "Hosting regular blood donation drives to support local hospitals and save lives.",
      icon: <FaHeartbeat className="w-7 h-7" />
    },
    {
      title: "Clothing Drive",
      description: "Collecting and distributing clothes to underprivileged families and individuals in need.",
      icon: <FaTshirt className="w-7 h-7" />
    },
    {
      title: "Food Distribution",
      description: "Providing nutritious meals and food packages to homeless shelters and low-income communities.",
      icon: <FaUtensils className="w-7 h-7" />
    },
    {
      title: "Elderly Support",
      description: "Visiting and assisting elderly community members with daily tasks and companionship.",
      icon: <FaUserFriends className="w-7 h-7" />
    },
    {
      title: "Educational Support",
      description: "Offering tutoring and educational resources to children from disadvantaged backgrounds.",
      icon: <FaBook className="w-7 h-7" />
    },
    {
      title: "Medical Camps",
      description: "Organizing free health checkups and medical camps in underserved communities.",
      icon: <FaClinicMedical className="w-7 h-7" />
    },
    {
      title: "Disaster Relief",
      description: "Providing emergency assistance and support during natural disasters and crises.",
      icon: <FaHandHoldingHeart className="w-7 h-7" />
    },
  ];

  const ServiceCardSkeleton = ({ featured = false, wide = false }) => (
    <div className={`
      group rounded-2xl p-6 sm:p-8 shadow-md border border-base-300 flex flex-col items-center text-center relative overflow-hidden animate-pulse
      ${
        featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 justify-center h-[300px] sm:h-full" : ""
      } 
      ${wide ? "sm:col-span-2" : ""} 
      ${!featured && !wide ? "h-[220px] sm:h-full" : ""}
    `}>
      <div className="skeleton bg-base-300 w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-4 sm:mb-6"></div>

      <div className={`${featured ? "max-w-md" : "w-full"} z-10`}>
        <div className={`skeleton bg-base-300 h-6 rounded mb-2 sm:mb-3 ${featured ? "w-48 mx-auto" : "w-32"}`}></div>
        
        <div className="space-y-2 text-sm">
          <div className="skeleton bg-base-300 h-3 w-full rounded"></div>
          <div className="skeleton bg-base-300 h-3 w-5/6 mx-auto rounded"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-base-300 rounded-full"></div>
    </div>
  );

  const SectionHeaderSkeleton = () => (
    <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto animate-pulse px-4">
      <div className="skeleton bg-base-300 h-10 w-3/4 sm:w-80 mx-auto rounded-lg mb-3 sm:mb-4"></div>
      <div className="skeleton bg-base-300 h-4 w-full rounded mb-2"></div>
      <div className="skeleton bg-base-300 h-4 w-5/6 mx-auto rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 relative bg-base-100">
        <div className="lg:container mx-auto px-6">
          <SectionHeaderSkeleton />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-5 xl:gap-10 auto-rows-[minmax(200px,auto)]">
            <ServiceCardSkeleton featured={true} />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton wide={true} />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative bg-base-100">
      <div className="md:w-10/12 mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-base-content">
            Our <span className="text-primary">Social Work</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-4 text-base-content">
            Making a difference in our community through meaningful social services
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-5 xl:gap-10 auto-rows-[minmax(200px,auto)]">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                group rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary flex flex-col items-center text-center relative overflow-hidden bg-base-200
                ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 text-base-100 justify-center h-[300px] sm:h-full w-full"
                    : "h-full"
                } 
                ${index === 3 ? "sm:col-span-1 lg:col-span-2" : "sm:col-span-1 lg:col-span-1"}
                ${index === 7 ? "lg:col-span-1 sm:col-span-2" : "sm:col-span-1 lg:col-span-1"}
                ${index === 0 ? "shadow-2xl" : ""}
              `}
              style={
                index === 0
                  ? {
                      backgroundImage: "url('https://i.ibb.co.com/v4Jjnpxf/vitaly-gariev-ci-Uu-GGd1-OKo-unsplash.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              
              {index === 0 && (
                <div className="absolute inset-0 bg-primary/40 z-0 rounded-2xl"></div>
              )}

              
              <div 
                className={`p-4 mb-4 sm:mb-6 rounded-full text-primary shadow-inner z-10 transition-colors duration-300
                  ${index === 0 
                    ? "bg-base-100/10 text-base-100 group-hover:bg-base-100/20" 
                    : "bg-primary/10 group-hover:bg-primary group-hover:text-base-100"
                  }
                `}>
                {service.icon}
              </div>

              
              <div className={`${index === 0 ? "max-w-md" : "w-full"} z-10`}>
                
                <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 transition-colors 
                  ${index === 0 ? "text-base-100" : "text-base-content group-hover:text-primary"}
                `}>
                  {service.title}
                </h3>

                
                <p className={`text-xs sm:text-sm leading-relaxed 
                  ${index === 0 ? "text-base-200" : "text-base-content/70"}
                `}>
                  {service.description}
                </p>
              </div>

              
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full group-hover:w-16 transition-all duration-300 z-10
                ${index === 0 ? "bg-base-100" : "bg-primary"}
              `}></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;