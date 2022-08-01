import { useState, useEffect } from "react";
import "./countdon.scss";
export default function ({ deadline }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < -90) {
      setDays("Event");
      setHours(" Has");
      setMinutes(" Already");
      setSeconds("Finished");
    } else if (time === 0 || time < 89) {
      setDays("Event");
      setHours(" Is");
      setMinutes(" Happening");
      setSeconds("Now");
    } else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);
    return () => getTimeUntil(deadline);
  }, [deadline]);
  return (
    <div id="coundown">
      <div className="Clock-days"> {leading0(days)}- </div>
      <div className="Clock-hours"> {leading0(hours)}- </div>
      <div className="Clock-minutes"> {leading0(minutes)}- </div>
      <div className="Clock-seconds"> {leading0(seconds)} </div>
    </div>
  );
}
