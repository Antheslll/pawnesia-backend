import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const createNewCartItems = [
  body("userId")
    .matches(/^CU\d{3}$/)
    .withMessage("user_id harus memiliki format CUXXX"),
  body("productId")
    .matches(/^PR\d{3}$/)
    .withMessage("product_id harus memiliki format PRXXX"),
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
