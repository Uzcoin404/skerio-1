import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { loadCurrentItem, addToCart } from "../../../redux/Shopping/shopping-actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './shopcard.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/bundle';

function ShopCard({ data, addToCart, loadCurrentItem }) {

    const getMyID = window.localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const decoded = jwt_decode(getMyID);
    const myID = decoded.sub;

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${getMyID}`);

    const [render, setrender] = useState(false);
    const [like, setLike] = useState(false);

    const likeButtonComponent = (newsid, btnId) => {
        var formdata = new FormData();
        formdata.append("user_id", btnId);
        formdata.append("product_id", newsid);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://skerio.uz/api/shoplike", requestOptions)
            .then(res => res.text())
            .then((res) => {
                setrender(res);
                console.log('sd',res);
            })
            .catch(error => console.log('error', error));

        const getLike = function () {
            data?.some(item => {
                if (item.id === render) {
                    return setLike(true);
                }
            });
        }
        return getLike(newsid);
    }
    console.log(render);

    const [login, setLogin] = useState("");

    const checkIfLoggedIn = function (e) {
        if (getMyID) {
            addToCart(e)
        } else {
            setLogin("/login")
        }
    }

    return (
        <section id="shopcard" data-aos="fade-left">
            <Swiper style={{
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
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* --cards-- */}
                {data?.filter(item => item.product_category === "FUTBOLKA").map((item, index) => (
                    <SwiperSlide className="store-card" key={index} >
                        <div className="card-top-icon" >
                            <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                            <FavoriteIcon
                                onClick={() => likeButtonComponent(item.id, myID)}
                                className={like ? 'liked' : 'unliked'}
                            />
                            <div className="discount">
                                <p>{item.discount}%</p>
                            </div>
                        </div>
                        <Link to={`/shop/viewfull/${item.id}`}>
                            <div className="card-img" onClick={() => loadCurrentItem(item)}>
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                            </div>
                        </Link>
                        <div className="card-footer">
                            <div className="club-name">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => checkIfLoggedIn(item.id)}>
                                <Link to={login}> <AddShoppingCartIcon style={{ color: "#fff" }} /></Link>
                            </button>
                            {/* <AddShoppingCartIcon onClick={() => addToCart(item.id)} style={{ color: 'white' }} /> */}
                        </div>
                    </SwiperSlide>
                ))}
                {/* --cards-- */}
            </Swiper>
            <Swiper style={{
                "--swiper-pagination-color": "#BF0000",
            }}
                slidesPerView={1} spaceBetween={10} slidesPerGroup={1} loop={false}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    430: {
                        slidesPerView: 1,
                        spaceBetween: 90,
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
                }} navigation={false} modules={[Pagination]} className="mySwiper">
                {/* --cards-- */}
                {data?.filter(item => item.product_category === "SHORTIK").map((item, index) => (
                    <SwiperSlide className="store-card" key={index}>
                        <div className="card-top-icon">
                            <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                            <FavoriteIcon onClick={() => likeButtonComponent(item.id, myID)}
                                className={like ? 'liked' : 'unliked'}
                            />
                            <div className="discount">
                                <p>{item.discount}%</p>
                            </div>
                        </div>
                        <Link to={`/shop/viewfull/${item.id}`}>
                            <div className="card-img" onClick={() => loadCurrentItem(item)}>
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                            </div>
                        </Link>
                        <div className="card-footer">
                            <div className="club-name">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => checkIfLoggedIn(item.id)}>
                                <Link to={login}> <AddShoppingCartIcon style={{ color: "#fff" }} /></Link>
                            </button>
                        </div>
                    </SwiperSlide>
                ))
                }
                {/* --cards-- */}
            </Swiper>

            <Swiper style={{
                "--swiper-pagination-color": "#BF0000",
            }}
                slidesPerView={1} spaceBetween={10}
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
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* --cards-- */}
                {data?.filter(item => item.product_category === "SPORT MOLLARI").map((item, index) => (
                    <SwiperSlide className="store-card" key={index} >
                        <div className="card-top-icon" >
                            <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                            <FavoriteIcon onClick={() => likeButtonComponent(item.id, myID)}
                                className={like ? 'liked' : 'unliked'}
                            />
                            <div className="discount">
                                <p>{item.discount}%</p>
                            </div>
                        </div>
                        <Link to={`/shop/viewfull/${item.id}`}>
                            <div className="card-img" onClick={() => loadCurrentItem(item)}>
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                            </div>
                        </Link>
                        <div className="card-footer">
                            <div className="club-name">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => checkIfLoggedIn(item.id)}>
                                <Link to={login}> <AddShoppingCartIcon style={{ color: "#fff" }} /></Link>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
                {/* --cards-- */}
            </Swiper>

            <Swiper style={{
                "--swiper-pagination-color": "#BF0000",
            }}
                slidesPerView={1} spaceBetween={10} slidesPerGroup={1}
                loop={false} loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    430: {
                        slidesPerView: 1,
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
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* --cards-- */}
                {data?.filter(item => item.product_category === "AKSESUAR").map((item, index) => (
                    <SwiperSlide className="store-card" key={index} >
                        <div className="card-top-icon">
                            <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                            <FavoriteIcon onClick={() => likeButtonComponent(item.id, myID)}
                                className={like ? 'liked' : 'unliked'}
                            />
                            <div className="discount">
                                <p>{item.discount}%</p>
                            </div>
                        </div>
                        <Link to={`/shop/viewfull/${item.id}`}>
                            <div className="card-img" onClick={() => loadCurrentItem(item)}>
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                            </div>
                        </Link>
                        <div className="card-footer">
                            <div className="club-name">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => checkIfLoggedIn(item.id)}>
                                <Link to={login}> <AddShoppingCartIcon style={{ color: "#fff" }} /></Link>
                            </button>
                        </div>
                    </SwiperSlide>
                ))
                }
                {/* --cards-- */}
            </Swiper>

            <Swiper style={{
                "--swiper-pagination-color": "#BF0000",
            }}
                slidesPerView={1} spaceBetween={10}
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
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
            >
                {/* --cards-- */}
                {data?.filter(item => item.product_category === "SUMKALAR").map((item, index) => (
                    <SwiperSlide className="store-card" key={index} >
                        <div className="card-top-icon" >
                            <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                            <FavoriteIcon onClick={() => likeButtonComponent(item.id, myID)}
                                className={like ? 'liked' : 'unliked'}
                            />
                            <div className="discount">
                                <p>{item.discount}%</p>
                            </div>
                        </div>
                        <Link to={`/shop/viewfull/${item.id}`}>
                            <div className="card-img" onClick={() => loadCurrentItem(item)}>
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                            </div>
                        </Link>
                        <div className="card-footer">
                            <div className="club-name">
                                <h4>{item.name}</h4>
                                <p>{item.price}</p>
                            </div>
                            <button onClick={() => checkIfLoggedIn(item.id)}>
                                <Link to={login}> <AddShoppingCartIcon style={{ color: "#fff" }} /></Link>
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
                {/* --cards-- */}
            </Swiper> 
        </section >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id)),
        loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    };
};

export default connect(null, mapDispatchToProps)(ShopCard);