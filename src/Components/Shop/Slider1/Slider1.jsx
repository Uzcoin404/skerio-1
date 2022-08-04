import Slider from "react-slick";
import './slider1.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Slider1() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    };


    return (
        <section id="slider1">
            <Slider {...settings}>
                <div class="slider2">
                </div>
                <div class="slider3">
                </div>
                <div class="slider4">
                </div>
                <div class="slider5">
                </div>
                <div class="slider6">
                </div>
                <div class="slider7">
                </div>
            </Slider>

        </section>
    )
}