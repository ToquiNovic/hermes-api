import { Router } from "express";
import UserRoute from "./userRoute.js";
import upLoadFileRoute from "./upLoadFileRoute.js";

const router = Router();

router.use("/user", UserRoute);
router.use('/uploadfile', upLoadFileRoute);

export default router;