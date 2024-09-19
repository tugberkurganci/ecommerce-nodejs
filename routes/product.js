const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require('../services/authService');
const productController = require("../controllers/productController");

router.post("/", verifyTokenAndAdmin, productController.createProduct);

router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

router.get("/find/:id", productController.getProductById);

router.get("/", productController.getAllProducts);

module.exports = router;
