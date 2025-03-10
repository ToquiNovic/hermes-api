import { Router } from "express";
import {
  postCreateSensor,
  getSensorById,
  getSensorsByTeamId,
} from "../controllers/sensor.controller.js";

const router = Router();

router.post("/", postCreateSensor);
router.get("/:id", getSensorById);
router.get("/team/:teamId", getSensorsByTeamId);

export default router;