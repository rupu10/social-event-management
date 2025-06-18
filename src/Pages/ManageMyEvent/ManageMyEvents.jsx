import React, { Suspense } from 'react';
import UseAuth from '../../hooks/UseAuth';
import MyEventsList from './MyEventsList';
import { myEventsPromise } from '../../api/myEvents';

const ManageMyEvents = () => {
    const {user} = UseAuth();
    return (
        <div>
            <Suspense>
                <MyEventsList myEventsPromise={myEventsPromise(user.email,user.accessToken)}></MyEventsList>
            </Suspense>
        </div>
    );
};

export default ManageMyEvents;