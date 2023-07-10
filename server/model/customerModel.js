const mongoose = require('mongoose');

var customerschema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, "Please add the contact name"],
    },
    email: {
    type: String,
    required: [true, "Please add the contact email address"],
    unique:[true,"Email address already taken"],
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

const customerdb = mongoose.model('customer', customerschema);


module.exports = customerdb;

