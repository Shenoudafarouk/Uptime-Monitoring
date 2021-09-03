const AuthService = require("../services/AuthService");
const autoBind = require("auto-bind");

class AuthController {

  constructor() {
    this.authService = new AuthService();
    autoBind(this);
  }

  async signup(req, res, next) {
    try {
      const response = await this.authService.signup(req.body);
      return res.send({ status: "OK", result: response });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const response = await this.authService.verifyEmail(req.body);
      return res.send({ status: "VERIFIED_SUCCESSFULLY", result: response });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async login(req, res, next) {
    try {
      const response = await this.authService.login(req.body);
      return res.send(response);
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
