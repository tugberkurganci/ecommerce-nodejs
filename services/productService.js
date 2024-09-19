const productDao = require("../dao/productDao.js");

const productService = {
  createProduct: async (productData) => {
    return await productDao.createProduct(productData);
  },

  updateProduct: async (productId, productData) => {
    return await productDao.updateProduct(productId, productData);
  },

  deleteProduct: async (productId) => {
    await productDao.deleteProduct(productId);
  },

  getProductById: async (productId) => {
    return await productDao.findProductById(productId);
  },

  getAllProducts: async () => {
    return await productDao.findAllProducts();
  }
};

module.exports = productService;
