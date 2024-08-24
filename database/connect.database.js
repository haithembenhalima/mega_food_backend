const Sequelize = require("sequelize");
const db_config = require("../config/database.config");
const sequelize = new Sequelize(
 db_config.DB,
 db_config.USER,
 db_config.PASSWORD,
  {
    host: db_config.HOST,
    dialect: db_config.dialect
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize;