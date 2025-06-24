import express from "express";
import getProductCategories from "../middlewares/product/getProductCategoriesMiddleware.js";
import {
  createProduct,
  editProduct,
  showProducts,
  showSpecificProduct,
} from "../controllers/product/productFilteredController.js";
import getProductDetails from "../middlewares/product/getProductDetails.js";
import getCreateInfo from "../middlewares/product/getCreateProductInfo.js";
import getProductId from "../middlewares/product/getProductId.js";
const router = express.Router();

router.get("/", getProductCategories, showProducts);
router.get("/:uuid", getProductDetails, showSpecificProduct);
router.post("/create", getCreateInfo, createProduct);
router.put("/edit/:id", getProductId, editProduct);
export default router;
