import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";

let app = express();
let port = 3000;
let db_url = process.env.MONGO_DB_URL;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Error Message : ", err.message);
  });

app.use(express.json());
app.use(express.urlencoded());
app.use("/",productRouter)
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});