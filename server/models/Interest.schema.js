const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InterestSchema = new Schema({
    desc: {type: String},
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model('interest', InterestSchema);