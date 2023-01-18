const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    }],
    createdBy: {
        type: String,
        default: "Anonymous"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('blog',blogSchema);