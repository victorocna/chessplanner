const mongoose = require('mongoose');
const { timestamps } = require('./schemas');

/**
 * Participants
 */
const name = 'participant';
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
  notes: {
    type: String,
  },
  arrival: {
    type: Date,
  },
  departure: {
    type: Date,
  },
  payment: {
    computed: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    prepayment: {
      type: Number,
    },
    payed: {
      type: Number,
    },
    toPay: {
      type: Number,
    },
    method: {
      type: String,
    },
  },
  ...timestamps,
});

module.exports = mongoose.model(name, schema);
