// npm packages
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

// locally created files
const keys = require('./config/keys');


// instance of express app
const app = express();

// add notes


// Connecting DB
mongoose
  .connect(keys.mongoURI, {useNewUrlParser: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err, "Unable to connect"));


// Parse incoming body into Json format
app.use(bodyParser.json());


// Passport: initialize instance
app.use(passport.initialize());


// Passport: configure
require('./config/passport')(passport);


// Routes: require routes
require('./routes/__index.routes')(app);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    // serve index.html if route is not recognized
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});