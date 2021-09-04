const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonitorSchema = new Schema({
  monitorId: {
    type: String
  },
  title: {
    type: String,
  },
  website: {
    type: String,
    required: true,
  },
  protocol: {
    type: String,
  },
  port: {
    type: String,
  },
  interval: {
    type: Number,
    default: 10
  },
  isUp: {
    type: Boolean,
  },
  availability: {
    type: Number
  },
  threshold: {
    type: Number,
    default: 1
  },
  paused: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String
  },
  avgResponseTime: {
    type: Number,
    default: 0
  },
  totalRequests: {
    type: Number,
  },
  totalDownTimes: {
    type: Number,
  },
  lastDownTime: {
    type: Date,
  },
  lastRequest: {
    type: Date,
  },
  ignoreSSL: {
    type: Boolean,
  },
  httpOptions: {
    type: Object,
  },
  expect: {
    statusCode: {
      type: Number,
      default: 200,
    },
    contentSearch: {
      type: String,
    }
  },
  config: {
    intervalUnits: {
      type: String
    }
  },
  created_at: {
    type: Date
  },
  tags: {
    type: Array
  },
  _maxListeners: {
    type: Number
  }
});

module.exports = mongoose.model("Monitor", MonitorSchema);


