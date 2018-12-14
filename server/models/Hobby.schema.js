const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HobbySchema = new Schema({
   desc: {type: String},
   isActive: {type: Boolean, default: false},
   createDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('hobby', HobbySchema);