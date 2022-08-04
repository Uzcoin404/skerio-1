import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './footer.scss';

export default function Footer() {

    const { t } = useTranslation();
    
    return (
        <section id="footer">
            <div className="dark-overlay">
                <div className="footer-wrapper">
                    <div className="footer1">
                        <div className="footer-title1">
                            <h2>{t("about")}</h2>
                        </div>
                        <div className="footer-desc">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna.
                            </p>
                        </div>
                        <div className="footer-icons">
                            <TelegramIcon className="telegram" style={{ color: 'white', fontSize: '2rem' }} />
                            <InstagramIcon className="instagram" style={{
                                color: 'white', fontSize: '2rem', marginLeft: '30px'
                            }} />
                            <FacebookIcon className="facebook" style={{ color: 'white', fontSize: '2rem', marginLeft: '30px' }} />
                        </div>
                    </div>
                    <div className="footer2">
                        <div className="footer-title2">
                            <h2>{t("menu")}</h2>
                        </div>
                        <ul>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/footballmenu">{t("home")}</Link>
                            </li>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/news">{t("news")}</Link>
                            </li>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/shop">{t("shop")}</Link>
                            </li>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/tickets">{t("table")}</Link>
                            </li>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/table">{t("tickets")}</Link>
                            </li>
                            <li className="toggle-item" activeClass="active">
                                <Link to="/areas">{t("areas")}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer3">
                        <div className="footer-title3">
                            <h2>{t("contact")}</h2>
                        </div>
                        <div className="contact">
                            <div className="contact-adress">
                                <p><LocationOnIcon />    203 Fake St. Mountain
                                    View, San Francisco,
                                    California, USA
                                </p>
                            </div>
                            <div className="contact-number">
                                <p><PhoneIcon />    +998 97 234 34 07 <br />
                                    +998 97 234 34 08</p>
                            </div>
                            <div className="contact-mail">
                                <p><EmailIcon />   abbosarabboyev9@gmail.com <br /> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="core-footer">
                <p> © Developed by Digital City 2022</p>
            </div>
        </section>
    )
}