import React from "react";
import { useTranslation } from "react-i18next";
import stadion from "../../img/stadion.png";
import "./Tickets.sass";

export default function TicketArea({
  data,
  handleSector,
  sector,
  componentWillMount,
  range,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <div className="range">
        <div className="rangeInp">
          <span className="min">0 sum</span>
          <input
            type="range"
            onChange={componentWillMount}
            min="10000"
            max="100000"
            step="10000"
            value={range}
            className="rangeInput"
          />
          <span className="max">{range} sum</span>
        </div>
        <span className="titleRange">{t("set")}</span>
      </div>

      <div className="stadionFilter">
        <div className="stadion">
          <div className="stadion1">
            <span className="s5" onClick={() => handleSector("SECTOR 5")}>
              {t("s")}5
            </span>
            <span className="s1" onClick={() => handleSector("SECTOR 1")}>
              {t("sector")} 1
            </span>
            <span className="s6" onClick={() => handleSector("SECTOR 6")}>
              {t("s")}6
            </span>
          </div>
          <div className="stadion2">
            <div className="s4">
              <span className="s4Text" onClick={() => handleSector("SECTOR 4")}>
                {t("sector")} 4
              </span>
            </div>
            <img src={stadion} className="stadionImg" />
            <div className="s2">
              <span className="s2Text" onClick={() => handleSector("SECTOR 2")}>
                {t("sector")} 2
              </span>
            </div>
          </div>
          <div className="stadion3">
            <span className="s8" onClick={() => handleSector("SECTOR 8")}>
              {t("s")}8
            </span>
            <span className="s3" onClick={() => handleSector("SECTOR 3")}>
              {t("sector")} 3
            </span>
            <span className="s7" onClick={() => handleSector("SECTOR 7")}>
              {t("s")}7
            </span>
          </div>
        </div>
        <div className="areaFilter">
          <div className="areaModal">
            <span className="areaTitle">{t("tickinfo")}</span>
            <div className="number">
              <span className="ticketsNumber">
                {t("tickets")} {sector}
              </span>
            </div>
            <div className="areaBody">
              {data.map((post) => (
                <div key={post.id}>
                  <span className="titleArea">{post.stadium_name}</span>
                  <div className="areaPrice">
                    <span className="priceMin">
                      {" "}
                      Sig'imi {post.capacity} ta
                    </span>
                    <span className="priceMax"> {post.team_2}</span>
                  </div>
                  <span className="priceSub">$ {post.price}</span>
                  <br />
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
