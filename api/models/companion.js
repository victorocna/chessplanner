const mongoose = require('mongoose');
const Participant = require('./participant');

/**
 * Companions
 */
const name = 'companion';
const schema = new mongoose.Schema({});

module.exports = Participant.discriminator(name, schema);
