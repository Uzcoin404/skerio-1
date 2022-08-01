import { useState } from "react";
import Navbar from "../Nav/Nav";
import avatarImg from "../../img/avatar.png"
import { Link, Outlet, useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import "./cabinet.scss";
export default function Cabinet() {

    const [remove, setRemove] = useState(false);
    const [firstLink, setFirstLink] = useState("");

    let navigate = useNavigate();
    const handleHistory = () => {
        navigate("/");
    }

    const getRemoveAccount = function () {
        const deleteUserId = localStorage.removeItem("token");
        setRemove(deleteUserId);
        setFirstLink(navigate(-1));
        return handleHistory;
    }

    const [openMenu, setOpenMenu] = useState(true);

    const handleOpenMenu = function () {
        setOpenMenu(openMenu ? false : true);
    }



    return (
        <section id="cabinet">
            <Navbar />
            <div className="cabinet-wrapper">
                <div className="hamburger-menu" onClick={handleOpenMenu}>
                    <MenuIcon style={{ fontSize: "2rem", textAlign: "end" }} />
                </div>
                <div className={openMenu === false ? "my-profile" : "open-menu"}>
                    <div className="aprofile">
                        <div className="title">
                            <h2>Manage your Profile</h2>
                        </div>
                        <div className="avatar">
                            <img src={avatarImg} alt="" />
                            <h2>Name goes here</h2>
                        </div>
                        <div className="sections">
                            <ul>
                                <Link to="setting" >
                                    <li>
                                        <span>
                                            <SettingsIcon />
                                        </span> Setting
                                        <ChevronRightIcon />
                                    </li>
                                </Link>
                                <Link to="wishlist">
                                    <li>
                                        <span><FavoriteIcon /></span> Wishlist  <ChevronRightIcon />
                                    </li>
                                </Link>
                            </ul>
                            <div className="logout">
                                <Link to={firstLink}>
                                    <button onClick={getRemoveAccount}>Log Out
                                        <span>
                                            <LogoutIcon />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}