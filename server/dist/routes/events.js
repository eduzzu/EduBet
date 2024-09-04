import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { getEvent, getEvents } from "../controllers/events/events.js";
const router = express.Router();
router.get("/", verifyToken, getEvents);
router.get("/:eventId", verifyToken, getEvent);
export default router;
