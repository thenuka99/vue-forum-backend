const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('User', Schema);