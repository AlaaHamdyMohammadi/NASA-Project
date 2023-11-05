const Planet = require('./planets.mongo');
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

// const habitablePlanets = [];
  
function loadPlanets() {
  return new Promise((resolve, reject) => {
    function isHabitablePlanet(planet) {
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    }

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          //habitablePlanets.push(data);
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async() => {
        // console.log(
        //   habitablePlanets.map((planet) => {
        //     return planet["kepler_name"];
        //   })
        // );
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets(){
  return await Planet.find({});
}

async function savePlanet(planet){
  try{
    // Replace below create with insert + update = upsert
    // await Planet.create({ keplerName: data.kepler_name });
    await Planet.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
      );
    }catch(err){
      console.error('Error in save the planet : ' + err);
    }
}

module.exports = {
  getAllPlanets,
  loadPlanets,
};
