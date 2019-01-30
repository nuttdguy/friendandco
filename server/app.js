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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    // serve index.html if route is not recognized
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


module.exports = app;