const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
 // storage: 'C:/Users/Tuğberk/Desktop/ecommerce-api-tugberk/database.sqlite'
  host: '10.55.255.253',  
  username: 'admin',    
  password: 'ATtkktxx3j'  
})

module.exports = sequelize;
