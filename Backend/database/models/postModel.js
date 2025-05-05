const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postMedia: {
        type: [String]
    },
    postContent: {
        type: String
    },
    userTags: {
        type: [String]
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public'
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;