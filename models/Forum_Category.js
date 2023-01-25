const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name to the category"],
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postCount:{
        type: Number,
        default: 0
    }
},{ timestamps: true });

module.exports = mongoose.model('Forum_Category', Schema);