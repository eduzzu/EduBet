import "./bettingTicket.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";

const BettingTicket = () => {
    const token = useAppSelector((state) => state.auth.token);
    const [bettingTicket, setBettingTicket] = useState([]);
    const [event, setEvent] = useState(null);

    return (
        <div className="bettingTicket">
            {/* {bettingTicket ? (
                <p>{bettingTicket}</p>
            ) : 
              (  */}
                <article className="noBettingTicket">
                <img src="/assets/noBettingTicket.png" alt="No betting ticket found." />
                <p>The ticket is empty. Choose an event from the offer to place a bet.</p>
                </article>
            {/* )} */}
        </div>
    )

}

export default BettingTicket;