import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadFileController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
