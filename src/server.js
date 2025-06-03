import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import generatedCustomerId from "./utils/generateCustomerId.js";

dotenv.config();

const app = express();

app.use(json());

//routes

app.use("/auth", authRoutes);

console.log(await generatedCustomerId());
const PORT = 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
