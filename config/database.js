const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:/Users/Tuğberk/Desktop/ecommerce-api-tugberk/database.sqlite'

})

module.exports = sequelize;
