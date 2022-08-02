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
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import MapPicker from 'react-google-map-picker'
import Areas from '../Areas/Areas';
const DefaultZoom = 15;


function Mapping() {
    const [defaultLocation, setDefaultLocation] = useState({ lat: 40, lng: 65 });
    const [zoom, setZoom] = useState(DefaultZoom);
    const { id } = useParams();
    const [data, setData] = useState({});


    useEffect(() => {
        axios.get('https://skerio.uz/api/complex/' + id)
            .then(function (response) {
                setData(response.data)
                setDefaultLocation({ lat: response?.data?.lat * 1, lng: response?.data?.lng * 1 })
            })
    }, []);

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    return (
        <>
            <section className='Mapping'>
                <Nav />

                <div className="mapping">
                    <Link to={'/areas'}>
                        <h1>Go to Back</h1>
                    </Link>
                    <div className="about">
                        <div className="map">
                            <YMaps>
                                <div>
                                    <Map width="700px"
                                        height="500px" defaultState={{ center: [`${data?.lat}`, `${data?.lng}`], zoom: 10 }} >
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
                                    <p className='area_items'><MeetingRoomIcon />Dress room:{data?.dress_room}</p>
                                    <p className='area_items'><AddLocationAltIcon />Location:</p>
                                    <p className='area_items'><FastfoodIcon />Food:{data?.food}</p>
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