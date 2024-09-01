const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiredAt:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  discount:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }

});

module.exports = Coupon;
