import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Swiper, SwiperSlide } from "swiper/react";
import UserContext from "../../../context/userContext";
import { Pagination } from "swiper";
import { loadCurrentItem, addToCart } from "../../../redux/Shopping/shopping-actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/bundle';
import "./funstore.scss";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init(1000);

const FunStore = function ({ addToCart, loadCurrentItem }) {

  const userCtx = useContext(UserContext);
  const { sportTypeId } = userCtx;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`https://skerio.uz/api/product/${sportTypeId}`).then((res) => {
      setData(res.data.data);
    });
  }, [sportTypeId]);
  const { t } = useTranslation();

  const [like, setLike] = useState(true);
  const getLike = function () {
    setLike(like === false ? true : false);
    if (!like) return;
  };

  const [login, setLogin] = useState("");
  const myToken = window.localStorage.getItem('token');

  const checkIfLoggedIn = function () {
    if (myToken) {
      setLogin(addToCart(data.id));
    } else {
      setLogin(login(`<Link to="/login"></Link>`))
    }
  }

  return (
    <section id="store">
      <div className="store-title">
        <h2>{t("funstore")}</h2>
      </div>
      <div className="cards">
        <Swiper style={{
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
              slidesPerView: 6,
              spaceBetween: 40,
            }
          }}
          navigation={false}
          modules={[Pagination]}
          className="mySwiper"
        >
          {/* --cards-- */}
          {data?.filter(item => item.product_category === "FUTBOLKA").map((item, index) => (
            <SwiperSlide className="store-card" key={index} >
              <div className="card-top-icon" >
                <img src={'https://skerio.uz/admin/images/teams/' + item.team_id} />
                <FavoriteBorderIcon onClick={getLike} className={`liked ${like ? 'unliked' : ''}`} />
                <div className="discount">
                  <p>{item.discount}%</p>
                </div>
              </div>
              <Link to={`/shop/viewfull/${item.id}`}>
                <div className="card-img" onClick={() => loadCurrentItem(item)}>
                  <img src={'https://skerio.uz/admin/images/products/' + item.image} />
                </div>
              </Link>
              <div className="card-footer">
                <div className="club-name">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                  <AddShoppingCartIcon onClick={checkIfLoggedIn} style={{ color: 'white' }} />
              </div>
            </SwiperSlide>
          ))}
          {/* --cards-- */}
        </Swiper>
      </div>
    </section>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(FunStore);