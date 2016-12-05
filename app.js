const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(express.static(__dirname + '/app'));
app.use('/', routes);

module.exports = {
  api: app,
  start: () => {
    var port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log('Starting our loved app...');
    });
  }
};
