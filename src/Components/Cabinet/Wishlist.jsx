import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import jwt_decode from "jwt-decode";
import "./wishlist.scss";

export default function Wishlist() {

    const [user, setUser] = useState([]);

    const getMyID = window.localStorage.getItem("token") !== null ? localStorage.getItem("token") : null;
    const decoded = getMyID === null ? 0 : jwt_decode(getMyID);
    const myID = decoded.sub;

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${getMyID}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("https://skerio.uz/api/shoplikes", requestOptions)
            .then(res => res.text())
            .then((res) => {
                let a = JSON.parse(res)
                setUser(a);
            })
            .catch(error => console.log('error', error));
    }, [getMyID]);

    // ------- removelike -------

    console.log(user)

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${getMyID}`);

    const [render, setrender] = useState(false);

    const likeButtonComponent = function (newsid, btnId) {
        var formdata = new FormData();
        formdata.append("user_id", btnId);
        formdata.append("product_id", newsid);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://skerio.uz/api/shoplike", requestOptions)
            .then(res => res.text())
            .then((res) => {
                setrender(res);
                console.log(res)
            })
            .catch(error => console.log('error', error));
        return user;

    }

    console.log(user);

    return (
        <section id="wish">
            <div className="wish-title">
                <h2>Wishlist</h2>
            </div>
            <div className="wishlist-carts">
                {user.map((item, index) =>
                    <div className="wishlist-cart" key={index}>
                        <div className="cart-head">
                            <div className="img">
                                <img src={'https://skerio.uz/admin/images/products/' + item.image} alt="" />
                            </div>
                            <div className="desc">
                                <h2>{item.name}</h2>
                                <p>{item.price} Sum</p>
                            </div>
                        </div>
                        <div className="delete" onClick={() => likeButtonComponent(item.id, myID)}>
                            <DeleteIcon className="delete-icon" />
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}