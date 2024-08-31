const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },


});

module.exports = Wishlist;
