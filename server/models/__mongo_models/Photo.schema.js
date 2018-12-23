const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PhotoSchema = new Schema({
    url: {type: String},
    isActive: {type: Boolean, default: false},
    isVisible: {type: Boolean, default: false},
    isPrimary: {type: Boolean, default: false},
    createDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('photo', PhotoSchema);