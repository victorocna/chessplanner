const mongoose = require('mongoose');
const Participant = require('./participant');

/**
 * Other participants to chess events
 */
const name = 'other';
const schema = new mongoose.Schema({});

module.exports = Participant.discriminator(name, schema);
