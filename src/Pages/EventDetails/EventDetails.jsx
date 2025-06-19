import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import { IoIosPin } from "react-icons/io";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { location, title, _id, thumbnail,
description, eventType,eventDate
 } = useLoaderData();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const handleJoinEvent = () => {
    const joinEvent = {
      eventId: _id,
      applicant: user.email,
      title: title,
      thumbnail: thumbnail,
      description: description,
      location: location,
      name: user.displayName,
      eventDate: eventDate
    };
    console.log(joinEvent);

    axios
      .post("http://localhost:7000/joinEvents", joinEvent)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your plan to join the event has been complete",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/myJoinedEvents')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-10/12 mx-auto my-10">
      <h1 className="text-4xl text-center font-semibold ">Event Details</h1>
      <div className="p-4 shadow-xl rounded-xl ">
        <img className="w-10/12  rounded-xl mb-5" src={thumbnail} alt="" />
        <h1 className="text-4xl mb-3">{title}</h1>
        <p className="text-2xl font-light mb-3">{description}</p>
      <h1 className="flex items-center gap-1 mb-3"><IoIosPin size={20}/><span className="text-2xl">{location}</span></h1>
      <h1 className="text-xl mb-3"><span className="font-semibold">Event Type:</span> {eventType}</h1>
      <h1 className="text-xl mb-3"><span className="font-semibold">Event Date:</span> {eventDate}</h1>
      <div className="w-10/12 flex justify-end">
        <button onClick={handleJoinEvent} className="btn btn-primary">
        Join Event
      </button>
      </div>
      </div>
    </div>
  );
};

export default EventDetails;
