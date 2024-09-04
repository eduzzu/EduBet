import Competition from "../../models/Competition.js";
import { Request, Response } from "express";

export const getCompetition = async (req: Request, res: Response) => {
  try {
    const { competitionId } = req.params;
    const competition = await Competition.findById(competitionId).populate({
      path: "events",
      select: "name events",
    });

    if (!competition) {
      return res.status(404).json("Competition not found.");
    }

    return res.status(200).json(competition);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occured while searching competition...");
  }
};

export const getCompetitons = async (req: Request, res: Response) => {
  try {
    const competitions = await Competition.find().populate({
      path: "events",
      select: "name events",
    });

    if (!competitions) {
      return res.status(404).json("No competition found.");
    }

    return res.status(200).json(competitions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occured while searching competitions...");
  }
};

export const addCompetition = async (req: Request, res: Response) => {
  try {
    const { country, name, events } = req.body;

    const existingCompetition = await Competition.findOne({
      country: country,
      name: name,
    });
    if (existingCompetition) {
      return res.status(400).json("Competition already exists.");
    }

    const newCompetition = new Competition({
      country,
      name,
      events,
    });

    const savedCompetition = await newCompetition.save();

    return res.status(201).json(savedCompetition);
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occured while adding competition...");
  }
};

export const editCompetition = async (req: Request, res: Response) => {
  try {
    const { competitionId } = req.params;
    const { country, name } = req.body;
    const existingCompetition = await Competition.findById(competitionId);
    if (!existingCompetition) {
      return res.status(404).json("No competition found.");
    }

    const updatedCompetition = await Competition.findByIdAndUpdate(
      competitionId,
      {
        country,
        name,
      },
      { new: true }
    );

    return res.status(200).json(updatedCompetition);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("An error occured while editing competition...");
  }
};
