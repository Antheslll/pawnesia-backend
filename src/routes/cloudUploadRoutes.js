import express from "express";
import { uploadSingle } from "../middlewares/cloud-upload/cloudUploadMiddleware.js";
import { handleUpload } from "../controllers/cloud-upload/cloudUploadController.js";
import cloudinary from "../config/cloudinary.js";
import { handleTransferUpload } from "../controllers/cloud-upload/transferUploadController.js";
const router = express.Router();

router.post("/cloud", uploadSingle, handleUpload);
router.post("/transfer", uploadSingle, handleTransferUpload);

export default router;
