import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Nav from "../Nav/Nav";
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";
import "./alltickets.scss";

export default function TicketsAll() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://skerio.uz/api/ltickets")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
    axios
      .get("https://skerio.uz/api/stadiumsection")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [search1, setSearch1] = useState("");
  const keys = ["name", "team_1", "team_2", "price"];
  const searching = function (data) {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search1))
    );
  };

  const data2 = searching(data);

  return (
    <section id="allTickets">
      <Nav />
      <div className="searchbar">
        <div class="box">
          <form name="search">
            <input
              type="text"
              class="input"
              name="txt"
              onmouseout="this.value = ''; this.blur();"
              onChange={(e) => setSearch1(e.target.value)}
              placeholder={t("search")}
            />
          </form>
          <i class="fas fa-search"></i>
        </div>
      </div>
      <div className="cart-wrapper">
        {data2?.map((post) => (
          <div className="ticket-card">
            <div className="ticket-image">
              <img
                className="tick1"
                src={"https://skerio.uz/admin/images/tickets/" + post.image}
              />
            </div>
            <div className="albumContent">
              <span className="albumTitle">
                {post.team_1} VS {post.team_2}
              </span>
              <span className="albumAdress">{post.adress}</span>
              <div className="albumDate">
                <span className="albumTime">
                  <CalendarMonthIcon /> {post.time}{" "}
                </span>{" "}
                /<span className="calendarDate"> {post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Brands />
        <Footer />
      </div>
    </section>
  );
}
