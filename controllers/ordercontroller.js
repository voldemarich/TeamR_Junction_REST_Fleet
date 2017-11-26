/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    Order = mongoose.model('Orders'),
    Violation = mongoose.model('Violations');

var authcontroller = require("./authcontroller");
var costcalc = require('../util/costscalc');

exports.get_all_orders = function (req, res) {
    authcontroller.authorize_username(req, res, function (uname) {
        Order.find({username: uname}, function
            (err, orders) {
            if (err) res.send(err);
            res.json(orders);
        })
    })
};

exports.get_order = function (req, res) {
    authcontroller.authorize_username(req, res, function (uname) {
    Order.findOne({order_number:req.param.orderNumber, username:uname}, function
        (err, order) {
        if (err) res.send(err);
        res.json(order);
    })
    })
};

exports.register_multiple_orders = function (req, res) {
    authcontroller.authorize_username(req, res, function (uname) {
        if (req.body instanceof Object) {
            if (req.body.orders === null) {
                res.sendStatus(400);
                return;
            }
            else {
                req.body = req.body.orders;
            }
        }
        if (!req.body instanceof Array) {
            arr = [];
            arr.push(req.body);
            req.body = arr;
        }
        var success = true;
        req.body.forEach(function (p1, p2, p3) {
            order_col = p1;
            order_col.username = uname;
            order_col.cost = costcalc.calculate(order_col);

            var new_order = new Order(order_col);
            new_order.save(function (err, order) {
                if (err || order === null) {
                    success = false;
                }
                //console.log(order);
            });

        });
        res.json(success ? {"result":"success"} : {"result":"fail"});
    });
};

// exports.register_order = function (req, res) {
//     authcontroller.authorize_username(req, res, function (uname) {
//         order_col = req.body;
//         order_col.username = uname;
//
//         var new_order = new Order(order_col);
//         new_order.save(function (err, order) {
//             if (err) {
//                 res.send(err);
//                 return;
//             }
//             res.response_stack.push(order);
//
//         });
//     })
// };

exports.delete_order = function (req, res) {
    authcontroller.authorize_username(req, res, function (uname) {
        Violation.remove({order_number: req.param.orderNumber}, function () {});
        Order.remove({order_number: req.param.orderNumber, username:uname}, function
            (err, order) {
            if (err) res.send(err);
            res.json({"result": "deleted"});
        });
    })
};