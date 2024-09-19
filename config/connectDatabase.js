const sequelize = require('./database');

const connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Veritabanı başarıyla bağlantı sağladı.');
      await sequelize.sync();
      console.log('Model başarıyla senkronize edildi.');
    } catch (err) {
      console.error('Veritabanı bağlantı hatası:', err);
    }
  };
  module.exports ={connectToDatabase} ;