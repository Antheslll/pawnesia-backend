import express from "express";
import getProductCategories from "../middlewares/product/getProductCategoriesMiddleware.js";
import {
  showProducts,
  showSpecificProduct,
} from "../controllers/product/productFilteredController.js";
import getProductDetails from "../middlewares/product/getProductDetails.js";

const router = express.Router();

router.get("/", getProductCategories, showProducts);
router.get("/:uuid", getProductDetails, showSpecificProduct);

export default router;
