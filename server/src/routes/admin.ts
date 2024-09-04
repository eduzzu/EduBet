import express from "express";
import { addCompetition, editCompetition } from "../controllers/competition/competition.js";
import { isAdmin, verifyToken } from "../middleware/middleware.js";
import { generateBetOdds } from "../controllers/bets/bets.js";
import { addEvent, editEvent } from "../controllers/events/events.js";
import { deleteUserAccount, editUserAccount, getUser } from "../controllers/users/users.js";
import { updateUserAccountBalanceAfterPlacingBet, updateUserAccountBalanceAfterWinningBettingTicket } from "../controllers/utils/utils.js";
import { getBettingTickets, updateEventStatus, updateTicketStatus } from "../controllers/betTickets/betTickets.js";

const router = express.Router();

router.get("/bettingTickets", verifyToken, isAdmin, getBettingTickets);
router.get("/:userId", verifyToken, isAdmin, getUser);

router.post("/add/competition", verifyToken, isAdmin, addCompetition);
router.post("/:eventId/generateOdds", verifyToken, isAdmin, generateBetOdds);
router.post("/:competitionId/add", verifyToken, isAdmin, addEvent);

router.put("/:userId/edit", verifyToken, isAdmin, editUserAccount);
router.put("/:eventId/edit", verifyToken, isAdmin, editEvent);
router.put("/:competitionId/edit", verifyToken, isAdmin, editCompetition);
router.put("/:userId/TicketPlaced", verifyToken, isAdmin, updateUserAccountBalanceAfterPlacingBet);
router.put("/:userId/TicketWon", verifyToken, isAdmin, updateUserAccountBalanceAfterWinningBettingTicket);
router.put("/updateEvent/status", verifyToken, isAdmin, updateEventStatus)
router.put("/updateTicket/status", verifyToken, isAdmin, updateTicketStatus);

router.delete("/:userId/delete", verifyToken, isAdmin, deleteUserAccount);

export default router;