'use strict';
var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express(),
mongoose     = require('mongoose'),
SubjectInfo     = require('./Models/SubjectInfo'), //created model loading here
SubjectSchedule = require('./Models/SubjectSchedule');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./Routes/Routes'); //importing route
routes(server); //register the route
server.listen((process.env.PORT || 8080), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
});
console.log(mongoose.connection.readyState);