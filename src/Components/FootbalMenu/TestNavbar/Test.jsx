import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../../../context/userContext';
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import './test.scss';


const language = [
    {
        code: "uz",
        name: "Uzb",
        country: "uz",
    },
    {
        code: "ru",
        name: "Rus",
        country: "ru",
    },
    {
        code: "eng",
        name: "Eng",
        country: "gb",
    }
];

export default function Test() {

    const [toggleMenu, setToggleMenu] = useState(true);
    const changeMenu = function () {
        setToggleMenu(toggleMenu === false ? true : false);
    }
    const { t } = useTranslation();

    const userCtx = useContext(UserContext);
    const { changeSportTypeId } = userCtx;

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://skerio.uz/api/sportcategory").then((res) => {
            setData(res.data.data);
        })
    }, []);


    const handleSportId = async function (item) {
        changeSportTypeId(item.id);
    }

    const myId = window.localStorage.getItem("token");

    const [loginBtn, setLoginBtn] = useState(t("login"));
    const [loginStyle, setLoginStyle] = useState(false);
    const [linkTo, setLinkTo] = useState("/login");

    useEffect(() => {
        if (myId) {
            setLoginBtn(``);
            setLoginStyle(myId);
            setLinkTo("/myprofile");
        } else {
            setLoginBtn(loginBtn);
            setLinkTo(linkTo)
        }
    }, [myId, loginBtn, linkTo]);

    return (
        <section className="header">
            <nav>
                <div className="logo">
                    <NavLink to="/">{t("skerio")}</NavLink>
                </div>

                <div className={`toggle-menu ${toggleMenu ? "is-expended" : ""}`}>
                    <div className="closeMenu">
                        <CloseIcon onClick={changeMenu} style={{ color: 'white', }} />
                    </div>
                    <ul className="toggle-toggle">
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/footballmenu">{t("home")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/news">{t("news")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/shop">{t("shop")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/tickets">{t("tickets")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/table">{t("table")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/areas">{t("areas")}</NavLink>
                        </li>
                    </ul>
                    <div className="sport">
                        <div class="dropdown">
                            <button class="dropbtn" >
                                {t('sport')}   <KeyboardArrowDownIcon />
                            </button>
                            <div class="dropdown-content">
                                {data.map(item =>
                                    <button className="a" onClick={() => handleSportId(item)}>
                                        {item.sport_name_en}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="language">
                        <div class="dropdown">
                            <button class="dropbtn"><LanguageIcon />{t("language")}    <KeyboardArrowDownIcon /></button>
                            <div class="dropdown-content">
                                {language.map(({ code, name, country }) => (
                                    <button onClick={() => i18next.changeLanguage(code)}>
                                        <i className={`flag-icon flag-icon-${country}`}></i>
                                        &nbsp; {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="login">
                        <button
                            className={loginStyle ? "myprofile" : "button"}
                        >
                            <div className="icons">
                            </div>
                            <Link to={linkTo}>
                                {loginBtn}
                            </Link>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="hamburger">
                <MenuIcon onClick={changeMenu} style={{ color: 'white' }} />
            </div>
            {/* main page */}
            <div className="main-page">
                <div className="main-title">
                    <h1>{t("title")}</h1>
                </div>
                <div className="main-desc">
                    <p>“{t("desc")}” <br />

                        Maykl Jordan</p>
                </div>
            </div>
            <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
    )
}