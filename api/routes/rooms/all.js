module.exports = (req, res) => {
  req.model.find((err, rooms) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json(rooms);
    }
  });
};
