const { getAllLaunches } = require("../../models/launches.model");

exports.httpGetAllLaunches = (req, res) =>{
    return res.status(200).json(getAllLaunches());
}