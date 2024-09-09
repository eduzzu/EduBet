import BettingTicket from "../../models/BettingTicket.js";
import { Request, Response } from "express";

export const getBettingTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await BettingTicket.find();

    if (!tickets) {
      return res.status(404).json("No betting ticket found.");
    }

    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occured while getting tickets...");
  }
};

export const addEventToTicket = async (req: Request, res: Response) => {
  try {
    const { eventId, odd, stake } = req.body;
    const userId = req.user.id;
    const ticket = await BettingTicket.findOne({ userId: userId, status: 'Unset' });

    if (ticket) {
      const existingSelectionIndex = ticket.selections.findIndex(selection => 
        selection.eventId.equals(eventId)
      );

      if (existingSelectionIndex !== -1) {
        ticket.selections[existingSelectionIndex] = {
          eventId: eventId,
          odd: odd,
          status: "Active"
        };
      } else {

        ticket.selections.push({
          eventId: eventId,
          odd: odd,
          status: "Active"
        });
      }
      const totalOdd = ticket.selections.reduce((total: number, selection: any) => total * selection.odd, 1);
      ticket.totalOdd = parseFloat(totalOdd.toFixed(2));
      ticket.potentialWin = parseFloat((totalOdd * stake).toFixed(2));

      await ticket.save();
      return res.status(200).json(ticket);
    } else {
      const newBettingTicket = new BettingTicket({
        userId,
        selections: [{ eventId, odd, status: "Active" }],
        totalOdd: odd, 
        stake,
        potentialWin: odd * stake,
        status: "Unset",
      });

      const savedBettingTicket = await newBettingTicket.save();
      return res.status(201).json(savedBettingTicket);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occurred while adding event to the Betting Ticket...");
  }
};

export const removeEventFromTicket = async (req: Request, res: Response) => {
  try {
    const { eventId, stake } = req.body;
    const userId = req.user.id;
    const ticket = await BettingTicket.findOne({ userId: userId, status: 'Unset' });

    if (!ticket) {
      return res.status(404).json("Betting ticket not found");
    }

    const eventIdx = ticket.selections.findIndex((selection) => 
      selection.eventId.equals(eventId)
    );

    if (eventIdx === -1) {
      return res.status(404).json("Event not found in your betting ticket.");
    }

    const eventOdd = ticket.selections[eventIdx].odd;
    ticket.selections.splice(eventIdx, 1);

    const totalOdd = ticket.selections.reduce((total: number, selection: any) => total * selection.odd, 1);
    ticket.totalOdd = totalOdd;
    ticket.potentialWin = totalOdd * stake;

    await ticket.save();
    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occurred while removing event from your ticket...");
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.body;
    const ticket = await BettingTicket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json("No betting ticket found.");
    }

    const eventsLostStatus = ticket?.selections.some(
      (selection) => selection.status === "Lost"
    );
    const eventsWonStatus = ticket?.selections.every(
      (selection) => selection.status === "Won"
    );

    if (eventsLostStatus) {
      ticket!.status = "Lost";
    } else if (eventsWonStatus) {
      ticket!.status = "Won";
    } else {
      ticket!.status = "Active";
    }

    await ticket.save();

    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occured while updating ticket status...");
  }
};

export const updateEventStatus = async (req: Request, res: Response) => {
  try {
    const { ticketId, eventId, status } = req.body;
    const ticket = await BettingTicket.findById(ticketId);

    if(!ticket) {
      return res.status(404).json("No betting ticket found.");
    }

    const event = ticket.selections.find((selection: any) => selection.eventId.toString() === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found in the betting ticket." });
    }

    event.status = status;
    await ticket.save();
   
    return res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occured while updating event status...");
  }
};


