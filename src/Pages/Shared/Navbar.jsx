import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeTOggle from "./ThemeTOggle";

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

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/upComingEvents">Upcoming Events</NavLink>
      </li>

      {user && (
        <>
          <li className="">
            <details>
            <summary>Events Curriculum</summary>
            <ul className="p-2 bg-white md:text-black">
              <li>
                {" "}
                <NavLink to="/createEvents">Create Events</NavLink>
              </li>
              <li>
                <NavLink to="/manageMyEvents">Manage Events</NavLink>
              </li>
              <li>
                <NavLink to="/myJoinedEvents">My joined Events</NavLink>
              </li>
            </ul>
          </details>
          </li>
        </>
      )}
    </>
  );


  return (
    <div className="bg-gradient-to-l from-violet-500 via-violet-700 to-violet-900 z-50 sticky top-0">
      <div className="navbar w-10/12 mx-auto text-white">
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
          <Link to="/" className="text-3xl cursor-pointer font-semibold">
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
              <button onClick={handleSignOut} className="btn ">
                sign out
              </button>
              <div>
                <img className="rounded-full w-[60px] h-[60px]" src={user.photoURL} referrerPolicy="no-referrer" alt="" />
              </div>
            </>
          )}
          {!user && (
            <>
              <>
                <NavLink className="btn" to="/signUp">
                  Sign Up
                </NavLink>
                <NavLink className="btn" to="/logIn">
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

