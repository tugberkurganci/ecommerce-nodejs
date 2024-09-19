const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../services/authService');

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

router.get("/find/:id", verifyTokenAndAdmin, userController.getUserById);

router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

module.exports = router;
