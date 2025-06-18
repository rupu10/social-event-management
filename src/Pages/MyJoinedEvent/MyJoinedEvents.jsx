import React, { Suspense } from 'react';
import JoinedEventList from './JoinedEventList';
import UseAuth from '../../hooks/UseAuth';
import { myJoinedEventsPromise } from '../../api/JoinedEventsApi';



const MyJoinedEvents = () => {
    const {user} = UseAuth();
    // console.log(user);
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