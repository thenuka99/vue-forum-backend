const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        required: [true, "Please provide a tite to the Question"],
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
    comments: [{
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
        }
    },{ timestamps: true }],
},{ timestamps: true });

module.exports = mongoose.model('Forum_Post', Schema);