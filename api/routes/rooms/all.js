module.exports = (req, res) => {
  console.log('inside all...');
  console.log(req.model);
  req.model.find((err, rooms) => {
    if(err) {
      console.log('room all err:');
      res.send(err);
    }
    else {
      console.log('romm all response:', rooms);
      res.json(rooms);
    }
  });
};
