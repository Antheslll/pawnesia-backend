import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dotnenv from "dotenv";
// import Users from "./models/user.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/auth", authRoutes);

export default app;
