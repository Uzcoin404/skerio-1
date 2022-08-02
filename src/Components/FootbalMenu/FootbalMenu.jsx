import * as React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from '../FootbalMenu/Slider/Slider';
import Featured from '../FootbalMenu/Featured/FeaturedVideo';
import FunStore from '../FootbalMenu/FunStore/FunStore';
import Tickets from '../FootbalMenu/Ticket/Tickets';
import Statistic from '../FootbalMenu/Statics/Statistic'
import Ground from './Ground/Ground';
import Test from './TestNavbar/Test';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer';
AOS.init(1000);




export default function FootbalMenu() {

    return (
        <div>
            <Test /> 
            <Slider />
            <Featured />
            <FunStore />
            {/* <Tickets /> */}
            <Statistic />
            <Ground />
            <Brands />
            <Footer />
        </div>
    )
}