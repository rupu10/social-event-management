import React, { Suspense } from 'react';
import JoinedEventList from './JoinedEventList';
import UseAuth from '../../hooks/UseAuth';
import UseJoinedEventApi from '../../api/UseJoinedEventApi';





const MyJoinedEvents = () => {
    const {user} = UseAuth();
    const {myJoinedEventsPromise} = UseJoinedEventApi();
    console.log(myJoinedEventsPromise);
    return (
        <div className='w-10/12 mx-auto my-8'>
            <h1 className='text-center font-semibold text-3xl mb-3'>Your joined events</h1>
            <Suspense fallback={'loading...'}>
                <JoinedEventList myJoinedEventsPromise={myJoinedEventsPromise(user.email)}></JoinedEventList>
            </Suspense>
        </div>
    );
};

export default MyJoinedEvents;