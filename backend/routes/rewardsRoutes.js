import express from "express";
import { declareWinner, getLeaderboard, generateWinnerCertificate } from "../controllers/rewardsController.js";

const router = express.Router();

router.post("/declare-winner", declareWinner);
router.get("/leaderboard", getLeaderboard);
router.post("/generate-certificate", generateWinnerCertificate);

export default router;
