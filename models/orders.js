/**
 * Created by voldemarich on 25.11.2017.
 */

var mongoose = require("mongoose");
var randomstring = require("randomstring");
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
    username:{
        type: String,
        required: 'No user without the username',
        index: {unique: true}
    },
    token:{
        type:String,
        default: randomstring.generate({
            charset: "alphanumeric",
            length: 25
        })
    },
    valid_until: {
        type: Date,
        default: (function (){d = new Date(Date.now()); d.setHours(d.getHours()+2); return d;})()
    }
});

module.exports = mongoose.model("Tokens", TokenSchema);