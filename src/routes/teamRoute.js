import { Router } from "express";
import { postCreateTeam, getTeamById, getTeamMembers } from "../controllers/team.controller.js";

const router = Router();

router.post("/", postCreateTeam);
router.get("/:id", getTeamById);
router.get("/:id/members", getTeamMembers);

export default router;