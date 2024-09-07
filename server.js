const http = require('http');
const app = require('./app');
const logger = require("./config/logger.config");


const port = process.env.SERVER_PORT
const server = http.createServer(app);
server.keepAliveTimeout = 60000;
server.timeout = 7000;
server.maxHeadersCount = 30;

server.listen(port,()=>{
  console.log("server is running on port: ", port);
});

server.on("error",(err) => {
  logger.error(err)
})