import React, { Suspense, useEffect, useState } from "react";
import AllEvents from "../../Component/AllEvents";

const UpComingEvents = () => {
  const [searchText, setSearchText] = useState("");
  const [sortMode, setSortMode] = useState("upcoming"); // "upcoming" | "past"
  const [eventsPromise, setEventsPromise] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:7000/events?title=${searchText}&sort=${sortMode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEventsPromise(data);
      });
  }, [searchText, sortMode]);

  return (
    <div className="w-10/12 mx-auto my-8">
      {/* 🔍 Search */}
      <div className="flex justify-center items-center my-2 p-3 gap-3">
        <label className="input flex items-center gap-2 border px-3 py-2 rounded-lg">
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
            className="outline-none"
          />
        </label>

        {/* 🔽 Sorting Button */}
        <button
          className="btn-dtls text-sm md:text-lg md:py-1 md:px-2 cursor-pointer"
          onClick={() =>
            setSortMode((prev) => (prev === "upcoming" ? "past" : "upcoming"))
          }
        >
          {sortMode === "upcoming" ? "Past events" : "Nearest events"}
        </button>
      </div>

      {/* Event List */}
      <Suspense
        fallback={
          <span className="loading loading-spinner loading-xl"></span>
        }
      >
        <AllEvents eventsPromise={eventsPromise} />
      </Suspense>
    </div>
  );
};

export default UpComingEvents;
