var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Comment = require('./comment');

var ClassroomSchema = new Schema({
  title: String,
  teacher: String,
  info: String,
  image_url: String,
  message: [Comment.schema]
});

var Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;