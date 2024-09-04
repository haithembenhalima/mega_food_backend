// logger.js
const winston = require('winston');
const { format, transports } = winston;

const logger = winston.createLogger({
  level: 'error', // Only log errors
  format: format.combine(
    format.timestamp(),
    format.json() // Log in JSON format
  ),
  transports: [
    new transports.File({
      filename: 'errors.log', // Name of the log file
      level: 'error', // Only log errors
    }),
  ],
});

module.exports = logger;
