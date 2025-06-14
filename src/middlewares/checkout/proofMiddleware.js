import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const proofReq = [
  body("orderId").isUUID().withMessage("order_id harus merupakan UUID"),
  body("link").notEmpty().withMessage("link tidak boleh kosong"),

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

export default proofReq;
