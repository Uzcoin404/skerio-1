import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import avatarImg from "../../img/avatar.png"
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import "./user.scss";

export default function User() {

    const [user, setUser] = useState([])

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
        fetch("https://skerio.uz/api/user", requestOptions)
            .then(res => res.text())
            .then((res) => {
                let a = JSON.parse(res)
                setUser(a);
            })
            .catch(error => console.log('error', error));
    }, [getMyID]);

    const [email, setEmail] = useState()

    useEffect(() => {
        user.email_verified_at === null ? setEmail("E-mail not verified") : setEmail("E-mail verified")
    }, [user.email_verified_at]);

    return (
        <section id="user">
            <div className="title">
                <h2>My Profile</h2>
            </div>
            <div className="user-wrapper">
                <div className="avatar">
                    <img src={avatarImg} alt="" />
                </div>
                <div className="user-info">
                    <div className="left">
                        <div className="name">
                            <h2><PersonIcon />  Name: {user.name}</h2>
                        </div>
                        <div className="e-mail">
                            <h2><EmailIcon />  Your email: {user.email}</h2>
                        </div>
                        <div className="verify">
                            <h2>  {email}</h2>
                        </div>
                    </div>
                    <div className="right">
                        <div className="name">
                            <h2><LocalPhoneIcon />  Phone Number: {user.phone_number}</h2>
                        </div>
                        <div className="e-mail">
                            <h2><CalendarMonthIcon />  Created: {user.created_at}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}