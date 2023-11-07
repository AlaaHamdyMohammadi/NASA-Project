const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const {getPagination} = require('../../services/query');

exports.httpGetAllLaunches = async (req, res) => {
  console.log(req.query);
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
};

exports.httpPostAddNewLaunch = async(req, res) => {
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
  await addNewLaunch(launch);
  return res.status(201).json(launch);
};

exports.httpAbortLaunch = async(req, res) => {
    const launchId = +req.params.id;
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch){
        return res.status(404).json({
            status: "Launch not found",
        });
    }

    const aborted = await abortLaunchById(launchId);
    if(!aborted){
      return res.status(400).json({
        status: "Launch not aborted",
      });
    }
    return res.status(200).json({ok: true});
}
