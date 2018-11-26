const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        required: true,
        max: 40
    },
    location: {
        type: String
    },
    interest: [
        {
            activity: {
                type: [String],
                required: true
            },
        },
        {
            persona: {
                type: [String],
                required: true
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('profile', ProfileSchema);