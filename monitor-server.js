const Monitor = require("./lib/monitor");
const MailService = require("./services/MailService");
const MonitorModel = require("./models/Monitor");
const monitors = [];
const urls = [];

async function pingServers(monitorData, prevData) {
  let monitor;
  if (prevData) {
    monitor = new Monitor(prevData, monitorData);
  } else {
    monitor = new Monitor(monitorData);
  }

  monitor.on("up", function (res, state) {
    console.log("Yay!! " + state.website + " is up.");
    updateDate(res, state);
  });

  monitor.on("down", async function (res, state) {
    if (
      monitorData.threshold == monitor.totalDownTimes ||
      monitor.totalDownTimes == 1
    ) {
      console.log(monitorData.userEmail);
      new MailService().send({
        to: monitorData.userEmail,
        type: "ALERT_NOTIFICATION",
        variables: {
          "[URL]": res.website,
          "[RESPONSE_TIME]": res.responseTime,
          "[STATUS_CODE]": res.statusCode,
          "[STATUS_MESSAGE]": res.statusMessage,
        },
      });
    }
    updateDate(res, state);
    console.log("ops!! " + state.website + " is down.");
  });

  monitor.on("error", function (res, state) {
    if (
      monitorData.threshold == monitor.totalDownTimes ||
      monitor.totalDownTimes == 1
    ) {
      console.log(monitorData.userEmail);
      new MailService().send({
        to: monitorData.userEmail,
        type: "ALERT_NOTIFICATION",
        variables: {
          "[URL]": state.website,
          "[RESPONSE_TIME]": state.responseTime,
          "[STATUS_CODE]": state.statusCode,
          "[STATUS_MESSAGE]": state.statusMessage,
        },
      });
    }
    updateDate(res, state);
    console.log("error!! " + state.website + " is crash.");
  });

  monitor.on("stop", function (res) {
    updateDate(state);
    console.log(state.website + " monitor has stopped.");
  });

  urls.push(monitorData.website);
  monitors.push(monitor);
  //console.log(monitor);
  //console.log(urls);

  return monitor;
}

async function updateDate(res, state) {
  try {
    let monitor = await MonitorModel.findOne({ website: state.website });
    if (monitor) {
      let availability =
        ((monitor.totalRequests - monitor.totalDownTimes) /
          monitor.totalRequests) *
        100;
      
      if (state.statusCode == 500) {
        await MonitorModel.updateMany(
          { website: state.website },
          {
            $set: {
              isUp: false,
              totalRequests: monitor.totalRequests + 1,
              totalDownTimes: monitor.totalDownTimes + 1,
              lastDownTime: new Date(),
              lastRequest: new Date(),
              avgResponseTime:
                (monitor.avgResponseTime + state.responseTime) /
                monitor.totalRequests,
              availability,
            },
          }
        );
      } else {
        await MonitorModel.updateMany(
          { website: state.website },
          {
            $set: {
              ...state,
              avgResponseTime:
                (monitor.avgResponseTime + res.responseTime) /
                monitor.totalRequests,
              availability,
            },
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = pingServers;
