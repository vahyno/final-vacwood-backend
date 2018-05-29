var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema()
CommentSchema.add({
	content: String,
    // likes: Number,
    comments: [CommentSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
});
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;