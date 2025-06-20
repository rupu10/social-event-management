import React from 'react';
import EventCard from './EventCard';

const AllEvents = ({eventsPromise}) => {
    const events = eventsPromise
    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                events.map((event)=><EventCard key={event._id} event={event}></EventCard>)
            }
        </div>
    );
};

export default AllEvents;