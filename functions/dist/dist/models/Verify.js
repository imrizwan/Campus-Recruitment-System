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
    },
    applied: [
        {
            key: {
                type: String
            }
        }
    ]
});
module.exports = Verify = mongoose.model('verify', VerifySchema);
//# sourceMappingURL=Verify.js.map
//# sourceMappingURL=Verify.js.map