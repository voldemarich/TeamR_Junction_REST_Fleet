/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    Token = mongoose.model('Tokens');

exports.authorize_username = function(req, res, continue_with_username) {
    Token.findOne({"token":req.header("Authorization")}, function (err, token) {
        if (err) uname = false;
        else if (token === null) uname = false;
        else if (token.valid_until < new Date(Date.now())) uname = false;
        else uname = token.username;
        if (!uname) {
            res.sendStatus(403);
            return;
        }
        continue_with_username(uname);
    })
};