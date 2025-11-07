import express from "express";
import productModel from "../models/productsModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      message: "Successfully fetched all products",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetching products",
      error: error.message,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Fetched product with ID: ${id}`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetching product",
      error: error.message,
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { productName, price, category, variations } = req.body;

    if (!productName || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide productName, price and category",
      });
    }

    const newProduct = await productModel.create({
      productName,
      price,
      category,
      variations: variations ?? false,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      addedProduct: newProduct,
    });
  } catch (error) {
    console.error("🔥 POST Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while adding product",
      error: error.message,
    });
  }
});

productRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, price, category, variations } = req.body;

    const updatedData = { productName, price, category, variations };
    const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found for update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while updating product",
      error: error.message,
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found for deletion",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while deleting product",
      error: error.message,
    });
  }
});

export default productRouter;
