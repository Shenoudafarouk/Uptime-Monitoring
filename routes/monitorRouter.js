const express = require("express");
const monitorController = require("../controller/monitorController");
const passport = require("passport");
const monitorValidator = require('../validation/monitorValidation')

const router = express.Router();

const isAuth = passport.authenticate("jwt", { session: false });

// @route POST user/monitor/create
// @desc create check route
router.post("/create", isAuth, monitorValidator.createValidation, monitorController.create);

// @route PATCH user/monitor/update
// @desc update check route
router.patch("/update", isAuth, monitorController.update);

// @route DELETE user/monitor/delete
// @desc delete check route
router.delete("/delete", isAuth, monitorController.delete);

// @route POST user/monitor/pause
// @desc pause check route
router.post("/pause", isAuth, monitorController.pause);

// @route GET user/monitor/myReport
// @desc  get Report check route
router.get("/myReport", isAuth, monitorController.getMyChecks);

// @route POST user/monitor/checksByTags
// @desc  get check By Tags route
router.post("/checksByTags", isAuth, monitorController.checksByTags);

module.exports = router;
