import React, { Suspense, useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';
import MyEventsList from './MyEventsList';
// import { myEventsPromise } from '../../api/myEvents';

const ManageMyEvents = () => {
    const {user} = UseAuth();
    const [myEventsPromise,setMyEventsPromise] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:7000/manage-event?email=${user.email}`,{
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
        <div className='md:w-10/12 mx-auto my-8'>
            <h1 className='text-3xl font-semibold text-center mb-3'>Events You created</h1>
            <Suspense>
                <MyEventsList myEventsPromise={myEventsPromise}></MyEventsList>
            </Suspense>
        </div>
    );
};

export default ManageMyEvents;