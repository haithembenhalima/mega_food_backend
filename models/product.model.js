const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [5, 500],
      },
    },
    images: {
      type: DataTypes.JSON,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 50,
        max: 20000,
      },
    },
    solde: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 10000,
      },
    },
    ratingAverage: {
      type: DataTypes.FLOAT,
    },
    commandNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeSave: async (product, options) => {
        // Check if password is provided and has changed
        if (product.changed('commandNumber')) {
          product.ratingAverage = product.commandNumber > 0 ? ((product.commandNumber * 5) / 100 ): 0;
        } 
      },
    },
  }
);

module.exports = Product;
