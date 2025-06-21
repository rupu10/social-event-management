import React, { Suspense, useEffect, useState } from 'react';
import JoinedEventList from './JoinedEventList';
import UseAuth from '../../hooks/UseAuth';


const MyJoinedEvents = () => {
    const [myJoinedEventsPromise, setMyJoinedEventPromise] = useState([])
    const {user} = UseAuth();
    useEffect(()=>{
        fetch(`https://a-11-social-event-server.vercel.app/joinEvents?email=${user.email}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setMyJoinedEventPromise(data)
        })
    },[user])

    return (
        <div className='md:w-10/12 mx-auto my-8'>
            <h1 className='text-center font-semibold text-3xl mb-3'>Your joined events</h1>
            <Suspense fallback={'loading...'}>
                <JoinedEventList myJoinedEventsPromise={myJoinedEventsPromise}></JoinedEventList>
            </Suspense>
        </div>
    );
};

export default MyJoinedEvents;