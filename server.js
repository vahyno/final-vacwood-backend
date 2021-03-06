//requirements
require('dotenv').config();

var express = require('express');
var app = express();

var classroomsController = require('./controllers/classrooms.js');
var commentsController = require('./controllers/comments.js');
var replyCommentsController = require('./controllers/replyComments.js');



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
    githubLink: "https://github.com/vahyno",
  })
});

//Classrooms Routes
app.get('/api/classrooms', classroomsController.index);
app.post('/api/classrooms', classroomsController.create);
app.get('/api/classrooms/:classroom_id', classroomsController.show);
app.put('/api/classrooms/:classroom_id', classroomsController.update);
app.delete('/api/classrooms/:classroom_id', classroomsController.destroy);

//Comment Routes
app.get('/api/classrooms/:classroom_id/comments', commentsController.index);
app.post('/api/classrooms/:classroom_id/comments', commentsController.create);
app.get('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.show);
app.put('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.update);
app.delete('/api/classrooms/:classroom_id/comments/:comment_id', commentsController.destroy);

//Response on Comment Routes
app.get('/api/classrooms/:classroom_id/comments/:comment_id/comments/:replyComment_id', replyCommentsController.show);
app.post('/api/classrooms/:classroom_id/comments/:comment_id/comments', replyCommentsController.create);
app.delete('/api/classrooms/:classroom_id/comments/:comment_id/comments/:replyComment_id', replyCommentsController.destroy);


// server start
let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`HTTP server listening at localhost ${ port } <3`);
});
