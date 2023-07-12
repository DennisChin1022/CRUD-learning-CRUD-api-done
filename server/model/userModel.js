const mongoose = require('mongoose');
const { isEmail } = require('validator')

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


const User = mongoose.model('usersdb', userschema)

module.exports = User;
