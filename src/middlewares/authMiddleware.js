import { body, validationResult } from "express-validator";
import sendErrorResponse from "../utils/responseHandler/errorResponseHandler.js";

const registerValidation = [
  body("email").isEmail().withMessage("Email tidak valid").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/)
    .withMessage("Password harus mengandung minimal 1 huruf besar")
    .matches(/[\W_]/)
    .withMessage("Pasword harus mengandung minimal 1 simbol"),
  body("firstName").notEmpty().withMessage("nama depan tidak boleh kosong"),
  body("lastName").notEmpty().withMessage("nama belakang tidak boleh kosong"),
  body("phoneNumber")
    .notEmpty()
    .matches(/^\+?[0-9\s\-()]{7,15}$/)
    .withMessage("Nomor telfon tidak valid"),
  body("address").notEmpty().withMessage("Alamat harus diisi!"),
  body("role")
    .isIn(["CUSTOMER", "SELLER"])
    .withMessage("Role harus CUSTOMER atau SELLER"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, "Validation Error", errors);
    }
    next();
  },
];

export default registerValidation;
