import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";
import { useTranslation } from 'react-i18next';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from "react-router-dom";
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import { LanguageContext } from "../../lanContext"
import "./newsfull.scss";

export default function Newsfull() {

    const { t } = useTranslation();

    const { id } = useParams();

    const [data, setData] = useState({});

    const singleNews = useContext(LanguageContext);

    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/news/' + id)
                .then(function (response) {
                    setData(response.data)
                    console.log(response.data.data)
                })
        } catch (err) {
            console.error(err);
        }
    }, [id]);

    const history = useNavigate();

    const handleBack = function () {
        history(-1);
    }

    console.log(singleNews);

    return (
        <section id="full-news">
            <Nav />
            <div className="full-wrapper">
                <div className="back" onClick={handleBack}>
                    <h2><KeyboardArrowLeftIcon />  {t("back")}</h2>
                </div>
                <div className="header">
                    <div className="news-img">
                        <img src={'https://skerio.uz/admin/images/news/' + data.image} alt="" />
                    </div>
                    <div className="news-title">
                        <div className="news-continent">
                            <p><SouthAmericaIcon style={{ fontSize: "2rem", color: "#bf0000" }} />   {data.continent_id}</p>
                        </div>
                        <h2>{data?.singleNews === 'uz' ? data.title_uz : singleNews === 'eng' ? data.title_en : data.title_ru}</h2>
                    </div>
                </div>
                <div className="footer">
                    <div className="description">
                        <p>{data?.singleNews === 'uz' ? data.description_uz : singleNews === 'eng' ? data.description_en : data.description_ru}</p>
                    </div>
                </div>
            </div>
            <Brands />
            <Footer />
        </section>
    )
}