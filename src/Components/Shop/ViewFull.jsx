import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./viewfull.scss";

function ViewFull({ current, addToCart, cart }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://skerio.uz/api/size").then((res) => {
      setData(res.data.data);
      setData1(res.data.data);
    }).catch((err) => console.error(err));
  }, []);

  const [data1, setData1] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredData = function (btnId) {
    setFilter(btnId);
    const filtered = data.filter((item) => item.letter_size === btnId);
    setData1(filtered);
  };

  const { t } = useTranslation();

  const [login, setLogin] = useState("/login");
  const myToken = window.localStorage.getItem('token');

  const [firstBtn, setFirstBtn] = useState(
    <>
      {t("addCart")} < AddShoppingCartIcon style={{ color: "#fff" }} />
    </>
  );

  const handleSubmit = function () {
    setFirstBtn(
      <>
        {t("added")} < AddShoppingCartIcon style={{ color: "#fff" }} />
      </>
    );

    const handleSetTime = setTimeout(() => {
      setFirstBtn(firstBtn);
    }, 3000);

    return handleSetTime;
  }

  const checkIfLoggedIn = function (e) {
    if (myToken) {
      setLogin(addToCart(e));
    } else {
      setLogin("/login")
    }
    return handleSubmit;
  }


  return (
    <section id="viewfull">
      <Nav />
      <div className="backtoshop">
        <Link to="/shop">
          <button>
            <ArrowBackIosIcon /> Back to Shop
          </button>
        </Link>
      </div>
      <div className="div-wrapper">
        <div className="big-image">
          <img
            src={"https://skerio.uz/admin/images/products/" + current.image}
          />
        </div>
        <div className="desc">
          <h2 className="chooseSize">{t("choose")}</h2>
          <div className="fullSize">
            {data.map((item) => (
              <div className="size">
                <p
                  style={{ marginLeft: "10px" }}
                  onClick={() => filteredData(item.letter_size)}
                  className={
                    item.letter_size === filter ? "activeSize" : "staticSize"
                  }
                >
                  {item.letter_size}
                </p>
              </div>
            ))}
          </div>
          <div className="product-detail">
            <h1>{t("productDetail")}</h1>
          </div>
          <div className="title">
            <h2>{current.name}</h2>
          </div>
          <div className="brand">
            <h2>{current.brand}</h2>
          </div>
          <div className="price">
            <p>
              {t("price")}:  {current.price} sum
            </p>
          </div>
          <div className="description">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut sequi
              a unde hic nostrum fugiat tempora sed quisquam, reprehenderit
              rerum perferendis dignissimos blanditiis eveniet ipsum?
            </p>
          </div>
          <div className="addToCart">
            <button onClick={() => checkIfLoggedIn(current.id)}>
              {firstBtn}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section >
  );
}
const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFull);