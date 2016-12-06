const routes = require('express').Router();
const rooms = require('./rooms');
const chats = require('./chats');
const users = require('./users');
const path = require('path');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'});
});

routes.use('/rooms', rooms);
routes.use('/chats', chats);
routes.use('/users', users);

routes.get('/', (req, res) => {
  res.sendFile(path.resolve('app/index.html'));
});

routes.get('/*', (req, res) => {
  res.sendFile(path.resolve('app/index.html'));
});

module.exports = routes;
