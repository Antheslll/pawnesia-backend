import express from "express";
import getComment from "../controllers/comment/commentControllers.js";
import getProductDetails from "../middlewares/product/getProductDetails.js";

const router = express.Router();

router.get("/:uuid", getProductDetails, getComment);

export default router;
