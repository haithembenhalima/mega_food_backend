const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const CartItem = sequelize.define("CartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartItem;
