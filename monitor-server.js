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

  monitor
  monitor.on("up", function (res, state) {
    console.log("Yay!! " + state.website + " is up.");
    updateDate(res, state, monitor);
  });

  monitor.on("down", async function (res, state) {
    if (
      monitorData.threshold == monitor.totalDownTimes ||
      monitor.totalDownTimes == 1
    ) {
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
    updateDate(res, state, monitor);
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
    updateDate(res, state, monitor);
    console.log("error!! " + state.website + " is crash.");
  });

  monitor.on("stop", function (res, state) {
    console.log(state.website + " monitor has stopped.");
  });

  urls.push(monitorData.website);
  monitors.push(monitor);
  //console.log(monitor);
  //console.log(urls);
  //console.log(monitorData);
  return monitor;
}

async function updateDate(res, state, monitorObj) {
  try {
    let monitor = await MonitorModel.findOne({ website: monitorObj.website, userId: monitorObj.userId });
    if (monitorObj._maxListeners == monitor.maxCheck) {
      monitorObj.stop()
    }
    if (monitor) {
      if (monitor.paused){
        monitorObj.pause()
        console.log(state.website + " Monitor has Paused.");
      }
      let availability =
        ((monitor.totalRequests - monitor.totalDownTimes) /
          monitor.totalRequests) *
        100;
      
      if (state.statusCode == 500) {
        await MonitorModel.updateMany(
          { website: monitorObj.website, userId: monitorObj.userId },
          {
            $set: {
              ...state,
              maxCheck: monitor.maxCheck + 1,
              avgResponseTime:
                (monitor.avgResponseTime + state.responseTime) /
                monitor.totalRequests,
              availability,
            },
          }
        );
      } else {
        await MonitorModel.updateMany(
          { website: state.website, userId: monitorObj.userId },
          {
            $set: {
              ...state,
              maxCheck: monitor.maxCheck + 1,
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
