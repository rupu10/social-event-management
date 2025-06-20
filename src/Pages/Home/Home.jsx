import React from 'react';
import Banner from '../../Component/Banner';
import Features from '../../Component/Features';
import Galleries from '../../Component/Galleries';
import NewsLetter from '../../Component/NewsLetter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* <Features></Features> */}
            <Galleries></Galleries>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;