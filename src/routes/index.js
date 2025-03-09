import { Router } from "express";
import UserRoute from "./userRoute.js";
import upLoadFileRoute from "./upLoadFileRoute.js";
import teamRoute from "./teamRoute.js";

const router = Router();

router.use("/user", UserRoute);
router.use('/uploadfile', upLoadFileRoute);
router.use('/team', teamRoute);

export default router;