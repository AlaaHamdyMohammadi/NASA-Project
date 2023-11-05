const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

exports.httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
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

exports.httpAbortLaunch = (req, res) => {
    const launchId = +req.params.id;

    if (!existsLaunchWithId(launchId)){
        return res.status(404).json({
            status: "Launch not found",
        });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}
