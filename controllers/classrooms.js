var models = require('../models');
var Classroom = models.Classroom;

function index (req, res){
    Classroom.find({}, function(err, classrooms){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('classrooms = ', classrooms);
        res.json(classrooms);
      }
    });
}

function create (req, res){
    Classroom.create(reg.body, function(err, classrooms){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('classrooms = ', classrooms);
        res.json(classrooms);
      }
    });
}

function show(req, res) {
    Classroom.findById(req.params.classroom_id, function(err, classroom) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('classrooms = ', classrooms);
        res.json(classrooms);
      }
    });
}
  
function update(req, res) {
    Classroom.findById(req.params.recipe_id, function(err, foundClassroom) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
          foundClassroom.title = req.body.title;
          foundClassroom.teacher = req.body.teacher;
          foundClassroom.info = req.body.info;
          foundClassroom.image_url = req.body.image_url;
          foundClassroom.comment = req.body.comment;
    
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
        res.send('Classroom Deleted');
        console.log('Classroom Deleted');
      }
    });
}
      
  

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;