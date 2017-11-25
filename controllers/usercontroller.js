/**
 * Created by voldemarich on 25.11.2017.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    Token = mongoose.model('Tokens');

exports.register_new_user = function (req, res) {
    var new_user = new User(req.body);
    console.log(req.body);
    new_user.save(function (err, user) {
        if(err){
            res.send(err);
        }
        res.json(user);
    })
};

exports.authorize = function (req, res) {
    User.findOne({username:req.body.username}, function (err, user) {
        if (err) res.send(err);
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) res.send(err);
            if (!isMatch){
                res.send(403);
                return;
            }
            Token.findOne({username:req.body.username}, function (err, token) {
                if (err) res.send(err);
                if (token !== null){
                    if(token.valid_until >= new Date(Date.now())) {
                        res.json(token);
                        return;
                    }
                    else {
                        Token.remove({username: req.body.username}, function (err, token) {
                        });
                    }
                }
                var new_token = new Token({username:req.body.username});
                    new_token.save(function (err, newtoken) {
                        if (err) res.send(err);
                        res.json(newtoken);
                    });
            });
        });

    })
};
