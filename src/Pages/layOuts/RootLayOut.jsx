import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router';

const RootLayOut = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-10/12 mx-auto min-h-[calc(100vh-220px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;