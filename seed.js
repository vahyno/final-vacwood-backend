//seed
var models = require('./models');

var commentsData = [{
  content: 'No school on Monday.',
}, {
  content: 'Noel and I are going to Oakland Zoo tomorrow anyone wants to join?',
}, {
  content: 'Pack lunch, fieldtrip to Tilden next Friday!!!',
}];


// Remove Comments
models.Comment.remove({}, function(err, res){
  if (err) {
    console.log('Error removing comments: ',err);
    return;
  }
  console.log('*'.repeat(150));
  console.log('Removed all comments');

  //Create New Comments
  models.Comment.create(commentsData, function(err, comments){
    if (err) {
      console.log('Error creating comments: ', err);
      return;
    }
    console.log('Created ', comments.length, ' comments');

    //Remove Classrooms
    models.Classroom.remove({}, function(err, res){
      if (err) {
        console.log('Error removing classrooms', err)
        return;
      }
      console.log('Removed all Classrooms');

      //Create New Classrooms
      models.Classroom.create([
        {
          title: 'Kindergarten',
          teacher: 'Ms. Quivers',
          info: 'Room #H100 located in the east wing.',
          image_url: `https://kindercraze.com/wp-content/uploads/2015/10/vintage-carnival-9.jpg`,
          comments: [comments[2]],
        },{
            title: 'Kindergarten',
            teacher: 'Mr. Norris',
            info: 'Room #H101 located in the east wing.',
            image_url: `http://4.bp.blogspot.com/_-FEgefSk_mQ/TFeSdEZeJfI/AAAAAAAAAZc/N6SY6VUQX4s/s400/IMG_9467.JPG`,
            comments: [comments[1], comments[0]],     
        },{
          title: 'Kindergarten',
          teacher: 'Ms. Wendy',
          info: 'Room #H102 located in the east wing.',
          image_url: `http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/kindergarten_primary.jpg?itok=qPWwpwls&resize=1100x619`,
          comments: [],     
        }
      ],function(err, createdClassrooms){
        if (err){
          console.log('Error creating classrooms', err);
        }
        console.log('-'.repeat(150));
        console.log("All Classrooms:", createdClassrooms);
        console.log('-'.repeat(150));
        console.log('Created ', createdClassrooms.length, ' classrooms.');
        console.log('*'.repeat(150));
        process.exit();
      });
    });
  });
});
