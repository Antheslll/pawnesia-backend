import express from "express";
import createNewCartItems from "../middlewares/cart/cartAddMiddleware.js";
import {
  cartItemsDelete,
  cartItemsQuantityControll,
  createNewItems,
  displayCartItems,
} from "../controllers/cart/cartController.js";
import viewCartItems from "../middlewares/cart/cartViewMiddleware.js";
import cartQuantityUpdate from "../middlewares/cart/cartQuantityUpdateMiddleware.js";

const router = express.Router();

router.post("/create/", createNewCartItems, createNewItems);
router.get("/view/:userId", viewCartItems, displayCartItems);
router.delete("/delete/:id", cartItemsDelete);
router.put(
  "/update/quantity/:itemId",
  cartQuantityUpdate,
  cartItemsQuantityControll
);

export default router;
