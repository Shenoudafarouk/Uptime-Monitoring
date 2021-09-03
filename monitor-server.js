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
    console.log("Yay!! " + res.website + " is up.");
    updateDate(res ,state)
  });
  
  monitor.on("down", async function (res, state) {
    if (monitorData.threshold == monitor.totalDownTimes || monitor.totalDownTimes == 1) {
      console.log( monitorData.userEmail);
      new MailService().send({
        to: monitorData.userEmail,
        type: "ALERT_NOTIFICATION",
        variables: {
          "[URL]": state.website,
          "[RESPONSE_TIME]": res.responseTime,
          "[STATUS_MESSAGE]": res.statusMessage,
        },
      });
    }
    
    updateDate(res, state) 
    console.log("ops!! " + state.website + " is down.");
  });

  monitor.on("error", function (res, state) {
    console.log(res);
    console.log("error!! " + state.website + " is crash.");
  });

  monitor.on("stop", function (res) {
    updateDate(state)
    console.log(res.website + " monitor has stopped.");
  });

  urls.push(monitorData.website);
  monitors.push(monitor);
   //console.log(monitor);
   //console.log(urls);

   return monitor
}

async function updateDate (res, state) {
  try {
    let monitor = await MonitorModel.findOne({website: state.website})
    if (monitor) {
      let availability = ((monitor.totalRequests - monitor.totalDownTimes) / monitor.totalRequests) * 100
      await MonitorModel.updateMany({website: state.website}, { $set: {...state, avgResponseTime: parseInt((monitor.avgResponseTime + res.responseTime)/ monitor.totalRequests, 10), availability }})
    }
    
  } catch (error) {
    console.log(error);
  }
 
}


module.exports = pingServers