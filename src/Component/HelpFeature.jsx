import { useState, useEffect } from "react";

export default function HelpFeature() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="relative mt-12 sm:mt-16">
        <div className="lg:container mx-auto px-6 text-center mb-8 sm:mb-10 animate-pulse">
          <div className="skeleton bg-gray-300 h-10 w-48 sm:h-12 sm:w-64 mx-auto rounded-lg mb-3 sm:mb-4"></div>
          <div className="skeleton bg-gray-300 h-4 w-64 sm:w-80 mx-auto rounded"></div>
        </div>
        
        <div className="relative py-32 sm:py-40 lg:py-48 bg-gray-200 animate-pulse">
          <div className="relative lg:container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="skeleton bg-gray-300 h-8 w-3/4 mx-auto rounded mb-4"></div>
              <div className="skeleton bg-gray-300 h-4 w-full rounded mb-2"></div>
              <div className="skeleton bg-gray-300 h-4 w-5/6 mx-auto rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-12 sm:mt-16">
      <div className="nd:w-10/12 mx-auto px-6 text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-urbanist">
          Community <span className="text-purple-600">Events</span>
        </h2>
        <p className="text-base sm:text-lg mt-2 max-w-2xl mx-auto font-poppins">
          Join us in creating memorable social experiences together
        </p>
      </div>

      <div
        className="relative py-32 sm:py-40 lg:py-48 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/prndxXTG/wylly-suhendra-Swk4-G-xi-u-M-unsplash.jpg')",
        }}
      >
        <div className="relative lg:container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-urbanist mb-4 sm:mb-6 text-purple-600">
              Connect Through Social Events
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed text-white">
              Bring people together with engaging social events that foster connections and create lasting memories. 
              From community gatherings to special celebrations, we help you organize meaningful experiences that 
              strengthen bonds and build vibrant communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}