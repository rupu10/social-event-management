import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { MdReviews, MdStar, MdEventNote } from 'react-icons/md';
import { Link } from 'react-router';
import Review from './Review';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/reviews');
      setReviews(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <MdReviews className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Reviews</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchReviews}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="w-10/12 mx-auto  sm:px-6 ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
              <MdReviews className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              All Reviews
            </h1>
          </div>
          <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className=" rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <MdReviews className="text-purple-600 text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                  <p className="text-sm text-gray-500">Total Reviews</p>
                </div>
              </div>
            </div>
            <div className=" rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <MdEventNote className="text-pink-600 text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...new Set(reviews.map(review => review.eventId))].length}
                  </p>
                  <p className="text-sm text-gray-500">Events Reviewed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className=" rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-gray-200">
              <MdReviews className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
              <Link
                to="/events"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Browse Events
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <Review
                key={review._id || `${review.reviewerEmail}-${review.reviewDate}`}
                review={review}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;