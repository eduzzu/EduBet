import express from "express";
import { isAdmin, verifyToken } from "../middleware/middleware.js";
import { addEventToTicket, createBettingTicket, removeEventFromTicket } from "../controllers/betTickets/betTickets.js";

const router = express.Router();

router.post("/", verifyToken, createBettingTicket);
router.post("/addEvent", verifyToken, addEventToTicket);

router.delete("/deleteEvent", verifyToken, removeEventFromTicket);


export default router;