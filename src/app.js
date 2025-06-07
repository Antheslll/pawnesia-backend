import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userInfoRoutes from "./routes/userInfoRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dotnenv from "dotenv";
// import Users from "./models/user.js";

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

export default app;
