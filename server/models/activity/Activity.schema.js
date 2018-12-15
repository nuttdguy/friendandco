const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
    scene: {type: Schema.Types.ObjectId, ref: 'activityscene'},
    kind: {type: Schema.Types.ObjectId, ref: 'activitykind'},
    title: {type: String, minlength: 2, maxLength: 64},
    desc: {type: String, minlength: 2, maxLength: 144},
    createDate: {type: Date, default: Date.now()},
    createBy: {type: Schema.Types.ObjectId, ref: 'user'},
    isActive: {type: Boolean, default: true},
    tags: [{type: Schema.Types.ObjectId, ref: 'activitytag'}],
    location: {type: Schema.Types.ObjectId, ref: 'location'},
    calendar: {type: Schema.Types.ObjectId, ref: 'activitycalendar'},
    photos: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('activity', ActivitySchema);