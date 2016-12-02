const rooms = require('express').Router();

rooms.use((req, res, next) => {
  next();
});

module.exports = rooms;
