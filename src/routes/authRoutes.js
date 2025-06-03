import express from "express";
import registerValidation from "../middlewares/authMiddleware.js";
import customerRegister from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerValidation, customerRegister);

export default router;
