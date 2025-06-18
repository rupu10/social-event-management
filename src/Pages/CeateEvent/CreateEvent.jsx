import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const CreateEvent = () => {
    const {user} = UseAuth();
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split('T')[0].replace(/-/g, '/')
    : '';
  
  const handleAddEvent = e =>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    // console.log(Object.keys(data).length);
    axios.post('http://localhost:7000/events',data)
    .then(res=>{
        if(res.data.insertedId){
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "New event has been saved",
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
      <h1>add your event</h1>
      <form onSubmit={handleAddEvent}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Event details</legend>

          <div>
            <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input"
            placeholder="Event title"
          />
          </div>

          <div>
            <label className="label">Description</label>
          <input
            type="text"
            name="description"
            className="input"
            placeholder="Event description"
          />
          </div>

          <div>
            <label className="label">location</label>
          <input
            type="text"
            name="location"
            className="input"
            placeholder="Location"
          />
          </div>

          <div>
            <label className="label">thumbnail Image URL</label>
          <input type="url" name="thumbnail" className="input" placeholder="Image" />
          </div>

          <div>
            <label className="fieldset-legend">Event details</label>
          <select defaultValue="Event Type" name="eventType" className="select">
            <option disabled={true}>Event Type</option>
            <option>Cleanup</option>
            <option>Plantation</option>
            <option>Donation</option>
            <option>others</option>
          </select>
          </div>
          <legend className="fieldset-legend">Creator info</legend>

          <label className="label">Creator's name</label>
          <input
            type="text"
            name="creator_name"
            className="input"
            placeholder="Creator's Name"
          />

          <label className="label">Creator's email</label>
          <input
            type="email"
            name="creator_email"
            defaultValue={user.email}
            className="input"
            placeholder="Creator's email"
          />
        </fieldset>

        <fieldset className="bg-base-200 border-base-300 rounded-box w-xs border p-2">
          <legend className="fieldset-legend">Pick your event date (yyyy/mm/dd)</legend>
          <DatePicker
            className="w-full"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat='yyyy/MM/dd'
            minDate={new Date()}
          ></DatePicker>
          <input type="hidden" name="eventDate" value={formattedDate} />
        </fieldset>
        <input type="submit" className="btn btn-primary" value="Add Event" />
      </form>
    </div>
  );
};

export default CreateEvent;
