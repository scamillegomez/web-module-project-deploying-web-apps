const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    },
    username: String,
    comment: String,
    timestamp: {type: Date, default: Date.now}
}, { collection: 'Comments'});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;