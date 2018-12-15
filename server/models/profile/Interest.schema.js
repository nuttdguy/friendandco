const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InterestSchema = new Schema({
    desc: {type: String},
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: new Date()},
    createBy: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('interest', InterestSchema);