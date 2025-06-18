import React from 'react';
import {  useLoaderData } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const EventDetails = () => {
    const {description,eventDate,eventType,location,thumbnail,title, _id} = useLoaderData();
    const {user} = UseAuth()
    
    const handleJoinEvent = () => {
        const joinEvent = {
            eventId : _id,
            applicant : user.email
        }
        console.log(joinEvent);

        axios.post('http://localhost:7000/joinEvents',joinEvent)
        .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your plan to join the event has been complete",
  showConfirmButton: false,
  timer: 1500
});
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }


    return (
        <div>
            <h1 className='text-4xl'>{title}</h1>
            <h1 className='text-2xl'>{location}</h1>
            <button onClick={handleJoinEvent} className='btn btn-primary'>Join Event</button>
        </div>
    );
};

export default EventDetails;