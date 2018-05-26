//requirements
require('dotenv').config();
const express = require('express');
const app = express();

var classroomsController = require('./controllers/classrooms');
var commentsController = require('./controllers/comments');



//middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

const bodyParser = require('body-parser');
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
app.get('/api/classrooms', classroomsController.show);
app.put('/api/classrooms/:classroom_id', classroomsController.update);
app.delete('/api/classrooms/:clasroom_id', classroomsController.destroy);


//Comment Routes


// server start
let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`HTTP server listening at localhost ${ port } <3`);
});
