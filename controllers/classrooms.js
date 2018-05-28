var models = require('../models');
var Classroom = models.Classroom;

function index (req, res){
    Classroom.find({}, function(err, classrooms){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        // console.log('classrooms = ', classrooms);
        res.json(classrooms);
      }
    });
}

function create (req, res){
    Classroom.create(req.body, function(err, newClassroom){
      if (err) {
        console.log('New Classroom err: ', err);
        res.send(err);
      } else {
        console.log('New Classroom = ', newClassroom);
        res.json(newClassroom);
      }
    });
}

function show(req, res) {
    Classroom.findById(req.params.classroom_id, function(err, classroom) {
      if (err) {
        console.log('classroom show err: ', err);
        res.send(err);
      } else {
        res.json(classroom);
      }
    });
}
  
function update(req, res) {
    Classroom.findById(req.params.classroom_id, function(err, foundClassroom) {
        if (err) {
            console.log("foundClassroom err: ", err);
            res.send(err);
        } else {
          foundClassroom.title = req.body.title;
          foundClassroom.teacher = req.body.teacher;
          foundClassroom.info = req.body.info;
          foundClassroom.image_url = req.body.image_url;
          foundClassroom.comments = req.body.comments;
    
          foundClassroom.save();
          res.json(foundClassroom)
        }
    });
}
 
function destroy(req, res){
    Classroom.findByIdAndRemove(req.params.classroom_id, function(err, deletedClassroom){
      if (err) {
        console.log('deletedClassroom err: ', err);
        res.send(err);
      } else {
        console.log('Classroom Deleted');
        res.send('Classroom Deleted');
      }
    });
}
      
  

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
