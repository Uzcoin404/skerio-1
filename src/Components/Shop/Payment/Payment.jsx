import Nav from '../../Nav/Nav';
import { useEffect, useState } from "react"
import Paypal from '../../../logo/paypal.png';
import MasterCard from '../../../logo/master-card.png';
import Visa from '../../../logo/visa.png';
import Express from '../../../logo/express.png';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';
import './payment.scss';

function Payment({ cart }) {

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const { t } = useTranslation();

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

    return (
        <section id="payment">
            <div>
                <Nav />
            </div>
            <div className="payment-info">
                <div className="payment-left">
                    <div className="payment-title">
                        <h2>Payment Methord</h2>
                    </div>
                    <div className="payment-method">
                        <div className="paypal">
                            <img src={Paypal} />
                        </div>
                        <div className="paypal">
                            <img src={Visa} />
                        </div>
                        <div className="paypal">
                            <img src={MasterCard} />
                        </div>
                        <div className="paypal">
                            <img src={Express} />
                        </div>
                    </div>
                    <div className="payment-input">
                        <div className="input-title">
                            <h3>Billing Info</h3>
                        </div>
                        <div className="both">
                            <div className="left-input">
                                <div className="name">
                                    <label htmlFor="">Your Name <span>*</span></label> <br />
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <div className="name">
                                    <label htmlFor="">Billing adress <span>*</span></label> <br />
                                    <input type="text" placeholder="Oltin Ko'l str 14" />
                                </div>
                                <div className="d-flex">
                                    <div className="input-flex1">
                                        <label htmlFor="">City <span>*</span></label> <br />
                                        <input type="date" />
                                    </div>
                                    <div className="input-flex2" style={{ marginLeft: '10px' }}>
                                        <label htmlFor="">Postal Zip <span>*</span></label> <br />
                                        <input type="text" placeholder="000" />
                                    </div>
                                </div>
                                <div className="name">
                                    <label htmlFor="">Country <span>*</span></label> <br />
                                    <input type="country" placeholder="Uzbekistan" />
                                </div>
                                <button type="submit" className="submitted">Proceed</button> <br />
                                <Link to="/shop">
                                    <button>Back to shopping</button>
                                </Link>
                            </div>
                            <div className="right-input">
                                <div className="name">
                                    <label htmlFor="">Owner's Name <span>*</span></label> <br />
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <div className="name">
                                    <label htmlFor="">Card Number <span>*</span></label> <br />
                                    <input type="text" placeholder="1600 0000 0000 0000" />
                                </div>
                                <div className="d-flex">
                                    <div className="input-flex1">
                                        <label htmlFor="">City <span>*</span></label> <br />
                                        <input type="date" />
                                    </div>
                                    <div className="input-flex2" style={{ marginLeft: '10px' }}>
                                        <label htmlFor="">Exp Year <span>*</span></label> <br />
                                        <input type="number" placeholder="000" />
                                    </div>
                                </div>
                                <div className="name">
                                    <label htmlFor="">CVC number <span>*</span></label> <br />
                                    <input type="country" placeholder="468" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment-right">
                    <div className="tickets-box">
                        {cart.map(value =>
                            <div className="ticket-name">
                                <div className="left">
                                    <h2>{value.name}</h2>
                                    <p>{value.price}</p>
                                </div>
                                {/* <div className="right">
                                    <img src={'https://skerio.uz/admin/images/products/' + value.image} />
                                </div> */}
                                <hr />
                            </div>
                        )}
                    </div>
                    <div className="total">
                        <span>{t("all")}:({totalItems} {t("products")}): </span>
                        <span>sum {totalPrice}</span>
                    </div>
                </div>
            </div>


        </section>
    )
}
const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};
export default connect(mapStateToProps)(Payment);