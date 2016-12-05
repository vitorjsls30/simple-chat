const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.use('/', routes);

module.exports = app;
