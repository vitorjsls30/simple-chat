module.exports = ((req, res) => {
  req.model.find({ roomName: req.params.roomName}, (err, chats) => {
    if(err) {
      res.send(err);
    }
    res.status(200).json(chats);
  });
});
