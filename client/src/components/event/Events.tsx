import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { IEvent } from "../../interfaces/Event";
import Event from "./Event";
import "./events.css";

const Events = () => {

    const [events, setEvents] = useState([]);
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        const getEvents = async() => {
            const eventsResponse = await fetch(`http://localhost:3001/events/`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });


            const eventsData = await eventsResponse.json();
            const futureEvents = eventsData.filter((event: IEvent) => event.eventDate.toString().slice(0,10) >= `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`);
            
            setEvents(futureEvents);
        };

        getEvents();
    }, []);

    if(!events) return null;

    return (
        <div className="events">{events.map(({
            name, competition, eventDate, homeTeam, awayTeam, odds
        }:IEvent) => {
            return (
                <Event
                    name={name}
                    competition={competition}
                    eventDate={eventDate}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    odds={odds}
                    />
            )
        })}
        </div>
    )

}

export default Events;