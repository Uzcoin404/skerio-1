import img from "../../img/filter-img.png";
import DeleteIcon from '@mui/icons-material/Delete';
import "./wishlist.scss";
const data = [
    {
        id: 1,
        img: require("../../img/filter-img.png"),
        name: "Roma's accessories",
        price: 255.000
    },
    {
        id: 2,
        img: require("../../img/filter-img.png"),
        name: "Roma's accessories",
        price: 255.000
    },
    {
        id: 2,
        img: require("../../img/filter-img.png"),
        name: "Roma's accessories",
        price: 255.000
    },
]
export default function Wishlist() {
    return (
        <section id="wish">
            <div className="wish-title">
                <h2>Wishlist</h2>
            </div>
            <div className="wishlist-carts">
                {data.map((item, index) =>
                    <div className="wishlist-cart" key={index}>
                        <div className="cart-head">
                            <div className="img">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="desc">
                                <h2>{item.name}</h2>
                                <p>{item.price}</p>
                            </div>
                        </div>
                        <div className="delete">
                            <DeleteIcon className="delete-icon" />
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}