const express = require('express');
const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpPostAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post("/", httpPostAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;