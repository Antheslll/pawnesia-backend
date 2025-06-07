import express from "express";
import authenticateUser from "../middlewares/auth/authMiddleware.js";
import getCurrentUser from "../controllers/userInfo/userInfoController.js";

const router = express.Router();

router.get("/me", authenticateUser, getCurrentUser);

export default router;
