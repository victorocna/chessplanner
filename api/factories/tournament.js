const { MainTournament, SideTournament } = require('../models');

module.exports = (schema) => {
  switch (schema) {
    case 'main':
      return MainTournament;
    case 'side':
      return SideTournament;
    default:
      throw new Error('Unknown schema name');
  }
};
