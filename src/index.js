const Express = require('express');
const morgan = require('morgan');
const app = Express();

const ExpressLogger = require('debug')('Express:Main');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

app.use(morgan('dev', { stream: { write: msg => ExpressLogger(msg) } }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

module.exports = app;
