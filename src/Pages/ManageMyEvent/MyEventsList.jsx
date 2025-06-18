import React, { use } from 'react';
import { Link } from 'react-router';

const MyEventsList = ({myEventsPromise}) => {
    const myEvents = use(myEventsPromise)
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Event Name</th>
        <th>date</th>
        <th>view event</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        myEvents.map((event,index)=><tr key={event._id}>
        <th>{index+1}</th>
        <td>{event.title}</td>
        <td>{event.eventDate}</td>
        <td><Link to={`/updateMyEvent/${event._id}`}>View Events</Link></td>
      </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyEventsList;