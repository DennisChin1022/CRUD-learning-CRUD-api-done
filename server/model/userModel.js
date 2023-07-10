const mongoose = require('mongoose');

var userschema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})


const User = mongoose.model('usersdb', userschema)

module.exports = User;
