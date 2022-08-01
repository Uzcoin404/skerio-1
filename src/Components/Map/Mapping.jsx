/* import { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { YMaps, Map } from "react-yandex-maps";
import Nav from '../Nav/Nav';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer'

import './map.scss';


export default function Mapping() {

    return (
        <section id="map" >
            <div>
                <Nav />
            </div>
            <div className="back">
                <Link to="/areas">
                    <button><ArrowBackIosIcon />  Go Back</button>
                </Link>
            </div>
            <div className="mainMapSection">
                <div className="initMap">
                    <YMaps>
                        <div style={{ width: "50%", height: "50%" }}>
                            <Map defaultState={{ center: [72.359477, 19.52], zoom: 9 }} style={{ width: "600px", height: "400px" }} />
                        </div>
                    </YMaps>
                </div>
                <div className="initDesc">
                    <div className="title">
                        <h3>Limon Area</h3>
                    </div>
                    <div className="desc">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio <br />

                            +998 97 234 34 07 <br />
                            +998 97 234 34 07</p>
                    </div>
                </div>
            </div>
            <div>
                <Brands />
                <Footer />
            </div>
        </section>
    )
} */
import React, { useState, useEffect } from 'react'
import './map.scss'
import { useParams } from "react-router-dom";
import axios from "axios";

function Mapping() {
    const { id } = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('https://skerio.uz/api/complex/' + id)
            .then(function (response) {
                setData(response.data)
            })
    }, []);
    console.log(data);
    return (
        <>
            
        </>
    )
}

export default Mapping