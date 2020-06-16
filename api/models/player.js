const mongoose = require('mongoose');
const Participant = require('./participant');

/**
 * Players
 */
const name = 'player';
const schema = new mongoose.Schema({
  gender: {
    type: String,
  },
  yob: {
    type: Number,
  },
  federation: {
    type: String,
  },
  club: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = Participant.discriminator(name, schema);
