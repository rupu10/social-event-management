import React from 'react';

const NewsLetter = () => {
    return (
        <div className='w-10/12 mx-auto my-8'>
            <h1 className='text-center text-4xl font-semibold mt-4'>Subscribe</h1>
            <p className='mb-4 text-center font-light'>Keep up our latest news and event and subscribe our news letter</p>
            <div className='flex justify-center gap-3'>
                <input type="text" className='border rounded-lg px-9' placeholder='your email . . .'/>
                <button className='btn bg-red-400 hover:bg-red-700'>Subscribe</button>
            </div>
        </div>
    );
};

export default NewsLetter;