const routes = require('express').Router();
const rooms = require('./rooms');

routes.get('/', (req, res) => {
  res.status(200).json({message: 'Connected!'});
});

routes.use('/rooms', rooms);

module.exports = routes;
