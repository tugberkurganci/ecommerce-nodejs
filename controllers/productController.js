const productService = require("../services/productService.js");

const productController = {

  createProduct: async (req, res,next) => {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
  
        next(err)
    }
  },


  updateProduct: async (req, res,next) => {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err)
    }
  },

  deleteProduct: async (req, res,next) => {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      next(err)
    }
  },

  getProductById: async (req, res,next) => {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      next(err)
    }
  },

  getAllProducts: async (req, res,next) => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err)
    }
  },
};

module.exports = productController;
