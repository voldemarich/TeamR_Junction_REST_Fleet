/**
 * Created by voldemarich on 25.11.2017.
 */
module.exports = function (app) {
    var usercontroller = require("../controllers/usercontroller");

    app.route('/register')
        .post(usercontroller.register_new_user);

    app.route('/login')
        .post(usercontroller.authorize);

    app.route('/myacc')
        .get(usercontroller.accinfo);
};