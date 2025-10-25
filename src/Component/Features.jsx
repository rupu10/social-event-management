import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Link } from 'react-router';

const Features = () => {
    const [eventsPromise, setEventsPromise] = useState([]);
        useEffect(()=>{
            fetch("http://localhost:7000/ourEvents")
            .then(res=>res.json())
            .then(data=>{
                setEventsPromise(data)
            })
        },[])
    return (
        <div className='w-10/12 mx-auto my-8'>
            <div className='text-center'>
                <h1 className='text-3xl md:text-4xl font-semibold mb-1'>Our events</h1>
            <p className='text-xl md:text-3xl font-light mb-4'>Here is some of our events</p>
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