//seed
var db = require('./models');

var comments = [{
  content: 'no school tomorrow',
  likes: 0,
}, {
  content: 'Going to Oakland Zoo tomorrow anyone wants to join?',
  likes: 2,
}, {
  content: 'Pack lunch, fieldtrip on Friday!!!',
  likes: 10,
}];

var seedClassroom = [{
    title: 'Kindergarten',
    teacher: 'Ms. Quivers',
    info: 'room #100 located in the east wing of the building',
    image_url: `https://kindercraze.com/wp-content/uploads/2015/10/vintage-carnival-9.jpg`,
    comments: [comments[2]],
},{
    title: 'Kindergarten',
    teacher: 'Mr. Norris',
    info: 'room #101 located in the east wing of the building',
    image_url: `http://4.bp.blogspot.com/_-FEgefSk_mQ/TFeSdEZeJfI/AAAAAAAAAZc/N6SY6VUQX4s/s400/IMG_9467.JPG`,
    comments: [comments[1], comments[0]],     
}
]

// Remove Comments

db.Classroom.remove({}, function(err, remove){
  console.log(err);

  db.Classroom.create(seedClassroom, function(err, createdClassrooms){
    if (err) { return console.log('ERROR', err); }
    console.log("All Classrooms:", createdClassrooms);
    console.log(`You created ${createdClassrooms.length} Classrooms.`)
    process.exit();
  });
});
