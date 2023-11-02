const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

exports.httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

exports.httpPostAddNewLaunch = (req, res) => {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ status: "Faild launch" });
  } 
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)){
    return res.status(400).json({ status: "Faild Date" });
  } 
  addNewLaunch(launch);
  return res.status(201).json(launch);
};
