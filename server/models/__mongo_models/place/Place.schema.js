const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PlaceSchema = new Schema({
    // country: {type: Schema.Types.ObjectId}, // TODO create country document or enum
    place: {
        name: {type: String},
        lat: {type: Number},
        long: {type: Number},
        address1: {type: String},
        address2: {type: String},
        city: {type: String},
        state: {type: String},
        // city: {type: Schema.Types.ObjectId, ref: 'city'},
        // state: {type: Schema.Types.ObjectId, ref: 'state'},
        zip: {type: Number}
    },
});

module.exports = mongoose.model('place', PlaceSchema);