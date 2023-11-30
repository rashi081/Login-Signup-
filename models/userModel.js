const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type : String,
        requiresd: true,
    },
    password : {
        type:  String,
        required: true
    }
})

const User = mongoose.model("users", userSchema);

module.exports = User;