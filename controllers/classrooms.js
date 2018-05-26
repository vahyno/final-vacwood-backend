var models = require('../models');
var Classroom = models.Classroom;

function index (req, res){
    Classroom.find({}, function(err, classrooms){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('classrooms = ',classrooms);
        res.json(classrooms);
      }
    })
  }
  

module.exports.index = index;
// module.exports.create = create;
// module.exports.show = show;
// module.exports.update = update;
// module.exports.destroy = destroy;