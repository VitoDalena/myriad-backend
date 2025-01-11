const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    telefono: { type: String, default: '' }
  });

const eventSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true },
  subscribers: { type: [contactSchema], default: [] }
});

module.exports = mongoose.model('Event', eventSchema);
