var express = require('express');
var energyRoutes = require("./energyRoutes.js");

var app = express();
const port = 8080;

energyRoutes(app);

app.listen(port, () => {
    console.log("API listening on port ", port);
  });