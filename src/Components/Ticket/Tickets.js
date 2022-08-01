import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import TicketsArea from "./TicketsArea";
import { useTranslation } from "react-i18next";
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";
import calendar from "../../img/calendar.png";
import barsa from "../../img/fcb.png";
import laliga from "../../img/laliga.png";
import cvf from "../../img/cvf.png";
import CountDown from "./Countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "./Tickets.sass";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

export default function Tickets() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [sector1, setSector1] = useState();
  let deadline = "July, 18, 2022";

  useEffect(() => {
    axios
      .get("https://skerio.uz/api/ltickets")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.error(err));
    axios
      .get("https://skerio.uz/api/stadiumsection")
      .then((res) => {
        setData2(res.data.data);
        setData3(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSector = function (btnId) {
    setSector1(btnId);
    const filtered = data3.filter((item) => item.sektor_name === btnId);
    setData2(filtered);
  };

  const [range, setRange] = useState(0);

  const componentWillMount = function (e) {
    setRange(e.target.value);
  };

  const [data5, setData5] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
    const filtered = data2.filter((item) => {
      if (range !== 0) {
        return item.price === range;
      } else if (range === 0) {
        return item;
      }
    });
    setData5(filtered);
  }, [data2, range]);

  return (
    <div id="Tickets">
      {/* Navbar */}
      <Nav />
      {/* Match body */}
      <div className="match">
        <div className="matchContent">
          <div className="laliga">
            <img src={laliga} className="laliga" alt="laliga" />
          </div>
          <div className="matchday">
            <span className="matchDay">Matchday 38 Camp Nou</span>
            <span className="day">SUN 22 MAY</span>
          </div>

          <div className="matchBody">
            <div className="barsa">
              <span>Barcelona</span>
              <img src={barsa} />
            </div>
            <div className="kickoff">
              <span>Kickoff CEST</span>
              <span className="kickofftime">22:00</span>
            </div>
            <span className="vs">VS</span>
            <div className="villareal">
              <img src={cvf} />
              <span>Villareal</span>
            </div>
          </div>
          <div className="countReverse">
            <span className="countTitle">{t("time")}</span>
            <div className="countRev">
              <span className="time">
                <CountDown deadline={deadline} />
              </span>
              <div className="day">
                <span className="dayText">{t("day")}</span>
                <span className="dayText">{t("hour")}</span>
                <span className="dayText">{t("minut")}</span>
                <span className="dayText">{t("sec")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tickets Album */}
      <div className="ticketsAlbum1">
        <Swiper
          style={{
            "--swiper-pagination-color": "#BF0000",
          }}
          slidesPerView={1}
          spaceBetween={10}
          slidesPerGroup={1}
          loop={false}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            430: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1500: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          navigation={false}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.map((post, index) => (
            <SwiperSlide className="store-card" key={index}>
              <div className="albumModal">
                <div className="albumCart">
                  <div className="albumImg">
                    <img
                      className="tick1"
                      src={
                        "https://skerio.uz/admin/images/tickets/" + post.image
                      }
                    />
                  </div>
                  <div className="albumContent">
                    <span className="albumTitle">
                      {post.team_1} VS {post.team_2}
                    </span>
                    <span className="albumAdress">{post.adress}</span>
                    <div className="albumDate">
                      <img src={calendar} className="calendarImg" alt="" />
                      <span className="albumTime">{post.time} </span> /
                      <span className="calendarDate"> {post.date}</span>
                    </div>
                    <Link to="/ticketsarea">
                      <button className="albumMoreBtn">{t("seeMore")}</button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="albumMore">
        <button className="seeMore">
          <Link to="/tickets/ticketsall">{t("seeMore")}</Link>
        </button>
      </div>
      <TicketsArea
        data={data5}
        sector={sector1}
        handleSector={handleSector}
        componentWillMount={componentWillMount}
        range={range}
      />
      <div>
        <Brands />
        <Footer />
      </div>
    </div>
  );
}
