var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(timestamps: { createdAt: 'created_at' })
CommentSchema.add({
	content: String,
	likes: Number,
	comments: [CommentSchema]
});
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;