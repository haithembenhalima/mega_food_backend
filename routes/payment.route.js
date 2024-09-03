const express = require('express');
const PaymentController = require('../controllers/payment.controller');

const routes = express.Router();


routes.post('/checkout', PaymentController.checkout);

module.exports = routes;