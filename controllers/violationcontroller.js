/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    Order = mongoose.model('Orders'),
    Violation = mongoose.model('Violations');

var authcontroller = require("./authcontroller");

exports.get_violations = function (req, res) {
    authcontroller.authorize_username(req, res, function (uname) {
        Violation.find({order_number:req.param.orderNumber}, function
            (err, violations) {
            if (err) res.send(err);
            res.json(violations);
        })
    })
};