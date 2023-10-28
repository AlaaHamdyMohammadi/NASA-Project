const express = require("express");
const planetsRouter = express.Router();

const { getAllPlanets } = require("./planets.contoller");

planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
