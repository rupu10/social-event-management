import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const Review = ({ review }) => {
  const { 
    reviewerName,
    rating, 
    comment, 
    reviewDate,
    eventName,
    eventId,
    eventLocation,
    photo
  } = review;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link 
      to={`/events/${eventId}`}
      className="block rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      title={`Click to view ${eventName}`}
    >
      {/* Hover Overlay with Event Info */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
        <div className="text-center text-white p-4">
          <h3 className="text-xl font-bold mb-2">{eventName}</h3>
          <p className="text-sm opacity-90">{eventLocation}</p>
          <p className="text-xs opacity-75 mt-2">Click to view event details</p>
        </div>
      </div>

      {/* Review Content */}
      <div className="relative z-0">
        {/* Reviewer Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            <img className='rounded-full' src={photo} alt="" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{reviewerName || 'Anonymous'}</h3>
            <p className="text-sm text-gray-500">{formatDate(reviewDate)}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-lg ${
                  index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-gray-900">{rating}.0</span>
        </div>

        {/* Review Comment */}
        <p className="text-gray-700 leading-relaxed line-clamp-3">
          "{comment}"
        </p>

        {/* Event Preview (only show on hover) */}
      </div>
    </Link>
  );
};

export default Review;