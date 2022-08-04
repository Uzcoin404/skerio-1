import { useState, useEffect } from 'react';
import axios from 'axios';
import './brands.scss';

export default function Brands() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://skerio.uz/api/brand').then(res => {
            setData(res.data.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <section id="brands">
            <div class="marquee">
                <div class="marquee--inner">
                    {data.map(value =>
                        <span key={value.name}>
                            <div class="orb">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb red">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                        </span>
                    )}
                    {data.map(value =>
                        <span key={value.name}>
                            <div class="orb">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb red">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                            <div class="orb ">
                                <img src={'https://skerio.uz/admin/images/brands/' + value.image} />
                            </div>
                        </span>
                    )}

                </div>
            </div>
        </section>
    )
}
