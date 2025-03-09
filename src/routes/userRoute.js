import { Router } from "express";
import { CreateUser, getUser, putUser } from "../controllers/userController.js";

const router = Router();

router.post("/", CreateUser);
router.get("/:id", getUser);
router.put("/:id", putUser);

export default router;