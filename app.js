const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./app/routes/book.router');
const dbConfig = require('./database/db.config.js');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.mongoURI[app.settings.env], {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(
    () => {
      console.log('Database connected');
    },
    (error) => {
      console.log(`Database could not be connected : ${error}`);
    }
  );

app.get('/', (req, res) => {
  res.send('Welcome to my book api!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
// export module for test script
module.exports = app;
