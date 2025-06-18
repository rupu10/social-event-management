import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateMyEvent = () => {
    const {creator_email,creator_name,description, location, title, thumbnail,_id} = useLoaderData();
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split('T')[0].replace(/-/g, '/')
    : '';

    const handleUpdateEvent = e =>{
        e.preventDefault();
    const form = e.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    const updatedEvent = data;
    

    
    axios.put(`http://localhost:7000/events/${_id}`,updatedEvent)
    .then(res=>{
        console.log(res.data);
        if(res.data.modifiedCount){
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Event data updated successfully",
  showConfirmButton: false,
  timer: 1500
});
        }
    })
    .catch(err=>{
        console.log(err);
    })

    }


    return (
        <div>
            <h1>Update your event</h1>
            <form onSubmit={handleUpdateEvent}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                      <legend className="fieldset-legend">Event details</legend>
            
                      <div>
                        <label className="label">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={title}
                        className="input"
                        placeholder="Event title"
                      />
                      </div>
            
                      <div>
                        <label className="label">Description</label>
                      <input
                        type="text"
                        name="description"
                        defaultValue={description}
                        className="input"
                        placeholder="Event description"
                      />
                      </div>
            
                      <div>
                        <label className="label">location</label>
                      <input
                        type="text"
                        name="location"
                        defaultValue={location}
                        className="input"
                        placeholder="Location"
                      />
                      </div>
            
                      <div>
                        <label className="label">thumbnail Image URL</label>
                      <input type="url" name="thumbnail" defaultValue={thumbnail}
                      className="input" placeholder="Image" />
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
                        defaultValue={creator_name}
                        className="input"
                        placeholder="Creator's Name"
                      />
            
                      <label className="label">Creator's email</label>
                      <input
                        type="email"
                        name="creator_email"
                        defaultValue={creator_email}
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
                      <input type="hidden" name="eventDate" value={formattedDate}
                      />
                    </fieldset>
                    <input type="submit" className="btn btn-primary" value="Update Event" />
                  </form>
        </div>
    );
};

export default UpdateMyEvent;