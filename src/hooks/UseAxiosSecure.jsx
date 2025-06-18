import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:7000/'
})
const UseAxiosSecure = () => {


    const {user} = UseAuth()

    axiosInstance.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })

    return axiosInstance;
};

export default UseAxiosSecure;