const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: Number
    },
    department: {
        type: String
    }
}, {
        collection: 'registration'
    })



module.exports = mongoose.model('registration', userSchema)
