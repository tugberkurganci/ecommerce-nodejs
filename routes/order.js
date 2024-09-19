const router = require("express").Router();
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders
  
} = require("../controllers/orderController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../services/authService');

router.post("/", createOrder);

router.put("/:id", verifyTokenAndAdmin, updateOrder);

router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

router.get("/finduserorders/:id", verifyTokenAndAuthorization, getUserOrders);

router.get("/", verifyTokenAndAdmin, getAllOrders);

module.exports = router;
