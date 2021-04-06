const express = require("express");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { mongoose } = require("./config/mongoose");
const cors = require("cors");
require("./Events/Consumer");

require("./config/redisSub")
require("./config/redisPub")


const userWalletRouter = require("./routes/walletUserRouter");

console.log("--------> from app.js ------>");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500).json({
    status: "UNKOWN",
    message: err.message,
  });
});

app.use("/user/wallet", userWalletRouter);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

module.exports = app;
