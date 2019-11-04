const mongoose = require("mongoose");
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
    recommend: {
        type: Boolean,
        default: false
    },
    applied: [
        {
            key: {
                type: String
            }
        }
    ]
});
module.exports = Verify = mongoose.model("verify", VerifySchema);
//# sourceMappingURL=Verify.js.map