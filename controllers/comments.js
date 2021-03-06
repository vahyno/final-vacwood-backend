var models = require('../models');
var Comment = models.Comment;
var Classroom = models.Classroom;

function index(req, res) {
    Classroom.findById(req.params.classroom_id, function(err, classroom) {
        if (err) {
            console.log('found err = ', err);
            res.send(err);
        } else {
            var comments = classroom.comments;
            console.log('All comments: ', comments);
            res.json(comments);
        }
    });
}

function create(req, res){
    Comment.create(req.body, function(err, createdComment){
        if (err) {
            console.log('createdComment err: ', err);
            res.send(err);
        } else {
            Classroom.findById(req.params.classroom_id, function(err, foundClasroom){
                if (err) {
                    console.log('foundClassroom err: ', err);
                    res.send(err);
                } else {
                    foundClasroom.comments.push(createdComment);
                    foundClasroom.save();
                    console.log(createdComment);
                    res.json(createdComment);
                }
            });
        }
    });
}

function show(req, res){    
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            console.log('comment err: ', err);
            res.send(err);
        } else {
            console.log('comment: ', comment);
            res.json(comment);
        }
    });
}

function update(req, res){
    console.log('update => req.body: ', req.body);
    console.log('req.params', req.params)
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) res.send(err)

        comment.content = req.body.filter(cmt => cmt._id === req.params.comment_id)[0].content;
        comment.save();
        console.log('comment: ', comment);
        
        Classroom.findByIdAndUpdate(req.params.classroom_id, 
                {$set: 
                    { comments: req.body}//.filter(comt._id !== comment._id).concat(comment)} 
                }, function(err, updatedClassroom) {
                    if (err) {
                        console.warn(err);
                    } else {
                        // res.json(updatedClassroom);
                        Classroom.findById(req.params.classroom_id, function(err, classroom) {
                            if (err) { 
                                console.warn('Error updating comment', err);
                                res.send(err);
                            } else { 
                                res.send(classroom);
                            }
                        })
                    }
        }); 
    });
}

function destroy(req, res){
    Comment.findOneAndRemove(req.params.comment_id, function(err, deletedComment){
        if (err) {
            console.log('deletedComment err: ', err);
            res.send(err);
        } else {
            Classroom.findByIdAndUpdate(req.params.classroom_id, {$pull: {comments: {_id: req.params.comment_id}}}, function(err){
                if (err) {
                    console.log('deletedComment err: ', err);
                    res.send(err);
                } else {
                    res.send('deletedComment - success')
                }
            });
        }
    });
}


module.exports.index= index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;