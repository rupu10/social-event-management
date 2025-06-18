import React from 'react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const UseJoinedEventApi = () => {
    const axiosSecure = UseAxiosSecure();
    const myJoinedEventsPromise = email => {
        return axiosSecure.get(`joinEvents?email=${email}`).then(res=>res.data)
    }
    return {
        myJoinedEventsPromise
    };
};

export default UseJoinedEventApi;