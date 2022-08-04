import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
import NavbarMain from './mainNav';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import 'swiper/css/bundle';
import './main.scss';

export default function Main() {
    const table = [
        {
            id: 1,
            number: 1,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 2,
            img: require('../../icons/barcelona.png'),
            clubName: 'Barcelona',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 3,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 4,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 5,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 6,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
        {
            id: 1,
            number: 7,
            img: require('../../icons/Real-madrid-icon.png'),
            clubName: 'Real-Madrid',
            statistic1: '80',
            statistic2: '31',
            statistic3: '256'
        },
    ]

    const meeting = [
        {
            id: 1,
            host: 'Real Madrid',
            hostIcon: require('../../icons/Real-madrid-icon.png'),
            hostScore: '2',
            guest: 'Barcelona',
            guestIcon: require('../../icons/barcelona.png'),
            guestScore: '0',
        },
        {
            id: 2,
            host: 'Real Madrid',
            hostIcon: require('../../icons/Real-madrid-icon.png'),
            hostScore: '2',
            guest: 'Barcelona',
            guestIcon: require('../../icons/barcelona.png'),
            guestScore: '0',
        },
        {
            id: 3,
            host: 'Real Madrid',
            hostIcon: require('../../icons/Real-madrid-icon.png'),
            hostScore: '2',
            guest: 'Barcelona',
            guestIcon: require('../../icons/barcelona.png'),
            guestScore: '0',
        },
        {
            id: 4,
            host: 'Real Madrid',
            hostIcon: require('../../icons/Real-madrid-icon.png'),
            hostScore: '2',
            guest: 'Barcelona',
            guestIcon: require('../../icons/barcelona.png'),
            guestScore: '0',
        },
    ]
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://skerio.uz/api/home').then(res => {
            setData(res.data.data);
            setActiveBtn(res.data.data);
        })
    }, []);

    const [activeBtn, setActiveBtn] = useState([]);
    const [activeData, setActiveData] = useState("Futbol");

    const handleActiveBtn = function (btnId) {
        setActiveData(btnId)
        const filtered = data.filter(item =>
            item.sport_category === btnId
        );
        setActiveBtn(filtered);
    }

    return (
        <section id="mainHeader">
            <div className="nav-n">
                <NavbarMain />
            </div>
            <div className="head">
                <Swiper
                    style={{
                        "--swiper-navigation-color": "transparent",
                        "--swiper-pagination-color": "transparent",
                        width: "100%",
                    }}
                    spaceBetween={0}
                    navigation={true}
                    autoplay={{
                        delay: 6500,
                        disableOnInteraction: false,
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="mySwiper2">
                    {data.map(item =>
                        <SwiperSlide className="firstSwiper">
                            <div className="describtion">
                                <div className="main-section">
                                    <div className="title">
                                        <h1>{item.title_uz}</h1>
                                    </div>
                                    <div className="describtion">
                                        <p>{item.description_uz}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="img">
                                <img src={'https://skerio.uz/admin/images/homes/' + item.image} />
                            </div>
                            <div className="table">
                                <div className="first-table">
                                    <div className="table">
                                        <div className="title">
                                            <h5>Meeting</h5>
                                        </div>
                                        <table>
                                            {meeting.map(item =>
                                                <tr className="table-row" key={item.id}>
                                                    <th className="icon">
                                                        <img src={item.hostIcon} />
                                                    </th>
                                                    <th className="club-guest">
                                                        <p>{item.host}</p>
                                                    </th>

                                                    <div className="score">
                                                        <div className="hostScore">
                                                            <p>{item.hostScore}</p>
                                                        </div>
                                                        :
                                                        <div className="guestScore">
                                                            <p>{item.guestScore}</p>
                                                        </div>
                                                    </div>
                                                    <th className="club-guest">
                                                        <p>{item.guest}</p>
                                                    </th>
                                                    <th className="club">
                                                        <img src={item.guestIcon} />
                                                    </th>
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                                <div className="second-table">
                                    <div className="table">
                                        <div className="title">
                                            <h5>Statistic</h5>
                                        </div>
                                        <table>
                                            {table.map(item =>
                                                <tr className="table-row" key={item.id}>
                                                    <th className="number">
                                                        <h5>{item.number}</h5>
                                                    </th>
                                                    <th className="icon">
                                                        <img src={item.img} />
                                                    </th>
                                                    <th className="club">
                                                        <p>{item.clubName}</p>
                                                    </th>
                                                    <th className="statistic1">{item.statistic1}</th>
                                                    <th className="statistic2">{item.statistic2}</th>
                                                    <th className="statistic3">{item.statistic3}</th>
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <div className="bottom-slider">
                <div className="slider">
                    <Swiper onSwiper={setThumbsSwiper} spaceBetween={0}
                        slidesPerView={1} freeMode={true} autoplay={{
                            delay: 2500, disableOnInteraction: false,
                        }} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]}
                        breakpoints={{
                            430: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1500: {
                                slidesPerView: 6,
                                spaceBetween: 40,
                            }
                        }}
                        className="mySwiper">
                        <div className="sport-type">
                            <div className="controlButtons">
                                {activeBtn.map((btn, index) =>
                                    <SwiperSlide className="swiper" key={index}>
                                        <button
                                            onChange={() => handleActiveBtn(btn.sport_category)}
                                            className={activeData ? "activeBtn" : "buttons"}
                                            style={{ fontSize: "20px", fontWeight: 500, }}
                                        >
                                            {btn.sport_category}
                                        </button>
                                    </SwiperSlide >
                                )}
                            </div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section >
    )
}