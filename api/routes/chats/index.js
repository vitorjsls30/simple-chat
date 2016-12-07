const chats = require('express').Router();
const all = require('./all');
const roomChats = require('./rooms');
const chatModel = require('../../models/chat');
const hasModel = require('../../utils/modelVerifyer');

chats.use((req, res, next) => {
  next();
});

chats.route('/setup')
  .get((req, res) => {
    var mockData = require('../../utils/data.json');

    mockData.chats.map((chatItem) => {
      var chat = new chatModel();
      chat.id = chatItem.id;
      chat.content = chatItem.content;
      chat.roomName = chatItem.roomName;
      chat.userEmail = chatItem.userEmail;
      chat.save((err) => {
        if(err) {
          res.send(err);
        }
        console.log('Chat message insert!');
      });
    });

    res.json('Chats Setup!')
  });

chats.route('/')
  .get(hasModel(chatModel), all)
  .post((req, res) => {
    var chat = new chatModel();
    chat.roomName = req.body.roomName;
    chat.userEmail = req.body.userEmail;
    chat.content = req.body.content;
    chat.id = req.body.id;

    chat.save((err) => {
      if(err) {
        res.send(err);
      }
      else {
        res.json('Chat Message created successfully!');
      }
    })
  })
  .delete((req, res) => {
    chatModel.remove((err) => {
      if(err) {
        res.send(err);
      }
      res.json('Chat Messages removed successfully!');
    });
  });

chats.route('/:roomName')
  .get(hasModel(chatModel), roomChats)
  .delete((req, res) => {
    chatModel.remove({roomName: req.params.roomName}, (err)=> {
      if(err) {
        res.send(err);
      }
      res.json('Chat Messages removed successfully!');
    })
  });

module.exports = chats;
