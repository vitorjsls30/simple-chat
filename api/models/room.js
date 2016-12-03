var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  created: {type: Date, default: Date.now()},
  description: {type: String, default: ''},
  name: {type: String}
});

module.exports = mongoose.model('Room', roomSchema);
