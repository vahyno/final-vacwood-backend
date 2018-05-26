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



module.exports.index= index;
// module.exports.show = show;
// module.exports.create = create;
// module.exports.update = update;
// module.exports.destroy = destroy;
