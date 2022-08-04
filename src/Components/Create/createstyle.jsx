import styled from 'styled-components';
import { Button, TextField } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const Box = styled.div`
width: 100%;
height: 100vh;
box-sizing: border-box;
background-repeat: no-repeat;
background-size: cover;
background-image: url(${props=>props.bg});   
@media (max-width:430px) {
background-position:center;
/* height: 120vh; */
}
`
// All
export const All = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-around;
margin-left: 7%;
@media (max-width:430px) {
margin-bottom: 80px !important;
height: 90vh;
}
`

export const BrandNm = styled.h1`
width: 142px;
height: 49px;
color: #BF0000;
font-weight: 600;
font-size: 60px;
@media (max-width:430px) {
font-size: 45px;
margin-top: 20px;

}
`


export const Eyl = styled.div`
line-height: 40px;
margin-top: 2%;
@media (max-width:430px) {
 margin-bottom: 53px;
}
`
export const Enter = styled.h2`
top: 50px;
color: #FFFFFF;
font-size: 60px;
@media (max-width:430px) {
font-size: 40px;
margin-top: 40px;
height: 5vh;
}
`


export const Nav = styled(NavLink)`
display: flex !important;
flex-direction: column !important;
width: 390px !important;
height: 35% !important;

color: #ffffff93 !important;
font-size: 25px !important;
font-weight: 400 !important;
cursor: pointer !important;
transition: 0.5s !important;
text-decoration: none !important;
@media (max-width:430px) {
font-size: 20px !important;
    
}
:hover{
color: #BF0000 !important;
}
`

export const EcE = styled.div`
display: flex;
flex-direction: column;
width: 650px;
@media (max-width:430px) {
width: 400px;    
}
`
export const Email = styled.input`
width: 38% ;
height: 80px;
font-size: 30px;
color: white;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
border: none;
outline: none;
padding-left: 5%;
@media (max-width:430px) {
width: 140px;
height: 45px;
font-size: 17px ;
border-radius: 5px;
::placeholder{
font-size: 15px !important;
color: white;
}
}
::placeholder{
font-size: 25px;
color: white;
}
`
export const Code = styled.input`
width: 38% ;
height: 80px;
font-size: 30px;
color: white;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
border: none;
outline: none;
margin-left: 20px;
padding-left: 5%;
@media (max-width:430px) {
width: 140px;
height: 45px;
font-size: 17px ;
border-radius: 5px; 
::placeholder{
font-size: 15px !important;
color: white;
}
}
::placeholder{
font-size: 25px;
color: white;
}
`

export const NameSurname = styled.div`
display: flex;
`
export const YourEmail = styled.input`
width: 80% ;
margin-top: 10px;
height: 80px;
font-size: 30px;
color: white;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
border: none;
outline: none;
padding-left: 5%;
@media (max-width:430px) {
width: 300px;
height: 45px;
font-size: 17px ;
border-radius: 5px; 
::placeholder{
font-size: 15px !important;
color: white;
}
}
::placeholder{
font-size: 25px;
color: white;
}
`
export const YourCd = styled.input`
width: 80% ;
margin-top: 10px;
height: 80px;
font-size: 30px;
color: white;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
border: none;
outline: none;
padding-left: 5%;
@media (max-width:430px) {
width: 300px;
height: 45px;
font-size: 17px ;
border-radius: 5px; 
::placeholder{
font-size: 15px !important;
color: white;
}
}
::placeholder{
font-size: 25px;
color: white;
}
    
`
export const ConfirmCd = styled.input`
width: 80% ;
margin-top: 10px;
height: 80px;
font-size: 30px;
color: white;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
border: none;
outline: none;
padding-left: 5%;
@media (max-width:430px) {
width: 300px;
height: 45px;
font-size: 17px ;
border-radius: 5px; 
::placeholder{
font-size: 15px !important;
color: white;
}
}
::placeholder{
font-size: 25px;
color: white;
}

`

export const EnterBtn = styled(Button)`
width: 520px !important;
background: #BF0000!important;
color: white !important;
height: 80px!important;
border-radius: 10px !important;
font-size: 200% !important;
display: flex !important;
align-items: center !important;
top: 5% !important;
@media (max-width:430px) {
width: 300px !important;
height: 45px !important;
font-size: 17px !important ;
border-radius: 5px !important; 
}
::placeholder{
font-size: 15px !important;
color: white !important;
}

`

export const Thanks = styled.p`
// color: white;
color: #4440

font-size: 20px;
font-weight: 100;
margin-top: 71px;
@media (max-width:430px) {
font-size: 15px;
margin-bottom: -62px;

}
`
