require('dotenv').config();

const ExpressLogger = require('debug')('Express:');
const MongoLogger = require('debug')('Mongo:');

const app = require('./src');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then(() => MongoLogger('.::Connected to database::.'))
  .then(() =>
    app.listen(process.env.PORT, () => ExpressLogger(`.::Magic happens at ${process.env.PORT} port::.`))
  )
  .catch(err => {
    MongoLogger('.::Error!::.');
    console.log(err);
  });
