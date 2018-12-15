const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HobbySchema = new Schema({
   desc: {type: String},
   isActive: {type: Boolean, default: false},
   createDate: {type: Date, default: Date.now()},
   createBy: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('hobby', HobbySchema);