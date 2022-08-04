import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './ground.scss'
import 'aos/dist/aos.css';
AOS.init(1000);

export default function Ground() {

    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/complex/1').then(res => {
                setData(res.data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <section id="ground" data-aos="fade-left">
            <div className="ground-title">
                <h2>{t("ground")}</h2>
            </div>

            <div className="ground-main">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={false}
                    pagination={{
                        clickable: false,
                    }}
                    breakpoints={{
                        430: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },

                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        1500: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        }
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={false}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {/* -------------- */}
                    {data?.map(value =>
                        <SwiperSlide >
                            <div className="ground-card" >
                                <div className="card-left">
                                    <div className="card-title">
                                        <h2>{value.name}</h2>
                                    </div>
                                    <div className="card-desc">
                                        <p>
                                            {value.address}
                                        </p>
                                    </div>
                                    <div className="card-button">
                                        <button>Contact Us</button>
                                    </div>
                                </div>
                                <div className="ground-right">
                                    <img src={'https://skerio.uz/admin/images/complexes/' + value.image} />
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                    {/* -------------- */}
                </Swiper>
            </div>
        </section>
    )
}