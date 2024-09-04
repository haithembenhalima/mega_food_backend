const rateLimit = require("express-rate-limit");


// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });

module.exports = limiter;