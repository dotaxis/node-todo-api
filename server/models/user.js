const mongoose = require('mongoose');
var {Schema} = mongoose;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    email: {
        type: String,
        minlength:8,
        default: null,
        trim: true
    }
});

var User = mongoose.model('User', userSchema)

module.exports = {User};
