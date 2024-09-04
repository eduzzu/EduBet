import express from "express";
import { deleteUserAccount, getUser, getUserTicket, getUserTickets } from "../controllers/users/users.js";
import { isMyAccount, verifyToken } from "../middleware/middleware.js";
const router = express.Router();
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/:ticketId", verifyToken, getUserTicket);
router.get("/:userId/bets", verifyToken, getUserTickets);
router.delete("/:userId/delete", verifyToken, isMyAccount, deleteUserAccount);
export default router;
