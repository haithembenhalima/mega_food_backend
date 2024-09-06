const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser"); 
require('dotenv').config();
const ApiError = require("./utils/ApiError");
const mountRoutes = require("./routes/index.route");
const {globalErrorHandler} = require("./middlewares/error.middleware");
const limiter = require("./config/rateLimiter.config")


// create app form express
const app = express();

// Global express middlewares
app.use(
  bodyParser.json({
    // handling the request body of chargily
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({limit: '3mb'}));
app.use(cors());
app.use(limiter);
app.use(morgan());

// all the routes mounted here
mountRoutes(app);


app.all('*',(req,res,next)=>{
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// Global Error handling middleware
app.use(globalErrorHandler)


// export the app
module.exports = app;