/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;

User = require('./models/users');
Token = require('./models/tokens');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fleetboard');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/userroute.js'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);