const userDao = require("../dao/userDao.js");
const CryptoJS = require("crypto-js");

const userService = {
  updateUser: async (userId, userData) => {
    if (userData.password) {
      userData.password = CryptoJS.AES.encrypt(
        userData.password,
        process.env.PASS_SEC
      ).toString();
    }

    const updatedUser = await userDao.updateUser(userId, userData);
    return updatedUser;
  },

  deleteUser: async (userId) => {
    await userDao.deleteUser(userId);
  },

  getUserById: async (userId) => {
    const user = await userDao.findById(userId);
    if (user) {
      const { password, ...others } = user.dataValues;
      return others;
    }
    throw new Error("User not found");
  },

  getAllUsers: async (newQuery) => {
    return await userDao.findAllUsers(newQuery);
  },

};

module.exports = userService;
