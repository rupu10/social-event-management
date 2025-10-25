import React, { Suspense, useEffect, useState } from 'react';
import JoinedEventList from './JoinedEventList';
import UseAuth from '../../hooks/UseAuth';

const MyJoinedEvents = () => {
    const [myJoinedEventsPromise, setMyJoinedEventPromise] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = UseAuth();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:7000/joinEvents?email=${user.email}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setMyJoinedEventPromise(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching joined events:', error);
            setLoading(false);
        });
    }, [user]);

    const LoadingSkeleton = () => (
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8 animate-pulse">
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border-b border-base-300">
                        <div className="skeleton bg-base-300 w-12 h-12 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="skeleton bg-base-300 h-4 w-3/4 rounded"></div>
                            <div className="skeleton bg-base-300 h-3 w-1/2 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className='max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8'>
            <div className="text-center mb-8">
                <h1 className='text-4xl font-bold text-base-content mb-3'>Your Joined Events</h1>
                <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
                    Manage and view all the events you've registered for
                </p>
            </div>
            
            <Suspense fallback={<LoadingSkeleton />}>
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <JoinedEventList myJoinedEventsPromise={myJoinedEventsPromise} />
                )}
            </Suspense>
        </div>
    );
};

export default MyJoinedEvents;