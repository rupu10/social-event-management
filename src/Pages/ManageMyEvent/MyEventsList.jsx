import React from 'react';
import { 
  FaEdit, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers,
  FaEye,
  FaChevronRight
} from 'react-icons/fa';
import { MdEvent, MdDashboard } from 'react-icons/md';
import { Link } from 'react-router';

const MyEventsList = ({ myEventsPromise }) => {
  const myEvents = myEventsPromise;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateObj = new Date(eventDate);
    
    if (eventDateObj < now) {
      return { status: 'Past', color: 'bg-gray-100 text-gray-600' };
    } else if ((eventDateObj - now) / (1000 * 60 * 60 * 24) <= 7) {
      return { status: 'Upcoming', color: 'bg-orange-100 text-orange-600' };
    } else {
      return { status: 'Future', color: 'bg-green-100 text-green-600' };
    }
  };

  if (!myEvents || myEvents.length === 0) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mb-6">
            <MdEvent className="text-6xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Created Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any events yet. Start organizing your first event and share it with the community!
            </p>
            <Link
              to="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <MdEvent className="text-lg" />
              Create Your First Event
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{myEvents.length}</p>
              <p className="text-purple-100 text-sm">Total Events</p>
            </div>
            <MdDashboard className="text-2xl opacity-80" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {myEvents.filter(event => new Date(event.eventDate) > new Date()).length}
              </p>
              <p className="text-gray-500 text-sm">Upcoming</p>
            </div>
            <FaCalendarAlt className="text-2xl text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {myEvents.filter(event => new Date(event.eventDate) < new Date()).length}
              </p>
              <p className="text-gray-500 text-sm">Past Events</p>
            </div>
            <FaUsers className="text-2xl text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {myEvents.filter(event => (new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24) <= 7).length}
              </p>
              <p className="text-gray-500 text-sm">This Week</p>
            </div>
            <FaEye className="text-2xl text-orange-500" />
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Managed Events</h2>
              <p className="text-gray-600 text-sm">Manage and edit your created events</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active Events
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="divide-y divide-gray-100">
          {myEvents.map((event) => {
            const status = getEventStatus(event.eventDate);
            
            return (
              <div 
                key={event._id}
                className="p-6 hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  {/* Event Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Event Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {event.thumbnail ? (
                          <img 
                            src={event.thumbnail} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <MdEvent className="text-2xl text-purple-500" />
                        )}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {event.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-purple-500" />
                          <span>{formatDate(event.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500" />
                          <span className="truncate max-w-32">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MdEvent className="text-blue-500" />
                          <span className="capitalize">{event.eventType}</span>
                        </div>
                      </div>
                      
                      {event.description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 ml-6">
                    <Link
                      to={`/events/${event._id}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 group/view"
                      title="View Event Details"
                    >
                      <FaEye className="text-lg" />
                      <span className="hidden sm:inline">View</span>
                    </Link>
                    
                    <Link
                      to={`/updateMyEvent/${event._id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg group/edit"
                    >
                      <FaEdit className="text-sm" />
                      <span>Edit</span>
                      <FaChevronRight className="text-xs opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing <span className="font-semibold">{myEvents.length}</span> events
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Upcoming/Future
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                Past
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards (hidden on desktop) */}
      <div className="lg:hidden space-y-4">
        {myEvents.map((event) => {
          const status = getEventStatus(event.eventDate);
          
          return (
            <div 
              key={event._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                  {event.thumbnail ? (
                    <img 
                      src={event.thumbnail} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <MdEvent className="text-xl text-purple-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate text-sm">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.status}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-purple-500" />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Link
                  to={`/events/${event._id}`}
                  className="text-xs text-gray-600 hover:text-purple-600 transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to={`/updateMyEvent/${event._id}`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  <FaEdit className="text-xs" />
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyEventsList;