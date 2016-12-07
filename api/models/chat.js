var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  created: {type: Date, default: Date.now()},
  roomName: {type: String, default: ''},
  userEmail: {type: String, default: ''},
  content: {type: String, default: ''}
});

module.exports = mongoose.model('Chat', chatSchema);
