const userService = require("../services/userService.js");

const userController = {
  updateUser: async (req, res,next) => {
    try {

      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res,next) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      next(err)
    }
  },

  getUserById: async (req, res,next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err)
    }
  },

  getAllUsers: async (req, res,next) => {
    try {
      const users = await userService.getAllUsers(req.query.new);
      res.status(200).json(users);
    } catch (err) {
      next(err)
    }
  }
};


module.exports = userController;
