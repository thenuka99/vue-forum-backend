const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,        
        required: [true, "name cannot be empty"],
    },
    bio: {
        type: String,
    },
    questions: {
        type: Number,
    },
    imageurl: {
        type: String,
        default:'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png'
    },
    email: {
        type: String,        
        required: [true, "email cannot be empty"],
        unique: [true, "user already exists"],
    },
    password: {
        type: String,
    },
    questions: {
        type: Number,
        default: 0
    },
    answers: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{ timestamps: true });


module.exports = mongoose.model('User', Schema);