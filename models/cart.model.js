const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Cart = sequelize.define("Cart", {
  totalCartPrice: {
    type: DataTypes.FLOAT,
    default: 0
  },
  totalPriceAfterDiscount: {
    type: DataTypes.FLOAT,
    default: 0
  },
  isUsedCoupon:{
    type: DataTypes.BOOLEAN,
    default: false
  }
});

module.exports = Cart;
