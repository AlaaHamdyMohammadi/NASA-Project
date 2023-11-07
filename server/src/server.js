const http = require("http");
const mongoose = require("mongoose");
// require('dotenv').config();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { loadPlanets } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const app = require("./app");

const PORT = process.env.PORT || 5500;

const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

// mongoose.connection.once('open', () => {
//   console.log('MongoDB Success')
// })
// mongoose.connection.once('error', (err) => {
//   console.error(`Error is : ${err}`)
// })

const startServer = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB Successfully Connected!"))
    .catch((error) => console.log("Error: ", error));

  await loadPlanets();
  await loadLaunchesData();
  server.listen(PORT, () => console.log(`Working on port ${PORT}`));
};

startServer();
