import express from "express";
import registerValidation from "../middlewares/validation/registerValidation.js";
import loginValidation from "../middlewares/validation/loginValidation.js";
import customerRegister, {
  customerLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerValidation, customerRegister);
router.post("/login", loginValidation, customerLogin);
export default router;
