/**
 * Created by voldemarich on 25.11.2017.
 */
module.exports = function (app) {
    var ordercontroller = require("../controllers/ordercontroller");

    app.route('/orders')
        .get(ordercontroller.get_all_orders)
        .post(ordercontroller.register_order);

    app.route('/orders/:orderNumber')
        .get(ordercontroller.get_order)
        .delete(ordercontroller.delete_order);
};