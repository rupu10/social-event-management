import React from "react";
import bannerImage from "/pexels-julia-m-cameron-6994833.jpg";
import TypeWrite from "./TypeWrite";

const Banner = () => {
  return (
    <div
      className="h-[300px] md:h-[500px] bg-cover bg-center filter brightness-75"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <TypeWrite></TypeWrite>
    </div>
  );
};

export default Banner;
