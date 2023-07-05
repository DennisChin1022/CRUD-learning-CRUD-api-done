const mongoose = require('mongoose');

var userschema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "Please add the contact name"],
    },
    email: {
    type: String,
    required: [true, "Please add the contact email address"],
    unique:true,
    },
    photo: {
    type: String,
    required: [true, "Please add the photo"],
    sparse:true,
    },
    date: {
    type: Date,
    required: [true, "Please add the date"],
    },
})

// module.exports = mongoose.model("Contact", contactSchema);

const customerdb = mongoose.model('ABNBdb', userschema);

module.exports = customerdb;
