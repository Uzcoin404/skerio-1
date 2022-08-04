import React from "react";
import { useState } from "react";
import "./TableTeam.sass";
import tableteambody, { tableteam } from "./TableTeamBody";
import tableteambody2, { tableteam2 } from "./TableTeamBodyMore";
import searchPng from "../../img/search.png";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";

export default function Tableteam() {
  const seeMoreFunc = () => {
    let post = document.querySelector("#post");
    let seeMore = document.querySelector(".seeMoreText");
    let seeMoreClose = document.querySelector(".seeMoreTextClose");

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
  const [w, setW] = useState("");
  return (
    <>
      <div className="TableTeam">
        <Nav />
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
              <span className="statistics">Statistics</span>
            </Link>
            <Link to="/table/meeting">
              <span className="/table/meeting">Meetings</span>
            </Link>
            <Link to="/table/schedule">
              <span className="schedule active">Schedule</span>
            </Link>
            <input
              type="text"
              className="searchInput"
              placeholder="Search..."
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
                  <g
                    id="ic_cancel"
                    transform="translate(360.000000, 120.000000)"
                  >
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
        <div className="tableTeam">
          <table>
            <thead>
              <tr>
                <td className="tbteam">Team</td>
                <td className="tbgoal">
                  <span className="goal1">Goal Scored</span>
                  <span className="goal2">Scored</span>
                </td>
                <td className="tbgoalcon">
                  <span className="goal1">Goal Conceded</span>
                  <span className="goal2">Conceded</span>
                </td>
                <td className="tbshots">
                  <span className="goal1">Shots on Target</span>
                  <span className="goal2">Shots</span>
                </td>
                <td className="tbfouls">Fouls</td>
                <td className="tbyellow">
                  <span className="goal1">Yellow Cards</span>
                  <span className="goal2">Yellow</span>
                </td>
                <td className="tbred">
                  <span className="goal1">Red Cards</span>
                  <span className="goal2">Red</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {tableteam.map((post) => {
                return (
                  <>
                    <tr>
                      <td className="tb_id">{post.id}</td>
                      <td className="tb_team">
                        <img
                          src={post.teampng}
                          alt=""
                          className="tb_team_img"
                        />
                        <span className="tb_team_text">{post.teamname}</span>
                      </td>
                      <td className="tb_goal">{post.goalscored}</td>
                      <td className="tb_goalcon">{post.goalcon}</td>
                      <td className="tb_shots">{post.shots}</td>
                      <td className="tb_fouls">{post.fouls}</td>
                      <td className="tb_yellow">{post.yellow}</td>
                      <td className="tb_red">{post.red}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <div id="post">
              {tableteam2.map((post) => {
                return (
                  <>
                    <tr>
                      <td className="tb_id">{post.id}</td>
                      <td className="tb_team">
                        <img
                          src={post.teampng}
                          alt=""
                          className="tb_team_img"
                        />
                        <span className="tb_team_text">{post.teamname}</span>
                      </td>
                      <td className="tb_goal">{post.goalscored}</td>
                      <td className="tb_goalcon">{post.goalcon}</td>
                      <td className="tb_shots">{post.shots}</td>
                      <td className="tb_fouls">{post.fouls}</td>
                      <td className="tb_yellow">{post.yellow}</td>
                      <td className="tb_red">{post.red}</td>
                    </tr>
                  </>
                );
              })}
            </div>
            <div className="seeMore" onClick={seeMoreFunc}>
              <span className="seeMoreText">See More</span>
              <span className="seeMoreTextClose">Close</span>
            </div>
          </table>
        </div>
        <Brands />
        <Footer />
      </div>
    </>
  );
}
