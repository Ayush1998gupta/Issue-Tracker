const path = require('path');
const port = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// error controller
const errorController = require('./controllers/error');

// static file
app.set('view engine', 'ejs');
app.set('views', 'views');

// import routes
const indexRoute = require('./routes/index');

// body parsering
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// use Routes
app.use(indexRoute);

app.use(errorController.get404);

//database
mongoose
  .connect('mongodb://localhost:27017/issueTracker')
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb', err));

app.listen(port, () => {
  console.log(`Issue Tracker app listening on port ${port}`);
});
