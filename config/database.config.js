require("dotenv").config();
module.exports = 
{
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
       
}
