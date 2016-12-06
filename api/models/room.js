var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  created: {type: Date, default: Date.now()},
  name: {type: String}
});

module.exports = mongoose.model('Room', roomSchema);
