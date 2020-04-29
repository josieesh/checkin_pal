'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('location', ['longitude', 'latitude'], {
          type: 'unique',
          name: 'coordinate_unique_constraint'
        }, { transaction: t})
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('location', 'coordinate_unique_constraint', { transaction: t })
      ]);
    });
  }
};

