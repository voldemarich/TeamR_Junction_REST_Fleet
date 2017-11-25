/**
 * Created by voldemarich on 25.11.2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ViolationSchema = new Schema({
    order_number:{
        type: Number,
        required:"Which it belongs to?"
    },
    timestamp_created: {
        type: Date,
        default: new Date(Date.now())
    },
    timestamp_last_changed: {
        type: Date,
        default: new Date(Date.now())
    },
    violation_type: {
        type:String,
        enum:["temperature", "shake_level"],
        required:"The parameter violated must be defined"
    },
    temperature:{
        type:Number,
        default:0
    },
    shake_level:{
        type:String,
        enum:['no_importance', "moderate", "low", "fragile", "ideal"],
        default:'no_importance'
    },
    is_finalized:{
        type:Boolean,
        default:false
    },
    triggers_limit:{
        type:Number,
        required:"How much times should the event trigger to be finalized"
    },
    triggered:{
        type:Number,
        default:1
    }
});

module.exports = mongoose.model("Violations", ViolationSchema);