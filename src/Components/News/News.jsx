import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer';
import { RWebShare } from "react-web-share";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Modal } from '@mui/material';
import jwt_decode from "jwt-decode";
import './news.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init(1000);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1.5px solid #bf0000',
    boxShadow: 24,
    p: 4,
};

export default function News() {

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buttons = [
        {
            name: "All",
            categ: '',
            id: 10
        },
        {
            name: 'Asia',
            categ: 'asia',
            id: 11
        },
        {
            name: 'Europe',
            categ: 'europe',
            id: 12
        }
    ];

    const dateBtns = [
        {
            id: 1,
            name: 'Day',
            category: 'day'
        },
        {
            id: 2,
            name: 'Week',
            category: 'week'
        },
        {
            id: 3,
            name: 'Month',
            category: 'month'
        },
        {
            id: 4,
            name: 'Year',
            category: 'year'
        },
    ];

    const btns = [
        {
            icons: <ThumbUpIcon />
        }
    ];

    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const decoded = decode.sub;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let myId = localStorage.getItem('token');
    const [render, setrender] = useState(false);

    const [liked, setLiked] = useState(false);

    const [isLike, setIsLike] = useState(false);

    const likeButtonComponent = (newsid, btnId) => {

        setIsLike(btnId)
        var formdata = new FormData();
        formdata.append("user_id", myId);
        formdata.append("news_id", newsid);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://skerio.uz/api/like", requestOptions)
            .then(res => res.text())
            .then((res) => {
                setrender(res);
                console.log(res);
            })
            .catch(error => console.log('error', error));

        const handleChange = data.filter((item) => {
            if (item.id === btnId) {
                setLiked(liked === false ? true : false)
            }
        })
        setLiked(handleChange);
        return handleChange()
    }

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [category, setCategory] = useState(buttons[0].categ);
    const [data2, setData2] = useState([]);
    const [status, setStatus] = useState([]);
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/likenews').then((res) => {
                setPopular(res.data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    const [day, setDay] = useState([])
    const getFilterDay = function () {
        axios.get("https://skerio.uz/api/dailyFilter").then(res => {
            setDay(res.data.data)
        })
    }
    console.log(day);

    const [firstDate, setFirstData] = useState([]);
    const [filteredDate, setFilteredDate] = useState([]);

    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/news').then((res) => {
                setData(res.data.data);
                setData1(res.data.data);
                setFirstData(res.data.data);
                console.log(res.data.data)
            });
            axios.get('https://skerio.uz/api/lastnews').then(res => {
                setData2(res.data.data);
            })
            axios.get('https://skerio.uz/api/statusnews').then(res => {
                setStatus(res.data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, [setrender, render]);

    const filterHandling = (item) => {
        setCategory(item);
        const filtered = data1.filter(value => {
            if (value.continent_id === item) {
                return value.continent_id === item;
            } else if (item === "") {
                return value;
            }
        });
        setData(filtered);
    }

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const filterDate = function (btnId) {
        setFilteredDate(btnId);
        const filtered = data2.filter(item => {
            if (item.created_at === date) {
                return item.created_at === date;
            } else if (item.created_at <= date - 30) {
                return item.created_at <= date - 30;
            } else if (item.created_at <= date - 365) {
                return item.created_at <= date - 365;
            }
        })
        setFirstData(filtered);
    }

    const [popularNews, setPopularNews] = useState(0);

    useEffect(() => {
        setPopularNews(popular.length);
    }, [popular.length]);

    return (
        <section id="news">
            <div>
                <Nav />
            </div>
            <div className="news-title" data-aos="fade-right">
                <div className="title-left">
                    {buttons.map(btn =>
                        <button
                            className={btn.categ === category ? 'active-categ' : "buttons"} onClick={() => filterHandling(btn.categ)} key={btn.id}>
                            {btn.name}
                        </button>
                    )}
                </div>
                <div className="title-right" data-aos="fade-left">
                    <ul className="title">
                        {/* {dateBtns.map(btn =>
                            <li onClick={() => filterDate(btn)} className="title-item" key={btn.id}>{btn.name}</li>
                        )}*/}
                        <li onClick={getFilterDay} className="title-item" >Day</li>
                    </ul>
                </div>
            </div>
            <div className="main-body" >
                <div className="body-left">
                    {data2.map((value) =>
                        <div className="firts-card" data-aos="fade-right" key={value.id}>
                            <div className="card-img">
                                <img src={'https://skerio.uz/admin/images/news/' + value.image} />
                            </div>
                            <div className="card-desc">
                                <div className="card-date">
                                    <h5><CalendarMonthIcon /> {value.created_at}</h5>
                                    <p>Exclusive</p>
                                </div>
                                <div className="card-info">
                                    <h2>{value.title_en}</h2>
                                    <p>
                                        {value.description_en.length > 200 ?
                                            `${value.description_en.substring(0, 200)} ...` : value.description_en
                                        }
                                    </p>
                                    <button className="learn-more" onClick={handleOpen}
                                    >
                                        Learn More
                                    </button>
                                </div>
                                <div className="share-icons">
                                    <RWebShare
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            height: '30vh'
                                        }}
                                        data={{
                                            text: "Please, share us ",
                                            url: "http://localhost:3001/news",
                                            title: "Do'stlarga ulash",
                                        }}
                                        onClick={() => console.log("shared successfully!")}
                                    >
                                        <ShareIcon style={{ fontSize: '2rem', color: '#726e6e ' }} />
                                    </RWebShare>
                                    {btns.map(valuee =>
                                        <button className={"like-button " + (isLike ? "liked" : "")}
                                            onClick={() => likeButtonComponent(value.id, decoded)}
                                        >
                                            {valuee.icons} | {value.like}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* --second card -- */}
                    <div className="cards" >
                        {/* --card-- */}
                        {firstDate.map(value =>
                            <div className="card" data-aos="fade-right">
                                <div className="card-img">
                                    <img src={'https://skerio.uz/admin/images/news/' + value.image} />
                                </div>
                                <div className="card-desc">
                                    <div className="card-date">
                                        <h5><CalendarMonthIcon /> {value.created_at}</h5>
                                    </div>
                                    <div className="card-info">
                                        <h2>{value.title_en}</h2>

                                    </div>
                                    <div className="share-icons">
                                        <RWebShare style={{
                                            position: 'fixed',
                                            top: '0',
                                            left: '50%',
                                            height: '30vh',
                                            background: "#bf0000"
                                        }}
                                            data={{
                                                text: "Please, share us",
                                                url: "https://skerio.uz/news",
                                                title: "Do'stlarga ulash",
                                            }} onClick={() => console.log("shared successfully!")}>
                                            <ShareIcon style={{ fontSize: '2rem', color: '#726e6e ' }} />
                                        </RWebShare>
                                        {
                                            btns.map(valuee =>
                                                <button className={(isLike ? "liked" : "like-button")} onClick={() => likeButtonComponent(value.id)}>
                                                    {valuee.icons} | {value.likes[0]}
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="body-right">
                    <div className="main-body-right">
                        {/* --card-- */}
                        <div className="popular-news" data-aos="fade-top">
                            <div className="news-title">
                                <h3>{popularNews} {t("popularNews")}</h3>
                            </div>
                            {
                                popular.map((res, index) => {
                                    return (
                                        <>
                                            <div className="news">
                                                <p><span>{index + 1}</span> {res.title_uz}</p>
                                                <h5>{res.created_at}</h5>
                                            </div>

                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* --card-- */}
                        {/* --card-- */}
                        {status.map(value =>
                            <div className="card" data-aos="fade-top">
                                <div className="card-img">
                                    <img src={'https://skerio.uz/admin/images/news/' + value.image} />
                                </div>
                                <div className="card-desc">
                                    <div className="card-date">
                                        <h5><CalendarMonthIcon /> {value.created_at}</h5>
                                    </div>
                                    <div className="card-info">
                                        <h2>
                                            {value.title_en.length > 50 ?
                                                `${value.title_en.substring(0, 57)} ...` : value.title_en
                                            }</h2>
                                    </div>
                                    <div className="share-icons">
                                        <RWebShare style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            height: '30vh'
                                        }}
                                            data={{
                                                text: "Please, share us",
                                                url: "https://on.natgeo.com/2zHaNup",
                                                title: "Do'stlarga ulash",
                                            }} onClick={() => console.log("shared successfully!")}>
                                            <ShareIcon style={{ fontSize: '2rem', color: '#726e6e ' }} />
                                        </RWebShare>
                                        {btns.map(valuee =>
                                            <button className={"like-button " + (isLike ? "liked" : "")} onClick={likeButtonComponent} >
                                                {valuee.icons} | {value.likes}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            {data2.map(value =>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className="modal-header" style={{ display: "flex", margin: "10px 0" }}>
                                            <div className="modal-img" style={{ width: "400px" }}>
                                                <img src={'https://skerio.uz/admin/images/news/' + value.image}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </div>
                                            <div className="first-title">
                                                <h2
                                                    style={{ width: "300px", marginLeft: "20px", fontSize: "25px", fontWeight: "600" }}
                                                >{value.title_en}</h2>
                                            </div>
                                        </div>
                                        <div className="body">
                                            <p style={{}}>
                                                {value.description_en}
                                            </p>
                                        </div>
                                    </Box>
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Brands />
                <Footer />
            </div>
        </section >
    )
}