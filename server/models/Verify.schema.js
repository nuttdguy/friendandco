const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VerifySchema = new Schema({
    createDate: {type: Date, default: Date.now()},
    userId: {type: String},
    userEmail: {type: String},
    isVerifyEmail: {type: Boolean},
    isRecoverPassword: {type: Boolean}
});

module.exports = mongoose.model('verify', VerifySchema);