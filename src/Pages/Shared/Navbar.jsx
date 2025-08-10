import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeTOggle from "./ThemeTOggle";

import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegCalendarAlt, FaUserCheck } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { user, signOuUser } = use(AuthContext);

  const handleSignOut = () => {
    signOuUser()
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <li>
        <NavLink to="/"><AiOutlineHome size={20} />Home</NavLink>
      </li>
      <li>
        <NavLink to="/upComingEvents"><FaRegCalendarAlt size={20} />Upcoming Events</NavLink>
      </li>

      {user && (
        <>
          <li className="">
            <details>
              <summary><MdMenuBook size={20} />Events Curriculum</summary>
              <ul className="p-2 bg-white md:text-black">
                <li>
                  {" "}
                  <NavLink to="/createEvents"><AiOutlinePlusCircle size={20} />Create Events</NavLink>
                </li>
                <li>
                  <NavLink to="/manageMyEvents"><FiSettings size={20} />Manage Events</NavLink>
                </li>
                <li>
                  <NavLink to="/myJoinedEvents"><FaUserCheck size={20} />My joined Events</NavLink>
                </li>
              </ul>
            </details>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className={`fixed w-full border-b-1 border-gray-100 top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/40 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="navbar md:w-10/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl md:text-3xl cursor-pointer font-semibold"
          >
            <span className="text-red-500">Lal</span>
            <span className="text-green-500">Shabuj</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul tabIndex={0} className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-x-2">
          <ThemeTOggle></ThemeTOggle>
          {user && (
            <>
              <button
                onClick={handleSignOut}
                className="border rounded-lg px-1 md:px-2 py-1 md:py-2 md:font-semibold hover:bg-violet-600 hover:text-white cursor-pointer"
              >
                <p className="font-semibold">sign out</p>
              </button>
              <div>
                <img
                  className="rounded-full w-10 h-10 md:w-[60px] md:h-[60px]"
                  src={user.photoURL}
                  referrerPolicy="no-referrer"
                  alt=""
                />
              </div>
            </>
          )}
          {!user && (
            <>
              <>
                <NavLink
                  className="border rounded-lg px-1 md:px-2 py-1 md:py-2 md:font-semibold hover:bg-violet-600 hover:text-white cursor-pointer"
                  to="/signUp"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  className="border rounded-lg px-1 md:px-2 py-1 md:py-2 md:font-semibold hover:bg-violet-600 hover:text-white cursor-pointer"
                  to="/logIn"
                >
                  Log in
                </NavLink>
              </>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
