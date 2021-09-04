const Monitor = require("../models/Monitor");
const User = require("../models/User");
const pingServers = require("../monitor-server");

class MonitorService {
  async create(data) {
    let { userId, website, threshold } = data;

    let check = await Monitor.findOne({ userId, website });

    if (check)
      throw {
        statusCode: 400,
        status: "CHECK_ALREADY_EXISTS",
        message: "this check is already exists",
      };

    data._maxListeners = 5;
    data.threshold = threshold ? threshold : 1;
    let monitor = await pingServers(data, null);
    let checkDate = await new Monitor(monitor).save();

    return checkDate;
  }

  async update(data, userId) {
    let { id, updatedData } = data;

    let check = await Monitor.findOne({ _id: id });

    if (!check)
      throw {
        statusCode: 400,
        status: "CHECK_NOT_EXIST",
        message: "This check is NOT exists",
      };

    let user = await User.findOne({ _id: userId });
    updatedData.userEmail = user.email;
    updatedData.userId = user._id;
    let prevData = {
      website: check.website,
      interval: check.interval,
    };

    updatedData.threshold = updatedData.threshold ? updatedData.threshold : 1;
    updatedData._maxListeners = 5;
    await pingServers(updatedData, prevData);

    await Monitor.updateOne({ _id: id }, { $set: updatedData });

    return;
  }

  async pause(id, userId) {
    let check = await Monitor.findOne({ _id: id, userId });

    if (!check)
      throw {
        statusCode: 400,
        status: "CHECK_NOT_EXIST",
        message: "This check is NOT exists",
      };

    check.paused = true;
    check.save();
    return check;
  }

  async delete(id, userId) {
    const check = await Monitor.findOneAndDelete({ _id: id, userId });

    if (!check)
      throw {
        statusCode: 400,
        status: "CHECK_NOT_EXIST",
        message: "This check is NOT exists",
      };

    return check;
  }

  async getMyChecks(userId) {
    const myChecks = await Monitor.find({ userId }).lean();

    if (!myChecks.length) return [];

    let checkReport = myChecks.map((check) => ({
      id: check._id,
      title: check.title,
      website: check.website,
      status: check.isUp == true ? "ONLINE" : "DOWN",
      availability: `${parseInt(check.availability)}%`,
      outages: check.totalDownTimes,
      uptime: check.uptime,
      downtime: check.downtime,
      responseTime: `${parseInt(check.avgResponseTime)} ms`,
      totalRequests: check.totalRequests,
      lastDownTime: check.lastDownTime,
      lastRequest: check.lastRequest,
    }));

    return checkReport;
  }

  async checksByTags(userId, tags) {
    const checks = await Monitor.find({ userId, tags: { $in: tags } });

    if (!checks.length) return [];

    return checks;
  }
}

module.exports = MonitorService;
