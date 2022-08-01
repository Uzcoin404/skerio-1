import React, { useState, useEffect } from "react";
import axios from "axios";
import './wishlist.scss';
import realMadridPicture from "../../img/barcelona-shirt.png";
import realMadridIcon from "../../icons/Real-madrid-icon.png";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function WishList() {

  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios.get("https://skerio.uz/api/shoplikes").then((res) => {
        setData(res.data.data);
      })
    } catch (err) {
      console.error(err);
    }
  }, []);
  console.log(data);

  return (
    <section id="wishlist">
      <div className="wrapper">
        <div className="cart-wrapper">
          <div className="cart-itself">
            <div className="cart-icons">
              <div className="icon">
                <img src={realMadridIcon} alt="" />
              </div>
              <div className="like-btn">
                <FavoriteIcon className="favorite-icon" />
              </div>
            </div>
            <div className="cart-body">
              <div className="cart-img">
                <img src={realMadridPicture} alt="" />
              </div>
            </div>
            <div className="cart-footer">
              <div className="up">
                <div className="name">
                  <p>Barcelona T-shirt</p>
                </div>
                <div className="busket-icon">
                  <p>225,000</p>
                </div>
              </div>
              <div className="down">
                <AddShoppingCartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}
