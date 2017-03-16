var mongoose  = require('mongoose');
var GoodSchema = require('../schemas/good');
var Good = mongoose.model('Good', GoodSchema);

module.exports = Good;