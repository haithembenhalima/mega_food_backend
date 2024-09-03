const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  totalPaid:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isPaid:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  paidAt:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  orderConfirmed:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  delivredAt:{
    type: DataTypes.DATE,
    allowNull: true,
  }

});

module.exports = Order;
