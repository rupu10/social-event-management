import React from 'react';
import { Link } from 'react-router';

const EventCard = ({event}) => {

    const {title, thumbnail,description,_id} = event;
    // console.log(thumbnail);

    return (
        <div className="card bg-base-100 shadow-sm">
  <figure>
    <img
      src= {thumbnail}
      className='max-h-[300px] w-full min-h-[270px]'
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <Link to={`/events/${_id}`}><button className="btn btn-primary">view Details</button></Link>
    </div>
  </div>
</div>
    );
};

export default EventCard;