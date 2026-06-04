const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // pass in an object , all the parameters that define a user
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

