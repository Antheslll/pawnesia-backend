import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const finalizeCheckout = [
  body("ordersDraftData")
    .isArray()
    .withMessage("ordersDraftData must be Array"),
  body("orderDetailDraftData")
    .isArray()
    .withMessage("orderDetailDraftData must be Array"),
  body("shippingAddressDraftData")
    .isArray()
    .withMessage("shippingAddressDraftData must be Array"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot finalize the checkout because the data request",
        error
      );
    }

    next();
  },
];

export default finalizeCheckout;
