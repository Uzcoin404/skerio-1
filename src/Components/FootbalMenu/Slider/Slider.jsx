import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import realMadridLogo from '../../../logo/realMadrid.png';
import LiverpoolLogo from '../../../logo/Liverpool.png';
import Everton from '../../../logo/everton.png';
import ArsenalLogo from '../../../logo/arsenal.png';
import BarcelonaLogo from '../../../logo/barcelona.png';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import RealLogo from '../../../logo/real.png';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from 'aos';
import './slider.scss';
import 'aos/dist/aos.css';
AOS.init(1000);

const URL = `https://api-football-v1.p.rapidapi.com/v3/leagues/seasons`;
const options = {
    headers: {
        'X-RapidAPI-Key': 'a49393feaamshc58bdf357243435p13429bjsn74b59756127e',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

export default function Slider() {

    const { t } = useTranslation();

    const getData = async function () {
        const data = await axios.get(URL, options).then(res => {
            console.log(res.data.data);
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <section id='slider' data-aos="fade-up" >
            <div className="slider-header">
                <div className="slider-title">
                    <h2>{t("match")}</h2>
                </div>
            </div>

            <div className="main-slider" data-aos="fade-left" >
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#BF0000",
                    }}
                    slidesPerView={1}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    loop={false}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        430: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },

                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1500: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        }
                    }}
                    navigation={false}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {/* first slider */}
                    <SwiperSlide style={{ padding: '50px 0' }}>
                        <div className="main-div" data-aos="fade-left">
                            <div className="logo-div">
                                <div className="logo">
                                    <img src={realMadridLogo} />
                                    <img src={LiverpoolLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 28 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Real Madrid VS Liverpool </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* next slider */}
                    <SwiperSlide style={{ padding: '50px 0', }}>
                        <div className="main-div" data-aos="fade-left" >
                            <div className="logo-div" >
                                <div className="logo">
                                    <img src={Everton} />
                                    <img src={ArsenalLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 17 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Everton VS Arsenal  </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* next slider */}
                    <SwiperSlide style={{ padding: '50px 0', }}>
                        <div className="main-div" data-aos="fade-left">
                            <div className="logo-div"  >
                                <div className="logo">
                                    <img src={BarcelonaLogo} />
                                    <img src={RealLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 16 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Barselona VS Real Betis  </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* first slider */}
                    <SwiperSlide style={{ padding: '50px 0', }}>
                        <div className="main-div" data-aos="fade-left" >
                            <div className="logo-div">
                                <div className="logo">
                                    <img src={realMadridLogo} />
                                    <img src={LiverpoolLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 28 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Real Madrid VS Liverpool </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* next slider */}
                    <SwiperSlide style={{ padding: '50px 0', }}>
                        <div className="main-div" data-aos="fade-left" >
                            <div className="logo-div" >
                                <div className="logo">
                                    <img src={Everton} />
                                    <img src={ArsenalLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 17 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Everton VS Arsenal  </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* next slider */}
                    <SwiperSlide style={{ padding: '50px 0', }}>
                        <div className="main-div" data-aos="fade-left" >
                            <div className="logo-div" >
                                <div className="logo">
                                    <img src={Everton} />
                                    <img src={ArsenalLogo} />
                                </div>
                                <div className="logo-text">
                                    <p>Sat 17 May</p>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="red-line"></div>
                            <div className="sub-header">
                                <h5>Everton VS Arsenal  </h5>
                                <p>Stade de France-Saint-Denis
                                    Final</p>
                                <button><Link to="/table">{t("seeMore")}  <span><DoubleArrowIcon style={{ color: 'white' }} /></span></Link></button>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/* end of slider */}
                </Swiper>
            </div>
        </section>
    )
}