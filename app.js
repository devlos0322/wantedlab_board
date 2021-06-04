const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require("cors");

const routes = require('./src/routes');
const config = require('./src/config/default.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);


app.listen(config.api.port, function () {
    console.log("Wantedlab board API is running on port " + config.api.port);
});

module.exports = app;