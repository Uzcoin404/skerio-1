import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import './mainnav.scss';

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

export default function NavbarMain() {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const handleOpenMenu = function () {
        setOpen(open === false ? true : false);
    }
    const getMyID = window.localStorage.getItem("token");

    console.log(getMyID);

    const [firstBtn, setFirstBtn] = useState(t("login"));
    const [loginStyle, setLoginStyle] = useState(false);
    const [linkTo, setLinkTo] = useState("/login");

    useEffect(() => {
        if (getMyID) {
            setFirstBtn('');
            setLoginStyle(getMyID);
            setLinkTo("/cabinet");
        } else {
            setFirstBtn(firstBtn);
        }
    }, [firstBtn, getMyID]);

    return (
        <section id="navbarmain">
            <div className="nav-wrapper">
                <div className="logo">
                    <h2>{t("skerio")}</h2>
                </div>
                <div className="hamburger" onClick={handleOpenMenu}>
                    <MenuIcon className="hamburger-icon" />
                </div>
                <div className={open === false ? "navbar-nav" : "navbar-active"}>
                    <div className="close" onClick={handleOpenMenu}>
                        <CloseIcon className="close-icon" />
                    </div>
                    <div className="sports">
                        <div className="navigateBtn">
                            <Link to="/footballmenu">
                                <button>{t("discover")}  <DoubleArrowIcon /></button>
                            </Link>
                        </div>
                    </div>
                    <div className="languages">
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
                        {/* <Link to="/create">
                            <button> <ExitToAppIcon /> {firstBtn}</button>
                        </Link> */}
                        <div className="login">
                            <Link to={linkTo}>
                                <button
                                    className={loginStyle ? "myprofile" : ""}
                                >
                                    <div className="icons">
                                    </div>
                                    {firstBtn}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}