/**
 * Created by voldemarich on 25.11.2017.
 */

module.exports = function () {
    var tiny_worker = require("tiny-worker");

    var worker = new tiny_worker(function () {

        //** some constants of ranges **//
        const TEMP_RANGE = 5;
        const TEMP_FINALIZE_QTY = 400;
        //shaking
        //******************************//

        Order = require('/home/voldemarich/IdeaProjects/node-fleetboard/restservice/models/orders');
        Violation = require('/home/voldemarich/IdeaProjects/node-fleetboard/restservice/models/violations');
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/fleetboard');

        var Order = mongoose.model('Orders');
        var Violation = mongoose.model('Violations');

        var mqtt = require('mqtt');

        var client = mqtt.connect('mqtt://localhost');

        function processTempViolation(_order, _temperature) {
            if(_order.temperature+TEMP_RANGE > _temperature && _order.temperature-TEMP_RANGE < _temperature) return;
            Violation.findOne({is_finalized:false, order_number:_order.order_number}, function (err, violation) {
                if (violation === null) {
                    new_violation = new Violation({
                        order_number: _order.order_number,
                        violation_type: "temperature",
                        temperature: _temperature,
                        triggers_limit: TEMP_FINALIZE_QTY
                    });
                    new_violation.save(function (err, violation) {
                        //console.log("just created violation");
                        return;
                    });
                }
                else {
                    violation.temperature = _temperature;
                    violation.triggered++;
                    if(violation.triggered >= violation.triggers_limit){
                        violation.is_finalized = true;
                    }
                    violation.timestamp_last_changed = new Date(Date.now());
                    violation.save(function (err, violation) {
                        //console.log("just modified violation");
                        return;})
                }
            });


        }

        client.on('connect', function () {
            client.subscribe('#')
        });

        client.on('message', function (topic, message) {
            // message is Buffer
            msg = JSON.parse(message.toString());
            if(msg.sensorType === "TEMPERATURE"){
                Order.find(function (err, orders) {
                    orders.forEach(function (element, index, arr) {
                        processTempViolation(element, msg.values[0]);
                    });
                });
            }
            // Order.find(function (err, orders) {
            //
            // })
            //client.end()
        });

    });
}