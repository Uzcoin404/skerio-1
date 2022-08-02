import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/userProvider";
import FootbalMenu from "./Components/FootbalMenu/FootbalMenu";
import Shop from "./Components/Shop/Shop";
import Payment from "./Components/Shop/Payment/Payment";
import Areas from "./Components/Areas/Areas";
import News from "./Components/News/News";
import Erorr from "./Components/404/Error404";
import Success from "./Components/Success/Success";
import Table from "./Components/Table/Table";
import TableMeeting from "./Components/Table/TableMeetings";
import TableTeam from "./Components/Table/TableTeam";
import Tickets from "./Components/Ticket/Tickets";
import Create from "./Components/Create/Create";
import Err404 from "./Components/404/Error404";
import Main from "./Components/Main/Main";
import Mapping from "./Components/Map/Mapping";
import TicketArea from "./Components/Ticket/TicketsArea";
import TicketsAll from "./Components/Ticket/TicketsAll";
import Cart from "./Components/Shop/cart";
import ViewFull from "./Components/Shop/ViewFull";
import Login from "./Components/Login/LoginPage";
import Scroll from "./Scroll";
import SideNav from "./Components/SideNav/SideNav";
import Newsfull from "./Components/News/NewsFull";
import { ExampleContext } from "./Components/News/context";
import Cabinet from "./Components/Cabinet/Cabinet";
import Setting from "./Components/Cabinet/Settings";
import Wishlist from "./Components/Cabinet/Wishlist.jsx";
import data from "./Components/Areas/Areas";
import "./App.css";

const App = () => {
  const [singleNews, setSingleNews] = useState();
  return (
    <Router>
      <div>
        <Scroll />
        <ExampleContext.Provider value={singleNews}>
          <UserContextProvider>
            <Routes>
              {/* <Route path="/" exact element={<Main />} /> */}
              <Route path="/" exact element={<FootbalMenu />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/cart/payment" element={<Payment />} />
              <Route path="/areas" element={<Areas />} />
              <Route path="/news" element={<News />}>
                <Route path="full/:id" element={<Newsfull />} />
              </Route>
              <Route path="/error" element={<Erorr />} />
              <Route path="/success" element={<Success />} />
              <Route path="/table" element={<Table />} />
              <Route path="/table/meeting" element={<TableMeeting />} />
              <Route path="/table/schedule" element={<TableTeam />} />
              {/* <Route path="/tickets" element={<Tickets />} /> */}
              <Route path="/myprofile" element={<SideNav />}>
                {/* <Route path="wishlist" element={<Wishlist />} /> */}
              </Route>
              <Route path="/areas/mapping/:id" element={<Mapping />} />
              <Route path="/ticketsarea" element={<TicketArea />} />
              <Route path="/shop/cart" element={<Cart />} />
              <Route path="/tickets/ticketsall" element={<TicketsAll />} />
              <Route path="/shop/viewfull/:id" element={<ViewFull />} />
              <Route path="/create" element={<Create />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cabinet" element={<Cabinet />}>
                <Route index element={<Setting />} />
                <Route path="setting" element={<Setting />} />
                <Route path="wishlist" element={<Wishlist />} />
              </Route>
              <Route path="*" element={<Err404 />} />
            </Routes>
          </UserContextProvider>
        </ExampleContext.Provider>
      </div>
    </Router>
  );
};

export default App;
