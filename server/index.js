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

  socket.on(events.user_login, (data) => {
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
              });
          }
          socket.emit(events.user_login, data);
        }
      });
  });

  socket.on(events.setup_rooms, (data) => {
    socket.join(data.currentRoom).emit({userEmail: data.userEmail, content: data.userEmail + ' joined room'});
    var result = {rooms: '', chats: ''};

    request
      .get(mapUrl('rooms'))
      .end((err, res) => {
          if(err) {
            throw err;
          }

          if(data.currentRoom != '') {
            var exists = false;
            res.body.map((item) => {
              if(item.name === data.currentRoom) {
                exists = true;
              }
            });

            if(!exists) {
              request
                .post('rooms/')
                .send({name: currentRoom})
                .end((err) => {
                  if(err) {
                    throw err;
                  }
                });
            }
          }

          result.rooms = res.body;
          request
            .get(mapUrl('chats/' + data.currentRoom))
            .end((err, res) => {
                if(err) {
                  throw err;
                }
                result.chats = res.body;
                socket.emit(events.setup_rooms, result);
            });
      });
  });

  socket.on(events.new_message, (data) => {
    var message = {
      roomName: data.roomName,
      userEmail: data.userEmail,
      content: data.content
    };
    request
      .post(mapUrl('chats'))
      .send(message)
      .end((err) => {
        if(err) {
          throw err;
        }
        io.in(data.roomName).emit('new message', data);
      })
  });

});
