import { useEffect, useState } from "react";
import { IEvent } from "../../interfaces/Event";
import { useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";
import "./event.css";

const Event = ({ competition, eventDate, homeTeam, awayTeam, odds }: IEvent) => {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [selectedOdd, setSelectedOdd] = useState<string | null>(null); 
    const token = useAppSelector((state) => state.auth.token);
    const { eventId } = useParams();

    useEffect(() => {
        const getEvent = async () => {
            const eventsResponse = await fetch(`http://localhost:3001/events/${eventId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const eventData = await eventsResponse.json();
            setEvent(eventData);
        };

        getEvent();
    }, [eventId, token]);

    if (!event) return null;


    const handleOddClick = (betType: string) => {
        if (selectedOdd === betType) {
            setSelectedOdd(null)
        } else {
            setSelectedOdd(betType); 
        }
    };

    return (
        <div className="event">
            <div className="eventInfo">
                <p style={{ fontSize: "12px" }}>{competition.country} - {competition.name}</p>
                <p id="evDate" style={{ fontSize: "12px" }}>
                    {eventDate.toString().slice(0,10)}
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
                            backgroundColor: selectedOdd === "homeWin" ? "#0d6efd" : "#e9ecef",
                            color: selectedOdd === "homeWin" ? "white" : "black"
                        }}
                    >
                        <span>1</span>
                        {odds.map((betType) => betType.odds["1x2"].homeWin.toFixed(2))}
                    </p>
                    <p
                        onClick={() => handleOddClick("draw")}
                        style={{
                            backgroundColor: selectedOdd === "draw" ? "#0d6efd" : "#e9ecef",
                            color: selectedOdd === "draw" ? "white" : "black"
                        }}
                    >
                        <span>X</span>
                        {odds.map((betType) => betType.odds["1x2"].draw.toFixed(2))}
                    </p>
                    <p
                        onClick={() => handleOddClick("awayWin")}
                        style={{
                            backgroundColor: selectedOdd === "awayWin" ? "#0d6efd" : "#e9ecef",
                            color: selectedOdd === "awayWin" ? "white" : "black"
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

export default Event;
