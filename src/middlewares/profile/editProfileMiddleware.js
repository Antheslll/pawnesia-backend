import { body, validationResult, header } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const editProfileMiddleware = [
  header("authorization")
    .exists()
    .withMessage("Authorization header is required")
    .bail()
    .matches(/^Bearer\s.+$/)
    .withMessage("Invalid Authorization format"),
  body("firstName")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .isAlpha()
    .withMessage("Nama depan harus dalam 3-20 character dengan huruf semua"),
  body("lastName")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .isAlpha()
    .withMessage("Nama belakang harus dalam 3-20 character dengan huruf semua"),
  body("phoneNumber")
    .notEmpty()
    .matches(/^\+?[0-9\s\-()]{7,15}$/)
    .withMessage("Nomor telfon tidak valid"),
  body("address").notEmpty().withMessage("Alamat harus diisi!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, "Validation Error", errors);
    }
    next();
  },
];

export default editProfileMiddleware;
