const users = require('express').Router();
const all = require('./all');
const single = require('./single');
const usersModel = require('../../models/user');
const hasModel = require('../../utils/modelVerifyer');

users.use((req, res, next) => {
  next();
});

users.route('/setup')
  .get((req, res) => {
    var mockData = require('../../utils/data.json');

    mockData.users.map((userItem) => {
      var user = new usersModel();
      user.email = userItem.email;
      user.save((err)=> {
        if(err) {
          res.send(err);
        }
        console.log('User ', userItem.email, ' inserted!');
      });
    });
    res.json('Users Setup!');
  });

users.route('/')
  .get(hasModel(usersModel), all)
  .post((req, res) => {
    var user = new usersModel();
    user.email = req.body.email;
    user.save((err) => {
      if(err) {
        res.send(err);
      }
      res.json('User Saved successfully!');
    })
  });

users.route('/:userEmail')
  .get(hasModel(usersModel), single);

module.exports = users;
