import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import featuredVideo1 from '../../../img/featured-video1.jpg';
import featuredVideo2 from '../../../img/featured-video2.jpg';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import AOS from 'aos';
import './featured.scss';
import 'aos/dist/aos.css';
AOS.init(1000);

export default function FeaturedVideo() {
    const [initImg, setInitImg] = useState(true);

    const setImage = function () {
        setInitImg(initImg === false ? true : false);
    }

    const { t } = useTranslation();

    return (
        <div className='featured' data-aos="fade-right" >
            <div className='featured-left' data-aos="fade-right" >
                <div className="featured-title">
                    <h2>{t("featuredvideo")}</h2>
                </div>
                <div className="featured-describtion">
                    <div className="featured-image" >
                        <div className="image">
                            <img src={featuredVideo1} />
                        </div>
                        <div className="footer-desc">
                            <h4>How is liverpool is preparting for the final ?</h4>
                            <div className="video-icon">
                                <p><SlowMotionVideoIcon style={{ color: 'white', fontSize: '1.5rem' }} />{t("watchvideo")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="featured-image mt">
                        <div className="image">
                            <img src={featuredVideo2} />
                        </div>
                        <div className="footer-desc">
                            <h4>How is liverpool is preparting for the final ?</h4>
                            <div className="video-icon">
                                <p><SlowMotionVideoIcon style={{ color: 'white', fontSize: '1.5rem' }} />  {t("watchvideo")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='featured-right' data-aos="fade-right" >
                <div className="wrapper">
                    <div className="wrapper-img"></div>
                    <div className="featured-buttons">
                        <button className="previus" onClick={setImage}><KeyboardBackspaceIcon style={{ fontSize: '2.2rem', color: '#f8f8f8' }} /></button>
                        <button className="next" onClick={setImage}><ArrowRightAltIcon style={{ color: 'white', fontSize: '3rem', marginLeft: '10px' }} /></button>
                    </div>
                    <div className={`wrapper1 ${initImg ? "wrapper2" : "wrapper3"}`}>
                        <h2>Jurgen Klopp spoke about the final and expressed strong confidence in Liverpool</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
