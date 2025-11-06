import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("mongodb connected"))
.catch((err) => console.log("db connection error:", err));

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
