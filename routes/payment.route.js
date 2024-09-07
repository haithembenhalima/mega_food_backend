const express = require('express');
const PaymentController = require('../controllers/payment.controller');
const { permessions } = require("../middlewares/permessions.middleware");


const routes = express.Router();

routes.post('/checkout', permessions("user"), PaymentController.checkout);
routes.post('/webhook', permessions("admin"),  PaymentController.webhook);

module.exports = routes;