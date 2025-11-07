import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error(" DB Connection Error:", err.message));

app.use(express.json());

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
