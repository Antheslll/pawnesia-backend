import express from "express";
import getComment, {
  createComment,
  showComment,
} from "../controllers/comment/commentControllers.js";
import getProductDetails from "../middlewares/product/getProductDetails.js";
import createCommentValidation from "../middlewares/comment/createCommentValidator.js";

const router = express.Router();

router.get("/show", showComment);
router.get("/:uuid", getProductDetails, getComment);
router.post("/create", createCommentValidation, createComment);
export default router;
