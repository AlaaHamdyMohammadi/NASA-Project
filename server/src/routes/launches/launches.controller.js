const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

exports.httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

exports.httpPostAddNewLaunch = (req, res) => {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
};
