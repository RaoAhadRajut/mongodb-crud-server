import express from "express";
import productModel from "../mobels/productsModel.mjs";

let productRouter = express.Router();
productRouter.get("/", async (req, res) => {
  try {
    let products = await productModel.find({});
    res.json({
      message: "Successfully find the users",
      product: products,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let specificProduct = await productModel.findById(id);
    if (specificProduct && id) {
      res.json({
        message: `Successfully get the Product with ID : ${id}`,
        product: specificProduct,
      });
    }
    res.json({
      message: "Cannot getting the user",
      product: "not found",
    });
  } catch (error) {
    res.json({
      message: error.message,
      product: null,
    });
  }
});

productRouter.post("/", async (req, res) => {
  let { productName, price, category, variations } = req.body;
  if (!productName || !price || !category || !variations) {
    res.json({
      message: "Please enter the data correctly",
      code: 400,
    });
  }
  try {
    let productDetails = req.body;
    let productData = new productModel(productDetails);
    await productData.save();
    res.json({
      message: "Successfully added the product in DB",
      addedProduct: productData,
    });
  } catch (error) {
    console.log("Canot add the data");
  }
});

productRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let productID = await productModel.findById(id);
    if (productID) {
      await productID.deleteOne(productID);
      res.json({
        message: "successfully deleted the user",
        code: 200,
      });
    } else {
      res.json({
        message: "can't find the user",
      });
    }
  } catch (error) {
    res.json({
      message: "Error in seleting the user",
    });
  }
});

productRouter.patch("/:id", async (req, res) => {
  let{ id }= req.params;
  let  { productName, price, category, variations } = req.body;
  if (!productName || !price || !category || !variations) {
    res.json({ message: "Please give the details correctly" });
  } else {
    try {
      let updatedProduct = {productName,price,category,variations}
      let productAfterUpdate = await productModel.findByIdAndUpdate(id, updatedProduct,{new: true});
      res.json({
        message: "successfully updated the product",
        productAfterUpdate,
      });
    } catch (error) {
      res.json({
        message: "Cannot find the product with the specific Id",
      });
    }
  }
});

export default productRouter;