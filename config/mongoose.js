const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
// mongoose.set('debug', true);

if (process.env.NODE_ENV === "test") {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/upTime-managment-test",
    { useNewUrlParser: true },
    function (err) {
      if (err) return console.error(err);
      console.log("*****************");
      console.log("connection successed to mongoDb>>> upTime-managment-test");
    }
  );
} else {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/upTime-managment",
    { useNewUrlParser: true },
    function (err) {
      if (err) return console.error(err);
      console.log("*****************");
      console.log("connection successed to mongoDb>>> upTime-managment");
    }
  );
}
module.exports = {
  mongoose,
};
