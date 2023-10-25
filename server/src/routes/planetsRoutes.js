const express = require('express');
const planetsController = require('./../controllers/planetsController');
const planetsRouter = express.Router();

planetsRouter.route('/').get(planetsController.getAllPlanets)

module.exports = planetsRouter;