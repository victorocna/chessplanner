const mongoose = require('mongoose');
const { timestamps } = require('./schemas');

/**
 * Tournaments
 */
const name = 'tournament';
const schema = new mongoose.Schema({
  key: {
    type: mongoose.Types.ObjectId,
    required: true,
    get: (value) => value.toString(),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ...timestamps,
});

module.exports = mongoose.model(name, schema);
