// npm packages
const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');

// APP => ROUTES => SERVICE => REPOSITORY + ENTITIES


// instance of express app
const app = express();


// Parse incoming body into Json format
app.use(bodyParser.json());


// Passport: initialize instance
app.use(passport.initialize());


// Passport: configure
require('./config/passport')(passport);


// Load routes
require('./routes/__index.routes')(app);


// Load server
require('./server')(app);