const rooms = require('express').Router();
const all = require('./all');
const single = require('./single');
const roomModel = require('../../models/room');
const hasModel = require('../../utils/modelVerifyer');

rooms.use((req, res, next) => {
  next();
});

rooms.route('/setup')
  .get((req, res) => {
    var mockData = require('../../utils/data.json');

    mockData.rooms.map((roomItem) => {
      var room = new roomModel();
      room.name = roomItem.name;
      room.description = roomItem.description;
      room.save((err) => {
        if(err) {
          res.send(err);
        }
        console.log('Room ' + room.name + ' inserted!');
      });
    });

    res.json('Rooms Setup!');
  });

rooms.route('/')
  .get(hasModel(roomModel), all)
  .post((req, res) => {
    var room = new roomModel();
    room.name = req.body.name;
    room.save((err) => {
      if(err) {
        res.send(err);
      }
      else {
        res.json('Chat Room created successfully!');
      }
    });
  });

rooms.route('/:roomName')
  .get(hasModel(roomModel), single);

module.exports = rooms;
