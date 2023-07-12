const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

var userschema= new mongoose.Schema({
    admin: {
      type: Boolean,
      default: false,
      },
    retailer: {
      type: Boolean,
      default: false,
      },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [isEmail, "Please enter a valid email"]
        },
      password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
      },
})


userschema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userschema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userschema);

module.exports = User;
