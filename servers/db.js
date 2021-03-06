// connect database
var mongoose = require('mongoose');
var dbUrl = require('../configure/urlConfigures');

var conn = mongoose.connect(dbUrl.dbUrl);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbUrl.dbUrl);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

module.exports = conn;