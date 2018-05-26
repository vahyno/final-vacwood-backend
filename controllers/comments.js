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
    
}

function update(req, res){
    
}

function destroy(req, res){
    
}


module.exports.index= index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
