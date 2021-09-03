const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const logger = require("morgan");
const mongoose = require("mongoose");
require("./config/mongoose");
const cors = require("cors");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/authRouter");
const monitorRouter = require("./routes/monitorRouter");

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
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/auth", authRouter);
app.use("/user/monitor", monitorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json({
    status: "BAD_REQUEST",
    message: err.message,
  });
  console.log(err);
});

module.exports = app;
