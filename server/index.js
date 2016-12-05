const app = require('../app');
const config = require('../config');
const mongoose = require('mongoose');

const server = require('http').Server(app.api).listen(3000, () => {
  console.log('server listening port 3000...');
});
const io = require('socket.io')(server);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb);

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('user Login', (data) => {
    console.log(data);
  });
});
