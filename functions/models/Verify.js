const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VerifySchema = new Schema({
    user: {
        type: String,
        required: true
    },
    profilecreated: {
        type: Boolean,
        required: true
    }
});

module.exports = Verify = mongoose.model('verify', VerifySchema);