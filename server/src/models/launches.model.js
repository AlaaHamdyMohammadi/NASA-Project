const Launch = require('./launches.mongo');
const Planet = require('./planets.mongo');

//const launches = new Map();

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
  const planet = await Planet.find({
    keplerName: launch.target,
  })
  if(!planet){
    throw new Error('No matching planet found')
  }
  await Launch.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {upsert: true})
}



// function addNewLaunch(launch){
//     latestFlightNumber++;
//     launches.set(
//       latestFlightNumber,
//       Object.assign(launch, {
//         success: true,
//         upcoming: true,
//         customer: ["Zero to master", "NASA"],
//         flightNumber: latestFlightNumber,
//       })
//     );
// }

async function getLatestFlightNumber(){
  const latestLaunch = await Launch.findOne().sort("-flightNumber");
  if(!latestLaunch){
    return  DefaultFlightNumber = 100;
  } 
  return latestLaunch.flightNumber 
}

async function addNewLaunch(launch) {
  const latestFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["Zero to master", "NASA"],
    flightNumber: latestFlightNumber,
  });

  await saveLaunch(newLaunch)
}

async function existsLaunchWithId(launchId){
    return await Launch.findOne({
      flightNumber: launchId,
    });
}

async function abortLaunchById(launchId){
    const aborted = await Launch.updateOne({
      flightNumber: launchId,
    }, {upcoming: false, success: false})

    return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};