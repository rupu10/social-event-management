import React from 'react';
import JoinedEventsRow from './JoinedEventsRow';

const JoinedEventList = ({myJoinedEventsPromise}) => {
    const joinedEvents = myJoinedEventsPromise
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Event Title</th>
        <th>Event Date</th>
        <th>Event Location</th>
      </tr>
    </thead>
    <tbody>
        {
            joinedEvents.map((joinedEvent,index)=><JoinedEventsRow key={joinedEvent._id} index={index} joinedEvent={joinedEvent}></JoinedEventsRow>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default JoinedEventList;