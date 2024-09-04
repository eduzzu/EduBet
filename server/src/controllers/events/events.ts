import Competition from "../../models/Competition.js";
import Event from "../../models/Event.js";
import { Request, Response } from "express";

export const getEvent = async(req: Request, res: Response) => {
    try{
        const {eventId} = req.params;
        const event = await Event.findById(eventId).populate({
            path: "odds",
            select: "name odds"
        }).populate({
            path: "competition",
            select: "name competition"
        });

        if(!event) {
            return res.status(404).json("Event not found.");
        }

        return res.status(200).json(event);

    } catch(error) {
        console.error(error);
        return res.status(500).json("An error occured while finding the event...");
    }
};

export const getEvents = async(req: Request, res: Response) => {
    try{
        const events = await Event.find().populate({
            path: "odds",
            select: "name odds"
        }).populate({
            path: "competition",
            select: "name competition"
        });

        if(!events) {
            return res.status(404).json("No event found.");
        }
        return res.status(200).json(events);
    } catch(error) {
        console.error(error);
        return res.status(500).json("An error occured while finding the events...");
    }
};

export const addEvent = async(req: Request, res: Response) => {
    try{
        const {competitionId} = req.params;
        const competition = await Competition.findById(competitionId);
        const {
            name,
            eventDate,
            homeTeam,
            awayTeam
        } = req.body;
    
        const existingEvent = await Event.findOne({name: name, eventDate: eventDate});
        if(existingEvent) {
            return res.status(400).json("Event already exists!");
        }
    
        const newEvent = new Event({
            name,
            competition: competition!._id,
            eventDate,
            homeTeam,
            awayTeam
        });
    
        const savedEvent = await newEvent.save();
        competition?.events?.push(savedEvent._id);
        await competition?.save();
        
        return res.status(201).json(savedEvent);
    } catch(error) {
        console.error(error);
        return res.status(500).json("An error occured while creating new event...");
    }
};

export const editEvent = async(req: Request, res: Response) => {
    try{
        const {eventId} = req.params;
    const {
        name,
        competition,
        eventDate,
        homeTeam,
        awayTeam,
        selectedOdd
    } = req.body;

    if(!name || !competition || !eventDate || !homeTeam || !awayTeam) {
        throw new Error("Please fill all these fields correctly!");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
            name,
            competition,
            eventDate,
            homeTeam,
            awayTeam,
            selectedOdd
        }, {new: true}
    );

    if(!updatedEvent) {
        throw new Error("Can not update this event.");
    };



    return res.status(200).json(updatedEvent);
    } catch(error) {
        console.error(error);
        return res.status(500).json("An error occured while editing this event...");
    }
}