const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./api/routes');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log('Starting our loved app...');
});

module.exports = app;
