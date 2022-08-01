import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer';
import ShopCard from '../Shop/ShopCard/ShopCard';
import Slider1 from '../Shop/Slider1/Slider1';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import UserContext from '../../context/userContext';
import Badge from '@mui/material/Badge';
import './shop.scss';

function Shop({ cart }) {

    const { t } = useTranslation();
    const userCtx = useContext(UserContext);
    const { sportTypeId } = userCtx;
    const filterBtns = [
        {
            id: 1,
            name: 'ALL',
            categoryBtn: ""
        },
        {
            id: 2,
            name: 'T-shirts',
            categoryBtn: 'FUTBOLKA'
        },
        {
            id: 3,
            name: 'Shorts',
            categoryBtn: 'SHORTIK'
        },
        {
            id: 4,
            name: 'Balls',
            categoryBtn: 'SPORT MOLLARI'
        },
        {
            id: 5,
            name: 'Caps',
            categoryBtn: "AKSESUAR"
        },
        {
            id: 5,
            name: 'Bags',
            categoryBtn: "SUMKALAR"
        },
    ];
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [category, setCategory] = useState(filterBtns[0].categoryBtn);
    const dispatch = useDispatch();
    const [cartCount, setCartCount] = useState(0);
    let count = 0;
    const [axiosErr, setAxiosErr] = useState("");


    useEffect(() => {
        axios.get(`https://skerio.uz/api/product/${sportTypeId}`).then(res => {
            setData(res.data.data);
            dispatch({ type: 'Add_to_products', payload: res.data.data });
            setData2(res.data.data);
        }).catch((err) => {
            setAxiosErr("Error: " + err.message)
        });
    }, [dispatch, sportTypeId, cart]);

    useEffect(() => {
        cart.forEach((item) => (
            count += item.qty
        ))
        setCartCount(count);
    }, [cart, cartCount]);

    const filterBtnHandler = function (btnId) {
        setCategory(btnId);
        const filtered = data2.filter(item => {
            if (item.product_category === btnId) {
                return item.product_category === btnId
            } else if (btnId === "") {
                return item;
            }
        });
        setData(filtered);
    }
    const [search1, setSearch1] = useState('');
    const searching = function (data) {
        return data.filter((item) =>
            item.name.toLowerCase().includes(search1)
        )
    }

    return (
        <section >
            <div>
                <Nav />
            </div>
            <div id="shop">
                <div className="shop-header-img">
                    <Slider1 />
                    <div className="filerButtons">
                        <div className="fil">
                            <div className="filBtns">
                                {filterBtns.map(buttons =>
                                    <button onClick={() => filterBtnHandler(buttons.categoryBtn)} key={buttons.id}
                                        className={buttons.categoryBtn === category ? "activeBtn" : ""}
                                    >
                                        {buttons.name}
                                    </button>
                                )}
                            </div>
                            <div class="box">
                                <form name="search">
                                    <input type="text" class="input" name="txt"
                                        onmouseout="this.value = ''; this.blur();"
                                        onChange={e => setSearch1(e.target.value)}
                                        placeholder={t("search")}
                                    />
                                </form>
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                        <div className="busket">
                            <Link to="/shop/cart">
                                <Badge badgeContent={cartCount} color="primary">
                                    <ShoppingCartCheckoutIcon style={{ fontSize: '1.8rem' }} />
                                </Badge>
                            </Link>
                        </div>
                    </div>
                    <ShopCard data={searching(data)} title='T-shirt' />
                </div>
            </div>
            <div>
                <Brands />
                <Footer />
            </div>
        </section>
    )
}
const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart,
    };
};
export default connect(mapStateToProps)(Shop);