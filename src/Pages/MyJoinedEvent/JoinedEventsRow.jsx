import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router";

const JoinedEventsRow = ({ joinedEvent, index }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getEventStatus = (eventDate) => {
        const today = new Date();
        const eventDateObj = new Date(eventDate);
        const timeDiff = eventDateObj - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) return { text: "Today", color: "text-success", bg: "bg-success/20" };
        if (daysDiff === 1) return { text: "Tomorrow", color: "text-info", bg: "bg-info/20" };
        if (daysDiff > 1 && daysDiff <= 7) return { text: "This Week", color: "text-primary", bg: "bg-primary/20" };
        return { text: "Upcoming", color: "text-base-content/70", bg: "bg-base-300" };
    };

    const status = getEventStatus(joinedEvent.eventDate);

    return (
        <tr className="hover:bg-base-200 transition-colors duration-200 group">
            <td className="py-4 px-6">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-content font-semibold text-sm">
                        {index + 1}
                    </div>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <img 
                        src={joinedEvent.thumbnail} 
                        alt={joinedEvent.title}
                        className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                        <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-200">
                            {joinedEvent.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            {status.text}
                        </span>
                    </div>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-base-content">
                    <FaCalendarAlt className="w-4 h-4 text-primary" />
                    <span className="font-medium">{formatDate(joinedEvent.eventDate)}</span>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-base-content">
                    <FaMapMarkerAlt className="w-4 h-4 text-primary" />
                    <span className="font-medium">{joinedEvent.location}</span>
                </div>
            </td>
            
            <td className="py-4 px-6">
                <Link to={`/events/${joinedEvent.eventId}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg hover:from-primary-focus hover:to-secondary-focus transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md group/btn">
                        <FaEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                        <span className="font-medium">View Details</span>
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default JoinedEventsRow;