const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivityCalendarSchema = new Schema({
    isTimeEvent: {type: Boolean, default: false},
    beginCal: {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number }
    },
    endCal: {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number }
    },
    beginTime: {
        hour: { type: Number },
        min: { type: Number },
        period: { type: Number, minValue: 0, maxValue: 1 }
    },
    endTime: {
        hour: { type: Number },
        min: { type: Number },
        period: { type: Number, minValue: 0, maxValue: 1 }
    },
    createDate: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('activitycalendar', ActivityCalendarSchema);