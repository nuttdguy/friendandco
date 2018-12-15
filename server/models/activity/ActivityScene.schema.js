const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivityScene = new Schema({
    label: {type: String},
    desc: {type: String},
    timesUsed: {type: Number},
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now()},
    createBy: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('activityscene', ActivityScene);