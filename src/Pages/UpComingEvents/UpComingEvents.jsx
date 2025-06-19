import React, { Suspense, useEffect, useState } from 'react';
import AllEvents from '../../Component/AllEvents';

const UpComingEvents = () => {
    const [eventsPromise, setEventsPromise] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:7000/events")
        .then(res=>res.json())
        .then(data=>{
            setEventsPromise(data)
        })
    },[])
    return (
        <div className='w-10/12 mx-auto my-8'>
            <Suspense fallback={'loading'}>
                <AllEvents eventsPromise={eventsPromise}></AllEvents>
            </Suspense>
        </div>
    );
};

export default UpComingEvents;