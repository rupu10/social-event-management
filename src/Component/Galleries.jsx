import React from 'react';
import image1 from '/feature1.jpg'
import image2 from '/feature2.jpg'
import image3 from '/feature3.jpg'
import image4 from '/feature4.jpg'
import image5 from '/feature5.jpg'
import image6 from '/feature6.jpg'

const Galleries = () => {
    return (
        <div className='w-10/12 mx-auto my-4'>
            <h1 className='text-2xl md:text-4xl font-semibold mt-6'>Our event gallery</h1>
            <p className='mb-6 md:text-4xl font-light'>some of our events photo</p>
            <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
                <img className='h-[150px] md:h-[350px] w-full rounded-2xl' src={image2} alt="" />
            </div>
            <img className='h-[150px] md:h-[350px] w-full rounded-2xl' src={image1} alt="" />
            <img className='h-[150px] md:h-[350px] w-[520px] rounded-2xl' src={image4} alt="" />
            <div className='col-span-2'>
                <img className='h-[150px] md:h-[350px] w-full rounded-2xl' src={image3} alt="" />
            </div>
            <div className='col-span-2'>
                <img className='h-[150px] md:h-[350px] w-full rounded-2xl' src={image6} alt="" />
            </div>
            <img className='h-[150px] md:h-[350px] w-[520px] rounded-2xl' src={image5} alt="" />
        </div>
        </div>
    );
};

export default Galleries;