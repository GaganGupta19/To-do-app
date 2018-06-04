let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        required: true,
        minLength: 1,
        trim: true,
        type: String
    }
});

module.exports = {User};