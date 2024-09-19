const orderService = require("../services/orderService");

const orderController = {

  createOrder: async (req, res,next) => {
    try {
      //jwtden aldığı user id ile işlem yapıyor
      const userId = req.user.id;
      const { products, address } = req.body;
      const newOrder = await orderService.createOrder(userId, products, address);
      res.status(201).json(newOrder);
    } catch (err) {
      next(err)
    }
  },

  updateOrder: async (req, res,next) => {
    try {
      const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
      res.status(200).json(updatedOrder);
    } catch (err) {
      next(err)
    }
  },

  deleteOrder: async (req, res,next) => {
    try {
      await orderService.deleteOrder(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
    
      next(err)
    }
  },

  getUserOrders: async (req, res,next) => {
    try {
      const orders = await orderService.getUserOrders(req.params.id);
      res.status(200).json(orders);
    } catch (err) {
      next(err)

    }
  },

  getAllOrders: async (req, res,next) => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      next(err)

    }
  },

}
module.exports = orderController;
