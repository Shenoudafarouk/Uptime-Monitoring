const MonitorService = require("../services/MonitorService");
const User = require('../models/User')
const autoBind = require("auto-bind");

class MonitorController {
  constructor() {
    this.monitorService = new MonitorService();
    autoBind(this);
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.user.id
      let user = await User.findOne({_id: req.body.userId}).select('email')
      req.body.userEmail = user.email
      const response = await this.monitorService.create(req.body);
      return res.send({ status: "OK", result: response });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async update(req, res, next) {
    try {
      await this.monitorService.update(req.body, req.user.id);
      return res.send({ status: "UPDATED_SUCCESSFULLY" });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async delete(req, res, next) {
    try {
      const response = await this.monitorService.delete(req.body.id);
      return res.send({ status: "DELETE_SUCCESSFULLY", result: response });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async pause(req, res, next) {
    try {
      const response = await this.monitorService.pause(req.body.id);
      return res.send({ status: "PAUSED_SUCCESSFULLY", result: response });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async getMyChecks(req, res, next) {
    try {
      const response = await this.monitorService.getMyChecks(req.user.id);
      return res.send({ status: "OK", result: response, total: response.length });
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }

  async checksByTags(req, res, next) {
    try {
      const response = await this.monitorService.checksByTags(req.user.id, req.body.tags);
      return res.send({ status: "OK", result: response , total: response.length});
    } catch (error) {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        status: "SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = new MonitorController();
