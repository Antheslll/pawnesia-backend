import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const createDraft = [
  body("userId").notEmpty().withMessage("user_id harus memiliki format CUXXX"),
  body("cartItemId").isArray().withMessage("cartItemId harus berupa array"),

  body("productData").isArray().withMessage("productData harus berupa array"),
  body("productData.*.product_id")
    .notEmpty()
    .withMessage("product_id harus memiliki format PRXXX"),
  body("productData.*.quantity")
    .isNumeric({ min: 1 })
    .withMessage("quantity minimal harus satu"),

  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot creating draft for order because the data",
        error
      );
    }

    next();
  },
];

export default createDraft;

//di salah satu elemen dalam productData ada: product_id, quantity, cart_item_id
// productData:{
//     product_id:"",
//     quantity:"",
// }
