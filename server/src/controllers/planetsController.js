const planets = require('./../models/planetsModel');

exports.getAllPlanets = (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: planets,
    })
};