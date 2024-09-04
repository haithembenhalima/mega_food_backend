const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();
const ApiError = require("./utils/ApiError");
const mountRoutes = require("./routes/index.route");
const {globalErrorHandler} = require("./middlewares/error.middleware");
const { cp } = require("fs");
// create app form express
const app = express();

// express middlewares
const bodyParser = require("body-parser"); 
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors());

// all the routes mounted here
mountRoutes(app);


app.all('*',(req,res,next)=>{
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error handling middleware
app.use(globalErrorHandler)

// server listening
app.listen(process.env.SERVER_PORT,()=>{
  console.log("server is running on port: ", process.env.SERVER_PORT);
});
