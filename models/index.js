var mongoose = require("mongoose");
var dbName = 'mongodb://localhost/final_school_community';

// Map Global Promise to Resolve Mongo Promise Warning
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || dbName, { useNewUrlParser: true })
	.then(() => console.log('Mongodb connected...'))
	.catch(err => console.log(err));

module.exports.Classroom = require("./classroom");
module.exports.Comment = require("./comment");