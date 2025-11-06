import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    variations: { type: String, required: false }, // optional
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
