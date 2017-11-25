/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Token = mongoose.model('Tokens');

exports.authorize_username = function(token_id, continue_with_username) {
    Token.findOne({"token":token_id}, function (err, token) {
        if (err) uname = false;
        else if (token === null) uname = false;
        else if (token.valid_until < new Date(Date.now())) uname = false;
        else uname = token.username;
        continue_with_username(uname);
    })
};