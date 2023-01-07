const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required: true
    },
    userDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
    createdBy: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment',commentSchema);
