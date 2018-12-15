const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        interests: [{type: Schema.Types.ObjectId, ref: 'interest'}],
        hobbies: [{type: Schema.Types.ObjectId, ref: 'hobby'}],
        location: [{type: Schema.Types.ObjectId, ref: 'location'}],
        createDate: {type: Date, default: Date.now()},

    },
    {
        minimize: false
    }
);


module.exports = mongoose.model('profile', ProfileSchema);