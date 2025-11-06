import mongoose, { Schema, Types } from "mongoose";
let productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    variations: { type: Boolean, required: true },
  },
  { timestamps: true }
);
productSchema.path('_id');
let productModel = mongoose.model("products", productSchema);

export default productModel;