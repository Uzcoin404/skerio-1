import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import CartItem from "./CartItem/CartItem"
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './cart.scss';

const Cart = ({ cart }) => {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const history = useNavigate();

  function handleSubmit() {
    history(-1);
  }

  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const { t } = useTranslation();

  return (
    <div className="first-cart">
      <Nav />
      <div className="cart">
        <div className="cart__items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="cart__summary">
          <h4 className="summary__title">{t("summary")}</h4>
          <div className="summary__price">
            <span>{t("all")}:({totalItems} {t("products")}): </span>
            <span>sum {totalPrice}</span>
          </div>

          <button onClick={handleSubmit} className="backto">< ArrowBackIosIcon /> {t("back")}</button>

          <Link to="/shop/cart/payment">
            <button className="summary__checkoutBtn">
              {t("checkout")}
            </button>
          </Link>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};
export default connect(mapStateToProps)(Cart);
