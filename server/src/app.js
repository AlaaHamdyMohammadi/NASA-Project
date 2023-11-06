const path = require('path');
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');

//const planetsRouter = require("./routes/planets/planets.route");
//const launchesRouter = require("./routes/launches/launches.route");

const api = require('./routes/api');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//app.use("/v1/planets", planetsRouter);
//app.use("/v1/launches", launchesRouter);

app.use('/v1', api);

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;
