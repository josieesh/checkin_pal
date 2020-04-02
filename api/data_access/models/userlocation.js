'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLocation = sequelize.define('user_location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    freezeTableName: true,
  });
  UserLocation.associate = function(models) {
    // associations can be defined here

  };
  return UserLocation;
};