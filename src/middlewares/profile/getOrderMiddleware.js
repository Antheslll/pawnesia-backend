import { header, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const getOrderMiddleware = [
  header("authorization")
    .exists()
    .withMessage("Authorization header is required")
    .bail()
    .matches(/^Bearer\s.+$/)
    .withMessage("Invalid Authorization format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, "Validation Error", errors);
    }
    next();
  },
];
export default getOrderMiddleware;
