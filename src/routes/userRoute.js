import { Router } from "express";
import { CreateUser, getUser, putUser } from "../controllers/userController.js";
import { postJoinTeam } from "../controllers/team.controller.js";

const router = Router();

router.post("/", CreateUser);
router.get("/:id", getUser);
router.put("/:id", putUser);
router.post("/jointeam", postJoinTeam);

export default router;