const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        max: 20
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});
module.exports = User = mongoose.model('users', UserSchema);
//# sourceMappingURL=User.js.map
//# sourceMappingURL=User.js.map