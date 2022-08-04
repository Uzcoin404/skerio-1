import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/userProvider";
import { LikeContext } from "./context/likeSending";
import FootbalMenu from "./Components/FootbalMenu/FootbalMenu";
import Shop from "./Components/Shop/Shop";
import Payment from "./Components/Shop/Payment/Payment";
import Areas from "./Components/Areas/Areas";
import News from "./Components/News/News";
import Erorr from "./Components/404/Error404";
import Success from "./Components/Success/Success";
import Table from "./Components/Table/Table";
import TableMeeting from "./Components/Table/TableMeetings";
import Create from "./Components/Create/Create";
import TableTeam from "./Components/Table/TableTeam";
import Err404 from "./Components/404/Error404";
import Mapping from "./Components/Map/Mapping";
import Cart from "./Components/Shop/cart";
import ViewFull from "./Components/Shop/ViewFull";
import Login from "./Components/Login/LoginPage";
import Scroll from "./Scroll";
import Newsfull from "./Components/News/NewsFull";
import { ExampleContext } from "./Components/News/context";
import Cabinet from "./Components/Cabinet/Cabinet";
import Setting from "./Components/Cabinet/Settings";
import Wishlist from "./Components/Cabinet/Wishlist.jsx";
import User from "./Components/Cabinet/User";
import { LanguageContext } from "./lanContext";
import i18next from "i18next";
import "./App.css";

const App = () => {
  const [singleValue, setSingleNews] = useState("uz");

  const getLanguage = function (lang) {
    const i18nextLang = i18next.changeLanguage(lang);

    if (lang === "uz") {
      return setSingleNews("uz");
    } else if (lang === "en") {
      return setSingleNews("en");
    } else if (lang === "ru") {
      return setSingleNews("ru");
    }
    return i18nextLang;
  };

  return (
    <Router>
      <div>
        <Scroll />
        <UserContextProvider>
          <LikeContext.Provider>
            <LanguageContext.Provider value={singleValue}>
              <ExampleContext.Provider value={getLanguage}>
                <Routes>
                  <Route path="/" exact element={<FootbalMenu />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/cart/payment" element={<Payment />} />
                  <Route path="/areas" element={<Areas />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/fullnews/:id" element={<Newsfull />} />
                  <Route path="/error" element={<Erorr />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/table" element={<Table />} />
                  <Route path="/table/meeting" element={<TableMeeting />} />
                  <Route path="/table/schedule" element={<TableTeam />} />
                  <Route path="/areas/mapping/:id" element={<Mapping />} />
                  <Route path="/shop/cart" element={<Cart />} />
                  <Route path="/shop/viewfull/:id" element={<ViewFull />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cabinet" element={<Cabinet />}>
                    <Route index element={<User />} />
                    <Route path="user" element={<User />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="wishlist" element={<Wishlist />} />
                  </Route>
                  <Route path="*" element={<Err404 />} />
                </Routes>
              </ExampleContext.Provider>
            </LanguageContext.Provider>
          </LikeContext.Provider>
        </UserContextProvider>
      </div>
    </Router>
  );
};

export default App;
