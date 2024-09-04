import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import {getCompetition, getCompetitons } from "../controllers/competition/competition.js";

const router = express.Router();

router.get("/", verifyToken, getCompetitons);
router.get("/:competitionId", verifyToken, getCompetition);

export default router;