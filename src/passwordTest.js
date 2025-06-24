import { body, validationResult } from "express-validator";
import sendErrorResponse from "./utils/responseHandler/errorResponseHandler.js";
import { hash, compare } from "bcryptjs";
import sendSuccessResponse from "./utils/responseHandler/successResponseHandler.js";
import express from "express";

const router = express.Router();

export const passwordTest = [
  body("password").notEmpty().withMessage("isi dong"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return sendErrorResponse(res, 400, "ada yang salah sama password", err);
    }
    next();
  },
];

export const passwordControl = async (req, res) => {
  try {
    const { password } = req.body;

    const passwordHashing = await hash(password, 10);

    console.log("hashed password: ", passwordHashing);

    return sendSuccessResponse(
      res,
      200,
      "password berhasil di hashed",
      passwordHashing
    );
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", {
      message: err.message,
    });
  }
};

router.post("/password", passwordTest, passwordControl);

export default router;
// $2b$10$1AC3UEcvMqSlxpgUcidpgumc3cdM2sBvYXFQ0IdidZdFJFf9dDJcK
// $2b$10$4dsW/eIGKCUCrVsudMoF9ezC55ZB9SpYyEtM6g.ISkljx0JZfcqZu
//$2b$10$nRQHx9J5qDEfQPRjWkm/QOwRnsWK/lZ8ptmfV5dn4wAA20W/C/Ek6
