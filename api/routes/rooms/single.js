module.exports = (req, res) => {
  req.model.find({ name: req.params.roomName }, (err, room) => {
    if(err) {
      res.send(err);
    }
    res.status(200).json({room});
  });
};
