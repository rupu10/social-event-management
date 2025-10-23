import React, { use, useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import ThemeTOggle from "./ThemeTOggle";

import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegCalendarAlt, FaUserCheck, FaSignOutAlt } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import logo from '/pngwing.com.png'

const Navbar = () => {
  const { user, signOuUser } = use(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleSignOut = () => {
    signOuUser()
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", icon: AiOutlineHome, label: "Home" },
    { to: "/upComingEvents", icon: FaRegCalendarAlt, label: "Upcoming Events" },
  ];

  const eventLinks = [
    { to: "/createEvents", icon: AiOutlinePlusCircle, label: "Create Event" },
    { to: "/manageMyEvents", icon: FiSettings, label: "Manage Events" },
    { to: "/myJoinedEvents", icon: FaUserCheck, label: "My Events" },
  ];

  const NavLinkItem = ({ to, icon: Icon, label, onClick, isSubItem = false }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-300 group relative hover:text-violet-600"
    >
      <Icon 
        size={20} 
        className="transition-transform duration-300 group-hover:scale-110" 
      />
      <span className={`font-medium ${isSubItem ? "text-sm" : ""}`}>{label}</span>
      
      {/* Bottom border animation - only for main nav items */}
      {!isSubItem && (
        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-2" />
      )}
    </NavLink>
  );

  return (
    <nav
      className={`bg-base-100 fixed w-full top-0 left-0 z-50 transition-all duration-500${
        scrolled 
          ? " shadow-2xl shadow-violet-100/50" 
          : ""
      }`}
    >
      <div className="flex items-center justify-between md:w-10/12 mx-auto  py-3">
        {/* Logo Section - Simplified */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl  transition-all duration-300"
          >
            <div className={`w-6 h-6 relative transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`}>
              <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 top-3" : ""
              }`} />
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`} />
              <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 top-3" : ""
              }`} />
            </div>
          </button>
          
          {/* Simplified Logo - Just Text */}
          <Link
            to="/"
            className="cursor-pointer group"
          >
            <div className="flex items-center gap-1">
              <img
              src={logo}
              width={30}
              />
              <span className="text-xl md:text-2xl font-bold text-green-600">
                Lal<span className="text-red-600">Shabuj</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.to} {...link} />
          ))}
          
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative hover:text-violet-600"
              >
                <MdMenuBook 
                  size={20} 
                  className="transition-transform duration-300 group-hover:scale-110" 
                />
                <span className="font-medium">Events</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                
                {/* Bottom border animation for Events button */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-2" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div 
                  className="absolute top-full bg-base-100 left-0 mt-2 w-64 rounded-2xl shadow-2xl shadow-violet-100 overflow-hidden animate-in fade-in duration-200 z-50"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="p-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <h3 className="font-semibold">Event Management</h3>
                      <p className="text-sm">Create and manage your events</p>
                    </div>
                    {eventLinks.map((link) => (
                      <NavLinkItem 
                        key={link.to} 
                        {...link} 
                        isSubItem 
                        onClick={() => setDropdownOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeTOggle />
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="relative" ref={userMenuRef}>
                {/* User Avatar */}
                <button
                  onMouseEnter={() => setUserMenuOpen(true)}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative group"
                >
                  <img
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer"
                    src={user.photoURL}
                    referrerPolicy="no-referrer"
                    alt="Profile"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-48 bg-base-100 rounded-2xl shadow-2xl shadow-violet-100 overflow-hidden animate-in fade-in duration-200 z-50"
                    onMouseEnter={() => setUserMenuOpen(true)}
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="p-2">
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-gray-200">
                        <p className="font-semibold truncate">{user.displayName || 'User'}</p>
                        <p className="text-sm truncate">{user.email}</p>
                      </div>
                      
                      {/* Sign Out Button */}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-50 hover:text-red-700 group"
                      >
                        <FaSignOutAlt size={16} className="transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/logIn"
                className="px-1 py-1 md:px-4 md:py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:text-white border border-gray-300 hover:border-violet-600 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 shadow-sm hover:shadow-lg hover:shadow-violet-200"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signUp"
                className="px-1 py-1 md:px-4 md:py-2 rounded-xl text-sm font-medium transition-all duration-300 text-white bg-gradient-to-r from-violet-600 to-purple-500 shadow-lg hover:shadow-xl hover:shadow-violet-200 hover:from-violet-500 hover:to-purple-400"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-base-100 shadow-2xl">
          <div className="py-4 px-6 space-y-1">
            {navLinks.map((link) => (
              <NavLinkItem 
                key={link.to} 
                {...link} 
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
            
            {user && (
              <div className="relative" ref={mobileDropdownRef}>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group w-full text-left hover:text-violet-600"
                >
                  <MdMenuBook 
                    size={20} 
                    className="transition-transform duration-300 group-hover:scale-110" 
                  />
                  <span className="font-medium">Events Curriculum</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ml-auto ${mobileDropdownOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mobile Dropdown Menu */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  mobileDropdownOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}>
                  <div className="bg-base-100 rounded-xl p-2 space-y-1">
                    {eventLinks.map((link) => (
                      <NavLinkItem 
                        key={link.to} 
                        {...link} 
                        isSubItem 
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDropdownOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;