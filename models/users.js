/**
 * Created by voldemarich on 25.11.2017.
 */

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type: String,
        required: 'No user without the username',
        index: {unique: true}
    },
    password:{
        type:String,
        required: 'Password sha256 required'
    },
    money:{
        type:Number,
        default:100000.0
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next){

    var user = this;

    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
    user.password = hash;
    next();
    });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Users", UserSchema);