import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Box, All, BrandNm, Eyl, NameSurname, YourEmail, YourCd, ConfirmCd, Enter, Nav, StillAcc, EcE, Email, Code, EnterBtn, Thanks } from './createstyle'
import Cycle from '../../img/cycle.png'
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Home = () => {


    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [confcode, setConfcode] = useState('');

    const [show, setshow] = useState(false);
    const ref = useRef()
    const ref1 = useRef()

    let alertT = document.querySelector('.alert')
    const handleSubmit = async () => {
        // store the states in the form data
        const loginFormData = new FormData();
        loginFormData.append("name", name)
        loginFormData.append("email", email)
        loginFormData.append("password", code)
        axios.post('https://skerio.uz/api/register', loginFormData)
            .then(function (response) {
                const decoded = jwt_decode(response.data.token);
                localStorage.setItem("token", response.data.token);
                window.location.href = ("/")
                let token = response.data.token

                localStorage.setItem("myid", decoded.sub)
                // window.location.href = "/"
            })
            .catch(
                function (response) {
                    console.log(response.response.data)
                    alertT.style.color = "red"
                    alertT.style.fontSize = "25px"
                    alertT.style.fontWeight = 600
                    alertT.style.display = "inline"
                    alertT.style.position = "absolute"
                    alertT.style.marginTop = "-150px"
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
                    <Nav to={'/login'}>{t("accouthave")}</Nav>
                </Eyl>
                <EcE >
                    <NameSurname>
                        <Email ref={ref} className={show ? 'error' : ''} value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name")} />
                        <Code className={show ? 'error' : ''} value={surname} onChange={(e) => setSurname(e.target.value)} placeholder={t("seondname")} />
                    </NameSurname>
                    <YourEmail ref={ref} className={show ? 'error' : ''} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("mail")} />
                    <YourCd ref={ref} className={show ? 'error' : ''} value={code} onChange={(e) => setCode(e.target.value)} type={'password'} placeholder={t("password")} />
                    <ConfirmCd ref={ref} className={show ? 'error' : ''} value={confcode} onChange={(e) => setConfcode(e.target.value)} type={'password'} placeholder={t("confirm")} />
                    <EnterBtn type="submit" onClick={handleSubmit} >{t("create")}</EnterBtn>
                </EcE>
                <Thanks className='alert' style={{ display: "none" }}>{t("registerErr")}</Thanks>
            </All>

        </Box>

    )
}

export default Home;