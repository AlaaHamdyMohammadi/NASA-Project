const http = require("http");

const { loadPlanets } = require("./models/planets.model");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const startServer = async () => {
  await loadPlanets();
  server.listen(PORT, () => console.log(`app Is working on port ${PORT}`));
};

startServer();
