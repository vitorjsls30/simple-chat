var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  id: {type: Number},
  created: {type: Date, default: Date.now()},
  roomName: {type: String, default: ''},
  userName: {type: String, default: ''},
  content: {type: String, default: ''}
});

module.exports = mongoose.model('Chat', chatSchema);
