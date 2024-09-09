import { useState } from "react";
import { IEvent } from "../../interfaces/Event";
import "./eventWidget.css";
import { useAppSelector } from "../../state/hooks";
import { addEventToTicket, removeEventFromTicket } from "../../utils/utils";

type OddType = "homeWin" | "draw" | "awayWin";

const EventWidget = ({
  competition,
  eventDate,
  homeTeam,
  awayTeam,
  odds,
  _id,
}: IEvent) => {
  const [selectedOdd, setSelectedOdd] = useState<OddType | null>(null);
  let stake = 10;
  const token = useAppSelector((state) => state.auth.token);

  const oddMapping = {
    homeWin: odds[0].odds["1x2"].homeWin,
    draw: odds[0].odds["1x2"].draw,
    awayWin: odds[0].odds["1x2"].awayWin,
  };

  const handleOddClick = (betType: OddType) => {
    const selectedOddValue = oddMapping[betType];
    if (selectedOdd === betType) {
      setSelectedOdd(null);
      removeEventFromTicket(_id, selectedOddValue, stake, token!);
    } else {
      setSelectedOdd(betType);
      addEventToTicket(_id, selectedOddValue, stake, token!);
    }
  };

  return (
    <div className="event">
      <div className="eventInfo">
        <p style={{ fontSize: "12px" }}>
          {competition.country} - {competition.name}
        </p>
        <p id="evDate" style={{ fontSize: "12px" }}>
          {eventDate.toString().slice(0, 10)}
        </p>
        <p id="homeTeam">{homeTeam}</p>
        <p id="awayTeam">{awayTeam}</p>
      </div>

      <div className="result">
        <p id="final">Full Time</p>
        <div className="odds">
          <p
            onClick={() => handleOddClick("homeWin")}
            style={{
              backgroundColor:
                selectedOdd === "homeWin" ? "#0d6efd" : "#e9ecef",
              color: selectedOdd === "homeWin" ? "white" : "black",
            }}
          >
            <span>1</span>
            {odds.map((betType) => betType.odds["1x2"].homeWin.toFixed(2))}
          </p>
          <p
            onClick={() => handleOddClick("draw")}
            style={{
              backgroundColor: selectedOdd === "draw" ? "#0d6efd" : "#e9ecef",
              color: selectedOdd === "draw" ? "white" : "black",
            }}
          >
            <span>X</span>
            {odds.map((betType) => betType.odds["1x2"].draw.toFixed(2))}
          </p>
          <p
            onClick={() => handleOddClick("awayWin")}
            style={{
              backgroundColor:
                selectedOdd === "awayWin" ? "#0d6efd" : "#e9ecef",
              color: selectedOdd === "awayWin" ? "white" : "black",
            }}
          >
            <span>2</span>
            {odds.map((betType) => betType.odds["1x2"].awayWin.toFixed(2))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventWidget;
