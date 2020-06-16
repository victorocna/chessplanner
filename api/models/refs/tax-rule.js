const mongoose = require('mongoose');

/**
 * Rules
 */
const name = 'rule';
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  eq: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(name, schema);
