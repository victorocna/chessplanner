const mongoose = require('mongoose');

/**
 * Rooms
 */
const name = 'room';
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(name, schema);
