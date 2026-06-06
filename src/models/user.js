const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // pass in an object , all the parameters that define a user
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is not valid"); 
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-TruksPXPI5imDL_kfzEfFiAZwg5AzHtWg&s"
    },
    about: {
        type: String,
        default: "Write your description here...",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;

