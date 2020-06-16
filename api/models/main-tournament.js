const mongoose = require('mongoose');
const Tournament = require('./tournament');

/**
 * Participants can attend one and only one main tournament
 */
const name = 'main';
const schema = new mongoose.Schema({});

module.exports = Tournament.discriminator(name, schema);
