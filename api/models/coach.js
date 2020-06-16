const mongoose = require('mongoose');
const Participant = require('./participant');

/**
 * Coaches
 */
const name = 'coach';
const schema = new mongoose.Schema({});

module.exports = Participant.discriminator(name, schema);
