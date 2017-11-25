/**
 * Created by voldemarich on 25.11.2017.
 */

var mongoose = require("mongoose");
var randomstring = require("randomstring");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    order_number:{
        type: Number,
        default: randomstring.generate({
            charset: "numeric",
            length: 10
        }),
        index: {unique: true}
    },
    username:{
        type:String,
        required:"Whom does this belong to?"
    },
    timestamp: {
        type: Date,
        default: new Date(Date.now())
    },
    goods_name:{
        type: String,
        required:"The name of the goods transported"
    },
    goods_type:{
        type:String,
        enum:["liquid", "solid", "gas"],
        required:"Aggregate state must be specified"
    },
    goods_special:{
        type:String,
        enum:["explosive", "poisonous", "radioactive", "hermetic_package"]
    },
    volume:{
        type:Number,
        required:"Put in volume in m3"
    },
    weight:{
        type:Number,
        required:"Put in weight in kg"
    },
    distance:{
        type:Number,
        required:"Put in distance in km"
    },
    temperature:{
        type:Number,
        required:"Put in temperature in *C"
    },
    shake_level:{
        type:String,
        enum:['no_importance', "moderate", "low", "fragile", "ideal"],
        default:'no_importance'
    }
});

module.exports = mongoose.model("Orders", OrderSchema);