var models = require('../models');
var Comment = models.Comment;
var Classroom = models.Classroom;

function show(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            res.send(err);
        } else {
            res.json(comment.comments)
        }
    });
}

function create(req, res) {
    Comment.create(req.body, function(err, replyToComment){
        // console.log(req.body.content)
        // console.log(replyToComment)
        if (err) {
            res.send(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, comment){
                if (err) {
                    res.send(err);
                } else {
                    comment.comments.push(replyToComment);
                    comment.save();

                    Classroom.findById(req.params.classroom_id, function(err, classroom){
                        if (err) { 
                            res.send(err);
                        } else {
                            var commentToUpdate = classroom.comments.id(req.params.comment_id);
                            commentToUpdate.comments.push(replyToComment);
                            classroom.save();
                            res.json(classroom);
                        }
                    });
                }
            });
        }
    });
}

function destroy(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            res.send(err);
        } else {
            var commentReply = comment.comments.id(req.params.replyComment_id);
            commentReply.remove();
            comment.save();

            Classroom.findById(req.params.classroom_id, function(err, classroom){
                if (err) {
                    res.send(err);
                } else {
                    var commentToUpdate = classroom.comments.id(req.params.comment_id);
                    var commentToRemove = commentToUpdate.comments.id(req.params.replyComment_id);
                    commentToRemove.remove();
                    classroom.save();
                    res.send(classroom);
                }
            });
        }
    });

}

module.exports.show = show;
module.exports.create = create;
module.exports.destroy = destroy;