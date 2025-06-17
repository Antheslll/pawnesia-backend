import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const finalizeCheckout = [
  body("ordersDraftData")
    .isArray()
    .withMessage("ordersDraftData must be Array"),
  body("orderDetailDraftData")
    .notEmpty()
    .withMessage("orderDetailDraftData must be Array"),
  body("shippingAddressDraftData")
    .notEmpty()
    .withMessage("shippingAddressDraftData must be Array"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot finalize the checkout because the data request",
        { error, message: "kenaa di middleware" }
      );
    }

    next();
  },
];

export default finalizeCheckout;
