const Launch = require('./launches.mongo');
const Planet = require('./planets.mongo');
const launches = new Map();

let latestFlightNumber = 100;
 
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer Is1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function getAllLaunches(){
    return await Launch.find({});
}

async function saveLaunch(launch){
  const planet = await Planet.findOne({
    keplerName: launch.target,
  })
  if(!planet){
    throw new Error('No matching planet found')
  }
  await Launch.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {upsert: true})
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
      latestFlightNumber,
      Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ["Zero to master", "NASA"],
        flightNumber: latestFlightNumber,
      })
    );
}

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};