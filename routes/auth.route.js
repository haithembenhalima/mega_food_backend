const express = require('express');
const AuthController = require('../controllers/auth.controller')
const {signupValidator, verifyResetCodeValidator} = require('../utils/validators/auth.validator')
const { permessions } = require("../middlewares/permessions.middleware");

const routes = express.Router();

routes.post('/signup', signupValidator,  AuthController.signup);
routes.post('/login', AuthController.login);
routes.post('/forgotPassword', permessions("user"), AuthController.forgotPassword);
routes.post('/verifyResetCode', permessions("user"), verifyResetCodeValidator, AuthController.verifyResetCode);
routes.post('/resetPassword', permessions("user"), AuthController.resetPassword)

module.exports = routes;