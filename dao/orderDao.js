const Order = require("../models/Order");

const orderDao = {
  createOrder: async (userId, products, totalAmount, address) => {
    return await Order.create({
      userId,
      products,
      amount: totalAmount,
      address,
      status: 'pending',
    });
  },

  updateOrder: async (orderId, orderData) => {
    return await Order.update(orderData ,{
      where: { id: orderId },
      returning: true,
      plain: true
    });
  },

  deleteOrder: async (orderId) => {
    return await Order.destroy({ where: { id: orderId } });
  },

  findOrdersByUser : async (id) => {
    const orders = await Order.findAll({ where: { userId: id } });
  
    if (orders.length === 0) {
      throw new Error('User not found'); 
    }
  
    return orders;
  },

  findAllOrders: async () => {
    return await Order.findAll();
  },


};

module.exports = orderDao;
