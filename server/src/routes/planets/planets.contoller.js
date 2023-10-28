const { planets } = require("../../models/planets.model");

function getAllPlanets(req, res, next) {
  return res.status(200).json(planets);
}

module.exports = { getAllPlanets };
