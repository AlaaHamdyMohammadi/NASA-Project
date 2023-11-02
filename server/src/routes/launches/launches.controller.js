const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

exports.httpGetAllLaunches = (req, res) =>{
    return res.status(200).json(getAllLaunches());
}

exports.httpPostAddNewLaunch = (req, res) => {
  return res.status(200).json(addNewLaunch());
};