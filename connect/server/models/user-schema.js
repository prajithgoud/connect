const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Email: {
        type: String
    },
    Password: {
        type: Number
    }
}, {
        collection: 'registration'
    })



module.exports = mongoose.model('User', userSchema)
