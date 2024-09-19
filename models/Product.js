const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  description: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  price: { 
    type: DataTypes.DECIMAL, 
    allowNull: false 
  },
}, {
  timestamps: true,
});

module.exports = Product;
