const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivityTagSchema = new Schema({
    label: {type: String, minLength: 2, maxLength: 12},
    desc: {type: String, minLength: 2, maxLength: 144},
    timesUsed: {type: Number, default: 0},
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now()},
    createBy: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('activitytag', ActivityTagSchema);