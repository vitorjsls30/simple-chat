const routes = require('express').Router();
const rooms = require('./rooms');
const chats = require('./chats');
const users = require('./users');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'});
});

routes.use('/rooms', rooms);
routes.use('/chats', chats);
routes.use('/users', users);

module.exports = routes;
