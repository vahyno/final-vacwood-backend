//requirements
require('dotenv').config();

var express = require('express');
var app = express();

var classroomsController = require('./controllers/classrooms.js');
var commentsController = require('./controllers/comments.js');



//middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
app.get('/', function(req, res){
  res.json({
    name:"Michal",
    githubUserName: "vahyno",
    githubLink: "https://github.com/vahyno",
  })
});

//Classrooms Routes
app.get('/api/classrooms', classroomsController.index);
app.post('/api/classrooms', classroomsController.create);
// This route needs an id parameter. Show is a single resource route, so we need the id.
app.get('/api/classrooms/:classroom_id', classroomsController.show);
app.put('/api/classrooms/:classroom_id', classroomsController.update);
// Typo below was causing problems for delete route (classroom_id, not clasroom_id)
// app.delete('/api/classrooms/:clasroom_id', classroomsController.destroy);
app.delete('/api/classrooms/:classroom_id', classroomsController.destroy);


//Comment Routes
app.get('/api/classrooms/:classroom_id/comments', commentsController.index);
app.post('/api/classrooms/:classroom_id/comments', commentsController.create);
app.get('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.show);
app.put('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.update);
app.delete('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.destroy);

//Response on Comment Routes

// server start
let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`HTTP server listening at localhost ${ port } <3`);
});
