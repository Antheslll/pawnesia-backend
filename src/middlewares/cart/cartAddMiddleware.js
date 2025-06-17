import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const createNewCartItems = [
  body("userId").isUUID().withMessage("user_id harus merupakan UUID"),
  body("productId").isUUID().withMessage("product_id harus merupakan UUID"),
  body("quantity")
    .isNumeric({ min: 1 })
    .withMessage("quantity minimal harus satu"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot Post Item to Cart, make sure the data properly",
        error
      );
    }

    next();
  },
];

export default createNewCartItems;
