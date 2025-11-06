import express from "express";
import productModel from "../models/productsModel.js";

const productRouter = express.Router();

// GET all products
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ message: "Successfully fetched products", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: `Product fetched with ID: ${id}`, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - create new product
productRouter.post("/", async (req, res) => {
  const { productName, price, category, variations } = req.body;

  // required fields validation
  if (!productName || !price || !category) {
    return res.status(400).json({
      message: "Please enter productName, price and category correctly"
    });
  }

  try {
    const productData = new productModel({ productName, price, category, variations });
    await productData.save();
    res.status(201).json({
      message: "Product added successfully",
      addedProduct: productData
    });
  } catch (error) {
    console.error("POST Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// PATCH - update product
productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, price, category, variations } = req.body;

  if (!productName || !price || !category) {
    return res.status(400).json({ message: "Please provide productName, price, category" });
  }

  try {
    const updatedProduct = { productName, price, category, variations };
    const productAfterUpdate = await productModel.findByIdAndUpdate(id, updatedProduct, { new: true });
    if (!productAfterUpdate) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", productAfterUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - delete product
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productToDelete = await productModel.findById(id);
    if (!productToDelete) return res.status(404).json({ message: "Product not found" });

    await productToDelete.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default productRouter;
