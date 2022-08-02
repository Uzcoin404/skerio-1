import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import UserContext from '../../context/userContext'
import i18next from "i18next";
import Divider from '@mui/material/Divider';
import './nav.scss';

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

export default function Nav() {

    const userCtx = useContext(UserContext);
    const { changeSportTypeId } = userCtx;

    const handleSportId = async function (item) {
        changeSportTypeId(item.id);
    }

    const [toggleMenu, setToggleMenu] = useState(true);

    const changeMenu = function () {
        setToggleMenu(toggleMenu === false ? true : false);
    }

    const { t } = useTranslation();

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("https://skerio.uz/api/sportcategory").then((res) => {
            setData(res.data.data);
        }).catch((err) => console.error(err));
    }, []);

    const myId = window.localStorage.getItem("token");

    const [loginBtn, setLoginBtn] = useState(t("login"));
    const [loginStyle, setLoginStyle] = useState(false);
    const [linkTo, setLinkTo] = useState("/login");

    useEffect(() => {
        if (myId) {
            setLoginBtn(``);
            setLoginStyle(myId);
            setLinkTo("/cabinet");
        } else {
            setLoginBtn(loginBtn);
            setLinkTo(linkTo)
        }
    }, [myId, loginBtn, linkTo]);

    return (
        <section id="nav">
            <nav>
                <div className="logo">
                    <NavLink to="/">{t("skerio")}</NavLink>
                </div>
                <div className="closeMenu">
                    <CloseIcon onClick={changeMenu} className="closeIcon" />
                </div>
                <div className={`toggle-menu ${toggleMenu ? "is-expended" : ""}`}>
                    <ul className="toggle-toggle">
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/">{t("home")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/news">{t("news")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/shop">{t("shop")}</NavLink>
                        </li>
                        {/* <li className="toggle-item" activeClass="active">
                            <NavLink to="/tickets">{t("tickets")}</NavLink>
                        </li> */}
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/table">{t("table")}</NavLink>
                        </li>
                        <li className="toggle-item" activeClass="active">
                            <NavLink to="/areas">{t("areas")}</NavLink>
                        </li>
                    </ul>
                    <div className="sport">
                        <div class="dropdown">
                            <button class="dropbtn">{t('sport')}  <KeyboardArrowDownIcon /></button>
                            <div class="dropdown-content">
                                {data.map(item =>
                                    <>
                                        <button
                                            style={{ width: "100%", textAlign: "start" }}
                                            className="a" onClick={() => handleSportId(item)}>
                                            {item.sport_name_en}
                                            <Divider />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="language">
                        <div class="dropdown">
                            <span><LanguageIcon /> {t("language")}  <KeyboardArrowDownIcon /></span>
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
                        <Link to={linkTo}>
                            <button
                                className={loginStyle ? "myprofile" : "button"}
                            >
                                <div className="icons">
                                </div>
                                {loginBtn}
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="hamburger">
                <MenuIcon onClick={changeMenu} />
            </div>
        </section>
    )
}