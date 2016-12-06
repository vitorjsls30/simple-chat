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

  socket.on(events.setup_rooms, (currentRoom) => {
    var data = {rooms: '', chats: ''};

    request
      .get(mapUrl('rooms'))
      .end((err, res) => {
          if(err) {
            throw err;
          }
          data.rooms = res.body;
          //TODO: RETORNAR AS MSGS DE UMA DADA ROOM. CRIAR ROTA ANINHADA NA API
          request
            .get(mapUrl('chats'))
            .end((err, res) => {
                if(err) {
                  throw err;
                }
                console.log('chat response:');
                console.log(res.body);
                data.chats = res.body;
                console.log(data);
                socket.emit(events.setup_rooms, data);
            });
      });
  });

});
