import { Router } from "express";
import {
  postCreateSensor,
  getSensorById,
  getSensorsByTeamId,
  deleteSensorById,
} from "../controllers/sensor.controller.js";
import { postSensorData, getSensorData } from "../controllers/sensorData.controller.js";

const router = Router();

router.post("/", postCreateSensor);
router.get("/:id", getSensorById);
router.get("/team/:teamId", getSensorsByTeamId);
router.post("/data", postSensorData);
router.get("/data/:sensorId", getSensorData);
router.delete("/:id", deleteSensorById);

export default router;