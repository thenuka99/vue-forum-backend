const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    questions: {
        type: Number,
    },
    imageurl: {
        type: String,
    },
    email: {
        type: String,
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
});


module.exports = mongoose.model('User', Schema);