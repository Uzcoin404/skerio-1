import React from "react";
import { Link } from "react-router-dom";
import "./TableMeetings.sass";
import searchPng from "../../img/search.png";
import meetJson, { meeting } from "./TableMeetingsBody";
import meetJson1, { meetingNew } from "./TableMeetingsBody";
import Navbar from "../Nav/Nav"
import Brands from "../Brands/Brands";
import Footer from "../Footer/Footer";

export default function tableMeetings() {
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
    <div className="meetings">
      <Navbar />
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
            <span className="meetings active">Meetings</span>
          </Link>
          <Link to="/table/schedule">
            <span className="schedule">Schedule</span>
          </Link>
          <input type="text" className="searchInput" placeholder="Search..." />
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
      <div className="tableMeetings">
        {meeting.map((post) => {
          return (
            <>
              <h3 className="tournament"> {post.tournament}</h3>
              <div className="meet">
                <div className="homeMeet">
                  <img src={post.homeimg} className="homeImg" />
                  <span className="homeText">{post.hometext}</span>
                </div>
                <div className="timeMeet">
                  <span className="timeText">Kickoff CEST</span>
                  <span className="timeMeeting">
                    {post.time1}:{post.time2}
                  </span>
                </div>
                <div className="awayMeet">
                  <span className="awayText">{post.awaytext}</span>
                  <img src={post.awayimg} className="awayImg" />
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="tableMeetingsNew">
        {meetingNew.map((post) => {
          return (
            <>
              <h3 className="tournament"> {post.tournament}</h3>
              <div className="meet">
                <div className="homeMeet">
                  <img src={post.homeimg} className="homeImg" />
                  <span className="homeText">{post.hometext}</span>
                </div>
                <div className="timeMeet">
                  <span className="timeText">Kickoff CEST</span>
                  <span className="timeMeeting">
                    {post.time1}:{post.time2}
                  </span>
                </div>
                <div className="awayMeet">
                  <span className="awayText">{post.awaytext}</span>
                  <img src={post.awayimg} className="awayImg" />
                </div>
              </div>
            </>
          );
        })}
      </div>
      <Brands />
      <Footer />
    </div>
  );
}
