const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema ({
    name: {type: String},
    username: {type: String, required: true, unique: true, min: 3, max: 20},
    email: {type: String},
    password: {type: String, required: true},
},
{
    timestamps: true, // give info on when user account was created
    toJSON: {
        virtuals: true, 
        transform: (_doc, ret) => {
            delete ret.password //remove the password key from our return document. prevents password from being sent back to the client
            return ret
        },
        id:false  // makes virtual id invisable
    }
},
);

const User = mongoose.model('User', UserSchema);

module.exports = User;


