const bcrypt = require('bcrypt');
const sequelize = require("../database/connect.database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
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
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    image: {
      type: DataTypes.JSON,
    },
    adress:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordChangedAt:{
      type: DataTypes.DATE,
      defaultValue: null,
    },
    passwordResetCode:{
      type: DataTypes.STRING,
      defaultValue: null,
    },
    passwordResetExpiresAt:{
      type: DataTypes.DATE,
      defaultValue: null,
    },
    passwordResetVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }

  },
  
  {
    // bycrypt the password before saving
    hooks: {
      beforeSave: async (user, options) => {
        // Check if password is provided and has changed
        if (user.password && user.changed('password')) {
          if (typeof user.password !== 'string') {
            throw new Error('Password must be a string');
          }
          // Hash the password
          user.password = await bcrypt.hash(user.password, 8);
        } 
      },
    },
  }
    
);

module.exports = User;
