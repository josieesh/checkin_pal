'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('user', ['sin'], {
          type: 'unique',
          name: 'sin_unique_constraint'
        }, { transaction: t}),
        queryInterface.addConstraint('user', ['username'], {
          type: 'unique',
          name: 'username_unique_constraint'
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('user', 'sin_unique_constraint', { transaction: t }),
        queryInterface.removeConstraint('user', 'username_unique_constraint', { transaction: t })
      ]);
    });
  }
};
