const orderDao = require("../dao/orderDao");
const userDao = require("../dao/userDao");
const productDao = require("../dao/productDao");

const orderService = {
  createOrder: async (userId, products, address) => {
    const productDetails = await productDao.getProductDetails(products);
    const totalAmount = orderService.calculateTotalAmount(productDetails);
    const user = await userDao.checkUserBalance(userId, totalAmount);

    const newOrder = await orderDao.createOrder(userId, productDetails, totalAmount, address);
    await userDao.updateUserBalance(user, totalAmount);

    return newOrder;
  },

  updateOrder: async (orderId, orderData) => {
    return await orderDao.updateOrder(orderId, orderData);
  },

  deleteOrder: async (orderId) => {
    return await orderDao.deleteOrder(orderId);
  },

  getUserOrders: async (userId) => {
    return await orderDao.findOrdersByUser(userId);
  },

  getAllOrders: async () => {
    return await orderDao.findAllOrders();
  },


  calculateTotalAmount: (productDetails) => {
    return productDetails.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );
  }
};

module.exports = orderService;
