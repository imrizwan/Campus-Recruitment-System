const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const SelectedSchema = new Schema({
    vaccancyid: {
        type: String,
        required: true
    },
    selected: [String]
});
module.exports = Selected = mongoose.model('selection', SelectedSchema);
//# sourceMappingURL=Selected.js.map