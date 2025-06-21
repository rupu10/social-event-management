import React from 'react';
import { IoIosPin } from "react-icons/io";
import { Link } from 'react-router';

const EventCard = ({event}) => {

    const {title, thumbnail,location,_id,eventDate} = event;
    // console.log(event);

    return (
        <div className="card bg-base-100 border border-white shadow-md hover:shadow-xl">
  <figure>
    <img
      src= {thumbnail}
      className='max-h-[250px] md:max-h-[300px] w-full md:min-h-[270px]'
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className='flex gap-1 items-center'><IoIosPin size={20}></IoIosPin>{location}</p>
    <p className=''><span className='font-semibold'>Event Date</span>: {eventDate}</p>
    <div className="card-actions justify-end">
      <Link className='w-full' to={`/events/${_id}`}><button className="btn btn-primary w-full">view Details</button></Link>
    </div>
  </div>
</div>
    );
};

export default EventCard;