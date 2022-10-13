const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./users');

const CareerSchema = new mongoose.Schema ({
    name: {type: String},
    post: {type: String, required: true, minLength: 1, maxLength: 280},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }
}, 
{timestamps:true});

const Career = mongoose.model('Career', CareerSchema);

module.exports = Career;






