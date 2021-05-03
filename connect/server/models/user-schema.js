const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    Password: {
        type: String,
        required:true
    }
}, {
        collection: 'registration',
        timestamps:true
    })



module.exports = mongoose.model('User', userSchema)
