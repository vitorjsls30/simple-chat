module.exports = model => {
  console.log('inside model verifyer...');
  return (req, res, next) => {
    console.log('inside return...');
    if (model) {
      console.log('Has Model...', model);
      req['model'] = model;
      next();
    }
    else {
      res.status(400).send('model undefined...');
    }
  }
}
