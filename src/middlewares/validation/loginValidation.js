import { body, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const loginValidation = [
  body("email").isEmail().withMessage("Email tidak valid").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/)
    .withMessage("Password harus mengandung minimal 1 huruf besar")
    .matches(/[\W_]/)
    .withMessage("Pasword harus mengandung minimal 1 simbol"),

  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return sendErrorResponse(res, 400, "Validation Error", errors);
    }
    next();
  },
];

export default loginValidation;
