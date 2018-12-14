const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WorkSchema = new Schema({
    createDate: {type: Date, default: Date.now()},
    isEnabled: {type: Boolean, default: false},
    workDetails: [{type: Schema.Types.ObjectId, ref: 'work'}]
});


module.exports = mongoose.model('work', WorkSchema);