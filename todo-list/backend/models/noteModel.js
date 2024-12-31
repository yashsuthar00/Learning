const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Text is required"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Note", noteSchema);