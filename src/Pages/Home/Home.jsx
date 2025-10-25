import React from 'react';
import Banner from '../../Component/Banner';
import Features from '../../Component/Features';
import Galleries from '../../Component/Galleries';
import NewsLetter from '../../Component/NewsLetter';
import ReviewSection from '../Shared/ReviewSection';
import HelpFeature from '../../Component/HelpFeature';
import OurWork from '../../Component/OurWork';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <HelpFeature></HelpFeature>
            <OurWork></OurWork>
            <Galleries></Galleries>
            <ReviewSection></ReviewSection>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;