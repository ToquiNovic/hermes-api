import { Router } from "express";
import { postCreateTeam, getTeamById } from "../controllers/team.controller.js";

const router = Router();

router.post("/", postCreateTeam);
router.get("/:id", getTeamById);

export default router;