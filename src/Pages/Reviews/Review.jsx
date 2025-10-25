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
      className="block rounded-2xl shadow-lg border border-base-300 p-6 bg-base-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      title={`Click to view ${eventName}`}
    >
      {/* Hover Overlay with Event Info */}
      <div className="absolute inset-0 bg-base-content/0 group-hover:bg-base-content/80 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
        <div className="text-center text-base-100 p-4">
          <h3 className="text-xl font-bold mb-2">{eventName}</h3>
          <p className="text-sm opacity-90">{eventLocation}</p>
          <p className="text-xs opacity-75 mt-2">Click to view event details</p>
        </div>
      </div>

      {/* Review Content */}
      <div className="relative z-0">
        {/* Reviewer Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-base-100 font-semibold text-lg overflow-hidden">
            <img 
              className='w-full h-full object-cover' 
              src={photo} 
              alt={reviewerName || 'Reviewer'} 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base-content">{reviewerName || 'Anonymous'}</h3>
            <p className="text-sm text-base-content/70">{formatDate(reviewDate)}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-lg ${
                  index < rating ? 'text-warning fill-current' : 'text-base-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-base-content">{rating}.0</span>
        </div>

        {/* Review Comment */}
        <p className="text-base-content/80 leading-relaxed line-clamp-3">
          "{comment}"
        </p>
      </div>
    </Link>
  );
};

export default Review;