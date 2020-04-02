'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('user', 'username', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t}),
        queryInterface.addColumn('user', 'password', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user', 'password', { transaction: t }),
        queryInterface.removeColumn('user', 'username', { transaction: t })
      ]);
    });
  }
};
