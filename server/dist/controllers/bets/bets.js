import Bet from "../../models/Bet.js";
import { generateOdds } from "../utils/utils.js";
import Event from "../../models/Event.js";
export const generateBetOdds = async (req, res) => {
    try {
        const { homeWinProbability, drawProbability, awayWinProbability, homeOrDrawProbability, awayOrDrawProbability, noDrawProbability, ggProbability, nggProbability, under1GoalProbability, under2GoalsProbability, under3GoalsProbability, under4GoalsProbability, under5GoalsProbability, over1GoalProbability, over2GoalsProbability, over3GoalsProbability, over4GoalsProbability, over5GoalsProbability, under1GoalHomeProbability, under2GoalsHomeProbability, under3GoalsHomeProbability, under4GoalsHomeProbability, under5GoalsHomeProbability, over1GoalHomeProbability, over2GoalsHomeProbability, over3GoalsHomeProbability, over4GoalsHomeProbability, over5GoalsHomeProbability, under1GoalAwayProbability, under2GoalsAwayProbability, under3GoalsAwayProbability, under4GoalsAwayProbability, under5GoalsAwayProbability, over1GoalAwayProbability, over2GoalsAwayProbability, over3GoalsAwayProbability, over4GoalsAwayProbability, over5GoalsAwayProbability, } = req.body;
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        const bet = await Bet.find({ event: eventId });
        if (!event) {
            return res.status(404).json("Event not found.");
        }
        const newBet = new Bet({
            event: eventId,
            odds: {
                "1x2": {
                    homeWin: generateOdds(homeWinProbability),
                    draw: generateOdds(drawProbability),
                    awayWin: generateOdds(awayWinProbability)
                },
                "double chance": {
                    homeOrDraw: generateOdds(homeOrDrawProbability),
                    awayOrDraw: generateOdds(awayOrDrawProbability),
                    noDraw: generateOdds(noDrawProbability)
                },
                "gg/ngg": {
                    gg: generateOdds(ggProbability),
                    ngg: generateOdds(nggProbability),
                },
                "under/over": {
                    under: {
                        1: generateOdds(under1GoalProbability),
                        2: generateOdds(under2GoalsProbability),
                        3: generateOdds(under3GoalsProbability),
                        4: generateOdds(under4GoalsProbability),
                        5: generateOdds(under5GoalsProbability),
                    },
                    over: {
                        1: generateOdds(over1GoalProbability),
                        2: generateOdds(over2GoalsProbability),
                        3: generateOdds(over3GoalsProbability),
                        4: generateOdds(over4GoalsProbability),
                        5: generateOdds(over5GoalsProbability),
                    }
                },
                "teamGoals": {
                    home: {
                        under: {
                            1: generateOdds(under1GoalHomeProbability),
                            2: generateOdds(under2GoalsHomeProbability),
                            3: generateOdds(under3GoalsHomeProbability),
                            4: generateOdds(under4GoalsHomeProbability),
                            5: generateOdds(under5GoalsHomeProbability),
                        },
                        over: {
                            1: generateOdds(over1GoalHomeProbability),
                            2: generateOdds(over2GoalsHomeProbability),
                            3: generateOdds(over3GoalsHomeProbability),
                            4: generateOdds(over4GoalsHomeProbability),
                            5: generateOdds(over5GoalsHomeProbability),
                        }
                    },
                    away: {
                        under: {
                            1: generateOdds(under1GoalAwayProbability),
                            2: generateOdds(under2GoalsAwayProbability),
                            3: generateOdds(under3GoalsAwayProbability),
                            4: generateOdds(under4GoalsAwayProbability),
                            5: generateOdds(under5GoalsAwayProbability),
                        },
                        over: {
                            1: generateOdds(over1GoalAwayProbability),
                            2: generateOdds(over2GoalsAwayProbability),
                            3: generateOdds(over3GoalsAwayProbability),
                            4: generateOdds(over4GoalsAwayProbability),
                            5: generateOdds(over5GoalsAwayProbability),
                        }
                    }
                }
            }
        });
        const savedBet = await newBet.save();
        event.odds.push(savedBet._id);
        await event.save();
        return res.status(201).json(savedBet);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("An error occured while generating odds for this event...");
    }
};
