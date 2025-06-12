import { validationResult, body } from "express-validator";
import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";

const createCommentValidation = [
  body("userId")
    .matches(/^CU\d{3}$/)
    .withMessage("user_id harus memiliki format CUXXX"),
  body("productId")
    .matches(/^PR\d{3}$/)
    .withMessage("product_id harus memiliki format PRXXX"),
  body("comment").notEmpty().withMessage("comment tidak boleh kosong"),
  body("link"),
  body("rating").isNumeric({ min: 1, max: 5 }).withMessage("Angka harus 1-5"),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        "Cannot Comment, make sure the data properly",
        error
      );
    }

    req.commentComplete = {
      body: req.body,
      createdAt: new Date().toISOString(),
    };

    next();
  },
];

export default createCommentValidation;
