const mongoose = require('mongoose');

/**
 * Settings
 */
const name = 'setting';
const schema = new mongoose.Schema({
  key: {
    type: mongoose.Types.ObjectId,
    required: true,
    get: (value) => value.toString(),
  },
  arrival: {
    type: Date,
  },
  departure: {
    type: Date,
  },
  columns: {
    type: Array,
  },
  currency: {
    type: String,
  },
});

module.exports = mongoose.model(name, schema);
