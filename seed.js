//seed
var models = require('./models');

var commentsData = [{
  content: 'No school on Monday.',
}, {
  content: 'Noel and I are going to Oakland Zoo tomorrow, does anyone want to join?',
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
          teacher: 'Mr. Hein',
          info: 'Room #H102 located in the east wing.',
          image_url: 'http://flsweb.org/wp-content/uploads/2016/04/Kindergarten-770x512.jpg',
          comments: [],
        },{
            title: 'Kindergarten',
            teacher: 'Mr. Norris',
            info: 'Room #H101 located in the east wing.',
            image_url: 'http://4.bp.blogspot.com/_-FEgefSk_mQ/TFeSdEZeJfI/AAAAAAAAAZc/N6SY6VUQX4s/s400/IMG_9467.JPG',
            comments: [comments[1], comments[0]],     
        },{
          title: 'Kindergarten',
          teacher: 'Ms. Quivers',
          info: 'Room #H100 located in the east wing.',
          image_url: 'https://study.com/cimages/hub/How%20to%20Set%20Up%20Your%20Kindergarten%20Classroom%20Quickly.jpg',
          comments: [comments[2]],
     
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
