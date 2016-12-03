module.exports = (req, res) => {
  req.model.find((err, chats) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json(chats);
    }
  });
};
