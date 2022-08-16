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
import UserContext from '../../context/userContext';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import jwt_decode from "jwt-decode";
import './shop.scss';
import { LanguageContext } from "../../lanContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


function Shop({ cart }) {

    const { t } = useTranslation();
    const userCtx = useContext(UserContext);
    const singleNews = useContext(LanguageContext);
    const { sportTypeId } = userCtx;
    const filterBtns = [
        {
            id: 1,
            name_uz: 'Barchasi',
            name_ru: 'Все',
            name_en: 'All',
            categoryBtn: ""
        },
        {
            id: 2,
            name_uz: 'Futbolkalar',
            name_ru: 'Футболки',
            name_en: 'T-shirts',
            categoryBtn: 'FUTBOLKA'
        },
        {
            id: 3,
            name_uz: 'Shorti',
            name_ru: 'Шорты',
            name_en: 'Shorts',
            categoryBtn: 'SHORTIK'
        },
        {
            id: 4,
            name_uz: `To'plar`,
            name_ru: 'Мячи',
            name_en: 'Balls',
            categoryBtn: 'SPORT MOLLARI'
        },
        {
            id: 5,
            name_uz: 'Qepkalar',
            name_ru: 'Кепки',
            name_en: 'Caps',
            categoryBtn: "AKSESUAR"
        },
        {
            id: 5,
            name_uz: 'Sumkalar',
            name_ru: 'Сумки',
            name_en: 'Bags',
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

    const getMyID = localStorage.getItem("token") !== null ? localStorage.getItem("token") : null;

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${getMyID}` }
        };

        axios(`https://skerio.uz/api/product/${sportTypeId}`, config)
            .then(res => {
                setData(res.data.data);
                dispatch({ type: 'Add_to_products', payload: res.data.data });
                setData2(res.data.data);
            }).catch((err) => {
                setAxiosErr("Error: " + err.message)
            });
    }, [dispatch, sportTypeId, cart, getMyID]);

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
                                {filterBtns.map((buttons, index) =>
                                    <button onClick={() => filterBtnHandler(buttons.categoryBtn)} key={index}
                                        className={buttons.categoryBtn === category ? "activeBtn" : ""}
                                    >
                                        {singleNews == "uz" ? buttons.name_uz : singleNews == "ru" ? buttons.name_ru : buttons.name_en}
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
                            <IconButton aria-label="cart">
                                <Link to="/shop/cart">
                                    <StyledBadge badgeContent={cartCount} color="secondary">
                                        <ShoppingCartIcon style={{ fontSize: '1.8rem', color: "red" }} />
                                    </StyledBadge>
                                </Link>
                            </IconButton>
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