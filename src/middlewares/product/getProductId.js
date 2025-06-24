import { param, validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const getProductId = [
  param("id").isUUID().withMessage("ID must be a valid UUID"),
  body("productName").notEmpty().withMessage("harus diisi"),
  body("productPrice").notEmpty().isNumeric().withMessage("harus angka"),
  body("productDescription").notEmpty().withMessage("harus diisi"),
  body("stock")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("harus angka dan minimal 1"),
  body("category")
    .notEmpty()
    .isIn(["ALL", "FOOD", "ACCESSORIES", "ANIMAL"])
    .withMessage("harus diisi"),
  body("productImage").notEmpty().isURL().withMessage("harus berupa url"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return sendErrorResponse(res, 400, "Category Unknown", error);
    }
    next();
  },
];

export default getProductId;
