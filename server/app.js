// APP => ROUTES => SERVICE => REPOSITORY + ENTITIES

// npm packages
const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser');

// instance of express app
const app = express();

// sync db
// const db = require('./db/db.connection').sequelize;
// db.sync({force: true})
//     .then(res => {
//         console.log('done connecting to database ... ', '00003');
//     }).catch(err => {
//     console.log('errors trying to connect to db ... ', err);
// });


// Parse incoming body into Json format
app.use(bodyParser.json());


// Passport: initialize instance
app.use(passport.initialize());


// Passport: configure
// require('./config/passport')(passport);


// Load routes
require('./routes/index.routes')(app);


module.exports = app;