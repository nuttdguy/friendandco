// APP => ROUTES => SERVICE => REPOSITORY + ENTITIES

// npm packages
const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');

// instance of express app
const app = express();


// Parse incoming body into Json format
app.use(bodyParser.json());


// Passport: initialize instance
app.use(passport.initialize());


// Passport: configure
// require('./config/passport')(passport);


// Load routes
require('./routes/index.routes')(app);


module.exports = app;