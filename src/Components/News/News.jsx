import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Nav from '../Nav/Nav';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer';
import { RWebShare } from "react-web-share";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from "react-router-dom";
import { Box, Modal } from '@mui/material';
import jwt_decode from "jwt-decode";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { LanguageContext } from "../../lanContext"
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

    const singleNews = useContext(LanguageContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buttons = [
        {
            name_uz: "Hammasi",
            name_ru: "Все",
            name_en: "All",
            categ: '',
            id: 10
        },
        {
            name_uz: 'Osiyo',
            name_ru: 'Азия',
            name_en: 'Asia',
            categ: 'asia',
            id: 11
        },
        {
            name_uz: 'Yevropa',
            name_ru: 'Европа',
            name_en: 'Europe',
            categ: 'europe',
            id: 12
        }
    ];

    const btns = [
        {
            icons: <ThumbUpIcon />
        }
    ];

    const token = localStorage.getItem('token');
    const decode = token === null ? 0 : jwt_decode(token);
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
    const [firstDate, setFirstData] = useState([]);
    const [popularNews, setPopularNews] = useState(0);
    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/likenews').then((res) => {
                setPopular(res.data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/news').then((res) => {
                setData(res.data.data);
                setData1(res.data.data);
                setFirstData(res.data.data);
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
        const filtered = firstDate.filter(value => {
            if (value.continent_id === item) {
                return value.continent_id === item;
            } else if (item === "") {
                return value;
            }
        });
        setData(filtered);
    }

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
                            {singleNews === 'uz' ? btn.name_uz : singleNews !== 'eng' ? btn.name_ru : btn.name_en}
                        </button>
                    )}
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
                                    <p>{t('exclusive')}</p>
                                </div>
                                <div className="card-info">
                                    <h2>{singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru}</h2>
                                    <p>
                                        {singleNews === 'uz' ? value.description_uz : singleNews === 'eng' ? value.description_en : value.description_ru.length > 200 ?
                                            `${singleNews === 'uz' ? value.description_uz : singleNews === 'eng' ? value.description_en : value.description_ru.substring(0, 200)} ...` : singleNews === 'uz' ? value.description_uz : singleNews === 'eng' ? value.description_en : value.description_ru
                                        }
                                        {singleNews}
                                    </p>
                                    <button className="learn-more" onClick={handleOpen}
                                    >
                                        {t("seeMore")}
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
                        {data.map(value =>
                            <div className="card" data-aos="fade-right">
                                <div className="card-img">
                                    <img src={'https://skerio.uz/admin/images/news/' + value.image} />
                                </div>
                                <div className="card-desc">
                                    <div className="card-date">
                                        <h5><CalendarMonthIcon /> {value.created_at}</h5>
                                    </div>
                                    <Link to={"/news/fullnews/" + value.id}>
                                        <div className="card-info">
                                            <h2>{singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru} <ChevronRightIcon /> </h2>
                                        </div>
                                    </Link>
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
                                popular.map((value, index) => {
                                    return (
                                        // <>
                                        <Link to={"/news/fullnews/" + value.id}>
                                            <div className="news">
                                                <p><span>{index + 1}</span> {singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru}  <ChevronRightIcon /></p>
                                                <h5>{value.created_at}</h5>
                                            </div>
                                        </Link>
                                        // </>
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
                                    <Link to={"/news/fullnews/" + value.id}>
                                        <div className="card-info">
                                            <h2>
                                                {singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru.length > 40 ?
                                                    `${singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru.substring(0, 57)} ...` : singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru
                                                }  <ChevronRightIcon />
                                            </h2>
                                        </div>
                                    </Link>
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
                                                >{singleNews === 'uz' ? value.title_uz : singleNews === 'eng' ? value.title_en : value.title_ru}</h2>
                                            </div>
                                        </div>
                                        <div className="body">
                                            <p style={{}}>
                                                {singleNews === 'uz' ? value.description_uz : singleNews === 'eng' ? value.description_en : value.description_ru}
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