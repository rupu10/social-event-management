import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Link } from 'react-router';

const Features = () => {
    const [eventsPromise, setEventsPromise] = useState([]);
        useEffect(()=>{
            fetch("https://social-management-server.vercel.app/ourEvents")
            .then(res=>res.json())
            .then(data=>{
                setEventsPromise(data)
            })
        },[])
    return (
        <div className='md:w-10/12 mx-auto my-8'>
            <div className='text-center'>
                <h1 className='text-4xl mb-4 md:text-6xl font-semibold'>Our <span className='text-purple-700'>events</span></h1>
            <p className='text-xl md:text-2xl font-light md:mb-7'>Here is some of our events</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                eventsPromise.map((event)=><EventCard event={event} key={event._id}></EventCard>)
            }
        </div>
        <div className='flex justify-center items-center my-4'><Link to='/upComingEvents' className='btn btn-dtls'>View All Events</Link></div>
        </div>
    );
};

export default Features;