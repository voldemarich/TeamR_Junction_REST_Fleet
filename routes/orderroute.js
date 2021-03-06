/**
 * Created by voldemarich on 25.11.2017.
 */
module.exports = function (app) {
    var ordercontroller = require("../controllers/ordercontroller");
    var violationcontroller = require("../controllers/violationcontroller");

    app.route('/orders')
        .get(ordercontroller.get_all_orders)
        .post(ordercontroller.register_multiple_orders);

    app.route('/orders/violations')
        .get(violationcontroller.get_all_violations);

    app.route('/orders/:orderNumber')
        .get(ordercontroller.get_order)
        .delete(ordercontroller.delete_order);

    app.route('/orders/:orderNumber/violations')
        .get(violationcontroller.get_violations)
};