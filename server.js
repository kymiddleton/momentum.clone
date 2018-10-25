// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express
const app = express();

// Sets the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets the server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/api-routes-links.js')(app);
require('./routes/api-routes-quotes.js')(app);
require('./routes/api-routes-todo.js')(app);
require('./routes/html-routes.js')(app);
  
//Set up promises with mongoose
mongoose.Promise = global.Promise;

//Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://momentum.clone:Bc102018@ds121593.mlab.com:21593/heroku_ms45c2jm",
  {
    useMongoClient: true
  }
);

// Starts our server on the predefined PORT
app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
  })
