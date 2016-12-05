const app = require('../app');
const server = require('http').Server(app.api);
const io = require('socket.io')(server);

app.start();

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('user Login', (data) => {
    console.log(data);
  });
});
