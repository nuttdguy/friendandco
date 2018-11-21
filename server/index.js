const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// express app
const app = express();

// Connecting DB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB is connected"))
  .catch(err => console.log(err));

// Parse incoming body into Json format
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send("hello there")
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})