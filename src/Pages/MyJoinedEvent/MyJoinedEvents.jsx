import React, { Suspense } from 'react';
import JoinedEventList from './JoinedEventList';
import UseAuth from '../../hooks/UseAuth';
import UseJoinedEventApi from '../../api/UseJoinedEventApi';





const MyJoinedEvents = () => {
    const {user} = UseAuth();
    const {myJoinedEventsPromise} = UseJoinedEventApi();
    // console.log(myJoinedEventsPromise);
    return (
        <div>
            <h1>joined events</h1>
            <Suspense fallback={'loading...'}>
                <JoinedEventList myJoinedEventsPromise={myJoinedEventsPromise(user.email)}></JoinedEventList>
            </Suspense>
        </div>
    );
};

export default MyJoinedEvents;