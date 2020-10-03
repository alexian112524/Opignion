const mongoose = require('mongoose');

const opignonSchema = mongoose.Schema({
    name: { type: String, required: true },
    opinion: { type: String, required: true }, 
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Opignon', opignonSchema);