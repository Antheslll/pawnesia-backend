import express from "express";
import viewOrder from "../controllers/order/viewOrder.js";

const router = express.Router();

router.get("/view", viewOrder);

export default router;
