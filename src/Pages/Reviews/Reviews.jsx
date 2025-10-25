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

  // Skeleton Loader Components
  const ReviewCardSkeleton = () => (
    <div className="rounded-2xl border border-base-300 p-6 shadow-lg animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-base-300 rounded-full"></div>
        <div className="flex-1">
          <div className="skeleton bg-base-300 h-4 w-32 mb-2 rounded"></div>
          <div className="skeleton bg-base-300 h-3 w-24 rounded"></div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton bg-base-300 w-5 h-5 rounded"></div>
          ))}
        </div>
        <div className="skeleton bg-base-300 h-5 w-8 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="skeleton bg-base-300 h-3 w-full rounded"></div>
        <div className="skeleton bg-base-300 h-3 w-5/6 rounded"></div>
        <div className="skeleton bg-base-300 h-3 w-4/6 rounded"></div>
      </div>
    </div>
  );

  const StatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="rounded-2xl p-6 shadow-lg border border-base-300 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="skeleton bg-base-300 w-8 h-8 rounded"></div>
            <div>
              <div className="skeleton bg-base-300 h-6 w-12 mb-2 rounded"></div>
              <div className="skeleton bg-base-300 h-3 w-20 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const HeaderSkeleton = () => (
    <div className="text-center mb-12 animate-pulse">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="skeleton bg-base-300 w-12 h-12 rounded-2xl"></div>
        <div className="skeleton bg-base-300 h-10 w-48 rounded-lg"></div>
      </div>
      <div className="skeleton bg-base-300 w-32 h-1.5 mx-auto rounded-full mb-6"></div>
      <StatsSkeleton />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 py-8">
        <div className="md:w-10/12 mx-auto sm:px-6">
          <HeaderSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-error/10 border border-error/20 rounded-lg p-6 max-w-md mx-auto">
              <MdReviews className="text-error text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-error mb-2">Error Loading Reviews</h3>
              <p className="text-error/80">{error}</p>
              <button
                onClick={fetchReviews}
                className="mt-4 px-6 py-2 bg-error text-base-100 rounded-lg hover:bg-error/90 transition-colors"
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
    <div className="min-h-screen bg-base-100 py-8">
      <div className="md:w-10/12 mx-auto sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl">
              <MdReviews className="text-base-100 text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              All Reviews
            </h1>
          </div>
          <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl p-6 shadow-lg border border-base-300 bg-base-200">
              <div className="flex items-center gap-3">
                <MdReviews className="text-primary text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-base-content">{reviews.length}</p>
                  <p className="text-sm text-base-content/70">Total Reviews</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-6 shadow-lg border border-base-300 bg-base-200">
              <div className="flex items-center gap-3">
                <MdEventNote className="text-secondary text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {[...new Set(reviews.map(review => review.eventId))].length}
                  </p>
                  <p className="text-sm text-base-content/70">Events Reviewed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="rounded-2xl p-12 max-w-md mx-auto shadow-lg border border-base-300 bg-base-200">
              <MdReviews className="text-base-content/40 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-base-content mb-2">No Reviews Yet</h3>
              <p className="text-base-content/70 mb-6">Be the first to share your experience!</p>
              <Link
                to="/events"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-base-100 rounded-xl hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
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