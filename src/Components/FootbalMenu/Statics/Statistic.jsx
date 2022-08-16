import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import AOS from "aos";
import { Link } from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import "./Statistic.scss";
import "aos/dist/aos.css";
AOS.init(1000);

const data = [
  {
    id: 1,
    name: "Cristiano Ronaldo 7",
    team: "Manchester United",
    desc: "Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional footballer who plays as a forward for Premier League club Manchester United and captains the Portugal national team.",
    result: 'Results since 2018',
    teamResult: '10',
    gameSpend: '97',
    hitGoals: '107',
    cat: 'cristiano',
    img: require("../../../img/ronaldo.png"),
    icon: require("../../../icons/Real-madrid-icon.png")
  },
  {
    id: 2,
    name: "Mohamed Salah 11",
    team: "Liverpool",
    desc: "Mohamed Salah Hamed Mahrous Ghaly is an Egyptian professional footballer who plays as a forward for Premier League club Liverpool and captains the Egypt national team.",
    result: 'Results since 2010',
    teamResult: '12',
    gameSpend: '100',
    hitGoals: '127',
    cat: 'salah',
    img: require("../../../img/Salah-big.png"),
    icon: require("../../../icons/manchester-city-icon.png")
  },
  {
    id: 3,
    name: "Ibrgimovich Zlatan 9",
    team: "Milan",
    desc: "Zlatan Ibrahimović is a Swedish professional footballer who plays as a striker for Serie A club AC Milan and the Sweden national team",
    result: 'Results since 2012',
    teamResult: '20',
    gameSpend: '197',
    hitGoals: '127',
    cat: 'ibragim',
    img: require("../../../img/zlatan.png"),
    icon: require("../../../icons/roma-icon.png")
  },
  {
    id: 4,
    name: "Lionel Messi 10",
    team: "Barcelona",
    desc: "Lionel Andrés Messi, also known as Leo Messi, is an Argentine professional footballer who plays as a forward for Ligue 1 club Paris Saint-Germain and captains the Argentina national team",
    result: 'Results since 2009',
    teamResult: '20',
    gameSpend: '197',
    hitGoals: '127',
    cat: 'messi',
    img: require("../../../img/messi.png"),
    icon: require("../../../icons/barcelona.png")
  },
  {
    id: 5,
    name: "Karim Benzema",
    team: "Real Madrid",
    desc: "Karim Mostafa Benzema is a French professional footballer who plays as a striker for La Liga club Real Madrid and the France national team.",
    result: 'Results since 2009',
    teamResult: '20',
    gameSpend: '197',
    hitGoals: '127',
    cat: 'benzema',
    img: require("../../../img/_.png"),
    icon: require("../../../icons/Real-madrid-icon.png")
  },
]

export default function Statistic() {

  const { t } = useTranslation();

  const [mainData, setMainData] = useState(data[0]);

  const Filtering = (btnId) => {
    let filtered = data.filter((item) => {
      return item.cat === btnId
    })
    setMainData(...filtered);
  }

  return (
    <section id="statistic">
      <div className="statistic-title">
        <h2>{t("statistics")}</h2>
      </div>
      <div className="main-static-div" data-aos="fade-right">
        {/* -------------------  */}
        <div className="static-left">
          <div className="right-img">
            <img src={mainData.img} />
          </div>
          <div className="right-desc">
            <h2>
              {mainData.name}
            </h2>
            <h4>{mainData.team}</h4>
            <p>
              {mainData.desc}
            </p>
            <button>
              <Link to="/schedule">{t("seeMore")}
                <span>
                  <DoubleArrowIcon style={{ color: 'white' }} />
                </span>
              </Link>
            </button>
          </div>
          <div className="right-table">
            <h4>{mainData.result}</h4>
            <div className="table-results">
              <div className="results">
                <p>Team</p>
                <p>{mainData.teamResult}</p>
              </div>
            </div>
            <hr />
            <div className="table-results">
              <div className="results">
                <p>Game Spend</p>
                <p>{mainData.gameSpend}</p>
              </div>
            </div>
            <hr />
            <div className="table-results">
              <div className="results">
                <p>Hit Goals</p>
                <p>{mainData.hitGoals}</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
        {/* ----------------------------- */}
        <div className="static-right">
          {data?.map((item) => (
            <div className={item.cat === mainData.cat ? 'active-component' : "left-line"} onClick={() => Filtering(item.cat)}>
              <div className="left-img">
                <img src={item.img} />
              </div>
              <div className="right-desc">
                <h4>
                  {item.name}
                </h4>
                <p>{item.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}