import React from 'react';
import bannerImage from '/pexels-julia-m-cameron-6994833.jpg'

const Banner = () => {
    return (
        <div
        className='h-[500px] bg-cover bg-center filter brightness-75'
        style={{backgroundImage:`url(${bannerImage})`}}>
            
        </div>
    );
};

export default Banner;