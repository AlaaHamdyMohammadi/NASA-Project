const express = require("express");
const planetsRouter = express.Router();

const { httpGetAllPlanets } = require("./planets.contoller");

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
