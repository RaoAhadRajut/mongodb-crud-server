import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("DB Connection Error:", err.message));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRouter);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
