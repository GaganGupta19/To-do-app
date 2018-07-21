const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

userSchema.statics.findByToken = function (token) {
  let user = this;
  var decoded;

  try{
      decoded = jwt.verify(token, 'abc123');
  }catch (e) {
      return Promise.reject();
  }

  return User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
  });
};

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
};

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