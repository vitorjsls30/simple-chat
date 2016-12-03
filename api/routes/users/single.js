module.exports = (req, res) => {
  req.model.find({email: req.params.userEmail}, (err, user) => {
    if(err) {
      res.send(err);
    }
      res.status(200).json({user});
  });
};
