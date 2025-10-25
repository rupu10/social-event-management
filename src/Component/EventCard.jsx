import React from 'react';
import { IoIosPin } from "react-icons/io";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router';

const EventCard = ({ event }) => {
    const { title, thumbnail, location, _id, eventDate } = event;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div 
            data-aos="zoom-in-up" 
            className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl border border-base-300 overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
        >
            {/* Image Section */}
            <div className="relative overflow-hidden">
                <img
                    src={thumbnail}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={title}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-content/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-center">
                        <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide">
                            {eventDate ? new Date(eventDate).toLocaleDateString('en-US', { month: 'short' }) : ''}
                        </div>
                        <div className="text-lg font-bold text-base-content">
                            {eventDate ? new Date(eventDate).getDate() : ''}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-base-content/70 mb-3">
                    <IoIosPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium line-clamp-1">{location}</span>
                </div>

                {/* Event Date */}
                <div className="flex items-center gap-2 text-base-content/70 mb-4">
                    <FaCalendarAlt className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">
                        {eventDate ? formatDate(eventDate) : 'Date not set'}
                    </span>
                </div>

                {/* Action Button */}
                <Link to={`/events/${_id}`} className="block">
                    <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-focus hover:to-secondary-focus text-primary-content font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center gap-2">
                        <span>View Details</span>
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </Link>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
        </div>
    );
};

export default EventCard;