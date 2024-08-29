const express = require('express');
const AuthController = require('../controllers/auth.controller')
const {signupValidator} = require('../utils/validators/auth.validator')

const routes = express.Router();

routes.post('/signup', signupValidator,  AuthController.signup);
routes.post('/login', AuthController.login);
routes.post('/forgotPassword', AuthController.forgotPassword);
routes.post('/verifyResetCode', AuthController.verifyResetCode);

module.exports = routes;