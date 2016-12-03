module.exports = model => {
  return (req, res, next) => {
    if (model) {
      req['model'] = model;
      next();
    }
    else {
      res.status(400).send('model undefined...');
    }
  }
}
