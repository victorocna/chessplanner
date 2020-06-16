const mongoose = require('mongoose');
const { TaxRule } = require('./refs');
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
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
  },
  priority: {
    type: Number,
    required: true,
    min: 0,
  },
  rules: [TaxRule],
  generic: {
    type: Boolean,
  },
  tournament: {
    type: Date,
    validate: function (value) {
      if (this.generic) {
        return value === null;
      }
    },
  },
  ...timestamps,
});

module.exports = mongoose.model(name, schema);
