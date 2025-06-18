import React, { use } from 'react';
import JoinedEventsRow from './JoinedEventsRow';

const JoinedEventList = ({myJoinedEventsPromise}) => {
    const joinedEvents = use(myJoinedEventsPromise);
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
        <th>Applicant email</th>
        <th>Event list</th>
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