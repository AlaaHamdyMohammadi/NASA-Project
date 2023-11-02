const express = require('express');
const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpPostAddNewLaunch,
} = require("./launches.controller");

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post("/", httpPostAddNewLaunch);

module.exports = launchesRouter;