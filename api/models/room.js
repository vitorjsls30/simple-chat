var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  created: {type: Date, default: Date.now()},
  content: {type: String, default: ''}
  username: {type: String},
  room: {type: String}
});

module.exports = mongoose.model('Chat', chatSchema);
