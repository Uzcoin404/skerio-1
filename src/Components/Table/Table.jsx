import React from "react";
import { useState } from "react";
import { data } from "./tableBody";
import "./Table.sass";
import searchPng from "../../img/search.png";
// import { data2 } from "./tableBodyMore";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";

export default function Table() {

  const [search2, setSearch2] = useState("");
  const searching = function (items) {
    items.filter((item) => {
      return item.team_name.toLowerCase().includes(search2);
    });
  };

  const seeMoreFunc = () => {
    let seeMore = document.querySelector(".seeMoreTableText");
    let seeMoreClose = document.querySelector(".seeMoreTableTextClose");
    let post = document.querySelector("#post");

    seeMore.addEventListener("click", function () {
      seeMoreClose.style.display = "block";
      post.style.display = "block";
      seeMoreClose.style.width = "100%";
      seeMore.style.padding = "0px";
      seeMore.style.display = "none";
      seeMoreClose.style.padding = "0px";
    });
    seeMoreClose.addEventListener("click", function () {
      seeMoreClose.style.display = "none";
      post.style.display = "none";
      seeMore.style.width = "100%";
      seeMore.style.padding = "0px";
      seeMoreClose.style.padding = "0px";
      seeMore.style.display = "block";
      seeMore.innerText = "See More";
    });
  };
  const searchInp = () => {
    let searchInput = document.querySelector(".searchInput");
    let searchBtn = document.querySelector(".searchPng");
    let searchClose = document.querySelector(".searchClose");
    let searchPng = document.querySelector(".searchPng");
    searchBtn.addEventListener("click", function () {
      searchInput.style.display = "block";
      searchClose.style.display = "block";
      searchPng.style.display = "none";
      searchInput.style.transform = "translateX(0px)";
    });
  };
  const searchCl = () => {
    let searchInput = document.querySelector(".searchInput");
    let searchBtn = document.querySelector(".searchPng");
    let searchClose = document.querySelector(".searchClose");
    searchClose.addEventListener("click", function () {
      searchInput.style.display = "none";
      searchClose.style.display = "none";
      searchBtn.style.display = "block";
      searchInput.style.transform = "translateX(300px)";
    });
  };

  return (
    <div className="table">
      <div>
        <Nav />
      </div>
      <div className="tableFilter">
        <div className="selectFilter">
          <select className="cupFilter">
            <option value="laliga">LaLiga</option>
            <option value="uefa">UEFA cup</option>
            <option value="euroCup">Euro Cup</option>
            <option value="italyCup">Italy Cup</option>
          </select>
          <select className="yearFilter">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </div>
        <div className="statisticFilter">
          <Link to="/table">
            <span className="statistics active">Statistics</span>
          </Link>
          <Link to="/table/meeting">
            <span className="meetings">Meetings</span>
          </Link>
          <Link to="/schedule">
            <span className="schedule">Schedule</span>
          </Link>
          <input
            type="text"
            className="searchInput"
            placeholder="Search..."
            onChange={e => setSearch2(e.target.value)}
          />
          <img src={searchPng} className="searchPng" onClick={searchInp} />
          <svg
            className="searchClose"
            width="17px"
            height="17px"
            onClick={searchCl}
          >
            <g
              id="Icons"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
            >
              <g
                id="24-px-Icons"
                transform="translate(-364.000000, -124.000000)"
                stroke="#000000"
              >
                <g id="ic_cancel" transform="translate(360.000000, 120.000000)">
                  <g id="cross">
                    <g
                      transform="translate(5.000000, 5.000000)"
                      stroke-width="2"
                    >
                      <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                      <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="statTable">
        <table className="table" style={{ marginTop: "100px" }}>
          <thead>
            <tr>
              <th className="table-name">Name</th>
              <th className="table-team">Team</th>
              <th className="table-goal">Goal Scored</th>
              <th className="table-games">Games</th>
              <th className="table-goalmatch">Goals Match</th>
            </tr>
          </thead>
          <tbody>
            {data.map(post => 
              <>
                <tr>
                  <td className="id-table">{post.id}</td>
                  <td className="name-img-table">
                    <img src={post.img} className="name-png" alt="" />
                    <span className="name-img">{post.img_name}</span>
                  </td>
                  <td className="team-table">
                    <img src={post.team_img} className="team-png" alt="" />
                    <span className="team-name">{post.team_name}</span>
                  </td>
                  <td className="goal-table">{post.goal_table}</td>
                  <td className="games-table">{post.games_table}</td>
                  <td className="goal-match-table">{post.goal_match}</td>
                </tr>
                <hr />
              </>
            )}
          </tbody>
          <div id="post">
            {/* {data2.map((post) => (
              <>
                <tr>
                  <td className="id-table">{post.id}</td>
                  <td className="name-img-table">
                    <img src={post.img} className="name-png" alt="" />
                    <span className="name-img">{post.img_name}</span>
                  </td>
                  <td className="team-table">
                    <img src={post.team_img} className="team-png" alt="" />
                    <span className="team-name">{post.team_name}</span>
                  </td>
                  <td className="goal-table">{post.goal_table}</td>
                  <td className="games-table">{post.games_table}</td>
                  <td className="goal-match-table">{post.goal_match}</td>
                </tr>
                <hr />
              </>
            ))} */}
          </div>
          <div className="seeMoreTable" onClick={seeMoreFunc}>
            <span className="seeMoreTableText">See More</span>
            <span className="seeMoreTableTextClose">Close</span>
          </div>
        </table>
      </div>
      <Brands />
      <Footer />
    </div>
  );
}
