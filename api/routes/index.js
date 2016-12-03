const routes = require('express').Router();
const rooms = require('./rooms');
const chats = require('./chat');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'});
});

routes.use('/rooms', rooms);
routes.use('/chats', chats);

module.exports = routes;
