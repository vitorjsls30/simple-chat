const app = require('../app');
const config = require('../config');
const mongoose = require('mongoose');
const request = require('superagent');
const events = require('./events.json');
const server = require('http').Server(app.api).listen(3000, () => {
  console.log('server listening port 3000...');
});
const io = require('socket.io')(server);

const apiUrl = 'http://localhost:3000/';
var mapUrl = (name) => {
  return apiUrl + name;
} ;

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb);

io.on('connection', (socket) => {

  console.log('a user connected!');

  socket.emit(events.setup, ()=> {

  })

  socket.on(events.user_login, (data) => {
    console.log('user: ', data);
    request
      .get(mapUrl('users'))
      .end((err, res) => {
        if(err) {
          throw err;
        } else {
          if(res.body.length == 0) {
            request
              .post(mapUrl('users'))
              .send({email: data})
              .end((err, res) => {
                if(err) {
                  throw err;
                }
                socket.emit(events.user_registered, data);
              });
          }
          socket.emit(events.user_registered, data);
        }
      });
  });

  socket.on(events.setup_rooms, () => {
    request
      .get(mapUrl('rooms'))
      .end((err, res) => {
          if(err) {
            throw err;
          }
          console.log(res.body);
          socket.emit(events.setup_rooms, res.body)
      });
  });

  socket.on(events.switch_room, (data) => {
    socket.leave(data.oldRoom);
    socket.join(data.currentRoom);
    console.log('switch room: ', data);
    //io.in(data.oldRoom).emit(events.new_message, ' User ' + data.userEmail + ' disconnected!');
    io.in(data.currentRoom).emit(events.new_user, 'User ' + data.userEmail + ' joined room');
  });

});
