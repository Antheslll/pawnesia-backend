import { param, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const viewCartItems = [
  param("userId")
    .matches(/^CU\d{3}$/)
    .withMessage("user_id harus memiliki format CUXXX"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(res, 400, "Cannot View Cart", error);
    }

    next();
  },
];

export default viewCartItems;
