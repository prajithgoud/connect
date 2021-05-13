const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        // required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    Password: {
        type: String,
        // required:true
    }
    // department: {
    //     type: String
    // }
}, {
        collection: 'registration',
        timestamps:true
    })



module.exports = mongoose.model('registration', userSchema)
