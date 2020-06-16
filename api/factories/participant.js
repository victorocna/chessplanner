const { Player, Companion, Coach, Other } = require('../models');

module.exports = (schema) => {
  switch (schema) {
    case 'player':
      return Player;
    case 'companion':
      return Companion;
    case 'coach':
      return Coach;
    case 'other':
      return Other;
    default:
      throw new Error('Unknown schema name');
  }
};
