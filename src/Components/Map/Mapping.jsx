import React, { useState, useEffect } from 'react'
import './map.scss'
import Nav from '../Nav/Nav';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer'
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


function Mapping() {
    const [defaultLocation, setDefaultLocation] = useState({ lat: 40, lng: 65 });
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('https://skerio.uz/api/complex/' + id)
            .then(function (response) {
                setData(response.data)
                setDefaultLocation({ lat: response?.data?.lat * 1, lng: response?.data?.lng * 1 })
            })
    }, [id]);


    const { t } = useTranslation();

    return (
        <>
            <section className='Mapping'>
                <Nav />

                <div className="mapping">
                    <div className="back">
                        <Link to={'/areas'}>
                            <h2><KeyboardArrowLeftIcon />  {t("back")}</h2>
                        </Link>
                    </div>
                    <div className="about">
                        <div className="map">
                            <YMaps>
                                <div>
                                    <Map width="700px"
                                        height="500px" defaultState={{ center: [`${data?.lat}`, `${data?.lng}`], zoom: 16 }} >
                                        <Placemark geometry={[data?.lat, data?.lng]} />
                                    </Map>
                                </div>
                            </YMaps>
                        </div>
                        <div className="area">
                            <h1 className='area_title'>{data?.name}</h1>
                            <div className="tools">
                                <div className="first">
                                    <p className='area_items'><LocalOfferIcon />{data?.price}</p>
                                    <p className='area_items'><LocalPhoneIcon />{data?.phone}</p>
                                    <p className='area_items'><LocationOnIcon />{data?.address}</p>
                                </div>
                                <div className="second">
                                    <p className='area_items'><MeetingRoomIcon /> {t('dressrooms')} :{data?.dress_room}</p>
                                    <p className='area_items'><AddLocationAltIcon /> {t('location')} :</p>
                                    <p className='area_items'><FastfoodIcon /> {t('food')} :{data?.food}</p>
                                </div>
                            </div>
                            <div className="area_descr">{data?.description}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also t</div>
                        </div>
                    </div>
                    <div className="images">
                        <img src={"https://skerio.uz/admin/images/complexes/" + data?.image} alt="" className='image' />
                        <img src={"https://skerio.uz/admin/images/complexes/" + data?.image} alt="" className='image' />
                        <img src={"https://skerio.uz/admin/images/complexes/" + data?.image} alt="" className='image' />
                        <img src={"https://skerio.uz/admin/images/complexes/" + data?.image} alt="" className='image' />
                    </div>
                </div>
                <Brands />
                <Footer />
            </section>
        </>
    )
}

export default Mapping