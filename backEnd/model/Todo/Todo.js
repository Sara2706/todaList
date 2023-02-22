const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default:false},
    userId: { type: String},
})

module.exports = mongoose.model("Todos", TodoSchema);