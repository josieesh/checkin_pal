'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('user_location', {
    id: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {});
  UserLocation.associate = function(models) {
    // associations can be defined here

  };
  return UserLocation;
};