const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    email: {
        required: true,
        minLength: 1,
        trim: true,
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        minLength: 6,
        trim: true,
        type: String
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    //user.tokens.push(token);
    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    //console.log(user);
    return user.save().then(() => {return token;});
};

let User = mongoose.model('User', userSchema);

module.exports = {User};