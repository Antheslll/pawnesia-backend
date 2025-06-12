import { body, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const cartQuantityUpdate = [
  body("quantity")
    .isNumeric({ min: 1 })
    .withMessage("quantity minimal harus 1"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot Update Item Quantity to Cart, make sure the data properly",
        error
      );
    }

    next();
  },
];

export default cartQuantityUpdate;
