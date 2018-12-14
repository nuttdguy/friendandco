const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WorkDetailSchema = new Schema({
    company: {type: String},
    createDate: {type: Date, default: Date.now()},
    isCurrent: {type: Boolean, default: false}
});


module.exports = mongoose.model('workdetail', WorkDetailSchema);