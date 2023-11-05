//import axios from 'axios'

const API_URL = "http://localhost:5500";

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const res = await fetch(`${API_URL}/planets`)
  return await res.json();
  // const res = await axios.get(`${API_URL}/planets`);
  // return res;
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const res = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await res.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try{

    return await fetch(`${API_URL}/launches`, {
      method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch)
  });
}catch(err){
  console.log(err.message)
  return {
    ok: false
  }
}
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{

    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete',
    })
  }catch(err){
    console.log(err);
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};