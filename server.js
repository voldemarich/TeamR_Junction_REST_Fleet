/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;

//** Data models registration section **//

User = require('./models/users');
Token = require('./models/tokens');
Order = require('./models/orders');
Violation = require('./models/violations');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fleetboard');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var userroutes = require('./routes/userroute.js'); //importing route
userroutes(app); //register the route
var orderroutes = require('./routes/orderroute.js'); //importing route
orderroutes(app); //register the route

app.param('orderNumber', function(req, res, next, orderNumber){
    req.param.orderNumber = orderNumber;
    return next()
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

//** Now launching the watcher **//

var mqtt_watcher = require("./mqtt_watcher/mqtt_watcher");

mqtt_watcher();