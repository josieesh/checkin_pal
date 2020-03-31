'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'user',
    [
      {
        first_name: 'Jane',
        last_name: 'Doe',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'John',
        last_name: 'Doe',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'Jim',
        last_name: 'McGill',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  {},
),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('user', null, {});
  }
};
