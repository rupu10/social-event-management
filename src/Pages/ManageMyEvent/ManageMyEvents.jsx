import React, { Suspense } from 'react';
import UseAuth from '../../hooks/UseAuth';
import MyEventsList from './MyEventsList';
import { myEventsPromise } from '../../api/myEvents';

const ManageMyEvents = () => {
    const {user} = UseAuth();
    return (
        <div className='w-10/12 mx-auto my-8'>
            <h1 className='text-3xl font-semibold text-center mb-3'>Events You created</h1>
            <Suspense>
                <MyEventsList myEventsPromise={myEventsPromise(user.email,user.accessToken)}></MyEventsList>
            </Suspense>
        </div>
    );
};

export default ManageMyEvents;