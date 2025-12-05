const mongoose = require('mongoose');

const PratoSchema = new mongoose.Schema({
  cod: { type: Number, required: true, unique: true },
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  tipo: { type: String, required: true }
});

module.exports = mongoose.model('Prato', PratoSchema);
