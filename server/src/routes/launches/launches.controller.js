const { launches } = require("../../models/launches.model");

exports.getAllLaunches = (req, res) =>{
    return res.status(200).json(Array.from(launches.values()));
}