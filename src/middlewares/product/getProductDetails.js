import { validationResult, param } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const getProductDetails = [
  param("uuid").isUUID().withMessage("Invalid UUID format"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return sendErrorResponse(res, 400, "Product Unknown", error);
    }
    next();
  },
];

export default getProductDetails;
