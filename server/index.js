const app = require('../app');
const port = process.env.PORT || 3000;
const server = require('http').Server(app).listen(port, () => {
  console.log('Starting our loved app...');
});
const io = require(`socket.io`)(server);

io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('user Login', (data) => {
    console.log(data);
  });
});
