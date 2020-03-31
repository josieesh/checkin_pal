'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_location', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' }
      },
      location: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'location', key: 'id' }
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_location');
  }
};