import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userInfoRoutes from "./routes/userInfoRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cloudUploadRoutes from "./routes/cloudUploadRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credetials: true,
  })
);

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userInfoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/upload", cloudUploadRoutes);
app.use("/api/cart", cartRoutes);

export default app;
