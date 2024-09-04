require('dotenv').config();
const logger = require("../config/logger.config");

// @desc Object format for the errors in development mode
const ErrorForDevelopment = (err, res) =>{
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        err: err,
        message: err.message,
        stack: err.stack,
      });
}

// @desc Object format for the errors in production mode
const ErrorForProduction = (err, res) =>{
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        statusCode: err.statusCode || 500,
        message: err.message,
      });
}

// @desc The global Error handler middleware
exports.globalErrorHandler = (err, req, res, next)=>{
    if(process.env.NODE_ENV === 'development'){
        ErrorForDevelopment(err, res);
    }else if(process.env.NODE_ENV === 'production'){
        ErrorForProduction(err, res);
        
        // log the error in production mode
        logger.error(err.message)
    }
}