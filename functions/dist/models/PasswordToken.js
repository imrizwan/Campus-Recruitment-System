const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    passwordchanged: {
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = PasswordToken = mongoose.model('passwordtokens', passwordTokenSchema);
//# sourceMappingURL=PasswordToken.js.map