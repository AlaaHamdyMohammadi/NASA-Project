const http = require("http");
const mongoose = require("mongoose");

const { loadPlanets } = require("./models/planets.model");
const app = require("./app");

const PORT = process.env.PORT || 5500;

const MONGO_URL =
  "mongodb+srv://NaSaProject:dcZ0aajVUQD7htVp@cluster0.ypttpqi.mongodb.net/nasa?retryWrites=true&w=majority";

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
  server.listen(PORT, () => console.log(`Working on port ${PORT}`));
};

startServer();
