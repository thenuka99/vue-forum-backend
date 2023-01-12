const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        required: [true, "Please provide a tite to the Question"],
    },
    addedOn: {
        type: Date,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoryis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum_Category'
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    updatedOn: {
        type: Date,
    },
    status: {
        type: Number,
        default: 1
    },
});

module.exports = mongoose.model('Forum_Post', Schema);