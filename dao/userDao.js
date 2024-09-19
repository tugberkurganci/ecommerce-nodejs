const User = require("../models/User");

const userDao = {
  createUser: async (userData) => {
    return await User.create(userData);
  },

  findUserByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  }

,
  updateUser: async (userId, userData) => {
    const [_, updatedUser] = await User.update(userData, {
      where: { id: userId },
      returning: true,
      plain: true
    });
    return updatedUser;
  },

  deleteUser: async (userId) => {
    await User.destroy({ where: { id: userId } });
  },

  findById: async (userId) => {
    return await User.findByPk(userId);
  },

  findAllUsers: async (newQuery) => {
    return newQuery
      ? await User.findAll({ order: [['id', 'DESC']], limit: 5 })
      : await User.findAll();
  },
  checkUserBalance: async (userId, totalAmount) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < totalAmount) throw new Error('Insufficient balance');
    return user;
  },

  updateUserBalance: async (user, totalAmount) => {
    user.balance -= totalAmount;
    return user.save();
  }
};



module.exports = userDao;
