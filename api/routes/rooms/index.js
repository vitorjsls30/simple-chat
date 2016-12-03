const rooms = require('express').Router();
const all = require('./all');
const roomModel = require('../../models/room');
const hasModel = require('../../utils/modelVerifyer');

rooms.use((req, res, next) => {
  next();
});

rooms.route('/')
  .get(hasModel(roomModel), all)
  .post((req, res) => {
    var room = new roomModel();
    room.name = req.body.name;
    room.description = req.body.description;

    room.save((err) => {
      if(err) {
        res.send(err);
      }
      else {
        res.json('Chat Room created successfully!');
      }
    })
  })
  .delete((req, res) => {
    roomModel.remove((err) => {
      if(err) {
        res.send(err);
      }
      res.json('Chat Rooms removed successfully!');
    });
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

module.exports = rooms;
