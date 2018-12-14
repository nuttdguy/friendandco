const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LocationSchema = new Schema({
    country: {type: Schema.Types.ObjectId}, // TODO create country document or enum
    address1: {type: String},
    address2: {type: String},
    city: {type: Schema.Types.ObjectId},
    state: {type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('location', LocationSchema);