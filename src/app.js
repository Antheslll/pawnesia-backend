import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userInfoRoutes from "./routes/userInfoRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cloudUploadRoutes from "./routes/cloudUploadRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passwordRoutes from "./passwordTest.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} Token: ${req.headers.authorization}`);
  next();
});
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userInfoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", cloudUploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/test", passwordRoutes);
export default app;
