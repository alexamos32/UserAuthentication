var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    favoriteBook: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }

});

//hash the password before saving to the database
UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;