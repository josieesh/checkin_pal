'use strict';
const User = require("../models")["user"];

const bcrypt = require('bcrypt');

const saltRounds = 10;




module.exports = {
  up: async function (queryInterface, Sequelize) {
    
    var users = [
      await User.create({
        first_name: 'Jane',
        last_name: 'Doe',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        username: 'user1',
        password: 'test'
      }),
      await User.create({
        first_name: 'John',
        last_name: 'Doe',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        username: 'user2',
        password: 'test'
      }),
      await User.create({
        first_name: 'Jim',
        last_name: 'McGill',
        sin: Math.floor(Math.random() * (900000002)) + 99999999,
        username: 'user3',
        password: 'test'
      })
    ];
    return queryInterface.bulkInsert('user', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
