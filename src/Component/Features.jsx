import React, { useEffect, useState } from 'react';

const Features = () => {
    const [eventsPromise, setEventsPromise] = useState([]);
        useEffect(()=>{
            fetch("http://localhost:7000/events")
            .then(res=>res.json())
            .then(data=>{
                setEventsPromise(data)
            })
        },[])
        console.log(eventsPromise);
    return (
        <div>
            
        </div>
    );
};

export default Features;