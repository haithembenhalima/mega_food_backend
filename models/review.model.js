const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ratings:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
        min: 1,
        max: 5,
      },
  },

});

module.exports = Review;
