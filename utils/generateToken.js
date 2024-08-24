require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (pyload) =>{
    const token = jwt.sign(
        { pyload },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );

      return token;
}