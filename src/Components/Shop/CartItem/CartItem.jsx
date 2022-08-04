import React, { useState } from "react";
import { connect } from "react-redux";
import { adjustItemQty, removeFromCart } from "../../../redux/Shopping/shopping-actions";
import DeleteIcon from '@mui/icons-material/Delete';
import "./cartitem.scss";

const CartItem = ({ item, adjustQty, removeFromCart }) => {
    
    const [input, setInput] = useState(item.qty);

    const onChangeHandler = (e) => {
        setInput(e.target.value);
        adjustQty(item.id, e.target.value);
    };

    return (
        <div className="cartItem">
            <img className="cartItem__image" src={'https://skerio.uz/admin/images/products/' + item.image} />
            <div className="card-body">
                <div className="cartItem__details">
                    <p className="details__title">{item.name}</p>
                    <p className="details__desc">{item.description_uz}</p>
                    <p className="details__price">$ {item.price}</p>
                </div>
                <div className="cartItem__actions">
                    <div className="cartItem__qty">
                        <label htmlFor="qty">Soni</label>
                        <input min="1" type="number" id="qty"
                          name="qty" value={input} onChange={onChangeHandler}
                        />
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                        className="actions__deleteItemBtn">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
        removeFromCart: (id) => dispatch(removeFromCart(id)),
    };
};
export default connect(null, mapDispatchToProps)(CartItem);
