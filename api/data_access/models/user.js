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
    freezeTableName: true,
    instanceMethods: {
      comparePassword : function(candidatePassword, cb) {
          bcrypt.compare(candidatePassword, this.getDataValue('password'), function(err, isMatch) {
              if(err) return cb(err);
              cb(null, isMatch);
          });
      },
      getFullname: function() {
          return [this.firstname, this.lastname].join(' ');
      }
    },
    hooks: {
        beforeCreate: function(user, next) {
          console.log("BEFORE CREATE HOOK");
          // Check if document is new or a new password has been se
          bcrypt.hash(user.password, saltRounds,
            function(err, hashedPassword) {
            if (err) {
              console.log("ERROR");
              console.log(err);
            }
            else {
              user.password = hashedPassword;
            }
          });
        }
    }
  }
  );
  // User.pre('create', function(next) {
  //   // Check if document is new or a new password has been set
  //   if (this.isNew || this.isModified('password')) {
  //     // Saving reference to this because of changing scopes
  //     const document = this;
  //     bcrypt.hash(document.password, saltRounds,
  //       function(err, hashedPassword) {
  //       if (err) {
  //         next(err);
  //       }
  //       else {
  //         document.password = hashedPassword;
  //         next();
  //       }
  //     });
  //   } else {
  //     next();
  //   }
  // });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.location, { through: 'user_location' });
  };
  return User;
};
