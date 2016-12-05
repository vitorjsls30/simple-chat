const app = require('../app');
const config = require('../config');
const mongoose = require('mongoose');
const request = require('superagent');

const server = require('http').Server(app.api).listen(3000, () => {
  console.log('server listening port 3000...');
});
const io = require('socket.io')(server);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb);

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('user Login', (data) => {
    console.log('user: ', data);
    request
      .get('http://localhost:3000/users/' + data)
      .end((err, res) => {
        if(err) {
          throw err;
        } else {
          console.log(res.status);
          console.log(res.body);
        }
      });
  });
});
