import Nav from "../Nav/Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Keyboard, Pagination, Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import CardImg2 from "../../img/CardImg2.png";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SortIcon from '@mui/icons-material/Sort';
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";
import UserContext from '../../context/userContext';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./areas.scss";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init(1000);

export default function Areas() {
  const { t } = useTranslation();

  const userCtx = useContext(UserContext);
  const { sportTypeId } = userCtx;

  const [data, setData] = useState([]);
  const [search1, setSearch1] = useState("");

  useEffect(() => {
    axios
      .get(`https://skerio.uz/api/complexCategory/${sportTypeId}`)
      .then((res) => {
        setData(res.data.data)
        setData2(res.data.data)
        setRegion(res.data.data)
        setPosition(res.data.data)
      })
      .catch((err) => console.error(err))
  }, [sportTypeId]);

  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [areaId, setareaId] = useState("")
  const [position, setPosition] = useState([])

  const Form = new FormData();
  const getCurrentLocation = function () {
    axios.get("https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1").then(res => {
      setLocation(res.data);
      setLat(Number(res.data.latitude))
      setLong(Number(res.data.longitude))
      setareaId(Number(data.id));
      Form.append("lat", lat);
      Form.append("lng", long);
      Form.append("myId", areaId);
      postLocation()
    })
  }

  const postLocation = function () {
    axios.post("https://skerio.uz/api/complexFind", Form)
      .then(res => setPosition(res.data))
      .catch(err => console.error(err.response))
  }

  const keys = [
    "name",
    "description_uz",
    "description_ru",
    "description_en",
    "area",
    "price",
    "address",
    "phone",
    "sport_category"
  ];

  const [region, setRegion] = useState([]);
  const [data2, setData2] = useState([]);
  const [hasRegion, setHasRegion] = useState("");

  const regionFilter = function (e) {
    const filtered = data2.filter(item => {
      if (e === "") {
        return item;
      } else if (item.area === e) {
        return item.area === e;
      } else if (item.area === "") {
        setHasRegion("Xech qanday ma'lumot topilmadi");
      }
    });
    setRegion(filtered);
    setPosition(filtered);
  }

  const searchHandle = function (data) {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search1))
    );
  };

  const data1 = searchHandle(region);
  const [getState, setGetState] = useState(false);

  const getStateWithBtns = function (btn) {
    if (btn === "andijon") {
      setGetState(!getState);
    } else {
      setGetState(false);
    }
  }

  console.log(position);

  return (
    <>
      <section id="areas">
        <div>
          <Nav />
        </div>
        <div className="areas-wrapper">
          <div className="title-buttons">
            <div className="states">
              <label htmlFor=""><SortIcon /></label>
              <select onChange={e => getStateWithBtns(e.target.value)}>
                <option selected value="">{t("state")}</option>
                <option value="andijon">Andijon </option>
                <option value="Buxoro">Buxoro</option>
                <option value="asaka tumani">Fargʻona</option>
                <option value="boston tumani">Jizzax</option>
                <option value="buloqboshi tumani">Urganch</option>
                <option value="izboskan tumani">Namangan</option>
                <option value="izboskan tumani">Navoiy</option>
                <option value="izboskan tumani">Qarshi</option>
                <option value="izboskan tumani">Nukus</option>
                <option value="izboskan tumani">Samarqand</option>
                <option value="izboskan tumani">Guliston</option>
                <option value="izboskan tumani">Termiz</option>
              </select>
            </div>
            <div className="region">
              <select name="region" className={getState ? "active-state" : "state"}
                onChange={(e) => regionFilter(e.target.value)} id="region">
                <option selected value="">{t("city")}</option>
                <option value="Andijon shahar">Andijon Sh</option>
                <option value="Andijon tumani">Andijon T</option>
                <option value="Asaka tumani">Asaka T</option>
                <option value="Baliqchi tumani">Baliqchi T</option>
                <option value="Buloqboshi tumani">Buloqboshi T</option>
                <option value="Bo'ston tumani">Bo'ston T</option>
                <option value="Izboskan tumani">Izbosgan T</option>
                <option value="Jalaquduq tumani">Jalaquduq T</option>
                <option value="Xo'jaobod tumani">Xo'jaobod T</option>
                <option value="Qorgontepa tumsni">Qo'rgontepa T</option>
                <option value="Marhamat tumani">Marhamat T</option>
                <option value="Oltinkol tumani">Oltinko'l T</option>
                <option value="Paumanixtaobod t">Paxtaobod T</option>
                <option value="Shaxrixon tumani">Shaxrixon T</option>
                <option value="Ulugnor tumani">Ulug'nor T</option>
                <option value="Madaniyat tumani">Madaniyat T</option>
              </select>
            </div>
            <div className="location">
              <LocationOnIcon className="location-icon" onClick={getCurrentLocation} />
            </div>
            <div class="box">
              <form name="search">
                <input
                  type="text"
                  class="input"
                  name="txt"
                  onmouseout="this.value = ''; this.blur();"
                  onChange={(e) => setSearch1(e.target.value)}
                  placeholder={t("search")}
                />
              </form>
              <i class="fas fa-search"></i>
            </div>
          </div>
          {/* --main areas-- */}
          <h1
            style={{ position: "absolute", top: "40%", left: "40%", fontSize: "24px", fontWeight: 700 }}
          >{hasRegion}</h1>
          <div className="main-cards">
            {/* ---card--- */}
            {data1?.map((item) => (
              <div className="areas-cards" data-aos="fade-left" key={item.id}>
                <div className="card-img">
                  <Swiper
                    style={{
                      "--swiper-pagination-color": "#fff",
                      "--swiper-navigation-color": "#ffff",
                    }}
                    slidesPerView={1}
                    spaceBetween={30}
                    keyboard={{
                      enabled: true,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Keyboard, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        src={
                          "https://skerio.uz/admin/images/complexes/" + item.image
                        }
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={CardImg2} />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="card-information">
                  <div className="card-title">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="others">
                    <div className="left">
                      <p>
                        <LocalOfferIcon /> {item.price} {t('hours')}
                      </p>
                      <p>
                        <LocalPhoneIcon /> {item.phone}
                      </p>
                      <p>
                        <LocationOnIcon /> {item.address}
                      </p>
                    </div>
                    <div className="right">
                      <p>
                        <MeetingRoomIcon /> {t('dressrooms')}: {item.dress_room}
                      </p>
                      <p>
                        <AddLocationAltIcon />{" "}
                        <a href={item.location}> {t('location')}: </a>
                      </p>
                      <p>
                        <FastfoodIcon /> {t('food')} : {item.food}.
                      </p>
                    </div>
                  </div>
                  <div className="buttons">
                    <Link to={"/areas/mapping/" + item.id}>
                      <button> {t('contactArea')} </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* mapping */}
          </div>
        </div>
      </section>
      <div>
        <Brands />
        <Footer />
      </div>
    </>
  );
}