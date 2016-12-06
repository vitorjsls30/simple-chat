module.exports = (req, res) => {
  req.model.find({email: req.params.email}, (err, user) => {
    if(err) {
      res.send(err);
    }
      res.status(200).json({user});
  });
};
