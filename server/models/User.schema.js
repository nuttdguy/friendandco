const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema
const UserSchema = new Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    photos: [{type: Schema.Types.ObjectId, ref: 'photo'}],
    createDate: {type: Date, default: Date.now},
    isValidated: {type: Boolean, default: false},
    validationUrl: {type: String},
    isActive: {type: Boolean, default: false},
    activeDate: {type: Date},
    inactiveDate: {type: Date, default: null},
    password: {
        token: {type: String},
        isActive: {type: Boolean, default: false},
    },
    googleAuth: {
        token: {type: String},
        isActive: {type: Boolean, default: false}
    },
    facebookAuth: {
        token: {type: String},
        isActive: {type: Boolean, default: false}
    },

});

module.exports = mongoose.model('user', UserSchema);
