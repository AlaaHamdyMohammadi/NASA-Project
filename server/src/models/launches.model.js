const axios = require("axios");
const Launch = require("./launches.mongo");
const Planet = require("./planets.mongo");

//const launches = new Map();

// const launch = {
//   flightNumber: 100, //flight_number
//   mission: "Kepler Exploration X", //name
//   rocket: "Explorer Is1", //rocket.name
//   launchDate: new Date("December 27, 2030"), //date_local
//   target: "Kepler-442 b", //not applicable
//   customers: ["ZTM", "NASA"], //payload.customers
//   upcoming: true, //upcoming
//   success: true, //success
// };

// saveLaunch(launch);

const APACEX_API_URL = `https://api.spacexdata.com/v4/launches/query`;

async function populateLaunches() {
  console.log("Downloading Data");
  const res = await axios.post(APACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if(res.status !== 200){
    console.log(`Problem downloading launch data`);
    throw new Error(`Launch data download failed`)
  }
  const launchDocs = res.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    //console.log(`${launch.flightNumber} - ${launch.mission}`)
    //Populate launches collection
    await saveLaunch(launch);
  }
}




async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch Data already loaded");
    // return;
  }else{
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await Launch.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getAllLaunches(skip, limit) {
  return await Launch.find({}, { _id: 0, __v: 0 }).sort({flightNumber: -1}).skip(skip).limit(limit);
}

async function saveLaunch(launch) {
  await Launch.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
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

async function getLatestFlightNumber() {
  const latestLaunch = await Launch.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return (DefaultFlightNumber = 100);
  }
  return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
  const planet = await Planet.find({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found");
  }
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["Zero to master", "NASA"],
    flightNumber: latestFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await Launch.updateOne(
    {
      flightNumber: launchId,
    },
    { upcoming: false, success: false }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
  loadLaunchesData,
};
