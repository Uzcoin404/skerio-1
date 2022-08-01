import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ScaleLoader from "react-spinners/ScaleLoader";
import Cookies from 'universal-cookie';
import CookieConsent from 'react-cookie-consent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './header.scss';
AOS.init(1000);

const override = `
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 45%;
  left: 45%;
  transition: translate: (-50% -50%);
  margin: 26px;
  height: 65px;
`;

export default function Header(){

    const cookies = new Cookies();
    cookies.set('myCat', 'Pacman', { path: '/' });

    const [loading, setloading] = useState(false);

    const [data, setData] = useState([]);
    let [color, setColor] = useState("#D0021B");

    useEffect(() => {
        try {
            axios.get('https://skerio.uz/api/home').then((res) => {
                setData(res.data.data);
            })
        } catch (err) {
            console.error(err);
        }
    }, []);

    const [toggleState, setToggleState] = useState(true);

    const toggle = () => {
        setToggleState(toggleState === false ? true : false);
    };

    return (
        <div>
            {
                loading ?
                    <ScaleLoader color={color} loading={loading} css={override} size={150} />
                    :
                    <header>
                        <div className="img"></div>
                        <nav data-aos="fade-down" data-aos-offset="200">
                            <div className="logo">
                                <a href="/" className="navbar-brand">Skerio</a>
                            </div>
                            <div className="hamburger">
                                <MenuIcon className="hamburger-menu" onClick={toggle}></MenuIcon>
                            </div>
                            <div className={`collapsed ${toggleState ? "is-expanded" : ""}`}>
                                < CloseIcon className="closeIcon" onClick={toggle} />
                                <div className="sport">
                                    <div class="dropdown">
                                        <span>Sport  <ArrowDropDownIcon /></span>
                                        <div class="dropdown-content">
                                            <Link to="/footballmenu">
                                                <h4 >Football</h4>
                                            </Link>
                                            <h4>{ }</h4>
                                            <h4>{ }</h4>
                                            <h4>{ }</h4>
                                            <h4>{ }</h4>
                                            <h4>{ }</h4>
                                        </div>
                                    </div>
                                </div>
                                {/* {data.map(value =>
                                    <div className="language">
                                        <div class="dropdown">
                                            <span>Language  <ArrowDropDownIcon /></span>
                                            <div class="dropdown-content">
                                                <button>{value.translations[0].locale}</button>
                                                <button>{value.translations[1].locale}</button>
                                                <button>{value.translations[2].locale}</button>
                                            </div>
                                        </div>
                                    </div>
                                )} */}
                                <button className="log-in"><Link to="/create">Create Account</Link></button>
                            </div>
                        </nav>
                        <div className="hero-bg" data-aos="fade-up" >
                            {data.map(value =>
                                <h1>{value.title_uz}</h1>
                            )}
                            {data.map(value =>
                                <p>{value.description_en}</p>
                            )}
                        </div>
                        <CookieConsent enableDeclineButton flipButtons debug={true} style={{ backgroundColor: 'white', fontSize: "14px", lineHeight: "18px", color: 'black', padding: '0 30px' }} buttonStyle={{ backgroundColor: 'rgb(0, 94, 177)', color: '#fff' }} buttonText='Accept' expires={365} overlay={true}>
                            <span style={{ fontSize: "18px", fontWeight: '500' }}>Cookie</span>
                            <p stytle={{ padding: '0 30px' }}>We and our third-party partners use cookies on our site to offer you a better browsing experience, analyse site traffic and serve personalised content as detailed in our Cookie Policy. If you select ‘Accept’, you consent to our use of cookies. To disable cookies, select ‘decline‘</p>
                        </CookieConsent>

                    </header>
            }

        </div>
    )
}
