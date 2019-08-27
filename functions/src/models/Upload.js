const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
    user: { 
        type: String,
        required: true
    },
    url: { 
        type: String, 
        required: true 
    }
});

module.exports = Upload = mongoose.model('upload', UploadSchema);