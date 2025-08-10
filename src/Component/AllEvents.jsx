import React from 'react';
import EventCard from './EventCard';

const AllEvents = ({eventsPromise}) => {
    const events = eventsPromise
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                events.map((event)=><EventCard key={event._id} event={event}></EventCard>)
            }
        </div>
    );
};

export default AllEvents;