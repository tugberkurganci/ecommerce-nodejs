const Product = require("../models/Product");

const productDao = {
  createProduct: async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
  },

  updateProduct: async (productId, productData) => {
    return await Product.update( productData ,{
      where: { id: productId },
      returning: true,
      plain: true
    });
  },

  deleteProduct: async (productId) => {
    await Product.destroy({ where: { id: productId } });
  },

  findProductById: async (productId) => {
    return await Product.findById(productId);
  },

  findAllProducts: async () => {
    return await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  }
  ,  getProductDetails: async (products) => {
    return Promise.all(
      products.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        if (!product) throw new Error(`Product with ID ${item.productId} not found`);
        return {
          ...product.toJSON(),
          quantity: item.quantity,
        };
      })
    );
  }
};

module.exports = productDao;
