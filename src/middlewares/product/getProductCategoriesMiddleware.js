import { query, validationResult } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const getProductCategories = [
  query("category")
    .notEmpty()
    .withMessage("Category perlu ada")
    .isAlpha()
    .withMessage("Category harus dalam bentuk alfabet"),

  (res, req, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return sendErrorResponse(res, 400, "Category Unknown", error);
    }
    next();
  },
];

export default getProductCategories;
