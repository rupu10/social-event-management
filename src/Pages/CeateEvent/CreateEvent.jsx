import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CreateEvent = () => {
  const navigate = useNavigate()
  const { user } = UseAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate? selectedDate.toISOString().split("T")[0]: "";
  const timestamp = selectedDate? selectedDate.getTime() : null;
  
  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.eventDate = formattedDate;
    data.eventDateNumber = timestamp;
    axios
      .post("https://social-management-server.vercel.app/events", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New event has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/upComingEvents')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-10/12 mx-auto my-8">
      <h1 className="text-4xl font-bold my-6 text-center">Add your event</h1>
      <form
        onSubmit={handleAddEvent}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
      >
        <legend className="fieldset-legend">Event details</legend>
        <div className="grid grid-cols-2 gap-3">
          <fieldset className="fieldset w-full">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              required
              className="input w-full"
              placeholder="Event title"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label">Description</label>
            <input
              type="text"
              name="description"
              required
              className="input w-full"
              placeholder="Event description"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label">location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full"
              placeholder="Location"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label">thumbnail Image URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input w-full"
              placeholder="Image"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label">Event Type</label>
            <select
              defaultValue="Event Type"
              name="eventType"
              required
              className="select w-full"
            >
              <option disabled={true}>Event Type</option>
              <option>Cleanup</option>
              <option>Plantation</option>
              <option>Donation</option>
              <option>others</option>
            </select>
          </fieldset>
          <fieldset className="fieldset w-full">
            <label className="label">Creator's name</label>
            <input
              type="text"
              name="creator_name"
              required
              defaultValue={user.displayName}
              className="input w-full"
              placeholder="Creator's Name"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <label className="label">Creator's email</label>
            <input
              type="email"
              name="creator_email"
              required
              defaultValue={user.email}
              className="input w-full"
              placeholder="Creator's email"
            />
          </fieldset>
          <fieldset className="bg-base-200 fieldset w-full border-base-300 rounded-boxborder p-2">
            <legend className="fieldset-legend">
              Pick your event date (yyyy/mm/dd)
            </legend>
            <DatePicker
              className="w-full p-2"
              required
              selected={selectedDate}
              // defaultValue={}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
            ></DatePicker>
            <input type="hidden" name="eventDate" value={formattedDate} />
          </fieldset>
          {/*  */}
        </div>
        <input type="submit" className="btn btn-primary" value="Add Event" />
      </form>
    </div>
  );
};

export default CreateEvent;
