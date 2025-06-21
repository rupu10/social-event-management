import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateMyEvent = () => {
  const navigate = useNavigate();
  const {
    creator_email,
    creator_name,
    description,
    location,
    title,
    thumbnail,
    _id,
    eventDate,
  } = useLoaderData();
  // const data = useLoaderData()
  // console.log(data);
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";
  const timestamp = selectedDate ? selectedDate.getTime() : null;

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.eventDate = formattedDate;
    data.eventDateNumber = timestamp;
    const updatedEvent = data;

    axios
      .put(`http://localhost:7000/events/${_id}`, updatedEvent)
      .then((res) => {
        console.log(res.data);
        if (!res.data.modifiedCount) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must fill every required data",
          });
        }
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Event data updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/upComingEvents");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteEvent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:7000/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your event has been deleted.",
                icon: "success",
              });
              navigate("/manageMyEvents");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="my-8 w-10/12 mx-auto">
      <h1 className="text-3xl text-center font-semibold mb-3">
        Update your event
      </h1>
      <form
        onSubmit={handleUpdateEvent}
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
              defaultValue={title}
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
              defaultValue={description}
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
              defaultValue={location}
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
              defaultValue={thumbnail}
              className="input w-full"
              placeholder="Image"
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label">event type</label>
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
              defaultValue={creator_name}
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
              defaultValue={creator_email}
              className="input w-full"
              placeholder="Creator's email"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Pick your event date (yyyy/mm/dd)
            </legend>
            <DatePicker
              className="w-full p-2"
              selected={selectedDate}
              required
              defaultValue={eventDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
            ></DatePicker>
            <input
              type="hidden"
              required
              name="eventDate"
              value={formattedDate}
            />
          </fieldset>
        </div>
        <input type="submit" className="btn btn-primary" value="Update Event" />
      </form>
      <div className="text-center">
        <h1 className="text-center text-3xl font-semibold my-4">
          delete your event here
        </h1>
        <button
          onClick={() => handleDeleteEvent(_id)}
          className="btn btn-primary"
        >
          delete event
        </button>
      </div>
    </div>
  );
};

export default UpdateMyEvent;
