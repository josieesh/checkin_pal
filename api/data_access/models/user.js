'use strict';
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    sin: {
      type: DataTypes.INTEGER,
      unique: { msg: "Social Insurance Number already in use!"},
    },
    username: {
      type: DataTypes.STRING,
      unique: { msg: "Username already in use!" }
    },
    password: DataTypes.STRING,
  }, {
    hooks: {
        beforeCreate: async function(user, next) {
          const password = user.password

          const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (err) reject(err)
              resolve(hash)
            });
          })
          user.password = hashedPassword;
        }
    },
    freezeTableName: true
  }
  );
  User.prototype.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.getDataValue('password'), function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  }

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.location, { through: 'user_location' });
  };
  return User;
};
