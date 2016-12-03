module.exports = (req, res) => {
  req.model.find((err, users) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json(users);
    }
  })
};
