const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StateSchema = new Schema({
    descShort: {type: String},
    descLong: {type: String},
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('state', StateSchema);