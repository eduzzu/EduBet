import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./homePage.css";
import { useAppSelector } from "../../state/hooks";
import { ICompetition } from "../../interfaces/Competition";
import EventsWidget from "../../widgets/Events/EventsWidget";
import BettingTicket from "../../components/bettingTicket/BettingTicket";

const HomePage = () => {
    const [competitions, setCompetitions] = useState([]);
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        const getCompetitions = async() => {
            const competitionsResponse = await fetch(`http://localhost:3001/competitions`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const competitionsData = await competitionsResponse.json();
            setCompetitions(competitionsData)
        }
        getCompetitions();
    }, []);

    if(!competitions) return null;

    return (
        <>
        <Navbar />
        <div className="home">
            
            <aside className="competitions">{competitions.map((competition: ICompetition) => (
                <div className="competition">
               <img src={`/assets/countries/${competition.country}.png`} alt={`Flag of ${competition.country}`} />
                <p>{competition.name}</p>
                </div>
                
            ))}
            <hr></hr>
            </aside>

            <EventsWidget />
            <aside className="checkAndSeeTicket">

            <div className="checkTicket">
                <p>Check ticket:</p>
                <input type="text" className="form-control form-control-sm" placeholder="Ticket ID"></input>
                <button type="button" className="btn btn-primary">&gt;</button>
            </div>
            
            <BettingTicket />
            </aside>
            
        </div>
        <Footer />
        </>
    )
}

export default HomePage;