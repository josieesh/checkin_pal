'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'location',
    [
      {
        latitude: (Math.random() * (360) -180).toFixed(6) * 1,
        longitude: (Math.random() * (360) -180).toFixed(6) * 1,
        address: "123 Rainbow Road",
        capacity: Math.floor((Math.random() * 10000)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: (Math.random() * (360) -180).toFixed(6) * 1,
        longitude: (Math.random() * (360) -180).toFixed(6) * 1,
        address: "50 Park Place",
        capacity: Math.floor((Math.random() * 10000)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        latitude: (Math.random() * (360) -180).toFixed(6) * 1,
        longitude: (Math.random() * (360) -180).toFixed(6) * 1,
        address: "321 Place Road",
        capacity: Math.floor((Math.random() * 10000)),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
  {},
),


  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('location', null, {});
  }
};
