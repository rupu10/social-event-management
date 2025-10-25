import React, { Suspense, useEffect, useState } from "react";
import AllEvents from "../../Component/AllEvents";

const UpComingEvents = () => {
  const [searchText, setSearchText] = useState("");
  const [eventsPromise, setEventsPromise] = useState([]);

  useEffect(() => {
    fetch(
      `https://social-management-server.vercel.app/events?title=${searchText}&sort=upcoming`
    )
      .then((res) => res.json())
      .then((data) => {
        setEventsPromise(data);
      });
  }, [searchText]);

  return (
    <div className="md:w-10/12 mx-auto my-8">
      {/* 🔍 Search */}
      <div className="flex justify-center items-center my-2 p-3 gap-3">
        <label className="input flex items-center gap-2 border border-base-300 px-3 py-2 rounded-lg bg-base-100">
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
            placeholder="Search upcoming events by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="outline-none bg-transparent text-base-content"
          />
        </label>
  </div>

      {/* Event List */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        }
      >
        <AllEvents eventsPromise={eventsPromise} />
      </Suspense>
    </div>
  );
};

export default UpComingEvents;