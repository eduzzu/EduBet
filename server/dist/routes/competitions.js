import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { getCompetition, getCompetitions } from "../controllers/competition/competition.js";
const router = express.Router();
router.get("/", verifyToken, getCompetitions);
router.get("/:competitionId", verifyToken, getCompetition);
export default router;
