const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = Order;
