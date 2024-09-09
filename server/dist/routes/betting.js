import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addEventToTicket, removeEventFromTicket } from "../controllers/betTickets/betTickets.js";
const router = express.Router();
router.post("/addEvent", verifyToken, addEventToTicket);
router.delete("/removeEvent", verifyToken, removeEventFromTicket);
export default router;
