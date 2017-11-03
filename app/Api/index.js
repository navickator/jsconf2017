var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var config = require("./config.js");

var routes = require("./routes/routes.facade.js");
var Promise = require("promise");

// Endpoints
var register = require("./routes/register.route.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


var router = express.Router();

//Initialize routes
routes(router);


app.use("/api", router);

app.listen(config.server.port);
console.log("Server started on:", config.server.port);