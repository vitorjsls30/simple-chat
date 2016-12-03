module.exports = (req, res) => {
  req.model.find({ id: req.params.chatId}, (err, chat) => {
    if(err) {
      res.send(err);
    }
    res.status(200).json({chat});
  });
};
