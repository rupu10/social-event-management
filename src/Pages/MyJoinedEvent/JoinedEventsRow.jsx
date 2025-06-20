import React from "react";

const JoinedEventsRow = ({joinedEvent,index}) => {
  return (
    <tr>
      <th>
        <label>
          {index+1}
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <p>{joinedEvent.title}</p>
          </div>
        </div>
      </td>
      <td>
        {joinedEvent.eventDate}
      </td>
      <td>
        {joinedEvent.location}
      </td>
    </tr>
  );
};

export default JoinedEventsRow;
