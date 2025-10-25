import React, { Suspense, useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';
import MyEventsList from './MyEventsList';

const ManageMyEvents = () => {
    const {user} = UseAuth();
    const [myEventsPromise,setMyEventsPromise] = useState([])
    useEffect(()=>{
        fetch(`https://social-management-server.vercel.app/manage-event?email=${user.email}`,{
            method: 'GET',
            headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
        })
        .then(res=>res.json())
        .then(data=>{
            setMyEventsPromise(data)
        });
        
    },[user])
    return (
        <div className='max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8'>
            <div className="text-center mb-8">
                <h1 className='text-4xl font-bold text-base-content mb-3'>Events You Created</h1>
                <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
                    Manage and organize all the events you've created
                </p>
            </div>
            <Suspense>
                <MyEventsList myEventsPromise={myEventsPromise}></MyEventsList>
            </Suspense>
        </div>
    );
};

export default ManageMyEvents;