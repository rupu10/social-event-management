import React from "react";

const JoinedEventsRow = ({joinedEvent,index}) => {
    console.log(joinedEvent);
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
            <p>{joinedEvent.applicant}</p>
          </div>
        </div>
      </td>
      <td>
        Zemlak, Daniel and Leannon
        <br />
        <span className="badge badge-ghost badge-sm">
          Desktop Support Technician
        </span>
      </td>
    </tr>
  );
};

export default JoinedEventsRow;
