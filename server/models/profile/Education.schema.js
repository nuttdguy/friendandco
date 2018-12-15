const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EducationSchema = new Schema({
    schoolName: {type: String},
    degreeType: {type: String},
    createDate: {type: Date, default: Date.now()},
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('education', EducationSchema);