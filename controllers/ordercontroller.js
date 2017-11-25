/**
 * Created by voldemarich on 25.11.2017.
 */
/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    Order = mongoose.model('Orders');

var authcontroller = require("./authcontroller");

exports.get_all_orders = function (req, res) {
    authcontroller.authorize_username(req.header("Authorization"), function (uname) {
        if (!uname) {
            res.sendStatus(403);
            return;
        }
        Order.find({username: uname}, function
            (err, orders) {
            if (err) res.send(err);
            res.json(orders);
        })
    })
};

exports.get_order = function (req, res) {
    authcontroller.authorize_username(req.header("Authorization"), function (uname) {
        if (!uname) {
            res.sendStatus(403);
            return;
        }
    Order.findOne({order_number:req.param.orderNumber, username:uname}, function
        (err, order) {
        if (err) res.send(err);
        res.json(order);
    })
    })
};

exports.register_order = function (req, res) {
    authcontroller.authorize_username(req.header("Authorization"), function (uname) {
        console.log(uname);
        if (!uname) {
            res.sendStatus(403);
            return;
        }
        order_col = req.body;
        order_col.username = uname;

        var new_order = new Order(order_col);
        new_order.save(function (err, order) {
            if (err) res.send(err);
            res.json(order);
        });
    })
};

exports.delete_order = function (req, res) {
    authcontroller.authorize_username(req.header("Authorization"), function (uname) {
        if (!uname) {
            res.sendStatus(403);
            return;
        }
        Order.remove({order_number: req.param.orderNumber, username:uname}, function
            (err, order) {
            if (err) res.send(err);
            res.json({"result": "deleted"});
        });
    })
};