/**
 * Created by voldemarich on 25.11.2017.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Token = mongoose.model('Tokens');

exports.check_token_validity = function(token_id) {
    Token.findOne({"token":token_id}, function (err, token) {
        if (err) return false;
        if (token === null) return false;
        if (token.valid_until < new Date(Date.now())) return false;
        return true;
    })
}