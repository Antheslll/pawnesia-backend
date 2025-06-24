import { param, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const getOrderId = [
  param("id").isUUID().withMessage("id harus dalam format UUID"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot continue the process because the data request",
        err
      );
    }

    next();
  },
];

export default getOrderId;
