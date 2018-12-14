const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CitySchema = new Schema({
    desc: {type: String},
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('city', CitySchema);