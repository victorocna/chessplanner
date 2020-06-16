const mongoose = require('mongoose');
const { Room } = require('./refs');
const { timestamps } = require('./schemas');

/**
 * Hotels
 */
const name = 'hotel';
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
  rooms: [Room],
  ...timestamps,
});

module.exports = mongoose.model(name, schema);
