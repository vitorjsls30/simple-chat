const app = require('express')();
const bodyParser = require('body-parser');
const server = require('./server');
const routes = require('./api/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Starting our loved app...');
});
