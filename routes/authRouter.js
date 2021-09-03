const express = require('express');
const authValidator = require('../validation/authValidation');
const authController = require("../controller/authController")

const router = express.Router();

// @route POST /auth/signup
// @desc signup route
router.post('/signup', authValidator.signupValidation , authController.signup)

// @route POST /auth/signup
// @desc signup route
router.post("/verifyEmail", authController.verifyEmail);

// @route POST /auth/login
// @desc login route / return JWT token
router.post('/login', authValidator.loginValidation, authController.login)


module.exports = router;