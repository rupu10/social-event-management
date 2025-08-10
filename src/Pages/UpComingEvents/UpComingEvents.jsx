import React, { Suspense, useEffect, useState } from "react";
import AllEvents from "../../Component/AllEvents";

const UpComingEvents = () => {
  const [searchText, setSearchText] = useState("");
  const [eventsPromise, setEventsPromise] = useState([]);
  useEffect(() => {
    fetch(`https://a-11-social-event-server.vercel.app/events?title=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setEventsPromise(data);
      });
  }, [searchText]);
  console.log(eventsPromise);

  return (
    <div className="w-10/12 mx-auto my-8">
      <div className="flex justify-center items-center my-2 p-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search events by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>
      <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
        <AllEvents eventsPromise={eventsPromise}></AllEvents>
      </Suspense>
    </div>
  );
};

export default UpComingEvents;
