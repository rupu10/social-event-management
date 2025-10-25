import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import { 
  IoIosPin, 
  IoIosCalendar, 
  IoIosPeople,
  IoIosCheckmarkCircle
} from "react-icons/io";
import { 
  FaRegStar, 
  FaStar, 
  FaBookmark 
} from "react-icons/fa";
import { 
  MdOutlineEventNote, 
  MdReviews 
} from "react-icons/md";
import { 
  RiShareBoxLine 
} from "react-icons/ri";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { 
    location, 
    title, 
    _id, 
    thumbnail,
    description, 
    eventType,
    eventDate,
    creator_name,
    creator_email
  } = useLoaderData();
  
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
    eventName: title,
    eventId: _id
  });

  const shareUrl = window.location.href;
  const shareTitle = `Check out this event: ${title}`;
console.log(user);
  // Check if user has already joined this event
  useEffect(() => {
    const checkJoinStatus = async () => {
      if (user && _id) {
        try {
          setLoading(true);
          const token = await user.getIdToken();
          const response = await axios.get(
            `http://localhost:7000/check-join-status?eventId=${_id}&email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setHasJoined(response.data.hasJoined);
        } catch (error) {
          console.error("Error checking join status:", error);
          // If the API fails, we can also check from the joinEvents endpoint as fallback
          try {
            const joinResponse = await axios.get(
              `http://localhost:7000/joinEvents?email=${user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${await user.getIdToken()}`
                }
              }
            );
            const isJoined = joinResponse.data.some(event => event.eventId === _id);
            setHasJoined(isJoined);
          } catch (fallbackError) {
            console.error("Fallback check also failed:", fallbackError);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkJoinStatus();
  }, [user, _id]);

  const handleJoinEvent = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to join this event.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const joinEvent = {
      eventId: _id,
      applicant: user.email,
      title: title,
      thumbnail: thumbnail,
      description: description,
      location: location,
      name: user.displayName,
      eventDate: eventDate,
    };

    try {
      const response = await axios.post("http://localhost:7000/joinEvents", joinEvent);
      
      if (response.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Joined Event!",
          text: "You have successfully registered for this event.",
          showConfirmButton: false,
          timer: 2000,
          background: "#1f2937",
          color: "white",
        });
        setHasJoined(true);
        navigate('/myJoinedEvents');
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Already Joined",
          text: "You have already joined this event.",
          confirmButtonColor: "#3B82F6",
        });
        setHasJoined(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Unable to join event. Please try again.",
          confirmButtonColor: "#3B82F6",
        });
      }
    }
  };

  const handleGiveReview = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to submit a review.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }
    
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!reviewData.comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Comment",
        text: "Please write a review comment before submitting.",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const reviewToSubmit = {
      ...reviewData,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      photo: user.photoURL,
      reviewDate: new Date().toISOString(),
      eventThumbnail: thumbnail,
      eventLocation: location,
      eventType: eventType
    };

    axios
      .post("http://localhost:7000/reviews", reviewToSubmit)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Review Submitted!",
            text: "Thank you for your valuable feedback.",
            showConfirmButton: false,
            timer: 2000,
          });
          setShowReviewModal(false);
          setReviewData({
            rating: 5,
            comment: "",
            eventName: title,
            eventId: _id
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Unable to submit review. Please try again.",
          confirmButtonColor: "#3B82F6",
        });
      });
  };

  const handleShareEvent = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    Swal.fire({
      icon: "success",
      title: "Link Copied!",
      text: "Event link copied to clipboard",
      timer: 1500,
      showConfirmButton: false,
      position: "top-end",
    });
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setReviewData({...reviewData, rating: index + 1})}
        className="text-2xl transition-all duration-300 hover:scale-125 transform hover:rotate-12"
      >
        {index < rating ? (
          <FaStar className="text-yellow-400 drop-shadow-lg" />
        ) : (
          <FaRegStar className="text-gray-300 hover:text-yellow-200" />
        )}
      </button>
    ));
  };

  return (
    <div className="min-h-screen w-10/12 mx-auto bg-base-100 py-8">
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full p-6 border border-base-300 transform transition-all duration-300 scale-100 hover:scale-105">
            <h3 className="text-2xl font-bold text-base-content mb-2">Write a Review</h3>
            <p className="text-base-content/70 mb-6">Share your experience with "{title}"</p>
            
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-base-content mb-3">
                  Your Rating
                </label>
                <div className="flex gap-2 justify-center">
                  {renderStars(reviewData.rating)}
                </div>
                <p className="text-center text-sm text-base-content/50 mt-2">
                  {reviewData.rating} out of 5 stars
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-base-content mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  placeholder="Tell us about your experience at this event..."
                  className="w-full h-32 px-3 py-2 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-base-100 text-base-content transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 px-4 border border-base-300 text-base-content font-semibold rounded-lg hover:bg-base-200 hover:border-error/50 hover:text-error transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-primary text-primary-content font-semibold rounded-lg hover:bg-primary-focus hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full p-6 border border-base-300 transform transition-all duration-300 scale-100 hover:scale-105">
            <h3 className="text-2xl font-bold text-base-content mb-4">Share This Event</h3>
            <p className="text-base-content/70 mb-6">Share this event with your friends and community</p>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <div className="flex flex-col items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-blue-500 hover:scale-110 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 transform">
                  <FacebookIcon size={40} round />
                  <span className="text-xs font-medium text-base-content">Facebook</span>
                </div>
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <div className="flex flex-col items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-blue-400 hover:scale-110 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 transform">
                  <TwitterIcon size={40} round />
                  <span className="text-xs font-medium text-base-content">Twitter</span>
                </div>
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl} title={shareTitle}>
                <div className="flex flex-col items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-blue-700 hover:scale-110 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 transform">
                  <LinkedinIcon size={40} round />
                  <span className="text-xs font-medium text-base-content">LinkedIn</span>
                </div>
              </LinkedinShareButton>

              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <div className="flex flex-col items-center gap-2 p-3 bg-base-200 rounded-lg hover:bg-green-500 hover:scale-110 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 transform">
                  <WhatsappIcon size={40} round />
                  <span className="text-xs font-medium text-base-content">WhatsApp</span>
                </div>
              </WhatsappShareButton>
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 py-3 px-4 border border-base-300 text-base-content font-semibold rounded-lg hover:bg-base-200 hover:border-primary hover:text-primary hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 py-3 px-4 bg-base-300 text-base-content font-semibold rounded-lg hover:bg-base-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mx-auto lg:px-0">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Event Details
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Image & Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image Card */}
            <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="relative">
                <img 
                  className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105" 
                  src={thumbnail} 
                  alt={title}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-base-300/80 text-base-content px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-content hover:scale-105">
                    {eventType}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons Bar */}
              <div className="p-6 bg-base-200 border-t border-base-300">
                <div className="flex flex-col sm:flex-row gap-4">
                  {user && !hasJoined && !loading && (
                    <button 
                      onClick={handleJoinEvent}
                      className="flex-1 px-4 py-4 bg-primary text-primary-content font-semibold rounded-xl hover:bg-primary-focus hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <IoIosPeople size={22} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="relative">Join Event</span>
                    </button>
                  )}
                  
                  {user && hasJoined && (
                    <button 
                      disabled
                      className="flex-1 px-6 py-4 bg-success text-success-content font-semibold rounded-xl flex items-center justify-center cursor-not-allowed transform hover:scale-105 transition-transform duration-300"
                    >
                      <IoIosCheckmarkCircle size={22} />
                      <span>Already Joined</span>
                    </button>
                  )}

                  {loading && user && (
                    <button 
                      disabled
                      className="flex-1 px-6 py-4 bg-gray-400 text-gray-200 font-semibold rounded-xl flex items-center justify-center gap-3 cursor-not-allowed"
                    >
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Checking...</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={handleGiveReview}
                    className="flex-1 px-6 py-4 bg-secondary text-secondary-content font-semibold rounded-xl hover:bg-secondary-focus hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <MdReviews size={20} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="relative">Give Review</span>
                  </button>

                  <button 
                    onClick={handleShareEvent}
                    className="flex-1 px-6 py-4 border-2 border-base-300 text-base-content font-semibold rounded-xl hover:border-primary hover:bg-primary hover:text-primary-content hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <RiShareBoxLine size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg transition-all duration-300 hover:bg-primary hover:scale-110">
                  <MdOutlineEventNote className="text-primary transition-colors duration-300 hover:text-primary-content" size={24} />
                </div>
                About This Event
              </h2>
              <p className="text-base-content text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Right Column - Event Info & Actions */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-base-content mb-6 pb-4 border-b border-base-300">Event Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-2 bg-error/20 rounded-lg flex-shrink-0 transition-all duration-300 hover:bg-error hover:scale-110">
                    <IoIosPin className="text-error transition-colors duration-300 hover:text-error-content" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Location</p>
                    <p className="text-base-content font-semibold">{location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0 transition-all duration-300 hover:bg-primary hover:scale-110">
                    <IoIosCalendar className="text-primary transition-colors duration-300 hover:text-primary-content" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Event Date</p>
                    <p className="text-base-content font-semibold">{formatDate(eventDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-2 bg-secondary/20 rounded-lg flex-shrink-0 transition-all duration-300 hover:bg-secondary hover:scale-110">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 hover:bg-secondary-content">
                      <div className="w-2 h-2 rounded-full bg-base-100 transition-all duration-300 hover:bg-secondary"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Event Type</p>
                    <p className="text-base-content font-semibold">{eventType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-base-200 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-2 bg-success/20 rounded-lg flex-shrink-0 transition-all duration-300 hover:bg-success hover:scale-110">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center transition-all duration-300 hover:bg-success-content">
                      <div className="w-2 h-2 rounded-full bg-base-100 transition-all duration-300 hover:bg-success"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Organizer</p>
                    <p className="text-base-content font-semibold">{creator_name}</p>
                    <p className="text-sm text-base-content/70">{creator_email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-6 text-primary-content transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleShareEvent}
                  className="w-full py-3 bg-primary-content/20 rounded-lg hover:bg-primary-content/30 hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold group"
                >
                  <RiShareBoxLine size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  Share Event
                </button>
                <button className="w-full py-3 bg-primary-content/20 rounded-lg hover:bg-primary-content/30 hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold group">
                  <FaBookmark size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  Save Event
                </button>
                <button className="w-full py-3 bg-primary-content/20 rounded-lg hover:bg-primary-content/30 hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold group">
                  <IoIosCalendar size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;