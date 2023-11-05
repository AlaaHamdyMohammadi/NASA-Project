const Planet = require('./planets.mongo');
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];
 
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
          // Replace below create with insert + update = upsert
          await Planet.create({ keplerName: data.kepler_name });
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          habitablePlanets.map((planet) => {
            return planet["kepler_name"];
          })
        );
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets(){
  return await Planet.find();
}

module.exports = {
  getAllPlanets,
  loadPlanets,
};
