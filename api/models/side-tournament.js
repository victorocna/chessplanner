const mongoose = require('mongoose');
const Tournament = require('./tournament');

/**
 * Participants can attend how many side tournaments they wish
 */
const name = 'side';
const schema = new mongoose.Schema({});

module.exports = Tournament.discriminator(name, schema);
