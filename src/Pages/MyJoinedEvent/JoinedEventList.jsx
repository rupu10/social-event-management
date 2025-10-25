import React from 'react';
import JoinedEventsRow from './JoinedEventsRow';

const JoinedEventList = ({ myJoinedEventsPromise }) => {
    const joinedEvents = myJoinedEventsPromise;

    // Filter out past events
    const currentEvents = joinedEvents.filter(event => {
        const eventDate = new Date(event.eventDate);
        const today = new Date();
        return eventDate >= today;
    });

    if (currentEvents.length === 0) {
        return (
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-base-content mb-2">No Upcoming Events</h3>
                    <p className="text-base-content/70 mb-4">You haven't joined any upcoming events yet.</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg hover:from-primary-focus hover:to-secondary-focus transition-all duration-300 transform hover:scale-105">
                        Browse Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4">
                <h2 className="text-xl font-semibold text-primary-content">Your Joined Events</h2>
                <p className="text-primary-content/80 text-sm mt-1">
                    {currentEvents.length} upcoming event{currentEvents.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-base-300">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-base-content uppercase tracking-wider">
                                #
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-base-content uppercase tracking-wider">
                                Event Details
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-base-content uppercase tracking-wider">
                                Date
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-base-content uppercase tracking-wider">
                                Location
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-base-content uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {currentEvents.map((joinedEvent, index) => (
                            <JoinedEventsRow 
                                key={joinedEvent._id} 
                                index={index} 
                                joinedEvent={joinedEvent}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JoinedEventList;