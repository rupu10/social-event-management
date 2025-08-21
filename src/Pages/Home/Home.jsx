import React from 'react';
import Banner from '../../Component/Banner';
import Features from '../../Component/Features';
import Galleries from '../../Component/Galleries';
import NewsLetter from '../../Component/NewsLetter';
import ReviewSection from '../Shared/ReviewSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Galleries></Galleries>
            <ReviewSection></ReviewSection>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;