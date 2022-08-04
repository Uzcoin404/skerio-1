import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Box, All, BrandNm, Eyl, NameSurname, YourEmail, YourCd, ConfirmCd, Enter, Nav, StillAcc, EcE, Email, Code, EnterBtn, Thanks } from './loginstyle'
import Cycle from '../../img/cycle.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const { t } = useTranslation();
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const navigate = useNavigate();

    const [show, setshow] = useState(false);
    const ref = useRef()
    let alertT = document.querySelector('.alert')
    const handleSubmit = async () => {
        // store the states in the form data
        const loginFormData = new FormData();
        loginFormData.append("name", name)
        loginFormData.append("email", email)
        loginFormData.append("password", code)

        axios.post('https://skerio.uz/api/login', loginFormData)
            .then(function (response) {
                localStorage.setItem("token", response.data.token)
                window.location.href = ("/");
            })
            .catch(
                function (response) {
                    console.log(response.response.data)
                    alertT.style.color = "red"
                    alertT.style.fontSize = "25px"
                    alertT.style.fontWeight = 600
                    alertT.style.display = "inline"
                    alertT.style.position = "absolute"
                    alertT.style.marginTop = "20px"
                    alertT.style.display = "block"
                }
            )
    }
    return (
        <Box bg={Cycle}>
            <All>
                <Link to="/">
                    <BrandNm style={{ pointer: "cursor" }}>{t("skerio")}</BrandNm>
                </Link>
                <Eyl>
                    <Enter>{t("register")}</Enter>
                    <Nav to={'/create'}>{t("createAccount")}</Nav>
                </Eyl>
                <EcE >
                    <YourEmail ref={ref} className={show ? 'error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("mail")} />
                    <YourCd ref={ref} className={show ? 'error' : ''} value={code} onChange={(e) => setCode(e.target.value)} type={'password'} placeholder={t("password")} />
                    <EnterBtn type="submit" onClick={handleSubmit} >{t("login")}</EnterBtn>
                </EcE>
                <Thanks className='alert' style={{ display: "none" }}>{t("loginErr")}</Thanks>
            </All>
        </Box>
    )
}

export default Login