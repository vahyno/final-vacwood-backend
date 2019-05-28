//seed
var models = require('./models');

var commentsData = [{
  content: 'No school on Monday.',
}, {
  content: 'Noel and I are going to Oakland Zoo tomorrow, does anyone want to join?',
}, {
  content: 'Pack lunch, fieldtrip to Tilden Park next Friday!!!',
} , {
  content: '"Library" is coming up on Wednesday.'
}];


// Remove Comments
models.Comment.remove({}, function(err, res){
  if (err) {
    console.log('Error removing comments: ',err);
    return;
  }
  console.log('*'.repeat(100));
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
          image_url: 'https://www.prettyprudent.com/wp-content/uploads/2015/11/10093151/10-Things-Your-Teacher-Wants-for-the-Classroom.jpg',
          // image_url: './imgs/bus.jpg',
          comments: [comments[3]],
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
        console.log('-'.repeat(100));
        console.log("All Classrooms:", createdClassrooms);
        console.log('-'.repeat(100));
        console.log('Created ', createdClassrooms.length, ' classrooms.');
        console.log('*'.repeat(100));
        process.exit();
      });
    });
  });
});
