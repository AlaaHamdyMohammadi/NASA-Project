const axios = require('axios');
const Launch = require('./launches.mongo');
const Planet = require('./planets.mongo');

//const launches = new Map();

const launch = {
    flightNumber: 100, //flight_number
    mission: 'Kepler Exploration X', //name
    rocket: 'Explorer Is1', //rocket.name
    launchDate: new Date('December 27, 2030'), //date_local
    target: 'Kepler-442 b', //not applicable
    customers: ['ZTM', 'NASA'], //payload.customers
    upcoming: true, //upcoming
    success: true, //success
}

saveLaunch(launch);

const APACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;

async function loadLaunchesData(){
  console.log('Downloading Data');
  const res = await axios.post(APACEX_API_URL, {
    query: {},
    options:{
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          }
        },{
          path: 'payloads',
          select: {
            'customers': 1
          }
        }
      ]
    }
  })
}


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
  loadLaunchesData,
};