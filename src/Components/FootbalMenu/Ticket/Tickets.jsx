import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import './tickets.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init(1000);



export default function Tickets() {

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://skerio.uz/api/ltickets").then((res) => {
            setData(res.data.data);
            console.log(res.data.data)
        });
    }, []);

    const { t } = useTranslation();
    
    return (
        <section id="tickets">
            <div className="tickets-title">
                <h2>{t("tickets")}</h2>
            </div>
            <div className="tickets-card">
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
                    {data.map(post =>
                        <SwiperSlide style={{ padding: '50px 0' }}>
                            <div className="card" style={{ marginLeft: '100px' }} data-aos="fade-left">
                                <div className="card-img">
                                    <img
                                        className="tick1"
                                        src={"https://skerio.uz/admin/images/tickets/" + post.image}
                                    />
                                </div>
                                <div className="card-title">
                                    <h4>{post.name}</h4>
                                </div>
                                <div className="clubs">
                                    <p>{post.team_1}</p>
                                    <p className="club2">{post.team_2}</p>
                                </div>
                                <div className="card-desc">
                                    <p>{post.stadium_section}.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                    {/* --first card --- */}

                </Swiper>
            </div>
        </section>
    )
}